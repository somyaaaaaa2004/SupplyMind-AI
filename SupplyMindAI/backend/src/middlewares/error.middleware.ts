/**
 * Global error handling middleware.
 * Must be registered last in the Express middleware stack.
 */

import type { ErrorRequestHandler, RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";

import { config } from "../config";
import { ApiError } from "../utils/ApiError";
import { logger } from "../utils/logger";

// ── 404 Handler ──────────────────────────────────────────────────────────────

export const notFoundHandler: RequestHandler = (req, _res, next) => {
  next(
    new ApiError(
      StatusCodes.NOT_FOUND,
      `Route not found: ${req.method} ${req.originalUrl}`,
      "ROUTE_NOT_FOUND",
    ),
  );
};

// ── Global Error Handler ─────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  // Zod validation errors
  if (err instanceof ZodError) {
    const errors: Record<string, string[]> = {};
    err.issues.forEach((issue) => {
      const path = issue.path.join(".");
      if (!errors[path]) errors[path] = [];
      errors[path].push(issue.message);
    });

    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      success: false,
      message: "Validation failed",
      errorCode: "VALIDATION_ERROR",
      errors,
    });
    return;
  }

  // Operational API errors (thrown intentionally)
  if (err instanceof ApiError) {
    if (err.statusCode >= 500) {
      logger.error("API Error", {
        message: err.message,
        errorCode: err.errorCode,
        stack: err.stack,
      });
    }

    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errorCode: err.errorCode,
      ...(err.errors && { errors: err.errors }),
      ...(config.isDev && { stack: err.stack }),
    });
    return;
  }

  // Unknown / programming errors
  logger.error("Unhandled Error", { error: err, stack: err?.stack });

  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: config.isProd ? "Internal server error" : String(err?.message),
    errorCode: "INTERNAL_ERROR",
    ...(config.isDev && { stack: err?.stack }),
  });
};
