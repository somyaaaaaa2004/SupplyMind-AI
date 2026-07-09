# Deployment Guide

## Overview

SupplyMind AI supports three deployment targets:

| Target | Recommended for |
|--------|----------------|
| Docker Compose | Staging, self-hosted production |
| Kubernetes (Helm) | Enterprise production (planned) |
| PaaS | Vercel (frontend) + Railway/Render (API) — quick setup |

---

## Prerequisites

- Docker >= 24.x + Docker Compose >= 2.x
- A MongoDB Atlas cluster (or managed MongoDB)
- A Redis instance (Redis Cloud, Upstash, or self-hosted)
- A domain and TLS certificate (Let's Encrypt via Certbot)

---

## Quick Start (Docker Compose)

### 1. Clone and configure

```bash
git clone https://github.com/your-org/supplymind-ai.git
cd supplymind-ai/SupplyMindAI/docker
cp .env.example .env
# Edit .env with your real values
```

### 2. Generate strong secrets

```bash
# Generate JWT secrets
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 3. Build and start

```bash
docker-compose -f docker-compose.prod.yml build
docker-compose -f docker-compose.prod.yml up -d
```

### 4. Run database migrations

```bash
docker-compose exec api pnpm prisma db push
```

### 5. Verify

```bash
curl https://api.yourdomain.com/health
# → { "status": "ok", "timestamp": "..." }
```

---

## Environment Checklist

Before going live, verify:

- [ ] `JWT_ACCESS_SECRET` is a 64-char random hex string
- [ ] `JWT_REFRESH_SECRET` is a different 64-char random hex string
- [ ] `MONGODB_URI` points to production Atlas cluster with IP allowlist
- [ ] `REDIS_URL` points to production Redis with TLS
- [ ] `CLIENT_URL` and `ALLOWED_ORIGINS` are set to production domain
- [ ] `NODE_ENV=production`
- [ ] `NEXT_TELEMETRY_DISABLED=1`
- [ ] All SMTP credentials are set for transactional email
- [ ] Nginx TLS certificate is installed and auto-renewed

---

## CI/CD Pipeline (recommended)

```yaml
# GitHub Actions skeleton
on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    steps:
      - uses: actions/checkout@v4
      - name: Run type-check
        run: pnpm typecheck
      - name: Build Docker images
        run: docker-compose -f docker/docker-compose.prod.yml build
      - name: Push to registry
        run: docker push your-registry/supplymind-api:${{ github.sha }}
      - name: Deploy
        run: ssh deploy@server "cd /app && docker-compose pull && docker-compose up -d"
```

---

## Rollback

```bash
# Roll back to previous image tag
IMAGE_TAG=<previous-sha> docker-compose -f docker-compose.prod.yml up -d
```

---

## Monitoring (recommended stack)

| Tool | Purpose |
|------|---------|
| Prometheus + Grafana | Metrics and dashboards |
| Loki | Log aggregation |
| Sentry | Error tracking (frontend + backend) |
| UptimeRobot | External uptime monitoring |
