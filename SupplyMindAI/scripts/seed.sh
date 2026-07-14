#!/usr/bin/env bash
# SupplyMind AI – Database Seed Script
# Runs the TypeScript seed file via tsx.
# Usage: bash scripts/seed.sh [--prod]

set -euo pipefail

GREEN="\033[0;32m"
YELLOW="\033[0;33m"
RED="\033[0;31m"
RESET="\033[0m"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$(dirname "$SCRIPT_DIR")/backend"

# Safety guard for production
if [[ "${1:-}" == "--prod" ]]; then
  echo -e "${RED}⚠ You are about to seed the PRODUCTION database.${RESET}"
  read -rp "Type 'yes I am sure' to continue: " confirm
  if [[ "$confirm" != "yes I am sure" ]]; then
    echo "Aborted."
    exit 1
  fi
  export NODE_ENV=production
else
  export NODE_ENV=development
fi

echo -e "${YELLOW}▶ Running database seed (${NODE_ENV})…${RESET}"
cd "$BACKEND_DIR"
pnpm exec tsx src/database/seed.ts
echo -e "${GREEN}✔ Seed complete.${RESET}"
