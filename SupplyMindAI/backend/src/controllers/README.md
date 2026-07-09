# controllers/

Route handler functions. Each controller maps one-to-one with a route file.

## Rules

- Controllers are **thin** — no business logic.
- Responsibility: parse request → call service → send response.
- Always call `sendSuccess()` / `sendCreated()` / `sendNoContent()` from `@/utils/ApiResponse`.
- Never call the database or Prisma directly — delegate to the service layer.
- Never throw untyped errors — use `ApiError` factory methods.

## Naming Convention

| File | Handles |
|------|---------|
| `auth.controller.ts` | /auth/* |
| `procurement.controller.ts` | /procurement/* |
| `inventory.controller.ts` | /inventory/* |
| `logistics.controller.ts` | /logistics/* |
| `analytics.controller.ts` | /analytics/* |
| `ai.controller.ts` | /ai/* |
| `settings.controller.ts` | /settings/* |

## Handler Signature

```typescript
export const createPurchaseOrder: RequestHandler = async (req, res, next) => {
  try {
    const data = await purchaseOrderService.create(req.body, req.user!.sub);
    sendCreated(res, data, "Purchase order created");
  } catch (error) {
    next(error);
  }
};
```
