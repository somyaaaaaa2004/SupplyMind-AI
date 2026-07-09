# API Reference

## Base URL

| Environment | URL |
|-------------|-----|
| Development | `http://localhost:5000/api/v1` |
| Staging | `https://api-staging.supplymind.ai/api/v1` |
| Production | `https://api.supplymind.ai/api/v1` |

## Authentication

All protected routes require a valid JWT access token in the `Authorization` header:

```
Authorization: Bearer <access_token>
```

Access tokens expire in **15 minutes**. Use the refresh endpoint to obtain new tokens:

```
POST /api/v1/auth/refresh
Cookie: supplymind_refresh_token=<refresh_token>
```

---

## Response Format

All responses follow a consistent envelope:

### Success (2xx)
```json
{
  "success": true,
  "message": "Human-readable message",
  "data": { ... },
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

### Error (4xx / 5xx)
```json
{
  "success": false,
  "message": "Human-readable error message",
  "errorCode": "MACHINE_READABLE_CODE",
  "errors": {
    "email": ["Email is required", "Must be a valid email address"],
    "password": ["Must be at least 8 characters"]
  }
}
```

---

## Error Codes

| Code | HTTP | Meaning |
|------|------|---------|
| `BAD_REQUEST` | 400 | Malformed request body or params |
| `UNAUTHORIZED` | 401 | Missing or invalid access token |
| `FORBIDDEN` | 403 | Authenticated but insufficient permissions |
| `NOT_FOUND` | 404 | Resource or route not found |
| `CONFLICT` | 409 | Unique constraint violation |
| `VALIDATION_ERROR` | 422 | Zod schema validation failed |
| `TOO_MANY_REQUESTS` | 429 | Rate limit exceeded |
| `INTERNAL_ERROR` | 500 | Unexpected server error |

---

## Endpoints Overview

### Auth
| Method | Path | Description | Auth |
|--------|------|-------------|------|
| POST | `/auth/register` | Create new organization + admin user | Public |
| POST | `/auth/login` | Obtain access + refresh tokens | Public |
| POST | `/auth/logout` | Revoke refresh token | Protected |
| POST | `/auth/refresh` | Rotate access + refresh tokens | Cookie |
| GET | `/auth/me` | Get current user profile | Protected |
| POST | `/auth/forgot-password` | Send password reset email | Public |
| POST | `/auth/reset-password` | Reset password with token | Public |

### Procurement
| Method | Path | Description | Auth |
|--------|------|-------------|------|
| GET | `/procurement/purchase-orders` | List POs (paginated, filterable) | Protected |
| POST | `/procurement/purchase-orders` | Create purchase order | Protected |
| GET | `/procurement/purchase-orders/:id` | Get PO detail | Protected |
| PATCH | `/procurement/purchase-orders/:id` | Update PO | Protected |
| DELETE | `/procurement/purchase-orders/:id` | Cancel / soft-delete PO | Protected |
| GET | `/procurement/suppliers` | List suppliers | Protected |
| POST | `/procurement/suppliers` | Create supplier | Protected |

### Inventory
| Method | Path | Description | Auth |
|--------|------|-------------|------|
| GET | `/inventory/items` | List inventory items | Protected |
| POST | `/inventory/items` | Create item | Protected |
| GET | `/inventory/items/:id` | Get item detail | Protected |
| GET | `/inventory/warehouses` | List warehouses | Protected |
| POST | `/inventory/warehouses` | Create warehouse | Protected |

### Logistics
| Method | Path | Description | Auth |
|--------|------|-------------|------|
| GET | `/logistics/shipments` | List shipments | Protected |
| POST | `/logistics/shipments` | Create shipment | Protected |
| GET | `/logistics/shipments/:id` | Get shipment + tracking | Protected |
| PATCH | `/logistics/shipments/:id/status` | Update shipment status | Protected |

### Analytics
| Method | Path | Description | Auth |
|--------|------|-------------|------|
| GET | `/analytics/kpis` | Dashboard KPI summary | Protected |
| GET | `/analytics/spend` | Spend analysis by period/category | Protected |
| GET | `/analytics/supplier-scorecard` | Supplier performance metrics | Protected |

### AI
| Method | Path | Description | Auth |
|--------|------|-------------|------|
| POST | `/ai/chat` | AI assistant message | Protected |
| GET | `/ai/forecast/:itemId` | Demand forecast for SKU | Protected |
| GET | `/ai/insights` | AI-generated procurement insights | Protected |

---

## Pagination Query Parameters

All list endpoints accept:

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `page` | integer | 1 | Page number (1-indexed) |
| `limit` | integer | 20 | Items per page (max 100) |
| `sort` | string | `createdAt` | Field to sort by |
| `order` | `asc` \| `desc` | `desc` | Sort direction |
| `search` | string | — | Full-text search term |
