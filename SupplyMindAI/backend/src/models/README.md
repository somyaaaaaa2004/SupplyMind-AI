# models/

Mongoose schemas and Prisma model definitions.

## Approach

This project uses **Prisma as the ODM** on top of MongoDB, with optional raw Mongoose
schemas for complex schema validation or middleware hooks.

## Naming Convention

Each file exports a single document interface and the corresponding Mongoose model or Prisma type:

```
models/
├── User.model.ts
├── Organization.model.ts
├── PurchaseOrder.model.ts
├── Supplier.model.ts
├── InventoryItem.model.ts
├── Warehouse.model.ts
├── Shipment.model.ts
├── Contract.model.ts
└── AuditLog.model.ts
```

## Prisma vs Mongoose

| Use Prisma | Use Mongoose |
|-----------|-------------|
| Standard CRUD | Complex schema validation hooks |
| Relations & joins | Pre/post save hooks |
| Type-safe queries | Virtual fields |
| Migrations | Full-text search plugins |

## Rules

- Models must NOT contain business logic — use services.
- Timestamps (`createdAt`, `updatedAt`) are always required.
- Soft deletes via `deletedAt?: Date` — never hard delete user-facing data.
- All IDs are MongoDB ObjectId strings.
