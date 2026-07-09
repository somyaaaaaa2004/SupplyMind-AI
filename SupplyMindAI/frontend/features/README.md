# features/

Feature-sliced architecture. Each subdirectory owns a bounded domain.

## Domains

| Folder         | Domain                              |
|----------------|-------------------------------------|
| `auth/`        | Login, register, password reset     |
| `procurement/` | Purchase orders, RFQs, suppliers    |
| `inventory/`   | Stock, warehouses, SKUs, alerts     |
| `logistics/`   | Shipments, tracking, routes, maps   |
| `analytics/`   | KPIs, reports, dashboards, exports  |
| `ai/`          | AI assistant, predictions, insights |
| `settings/`    | Org settings, users, roles, billing |

## Slice Structure (per feature)

```
features/<domain>/
├── components/    # Domain-specific UI components
├── hooks/         # Domain React Query hooks
├── services/      # API call functions (thin wrappers over @/services/api)
├── store/         # Local Zustand slice (if needed)
├── types/         # Domain-specific TypeScript types
├── utils/         # Domain-specific helpers
├── schemas/       # Zod validation schemas
└── index.ts       # Public barrel – only export what other features may use
```

## Rules

- Features may import from `components/`, `hooks/`, `utils/`, `types/`, `services/`.
- Features must **NOT** import from sibling features directly.
  Cross-feature communication goes through the global store or URL state.
- Only export from `index.ts` what is genuinely needed by other features.
