/**
 * Root API router.
 * Mounts all versioned route groups.
 */

import { Router } from "express";

import { v1Router } from "./v1";

export const router = Router();

// Mount v1 routes (the /api/v1 prefix is applied in app.ts)
router.use("/", v1Router);
