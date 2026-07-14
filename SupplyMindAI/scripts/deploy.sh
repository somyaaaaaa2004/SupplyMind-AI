#!/usr/bin/env bash
# SupplyMind AI – Production Deployment Script
# Builds Docker images, tags them, pushes to registry, and deploys via SSH.
# Usage: bash scripts/deploy.sh <environment> <git-sha>

set -euo pipefail

BOLD="\033[1m"
GREEN="\033[0;32m"
YELLOW="\033[0;33m"
RED="\033[0;31m"
RESET="\033[0m"

log()   { echo -e "${GREEN}▶ $*${RESET}"; }
warn()  { echo -e "${YELLOW}⚠ $*${RESET}"; }
error() { echo -e "${RED}✖ $*${RESET}"; exit 1; }
title() { echo -e "\n${BOLD}=== $* ===${RESET}\n"; }

ENVIRONMENT="${1:-staging}"
GIT_SHA="${2:-$(git rev-parse --short HEAD)}"
REGISTRY="${DOCKER_REGISTRY:-ghcr.io/your-org}"
IMAGE_TAG="${GIT_SHA}"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"

# ── Validate environment ──────────────────────────────────────────────────────

if [[ "$ENVIRONMENT" != "staging" && "$ENVIRONMENT" != "production" ]]; then
  error "Environment must be 'staging' or 'production' (got: $ENVIRONMENT)"
fi

title "Deploying SupplyMind AI"
log "Environment: ${ENVIRONMENT}"
log "Image tag:   ${IMAGE_TAG}"
log "Registry:    ${REGISTRY}"

# ── Type-check ────────────────────────────────────────────────────────────────

title "Running type-checks"
cd "$ROOT_DIR/frontend" && pnpm type-check
cd "$ROOT_DIR/backend"  && pnpm type-check
log "Type-checks passed"

# ── Build Docker images ───────────────────────────────────────────────────────

title "Building Docker images"
cd "$ROOT_DIR/docker"

docker build \
  -f Dockerfile.backend \
  --target production \
  -t "${REGISTRY}/supplymind-api:${IMAGE_TAG}" \
  -t "${REGISTRY}/supplymind-api:latest" \
  ../backend

docker build \
  -f Dockerfile.frontend \
  --target production \
  --build-arg NEXT_PUBLIC_API_URL="${NEXT_PUBLIC_API_URL:-}" \
  -t "${REGISTRY}/supplymind-frontend:${IMAGE_TAG}" \
  -t "${REGISTRY}/supplymind-frontend:latest" \
  ../frontend

log "Docker images built"

# ── Push to registry ──────────────────────────────────────────────────────────

title "Pushing images to registry"
docker push "${REGISTRY}/supplymind-api:${IMAGE_TAG}"
docker push "${REGISTRY}/supplymind-api:latest"
docker push "${REGISTRY}/supplymind-frontend:${IMAGE_TAG}"
docker push "${REGISTRY}/supplymind-frontend:latest"
log "Images pushed"

# ── Deploy via SSH ────────────────────────────────────────────────────────────

DEPLOY_HOST="${DEPLOY_HOST:-deploy@your-server.com}"
DEPLOY_PATH="${DEPLOY_PATH:-/opt/supplymind}"

if [[ -z "${DEPLOY_HOST:-}" ]]; then
  warn "DEPLOY_HOST not set – skipping remote deployment"
  exit 0
fi

title "Deploying to ${ENVIRONMENT} (${DEPLOY_HOST})"

# shellcheck disable=SC2087
ssh "$DEPLOY_HOST" <<EOF
  set -e
  cd "${DEPLOY_PATH}"
  export IMAGE_TAG="${IMAGE_TAG}"
  docker compose -f docker/docker-compose.prod.yml pull
  docker compose -f docker/docker-compose.prod.yml up -d --no-build
  docker compose -f docker/docker-compose.prod.yml exec -T api pnpm prisma db push
  echo "✔ Deployment complete"
EOF

log "Deployment to ${ENVIRONMENT} complete ✓"
