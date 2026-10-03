#!/bin/bash
# Cron-driven self-deploy for the static site (same pattern as Stockidence).
#
# Every 5 minutes cron runs this script, which fast-forwards to origin/main
# and rebuilds only when the deployed commit actually moved. The new image is
# built before the old container stops, so a failed build never takes the
# site down, and a failed health check rolls back to the previous image.
#
# Install: (crontab -l 2>/dev/null; echo "*/5 * * * * $HOME/personal-website/scripts/auto-deploy.sh >> $HOME/personal-website/auto-deploy.log 2>&1") | crontab -
#
# TLS: Caddy keeps its certificates in the caddy_data / caddy_config volumes,
# so recreating the container reuses them instead of re-issuing a cert on
# every deploy (Let's Encrypt allows 5 duplicate certs per week).
set -euo pipefail

REPO_DIR="${REPO_DIR:-$HOME/personal-website}"
LOG="$REPO_DIR/auto-deploy.log"
DOCKER="${DOCKER:-/usr/bin/docker}"
DOMAIN="${DOMAIN:-portfolio.stockidence.com}"
NAME=personal-site
IMAGE=personal-site

log() { echo "[$(date -u +%FT%TZ)] $*" >> "$LOG"; }

if [ -z "${DEPLOY_REMOTE:-}" ]; then
    # Skip (quietly) if a previous run is still building.
    exec 9>/tmp/personal-site-deploy.lock
    flock -n 9 || exit 0

    cd "$REPO_DIR"
    git fetch -q origin
    LOCAL=$(git rev-parse HEAD)
    REMOTE=$(git rev-parse origin/main)
    if [ "$LOCAL" = "$REMOTE" ]; then
        exit 0
    fi

    log "deploying $REMOTE (was $LOCAL)"
    git reset -q --hard origin/main
    # Bash keeps reading the copy of this script it opened, so without this
    # an edit to the deploy steps below would only apply one deploy late.
    # Re-exec the fresh checkout; it inherits fd 9, so the lock stays held.
    DEPLOY_REMOTE="$REMOTE" exec /bin/bash "$REPO_DIR/scripts/auto-deploy.sh"
fi

# Second pass (fresh script): build, swap containers and health-check.
REMOTE="$DEPLOY_REMOTE"
cd "$REPO_DIR"

run_container() {
    "$DOCKER" rm -f "$NAME" >/dev/null 2>&1 || true
    "$DOCKER" run -d --restart unless-stopped --name "$NAME" \
        -p 80:80 -p 443:443 -e DOMAIN="$DOMAIN" \
        -v caddy_data:/data -v caddy_config:/config \
        "$1" >>"$LOG" 2>&1
}

# Probe the real hostname over TLS, pinned to this box, so the check covers
# the certificate and Caddy's site block rather than just an open port.
healthy() {
    for _ in $(seq 1 12); do
        if curl -fsS -o /dev/null --max-time 10 \
            --resolve "$DOMAIN:443:127.0.0.1" "https://$DOMAIN/"; then
            return 0
        fi
        sleep 5
    done
    return 1
}

# Keep the running image as :previous so a bad deploy can roll back.
"$DOCKER" image tag "$IMAGE:latest" "$IMAGE:previous" 2>/dev/null || true

if ! "$DOCKER" build -t "$IMAGE:latest" . >>"$LOG" 2>&1; then
    log "BUILD FAILED for $REMOTE (old container still serving)"
    exit 1
fi

run_container "$IMAGE:latest"
if healthy; then
    log "deploy ok"
    "$DOCKER" image prune -f >/dev/null 2>&1 || true
elif "$DOCKER" image inspect "$IMAGE:previous" >/dev/null 2>&1; then
    log "HEALTH CHECK FAILED after deploy to $REMOTE; rolling back"
    run_container "$IMAGE:previous"
    if healthy; then log "rollback ok"; else log "ROLLBACK ALSO UNHEALTHY"; fi
    exit 1
else
    log "HEALTH CHECK FAILED after deploy to $REMOTE (no previous image)"
    exit 1
fi
