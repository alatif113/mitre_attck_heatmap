#!/usr/bin/env bash
#
# Build the visualization and package the app as <app_id>.tgz.
#
#   scripts/package.sh
#
# Steps: npm ci -> npm run build -> verify visualization.js is fresh -> tar.
# The archive is written to the app root and contains a single top-level
# <app_id>/ directory, as Splunk expects. node_modules, tests and local/ are
# left out, along with bin/enterpriseAttack2json.py (the offline converter is a
# development tool that writes into the app, which Splunk Cloud vetting flags;
# the scripted input bin/import_matrices.py and its package ship),
# this scripts/ directory and hidden files (.git,
# .gitignore, .slimignore, .env, .DS_Store), which AppInspect rejects.
# iCloud conflict copies such as "visualization 2.js" are skipped too.
#
# APP_ENV selects what goes into the package:
#   production (default)  app hidden (is_visible = 0); test-only files left out (the test bench,
#                         the sample dashboards, their nav)
#   test                  app visible (is_visible = 1), a new build number each time (so
#                         browsers load the new visualization.js), and a nav that opens the
#                         test bench dashboard, so it can be reached in Splunk
# The flag is rewritten in the staged copy only; default/app.conf in the repo
# is not touched.
#
# BUILD_CMD overrides the build step (default: "npm run build", which runs
# webpack with system Node; "npm run build:splunk" uses Splunk's bundled Node).

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
APP_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
VIZ_DIR="$APP_ROOT/appserver/static/visualizations/mitre_attck_heatmap"
BUILD_CMD="${BUILD_CMD:-npm run build}"

die() {
    echo "error: $*" >&2
    exit 1
}

# App id from [package] id in default/app.conf.
APP_ID="$(awk -F'[[:space:]]*=[[:space:]]*' '
    /^\[/ { in_package = ($0 == "[package]") }
    in_package && $1 == "id" { print $2; exit }
' "$APP_ROOT/default/app.conf" | tr -d '[:space:]')"
[ -n "$APP_ID" ] || die "no [package] id found in default/app.conf"

ARCHIVE="$APP_ROOT/$APP_ID.tgz"

APP_ENV="${APP_ENV:-production}"
case "$APP_ENV" in
    test) IS_VISIBLE=1; ENV_EXCLUDES=() ;;
    production)
        IS_VISIBLE=0
        # Test-only files: the test bench and the two sample dashboards (classic and Dashboard Studio),
        # the test bench's lookup, and the nav that opens them.
        ENV_EXCLUDES=(
            --exclude='/default/data/ui/views/mitre_heatmap_testbench.xml'
            --exclude='/default/data/ui/views/mitre_heatmap_classic.xml'
            --exclude='/default/data/ui/views/mitre_heatmap_studio.xml'
            --exclude='/default/data/ui/nav/default.xml'
            --exclude='/lookups/mitre_heatmap_test.csv'
        )
        ;;
    *) die "APP_ENV must be 'test' or 'production' (got '$APP_ENV')" ;;
esac

echo "==> Installing dependencies (npm ci)"
(cd "$VIZ_DIR" && npm ci)

echo "==> Building ($BUILD_CMD)"
(cd "$VIZ_DIR" && bash -c "$BUILD_CMD")

echo "==> Verifying build output"
BUNDLE="$VIZ_DIR/visualization.js"
[ -f "$BUNDLE" ] || die "$BUNDLE was not produced"
[ -s "$BUNDLE" ] || die "$BUNDLE is empty"
[ -d "$VIZ_DIR/src" ] || die "$VIZ_DIR/src does not exist"
# visualization.js is built from src/, so no file in src/ may be newer.
STALE="$(find "$VIZ_DIR/src" -type f -newer "$BUNDLE" | head -n 5)"
if [ -n "$STALE" ]; then
    echo "$STALE" >&2
    die "visualization.js is older than the files in src/ listed above; the build did not regenerate it"
fi

echo "==> Creating $ARCHIVE (APP_ENV=$APP_ENV)"
rm -f "$ARCHIVE"
STAGE="$(mktemp -d)"
trap 'rm -rf "$STAGE"' EXIT
mkdir "$STAGE/$APP_ID"
rsync -am \
    ${ENV_EXCLUDES[@]+"${ENV_EXCLUDES[@]}"} \
    --exclude='node_modules' \
    --exclude='test' \
    --exclude='tests' \
    --exclude='/local/' \
    --exclude='/bin/enterpriseAttack2json.py' \
    --exclude='__pycache__' \
    --exclude='*.pyc' \
    --exclude='/scripts/' \
    --exclude='/static/screenshot.PNG' \
    --exclude='/*.tgz' \
    --exclude='.git' \
    --exclude='.env' \
    --exclude='.gitignore' \
    --exclude='.slimignore' \
    --exclude='.DS_Store' \
    --exclude='* [0-9]' \
    --exclude='* [0-9].*' \
    "$APP_ROOT/" "$STAGE/$APP_ID/"

# Set the app's visibility in the staged app.conf.
STAGED_CONF="$STAGE/$APP_ID/default/app.conf"
[ "$(grep -cE '^is_visible[[:space:]]*=' "$STAGED_CONF")" = 1 ] || die "expected exactly one is_visible line in default/app.conf"
sed -E "s/^is_visible[[:space:]]*=.*$/is_visible = $IS_VISIBLE/" "$STAGED_CONF" > "$STAGED_CONF.tmp"
mv "$STAGED_CONF.tmp" "$STAGED_CONF"

# A test package gets a new build number each time. Splunk Web puts the build number in the URL of
# the app's static files (visualization.js, visualization.css), so with an unchanged number browsers
# keep showing the old files after an install. default/app.conf in the repo is not touched.
if [ "$APP_ENV" = test ]; then
    [ "$(grep -cE '^build[[:space:]]*=' "$STAGED_CONF")" = 1 ] || die "expected exactly one build line in default/app.conf"
    BUILD_STAMP="$(date +%s)"
    sed -E "s/^build[[:space:]]*=.*$/build = $BUILD_STAMP/" "$STAGED_CONF" > "$STAGED_CONF.tmp"
    mv "$STAGED_CONF.tmp" "$STAGED_CONF"
fi

tar -czf "$ARCHIVE" -C "$STAGE" "$APP_ID"

echo "==> Checking archive"
LISTING="$(tar -tzf "$ARCHIVE")"
if echo "$LISTING" | grep -Eq '(^|/)(node_modules|test|tests)(/|$)|^[^/]+/local(/|$)|enterpriseAttack2json|__pycache__|\.pyc$|(^|/)\.env$'; then
    die "archive contains excluded paths"
fi
ARCHIVED_VISIBLE="$(tar -xzOf "$ARCHIVE" "$APP_ID/default/app.conf" | sed -nE 's/^is_visible[[:space:]]*=[[:space:]]*([01]).*/\1/p')"
[ "$ARCHIVED_VISIBLE" = "$IS_VISIBLE" ] || die "archived app.conf has is_visible=$ARCHIVED_VISIBLE, expected $IS_VISIBLE"
if [ "$APP_ENV" = test ]; then
    ARCHIVED_BUILD="$(tar -xzOf "$ARCHIVE" "$APP_ID/default/app.conf" | sed -nE 's/^build[[:space:]]*=[[:space:]]*([0-9]+).*/\1/p')"
    [ "$ARCHIVED_BUILD" = "$BUILD_STAMP" ] || die "archived app.conf has build=$ARCHIVED_BUILD, expected $BUILD_STAMP"
fi
if [ "$APP_ENV" = production ] && echo "$LISTING" | grep -Eq 'mitre_heatmap_(test|classic|studio)|/nav/'; then
    die "production archive contains test-only files"
fi
if [ "$APP_ENV" = test ]; then
    echo "$LISTING" | grep -qx "$APP_ID/default/data/ui/nav/default.xml" || die "test archive is missing the nav"
fi
for required in "$APP_ID/bin/import_matrices.py" "$APP_ID/bin/mitre_attck/__init__.py" "$APP_ID/default/inputs.conf" "$APP_ID/default/app.conf" "$APP_ID/appserver/static/visualizations/mitre_attck_heatmap/visualization.js"; do
    echo "$LISTING" | grep -qx "$required" || die "archive is missing $required"
done

echo "OK ($APP_ENV, is_visible=$IS_VISIBLE): $ARCHIVE ($(echo "$LISTING" | grep -vc '/$') files, $(du -h "$ARCHIVE" | cut -f1))"
