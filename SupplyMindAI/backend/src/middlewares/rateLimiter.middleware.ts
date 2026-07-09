/**
 * Rate limiting middleware (express-rate-limit).
 * Uses in-memory store in development; swap to Redis store in production.
 */

import rateLimit from "express-rate-limit";
import { StatusCodes } from "http-status-codes";

import { config } from "../config";

// ── Global limiter ────────────────────────────────────────────────────────────

export const globalRateLimiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.maxRequests,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
    errorCode: "TOO_MANY_REQUESTS",
  },
  statusCode: StatusCodes.TOO_MANY_REQUESTS,
  skip: (req) => req.path === "/health",
});

// ── Auth-specific limiter (stricter) ─────────────────────────────────────────

export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,                   // 10 attempts per window
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many authentication attempts. Please try again in 15 minutes.",
    errorCode: "TOO_MANY_AUTH_ATTEMPTS",
  },
  statusCode: StatusCodes.TOO_MANY_REQUESTS,
});

// ── Upload limiter ────────────────────────────────────────────────────────────

export const uploadRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 20,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many upload requests.",
    errorCode: "UPLOAD_RATE_LIMIT",
  },
  statusCode: StatusCodes.TOO_MANY_REQUESTS,
});
