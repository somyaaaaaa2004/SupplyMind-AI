#!/usr/bin/env bash
# SupplyMind AI – Local Development Setup Script
# Usage: bash scripts/setup.sh

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

# ── Check prerequisites ───────────────────────────────────────────────────────

title "Checking prerequisites"

command -v node  >/dev/null 2>&1 || error "Node.js >= 20 is required"
command -v pnpm  >/dev/null 2>&1 || error "pnpm is required (npm install -g pnpm)"
command -v docker>/dev/null 2>&1 || warn  "Docker not found – skipping container setup"

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 20 ]; then
  error "Node.js 20+ required (found v${NODE_VERSION})"
fi

log "Node.js: $(node -v)"
log "pnpm:    $(pnpm -v)"

# ── Copy environment files ────────────────────────────────────────────────────

title "Setting up environment files"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"

copy_env() {
  local src="$1" dst="$2"
  if [ -f "$dst" ]; then
    warn "$(basename "$dst") already exists – skipping"
  else
    cp "$src" "$dst"
    log "Created $dst"
  fi
}

copy_env "$ROOT_DIR/frontend/.env.example" "$ROOT_DIR/frontend/.env.local"
copy_env "$ROOT_DIR/backend/.env.example"  "$ROOT_DIR/backend/.env"
copy_env "$ROOT_DIR/docker/.env.example"   "$ROOT_DIR/docker/.env"

# ── Install dependencies ──────────────────────────────────────────────────────

title "Installing frontend dependencies"
cd "$ROOT_DIR/frontend" && pnpm install

title "Installing backend dependencies"
cd "$ROOT_DIR/backend" && pnpm install

# ── Prisma generate ───────────────────────────────────────────────────────────

title "Generating Prisma client"
cd "$ROOT_DIR/backend"
pnpm prisma generate
log "Prisma client generated"

# ── Start Docker services ─────────────────────────────────────────────────────

if command -v docker &>/dev/null; then
  title "Starting Docker services (MongoDB + Redis)"
  cd "$ROOT_DIR/docker"
  docker compose up -d mongodb redis
  log "MongoDB and Redis started"
  echo ""
  warn "Waiting 5s for MongoDB to be ready…"
  sleep 5

  title "Pushing database schema"
  cd "$ROOT_DIR/backend"
  pnpm prisma db push
  log "Database schema applied"
fi

# ── Done ──────────────────────────────────────────────────────────────────────

title "Setup complete!"
echo -e "${GREEN}"
echo "  Start backend:  cd backend && pnpm dev"
echo "  Start frontend: cd frontend && pnpm dev"
echo ""
echo "  Frontend → http://localhost:3000"
echo "  Backend  → http://localhost:5000/api/v1"
echo -e "${RESET}"
