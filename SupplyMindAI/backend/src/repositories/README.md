# repositories/

Data access layer. Each repository wraps Prisma (or Mongoose) for one collection.

## Rules

- Repositories are the **only layer** that calls Prisma / Mongoose directly.
- Repositories must NOT contain business logic — only query construction.
- All query methods must be typed with explicit input DTOs and return types.
- Expose a `BaseRepository<T>` abstract class with standard CRUD:
  `findById`, `findAll`, `create`, `update`, `delete`, `softDelete`, `count`.

## Naming Convention

```
repositories/
├── base.repository.ts          # Abstract CRUD base
├── user.repository.ts
├── organization.repository.ts
├── purchaseOrder.repository.ts
├── supplier.repository.ts
├── inventoryItem.repository.ts
├── warehouse.repository.ts
├── shipment.repository.ts
├── contract.repository.ts
└── auditLog.repository.ts
```

## Pattern

```typescript
export class PurchaseOrderRepository extends BaseRepository<PurchaseOrder> {
  async findByOrganization(
    orgId: string,
    filters: PoFilterDto,
  ): Promise<PaginatedResult<PurchaseOrder>> {
    return prisma.purchaseOrder.findMany({
      where: { organizationId: orgId, ...buildFilters(filters) },
      orderBy: { [filters.sort]: filters.order },
      skip: (filters.page - 1) * filters.limit,
      take: filters.limit,
    });
  }
}
```
