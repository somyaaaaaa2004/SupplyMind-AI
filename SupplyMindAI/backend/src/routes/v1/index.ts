/**
 * API v1 route registry.
 * Each domain owns its own router file — import and mount them here.
 */

import { Router } from "express";

export const v1Router = Router();

// ── Docs ─────────────────────────────────────────────────────────────────────
v1Router.get("/", (_req, res) => {
  res.json({
    name: "SupplyMind AI API",
    version: "v1",
    status: "operational",
    documentation: "/api/v1/docs",
    endpoints: [
      "POST   /api/v1/auth/login",
      "POST   /api/v1/auth/register",
      "POST   /api/v1/auth/logout",
      "POST   /api/v1/auth/refresh",
      "GET    /api/v1/auth/me",
      "GET    /api/v1/procurement/purchase-orders",
      "GET    /api/v1/procurement/suppliers",
      "GET    /api/v1/inventory/items",
      "GET    /api/v1/inventory/warehouses",
      "GET    /api/v1/logistics/shipments",
      "GET    /api/v1/analytics/kpis",
      "GET    /api/v1/ai/insights",
    ],
  });
});

// ── Domain routers (uncomment as implemented) ─────────────────────────────────
// import { authRouter } from "./auth.routes";
// import { procurementRouter } from "./procurement.routes";
// import { inventoryRouter } from "./inventory.routes";
// import { logisticsRouter } from "./logistics.routes";
// import { analyticsRouter } from "./analytics.routes";
// import { aiRouter } from "./ai.routes";
// import { settingsRouter } from "./settings.routes";

// v1Router.use("/auth", authRouter);
// v1Router.use("/procurement", authenticate, procurementRouter);
// v1Router.use("/inventory", authenticate, inventoryRouter);
// v1Router.use("/logistics", authenticate, logisticsRouter);
// v1Router.use("/analytics", authenticate, analyticsRouter);
// v1Router.use("/ai", authenticate, aiRouter);
// v1Router.use("/settings", authenticate, settingsRouter);
