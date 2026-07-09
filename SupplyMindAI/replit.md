# SupplyMind AI

AI-powered Procurement, Inventory, Logistics & Enterprise Intelligence Platform.

## Run & Operate

```bash
# Setup (first time)
bash SupplyMindAI/scripts/setup.sh

# Start backend (dev)
cd SupplyMindAI/backend && pnpm dev

# Start frontend (dev)
cd SupplyMindAI/frontend && pnpm dev

# Docker (MongoDB + Redis only)
cd SupplyMindAI/docker && docker-compose up -d mongodb redis

# Type-check frontend
cd SupplyMindAI/frontend && pnpm type-check

# Type-check backend
cd SupplyMindAI/backend && pnpm type-check

# Generate Prisma client
cd SupplyMindAI/backend && pnpm prisma:generate

# Push DB schema (dev only)
cd SupplyMindAI/backend && pnpm prisma:push
```

## Stack

### Frontend
- Next.js 15 (App Router), React 19, TypeScript 5
- TailwindCSS 4, Shadcn UI (in `components/ui/`)
- Framer Motion (animations)
- TanStack React Query v5 (data fetching)
- Axios (HTTP client with interceptor + auto-refresh)
- React Hook Form + Zod (forms & validation)
- Apache ECharts (charts)
- Mapbox GL JS (maps)
- Zustand (global state)

### Backend
- Node.js 20, Express 5, TypeScript 5
- MongoDB (via Mongoose connection + Prisma ODM for queries)
- JWT (access token 15m + refresh token 7d, httpOnly cookie)
- Redis (ioredis — ready, not yet wired to a store)
- Winston (logging), Morgan (HTTP logs)
- Zod validation middleware
- Helmet, CORS, express-rate-limit

### AI (future)
- Python 3.11+ / FastAPI microservices in `backend/ai/`

## Where things live

```
SupplyMindAI/
├── frontend/
│   ├── app/              Next.js App Router pages
│   ├── components/       Shared UI (ui/ = Shadcn, common/ = app-level)
│   ├── features/         Feature-sliced domains (auth, procurement, inventory, logistics, analytics, ai, settings)
│   ├── hooks/            Shared custom hooks
│   ├── layouts/          Sidebar, topbar layout shells
│   ├── services/         Axios API client + thin service wrappers
│   ├── store/            Zustand global slices
│   ├── types/            Shared TypeScript types
│   └── utils/            cn(), formatCurrency(), formatDate(), etc.
├── backend/
│   ├── src/
│   │   ├── app.ts         Express factory
│   │   ├── server.ts      Entry point + graceful shutdown
│   │   ├── config/        All env var access (never use process.env directly)
│   │   ├── middlewares/   auth, error, logger, rateLimiter, validate
│   │   ├── routes/v1/     API route registry
│   │   ├── controllers/   Thin request → service → response handlers
│   │   ├── services/      Business logic layer
│   │   ├── repositories/  Prisma data access layer
│   │   ├── models/        Prisma types / Mongoose schemas
│   │   ├── validators/    Zod request schemas
│   │   └── utils/         logger, ApiError, ApiResponse
│   ├── prisma/schema.prisma   Source of truth for DB schema
│   └── ai/                Empty Python AI microservices (future)
├── docs/                  Architecture, API reference, deployment, ADRs, CONTRIBUTING
├── docker/                docker-compose.yml, docker-compose.prod.yml, Dockerfiles
└── scripts/               setup.sh, seed.sh, deploy.sh
```

## Architecture decisions

- **Prisma over raw Mongoose**: Mongoose manages the runtime connection; Prisma Client handles all queries for type safety and migration tooling. Never write raw Mongoose queries in business code.
- **Feature-sliced frontend**: Each domain (`procurement`, `inventory`, etc.) is self-contained. Cross-feature communication goes through Zustand global store or URL state — never via direct sibling imports.
- **Stateless JWT auth**: 15-min access tokens in memory + 7-day refresh tokens in httpOnly cookie. No server-side session state — API is horizontally scalable.
- **Separate Python AI layer**: All AI/ML workloads live in `backend/ai/` as independent FastAPI microservices. The Node.js API proxies to them via `services/ai.service.ts`.
- **Contract-first**: All request validation uses Zod schemas in `validators/` applied via the `validate()` middleware before touching the controller.

## User preferences

_Populate as user instructions are given._

## Gotchas

- The `@/*` TypeScript path aliases in the frontend resolve to the **root-level** directories (e.g., `@/types` → `./types/`), NOT `./src/*`. Do not add a `src/` directory.
- Never read `process.env` directly in backend business code — use `config` from `src/config/index.ts`.
- The frontend middleware auth check is a **stub** — it always forces login. Implement real JWT verification with `jose` before shipping any protected route.
- `Shadcn UI` components in `components/ui/` are **generated** — never edit them manually; re-run `npx shadcn@latest add <component>`.
- Docker Compose dev setup does **not** mount a Mongo init script by default — uncomment the volume in `docker-compose.yml` if you add one.
