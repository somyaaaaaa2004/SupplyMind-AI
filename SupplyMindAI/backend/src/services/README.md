# services/

Business logic layer. Orchestrates repositories, external APIs, events, and AI calls.

## Rules

- Services contain **all business logic** — validation, transformation, orchestration.
- Services call **repositories** for data access — never Prisma/Mongoose directly.
- Services may call other services (same domain only; cross-domain via events).
- Services are **injectable** — no Express Request/Response objects.
- All public methods must be typed with explicit return types.

## Naming Convention

```
services/
├── auth.service.ts           # JWT generation, password hashing, session management
├── user.service.ts           # User CRUD, profile management
├── organization.service.ts   # Org management, billing, seats
├── purchaseOrder.service.ts  # PO lifecycle: draft → approved → fulfilled
├── supplier.service.ts       # Supplier onboarding, scoring, blacklisting
├── inventory.service.ts      # Stock management, reorder triggers
├── warehouse.service.ts      # Warehouse CRUD, capacity tracking
├── shipment.service.ts       # Shipment tracking, carrier integration
├── analytics.service.ts      # KPI aggregation, report generation
├── ai.service.ts             # AI microservice proxy calls
├── email.service.ts          # Nodemailer transactional emails
└── upload.service.ts         # File upload, validation, storage
```

## Pattern

```typescript
export class PurchaseOrderService {
  constructor(
    private readonly poRepository: PurchaseOrderRepository,
    private readonly supplierService: SupplierService,
    private readonly emailService: EmailService,
  ) {}

  async create(dto: CreatePoDto, userId: string): Promise<PurchaseOrder> {
    // 1. Validate supplier exists
    // 2. Apply business rules (budget limits, approval thresholds)
    // 3. Persist via repository
    // 4. Send notification email
    // 5. Return created entity
  }
}
```
