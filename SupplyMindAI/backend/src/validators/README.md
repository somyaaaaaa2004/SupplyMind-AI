# validators/

Zod schemas for request body, params, and query validation.

## Rules

- Each validator file corresponds to one domain.
- Export named schemas: `create<Entity>Schema`, `update<Entity>Schema`, `list<Entity>Schema`.
- Use the `validate()` middleware from `@/middlewares/validate.middleware.ts` to apply schemas.
- Validators define the **API contract** — keep them strict (`z.object({}).strict()`).

## Naming Convention

```
validators/
├── auth.validator.ts
├── purchaseOrder.validator.ts
├── supplier.validator.ts
├── inventoryItem.validator.ts
├── warehouse.validator.ts
├── shipment.validator.ts
├── analytics.validator.ts
└── common.validator.ts      # Shared schemas (pagination, id param, date range)
```

## Example

```typescript
// validators/common.validator.ts
import { z } from "zod";

export const paginationSchema = z.object({
  page:  z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  sort:  z.string().optional().default("createdAt"),
  order: z.enum(["asc", "desc"]).optional().default("desc"),
  search: z.string().trim().optional(),
});

export const idParamSchema = z.object({
  id: z.string().min(1, "ID is required"),
});
```
