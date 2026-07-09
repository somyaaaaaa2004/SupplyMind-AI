# SupplyMind AI

> **AI-Powered Procurement, Inventory, Logistics & Enterprise Intelligence Platform**

---

## Overview

SupplyMind AI is an enterprise-grade SaaS platform that leverages artificial intelligence to streamline procurement workflows, optimize inventory management, enhance logistics operations, and deliver actionable enterprise intelligence at scale.

---

## Architecture

```
SupplyMindAI/
├── frontend/          # Next.js 15 + React + TypeScript client application
├── backend/           # Node.js + Express + TypeScript REST API server
│   └── ai/            # Python AI/ML microservices (future)
├── docs/              # Architecture, API, and deployment documentation
├── docker/            # Docker and Docker Compose configuration
└── scripts/           # CI/CD, database, and utility scripts
```

---

## Tech Stack

### Frontend
| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| UI Library | React 19 |
| Language | TypeScript 5 |
| Styling | TailwindCSS 4 + Shadcn UI |
| Animation | Framer Motion |
| Data Fetching | React Query (TanStack Query v5) |
| HTTP Client | Axios |
| Forms | React Hook Form + Zod |
| Charts | Apache ECharts |
| Maps | Mapbox GL JS |

### Backend
| Layer | Technology |
|-------|-----------|
| Runtime | Node.js 20 LTS |
| Framework | Express 5 |
| Language | TypeScript 5 |
| Database | MongoDB (via Prisma ODM) |
| Auth | JWT (access + refresh tokens) |
| Cache | Redis (session / rate limiting) |
| Validation | Zod |
| Logging | Winston |

### AI Services (future)
| Layer | Technology |
|-------|-----------|
| Runtime | Python 3.11+ |
| ML Framework | TBD (FastAPI + LangChain / LlamaIndex) |

---

## Getting Started

### Prerequisites
- Node.js >= 20.x
- pnpm >= 9.x (or npm / yarn)
- Docker & Docker Compose
- MongoDB (local or Atlas)
- Redis (local or cloud)

### 1. Clone the repository
```bash
git clone https://github.com/your-org/supplymind-ai.git
cd supplymind-ai/SupplyMindAI
```

### 2. Set up environment variables
```bash
cp frontend/.env.example frontend/.env.local
cp backend/.env.example backend/.env
```

### 3. Install dependencies
```bash
# Frontend
cd frontend && npm install

# Backend
cd ../backend && npm install
```

### 4. Start with Docker Compose (recommended)
```bash
cd ../docker
docker-compose up -d
```

### 5. Start in development mode
```bash
# Terminal 1 – Backend
cd backend && npm run dev

# Terminal 2 – Frontend
cd frontend && npm run dev
```

Frontend → http://localhost:3000  
Backend API → http://localhost:5000/api/v1  
API Docs → http://localhost:5000/api/v1/docs

---

## Documentation

- [Architecture Decision Records](./docs/architecture/)
- [API Reference](./docs/api/)
- [Deployment Guide](./docs/deployment/)
- [Contributing Guide](./docs/CONTRIBUTING.md)

---

## License

Proprietary — All rights reserved © SupplyMind AI
