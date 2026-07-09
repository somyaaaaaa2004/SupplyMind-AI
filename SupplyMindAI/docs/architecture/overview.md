# Architecture Overview

## SupplyMind AI – System Architecture

---

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                          CLIENT TIER                                │
│                                                                     │
│   Browser / PWA          Mobile (future)        Admin Console       │
│   Next.js 15 App         React Native (Expo)    Internal Tools      │
└───────────────────────────────┬─────────────────────────────────────┘
                                │ HTTPS
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                          API GATEWAY TIER                           │
│                                                                     │
│   Nginx Reverse Proxy + TLS Termination                             │
│   Rate Limiting  │  CORS  │  Request ID  │  Access Logging         │
└───────────────────────────────┬─────────────────────────────────────┘
                                │
              ┌─────────────────┼──────────────────┐
              ▼                 ▼                  ▼
┌─────────────────┐  ┌──────────────────┐  ┌─────────────────┐
│  API Server     │  │  AI Microservices│  │  Static Assets  │
│  (Express/TS)   │  │  (Python/FastAPI)│  │  (CDN / S3)     │
│  Port 5000      │  │  Port 8000+      │  │                 │
└────────┬────────┘  └────────┬─────────┘  └─────────────────┘
         │                    │
         ▼                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                          DATA TIER                                  │
│                                                                     │
│   MongoDB Atlas          Redis Cluster         Object Storage       │
│   (Primary DB)           (Cache / Queue)       (S3 / GCS)          │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Request Flow

```
Browser → Nginx → Next.js  ─── server action / API route ──► Express API
                                                                   │
                                                          ┌────────┴────────┐
                                                          │ Middleware Stack │
                                                          │ • Auth (JWT)     │
                                                          │ • Rate Limit     │
                                                          │ • Validation     │
                                                          │ • Logging        │
                                                          └────────┬────────┘
                                                                   │
                                                          ┌────────┴────────┐
                                                          │ Controller      │
                                                          └────────┬────────┘
                                                                   │
                                                          ┌────────┴────────┐
                                                          │ Service Layer   │
                                                          └────────┬────────┘
                                                                   │
                                                          ┌────────┴────────┐
                                                          │ Repository      │
                                                          └────────┬────────┘
                                                                   │
                                                          ┌────────┴────────┐
                                                          │ MongoDB/Prisma  │
                                                          └─────────────────┘
```

---

## Security Architecture

| Layer | Control |
|-------|---------|
| Transport | TLS 1.3 everywhere (HTTPS + WSS) |
| Authentication | JWT (access + refresh tokens, httpOnly cookies) |
| Authorization | RBAC (role-based, route-level guards) |
| Input validation | Zod schemas on every request |
| Rate limiting | Global + per-endpoint limits |
| Headers | Helmet (CSP, HSTS, X-Frame-Options, etc.) |
| Data | MongoDB field-level encryption for PII (planned) |
| Audit | All mutations logged to AuditLog collection |

---

## Scalability Strategy

- **Horizontal scaling**: Stateless API servers behind a load balancer.
- **Cache-aside**: Redis caches hot queries (product lists, KPIs) with TTL.
- **Background jobs**: Celery (Python) / BullMQ (Node) for async tasks.
- **Database**: MongoDB Atlas auto-sharding for large collections.
- **AI workloads**: Separate Python microservice pool, independently scalable.

---

## Data Flow: Procurement Order

```
User creates PO (frontend)
  → POST /api/v1/procurement/purchase-orders
  → auth.middleware validates JWT
  → validate.middleware checks Zod schema
  → PurchaseOrderController.create()
  → PurchaseOrderService.create()
      ├─ Validate supplier exists
      ├─ Apply approval thresholds
      ├─ PurchaseOrderRepository.create() → MongoDB
      ├─ EmailService.sendPoNotification() → SMTP
      └─ AuditLogService.log("PO_CREATED")
  ← 201 Created { po }
  → React Query cache invalidated
  → UI updates optimistically
```
