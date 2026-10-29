#!/usr/bin/env bash
#
# Package the app and install it on the dev Splunk instance.
#
#   scripts/deploy_dev.sh [--skip-package] [--dry-run]
#
# Splunk's apps/local endpoint cannot take the package in the request body; it
# installs from a path that already exists on the server. So this script
#   1. runs scripts/package.sh with APP_ENV=test unless APP_ENV is set, so the
#      app is visible and has a nav to the test bench (skipped with --skip-package)
#   2. copies <app_id>.tgz to the Splunk host with scp
#   3. POSTs apps/local on the management port with the token, naming that path
#      (filename=true, update=true)
#   4. removes the copied file, and prints the URLs to refresh static assets
#      and reload config.
#
# Settings come from .env in the app root (created from a template on first
# run) or from the environment, which takes precedence:
#   SPLUNK_TOKEN        authentication token (Settings > Tokens). Required.
#   SPLUNK_SSH_TARGET   user@host that scp/ssh can reach, e.g. me@splunk.home.
#                       Required. The remote user needs write access to
#                       SPLUNK_REMOTE_DIR, and the Splunk service user must be
#                       able to read the copied file.
#   SPLUNK_REMOTE_DIR   directory on the host for the copy. Default: /tmp
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
for arg in "$@"; do
    case "$arg" in
        --skip-package) SKIP_PACKAGE=1 ;;
        --dry-run) DRY_RUN=1 ;;
        -h|--help) sed -n '3,35p' "${BASH_SOURCE[0]}" | sed 's/^# \{0,1\}//'; exit 0 ;;
        *) echo "error: unknown argument: $arg" >&2; exit 2 ;;
    esac
done

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
        SPLUNK_TOKEN=*|SPLUNK_SSH_TARGET=*|SPLUNK_REMOTE_DIR=*|SPLUNK_URL=*|SPLUNK_MGMT_URL=*|SPLUNK_CA_CERT=*|SPLUNK_VERIFY_TLS=*)
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
SPLUNK_TOKEN="${SPLUNK_TOKEN:-}"
SPLUNK_SSH_TARGET="${SPLUNK_SSH_TARGET:-}"
SPLUNK_CA_CERT="${SPLUNK_CA_CERT:-}"
SPLUNK_VERIFY_TLS="${SPLUNK_VERIFY_TLS:-}"

APP_ID="$(awk -F'[[:space:]]*=[[:space:]]*' '
    /^\[/ { in_package = ($0 == "[package]") }
    in_package && $1 == "id" { print $2; exit }
' "$APP_ROOT/default/app.conf" | tr -d '[:space:]')"
[ -n "$APP_ID" ] || die "no [package] id found in default/app.conf"

ARCHIVE="$APP_ROOT/$APP_ID.tgz"
REMOTE_PATH="$SPLUNK_REMOTE_DIR/$APP_ID.tgz"

[ -n "$SPLUNK_SSH_TARGET" ] || die "SPLUNK_SSH_TARGET is not set (user@host for scp); see $ENV_FILE"
[[ "$SPLUNK_SSH_TARGET" =~ ^[A-Za-z0-9._-]+@[A-Za-z0-9._-]+$|^[A-Za-z0-9._-]+$ ]] \
    || die "SPLUNK_SSH_TARGET must look like user@host"
[[ "$SPLUNK_REMOTE_DIR" =~ ^/[A-Za-z0-9._/-]*$ ]] || die "SPLUNK_REMOTE_DIR must be an absolute path without spaces"

# The token is sent in a header, so only send it over TLS (or to this machine).
case "$SPLUNK_MGMT_URL" in
    https://*|http://localhost|http://localhost:*|http://127.0.0.1|http://127.0.0.1:*) ;;
    *) die "SPLUNK_MGMT_URL must be https:// (got $SPLUNK_MGMT_URL)" ;;
esac

if [ "$DRY_RUN" = 0 ]; then
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
    echo "==> Dry run: would POST $SPLUNK_MGMT_URL/services/apps/local (name=$REMOTE_PATH filename=true update=true)"
else
    # --- copy --------------------------------------------------------------

    echo "==> Copying package to $SPLUNK_SSH_TARGET:$REMOTE_PATH"
    scp -q "$ARCHIVE" "$SPLUNK_SSH_TARGET:$REMOTE_PATH"

    # --- install -----------------------------------------------------------

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

# --- next steps ------------------------------------------------------------

cat <<EOF

Next, in a browser signed in to Splunk:
  Refresh static assets:  $SPLUNK_URL/en-US/_bump
  Reload config:          $SPLUNK_URL/en-US/debug/refresh
  Reload this app (REST, POST with your token):
                          $SPLUNK_MGMT_URL/services/apps/local/$APP_ID/_reload
Splunk may ask for a restart after an update (app.conf sets state_change_requires_restart).
EOF
