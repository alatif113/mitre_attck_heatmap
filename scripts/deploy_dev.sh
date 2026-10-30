#!/usr/bin/env bash
#
# Package the app and install it on the dev Splunk instance.
#
#   scripts/deploy_dev.sh [--skip-package] [--dry-run] [--ssh-install [--restart]]
#
# Splunk's apps/local endpoint cannot take the package in the request body; it
# installs from a path that already exists on the server. So this script
#   1. runs scripts/package.sh with APP_ENV=test unless APP_ENV is set, so the
#      app is visible and has a nav to the test bench (skipped with --skip-package)
#   2. copies <app_id>-<version>.tgz to the Splunk host with scp
#   3. POSTs apps/local on the management port with the token, naming that path
#      (filename=true, update=true)
#   4. removes the copied file, and prints the URLs to refresh static assets
#      and reload config.
#
# --ssh-install installs without the REST API: steps 3 and the token are replaced by
# unpacking the package into $SPLUNK_REMOTE_HOME/etc/apps over ssh. Use it when the
# management port is unavailable, for example on a Free license (which turns off
# remote logins, so every REST call answers 401). Files are extracted over the
# installed app, so local/ and anything else not in the package is kept; files
# the package no longer has stay behind. It then checks that the installed app.conf
# has the build number of the package. --restart also restarts Splunk on the host: with
# SPLUNK_SERVICE set it runs "sudo -n /bin/systemctl restart <service>" (so a sudoers
# rule for exactly that command is enough), otherwise "splunk restart" from
# SPLUNK_REMOTE_HOME (a Free license needs no login for that). Config files and the
# app's static files are only read again after a restart.
#
# Settings come from .env in the app root (created from a template on first
# run) or from the environment, which takes precedence:
#   SPLUNK_TOKEN        authentication token (Settings > Tokens). Required.
#   SPLUNK_SSH_TARGET   user@host that scp/ssh can reach, e.g. me@splunk.home.
#                       Required. The remote user needs write access to
#                       SPLUNK_REMOTE_DIR, and the Splunk service user must be
#                       able to read the copied file.
#   SPLUNK_REMOTE_DIR   directory on the host for the copy. Default: /tmp
#   SPLUNK_REMOTE_HOME  Splunk's install directory on the host, used by --ssh-install
#                       and --restart. Default: /opt/splunk
#   SPLUNK_SERVICE      systemd unit that runs Splunk, for example Splunkd.service. When set,
#                       --restart uses sudo -n /bin/systemctl restart <unit>. Example sudoers line:
#                         me ALL=(root) NOPASSWD: /bin/systemctl restart Splunkd.service
#   SPLUNK_SSH_SUDO=1   run the unpack (and a restart without SPLUNK_SERVICE) with sudo on the host (the ssh user
#                       then needs passwordless sudo). Without it the ssh user must be
#                       able to write to $SPLUNK_REMOTE_HOME/etc/apps.
#   SPLUNK_URL          web URL. Default: https://splunk.home
#   SPLUNK_MGMT_URL     REST URL. Default: $SPLUNK_URL:8089
#   SPLUNK_VERIFY_TLS=1 verify the server certificate. By default it is NOT
#                       verified, so a self-signed dev certificate works, but
#                       the token is then sent to whatever answers at
#                       SPLUNK_MGMT_URL. Only use on a network you trust.
#   SPLUNK_CA_CERT      CA bundle to trust; implies verification.
#
# The token is never printed, never put on a command line, and is redacted
# from any server response that is echoed. Do not run this script with
# `bash -x`, which would trace the .env contents.

set -euo pipefail
set +x

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
APP_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
ENV_FILE="${ENV_FILE:-$APP_ROOT/.env}"

SKIP_PACKAGE=0
DRY_RUN=0
SSH_INSTALL=0
RESTART=0
for arg in "$@"; do
    case "$arg" in
        --skip-package) SKIP_PACKAGE=1 ;;
        --dry-run) DRY_RUN=1 ;;
        --ssh-install) SSH_INSTALL=1 ;;
        --restart) RESTART=1 ;;
        -h|--help) sed -n '3,50p' "${BASH_SOURCE[0]}" | sed 's/^# \{0,1\}//'; exit 0 ;;
        *) echo "error: unknown argument: $arg" >&2; exit 2 ;;
    esac
done
if [ "$RESTART" = 1 ] && [ "$SSH_INSTALL" = 0 ]; then
    echo "error: --restart only goes with --ssh-install" >&2
    exit 2
fi

die() {
    echo "error: $*" >&2
    exit 1
}

# --- .env ------------------------------------------------------------------

if [ ! -f "$ENV_FILE" ]; then
    (umask 077 && cat > "$ENV_FILE" <<'EOF'
# Dev Splunk deploy settings for scripts/deploy_dev.sh.
# This file holds a credential: it is git-ignored and excluded from packages.

# Authentication token (Splunk Web: Settings > Tokens).
SPLUNK_TOKEN=

# Where scp should copy the package: user@host. Required.
SPLUNK_SSH_TARGET=

# Optional overrides (defaults shown).
# SPLUNK_REMOTE_DIR=/tmp
# SPLUNK_URL=https://splunk.home
# SPLUNK_MGMT_URL=https://splunk.home:8089
# SPLUNK_VERIFY_TLS=1
# SPLUNK_CA_CERT=/path/to/ca.pem
EOF
    )
    echo "Created $ENV_FILE (mode 600). Fill in SPLUNK_TOKEN and SPLUNK_SSH_TARGET, then run this again." >&2
    exit 1
fi

# Read KEY=VALUE lines for known keys only. The file is parsed, not sourced, so
# nothing in it is executed. Values already in the environment win.
while IFS= read -r line || [ -n "$line" ]; do
    case "$line" in
        SPLUNK_TOKEN=*|SPLUNK_SSH_TARGET=*|SPLUNK_REMOTE_DIR=*|SPLUNK_REMOTE_HOME=*|SPLUNK_SSH_SUDO=*|SPLUNK_SERVICE=*|SPLUNK_URL=*|SPLUNK_MGMT_URL=*|SPLUNK_CA_CERT=*|SPLUNK_VERIFY_TLS=*)
            key="${line%%=*}"
            value="${line#*=}"
            value="${value%\"}"; value="${value#\"}"
            value="${value%\'}"; value="${value#\'}"
            if [ -z "${!key:-}" ]; then
                printf -v "$key" '%s' "$value"
            fi
            ;;
    esac
done < "$ENV_FILE"

mode="$(stat -f '%Lp' "$ENV_FILE" 2>/dev/null || stat -c '%a' "$ENV_FILE")"
if [ "$mode" != "600" ] && [ "$mode" != "400" ]; then
    chmod 600 "$ENV_FILE"
    echo "note: $ENV_FILE was mode $mode; changed to 600" >&2
fi

# --- settings --------------------------------------------------------------

SPLUNK_URL="${SPLUNK_URL:-https://splunk.home}"
SPLUNK_URL="${SPLUNK_URL%/}"
SPLUNK_MGMT_URL="${SPLUNK_MGMT_URL:-$SPLUNK_URL:8089}"
SPLUNK_MGMT_URL="${SPLUNK_MGMT_URL%/}"
SPLUNK_REMOTE_DIR="${SPLUNK_REMOTE_DIR:-/tmp}"
SPLUNK_REMOTE_DIR="${SPLUNK_REMOTE_DIR%/}"
SPLUNK_REMOTE_HOME="${SPLUNK_REMOTE_HOME:-/opt/splunk}"
SPLUNK_REMOTE_HOME="${SPLUNK_REMOTE_HOME%/}"
SPLUNK_SSH_SUDO="${SPLUNK_SSH_SUDO:-}"
SPLUNK_SERVICE="${SPLUNK_SERVICE:-}"
SPLUNK_TOKEN="${SPLUNK_TOKEN:-}"
SPLUNK_SSH_TARGET="${SPLUNK_SSH_TARGET:-}"
SPLUNK_CA_CERT="${SPLUNK_CA_CERT:-}"
SPLUNK_VERIFY_TLS="${SPLUNK_VERIFY_TLS:-}"

APP_ID="$(awk -F'[[:space:]]*=[[:space:]]*' '
    /^\[/ { in_package = ($0 == "[package]") }
    in_package && $1 == "id" { print $2; exit }
' "$APP_ROOT/default/app.conf" | tr -d '[:space:]')"
[ -n "$APP_ID" ] || die "no [package] id found in default/app.conf"

APP_VERSION="$(awk -F'[[:space:]]*=[[:space:]]*' '
    /^\[/ { in_launcher = ($0 == "[launcher]") }
    in_launcher && $1 == "version" { print $2; exit }
' "$APP_ROOT/default/app.conf" | tr -d '[:space:]')"
[ -n "$APP_VERSION" ] || die "no [launcher] version found in default/app.conf"

ARCHIVE="$APP_ROOT/$APP_ID-$APP_VERSION.tgz"
REMOTE_PATH="$SPLUNK_REMOTE_DIR/$APP_ID-$APP_VERSION.tgz"

[ -n "$SPLUNK_SSH_TARGET" ] || die "SPLUNK_SSH_TARGET is not set (user@host for scp); see $ENV_FILE"
[[ "$SPLUNK_SSH_TARGET" =~ ^[A-Za-z0-9._-]+@[A-Za-z0-9._-]+$|^[A-Za-z0-9._-]+$ ]] \
    || die "SPLUNK_SSH_TARGET must look like user@host"
[[ "$SPLUNK_REMOTE_DIR" =~ ^/[A-Za-z0-9._/-]*$ ]] || die "SPLUNK_REMOTE_DIR must be an absolute path without spaces"
[[ "$SPLUNK_REMOTE_HOME" =~ ^/[A-Za-z0-9._/-]+$ ]] || die "SPLUNK_REMOTE_HOME must be an absolute path without spaces"
REMOTE_APPS="$SPLUNK_REMOTE_HOME/etc/apps"
[ -z "$SPLUNK_SERVICE" ] || [[ "$SPLUNK_SERVICE" =~ ^[A-Za-z0-9@._-]+$ ]] || die "SPLUNK_SERVICE must be a systemd unit name such as Splunkd.service"
REMOTE_SUDO=""
# -n: fail at once instead of waiting for a password nobody can type over ssh.
[ "$SPLUNK_SSH_SUDO" = 1 ] && REMOTE_SUDO="sudo -n "
if [ -n "$SPLUNK_SERVICE" ]; then
    RESTART_CMD="sudo -n /bin/systemctl restart $SPLUNK_SERVICE"
else
    RESTART_CMD="${REMOTE_SUDO}'$SPLUNK_REMOTE_HOME/bin/splunk' restart"
fi

# The token is sent in a header, so only send it over TLS (or to this machine).
case "$SPLUNK_MGMT_URL" in
    https://*|http://localhost|http://localhost:*|http://127.0.0.1|http://127.0.0.1:*) ;;
    *) die "SPLUNK_MGMT_URL must be https:// (got $SPLUNK_MGMT_URL)" ;;
esac

if [ "$DRY_RUN" = 0 ] && [ "$SSH_INSTALL" = 0 ]; then
    [ -n "$SPLUNK_TOKEN" ] || die "SPLUNK_TOKEN is empty; set it in $ENV_FILE"
    # Restricted to the characters tokens contain, so it is safe to quote in a curl config.
    [[ "$SPLUNK_TOKEN" =~ ^[A-Za-z0-9._~+/=-]+$ ]] || die "SPLUNK_TOKEN contains unexpected characters"
fi

TLS_ARGS=()
if [ -n "$SPLUNK_CA_CERT" ]; then
    [ -f "$SPLUNK_CA_CERT" ] || die "SPLUNK_CA_CERT not found: $SPLUNK_CA_CERT"
    TLS_ARGS=(--cacert "$SPLUNK_CA_CERT")
elif [ "$SPLUNK_VERIFY_TLS" = "1" ]; then
    :  # curl's default: verify against the system trust store
else
    echo "note: not verifying the TLS certificate of $SPLUNK_MGMT_URL (set SPLUNK_VERIFY_TLS=1 to verify)" >&2
    TLS_ARGS=(--insecure)
fi

# --- package ---------------------------------------------------------------

if [ "$SKIP_PACKAGE" = 1 ]; then
    [ -f "$ARCHIVE" ] || die "--skip-package given but $ARCHIVE does not exist"
    echo "==> Using existing $ARCHIVE"
    if ! tar -xzOf "$ARCHIVE" "$APP_ID/default/app.conf" | grep -qE '^is_visible[[:space:]]*=[[:space:]]*1'; then
        echo "note: this archive is a production build (app hidden, no test bench); rebuild without --skip-package for a test build" >&2
    fi
else
    # A dev deploy is a test build: the app is visible and has a nav to the test bench.
    # Set APP_ENV=production to deploy the production package instead.
    APP_ENV="${APP_ENV:-test}" "$SCRIPT_DIR/package.sh"
fi

if [ "$DRY_RUN" = 1 ]; then
    echo "==> Dry run: would copy $ARCHIVE to $SPLUNK_SSH_TARGET:$REMOTE_PATH"
    if [ "$SSH_INSTALL" = 1 ]; then
        echo "==> Dry run: would unpack it into $SPLUNK_SSH_TARGET:$REMOTE_APPS${REMOTE_SUDO:+ (with sudo)}"
        [ "$RESTART" = 1 ] && echo "==> Dry run: would run on $SPLUNK_SSH_TARGET: $RESTART_CMD"
    else
        echo "==> Dry run: would POST $SPLUNK_MGMT_URL/services/apps/local (name=$REMOTE_PATH filename=true update=true)"
    fi
else
    # --- copy --------------------------------------------------------------

    echo "==> Copying package to $SPLUNK_SSH_TARGET:$REMOTE_PATH"
    scp -q "$ARCHIVE" "$SPLUNK_SSH_TARGET:$REMOTE_PATH"

    # --- install -----------------------------------------------------------

    if [ "$SSH_INSTALL" = 1 ]; then
        echo "==> Unpacking into $SPLUNK_SSH_TARGET:$REMOTE_APPS"
        ssh "$SPLUNK_SSH_TARGET" "set -e; [ -d '$REMOTE_APPS' ] || { echo 'no such directory on the host: $REMOTE_APPS (set SPLUNK_REMOTE_HOME)' >&2; exit 3; }; ${REMOTE_SUDO}tar -xzf '$REMOTE_PATH' -C '$REMOTE_APPS' --no-same-owner; rm -f '$REMOTE_PATH'" \
            || die "could not unpack the package on $SPLUNK_SSH_TARGET (the package was left at $REMOTE_PATH; if it is a permissions problem, see SPLUNK_SSH_SUDO)"
        WANT_BUILD="$(tar -xzOf "$ARCHIVE" "$APP_ID/default/app.conf" | sed -nE 's/^build[[:space:]]*=[[:space:]]*([0-9]+).*/\1/p')"
        HAVE_BUILD="$(ssh "$SPLUNK_SSH_TARGET" "sed -nE 's/^build[[:space:]]*=[[:space:]]*([0-9]+).*/\\1/p' '$REMOTE_APPS/$APP_ID/default/app.conf'")" || HAVE_BUILD=""
        [ "$WANT_BUILD" = "$HAVE_BUILD" ] || die "the app on the host has build '$HAVE_BUILD', expected '$WANT_BUILD': the files were not replaced"
        echo "==> Installed $APP_ID (build $HAVE_BUILD)"
        if [ "$RESTART" = 1 ]; then
            echo "==> Restarting Splunk on $SPLUNK_SSH_TARGET"
            echo "    running on the host: $RESTART_CMD"
            if ! RESTART_OUT="$(ssh "$SPLUNK_SSH_TARGET" "$RESTART_CMD" 2>&1)"; then
                echo "$RESTART_OUT" >&2
                if [ -z "$SPLUNK_SERVICE" ] && echo "$RESTART_OUT" | grep -qi "systemd manages the splunk service"; then
                    die "this Splunk runs under systemd, which 'splunk restart' cannot use without root. Set SPLUNK_SERVICE=Splunkd.service in $ENV_FILE (the unit name from 'systemctl status') and allow it with a sudoers line: <user> ALL=(root) NOPASSWD: /bin/systemctl restart Splunkd.service"
                fi
                die "restart failed (see the output above). With SPLUNK_SERVICE the ssh user needs a sudoers rule for exactly: /bin/systemctl restart $SPLUNK_SERVICE"
            fi
            [ -z "$RESTART_OUT" ] || echo "$RESTART_OUT"
        fi
    else
    echo "==> Installing via $SPLUNK_MGMT_URL/services/apps/local"
    RESPONSE="$(mktemp)"
    trap 'rm -f "$RESPONSE"' EXIT

    # The header goes to curl on stdin as a config, so the token never appears
    # in the process list (printf is a shell builtin).
    HTTP_CODE="$(printf 'header = "Authorization: Bearer %s"\n' "$SPLUNK_TOKEN" \
        | curl --config - --silent --show-error --max-time 180 \
            ${TLS_ARGS[@]+"${TLS_ARGS[@]}"} \
            --output "$RESPONSE" --write-out '%{http_code}' \
            --request POST "$SPLUNK_MGMT_URL/services/apps/local" \
            --data-urlencode "name=$REMOTE_PATH" \
            --data filename=true \
            --data update=true \
            --data output_mode=json)" || die "could not reach $SPLUNK_MGMT_URL (curl failed; see message above)"

    case "$HTTP_CODE" in
        200|201) ;;
        *)
            BODY="$(head -c 1500 "$RESPONSE")"
            echo "Splunk responded HTTP $HTTP_CODE:" >&2
            echo "${BODY//"$SPLUNK_TOKEN"/[redacted]}" >&2
            echo "The package was left at $SPLUNK_SSH_TARGET:$REMOTE_PATH" >&2
            exit 1
            ;;
    esac
    echo "==> Installed $APP_ID (HTTP $HTTP_CODE)"

    ssh "$SPLUNK_SSH_TARGET" rm -f "$REMOTE_PATH" \
        || echo "warning: could not remove $SPLUNK_SSH_TARGET:$REMOTE_PATH" >&2
    fi
fi

# --- next steps ------------------------------------------------------------

if [ "$SSH_INSTALL" = 1 ]; then
    cat <<EOF

Next, in a browser:
  Refresh static assets:  $SPLUNK_URL/en-US/_bump  (then a hard refresh, Cmd+Shift+R)
$([ "$RESTART" = 1 ] || echo "Restart Splunk first (or run this script again with --restart): config changes and the app's files are read at startup.")
EOF
    exit 0
fi

cat <<EOF

Next, in a browser signed in to Splunk:
  Refresh static assets:  $SPLUNK_URL/en-US/_bump
  Reload config:          $SPLUNK_URL/en-US/debug/refresh
  Reload this app (REST, POST with your token):
                          $SPLUNK_MGMT_URL/services/apps/local/$APP_ID/_reload
Splunk may ask for a restart after an update (app.conf sets state_change_requires_restart).
EOF
