/**
 * HTTP request logger middleware.
 * Uses the Winston logger stream (already wired into morgan in app.ts).
 */

import type { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

import { logger } from "../utils/logger";

/**
 * Attaches a unique X-Request-ID header to every request and response.
 * Use req.requestId in handlers for correlation logging.
 */
export function requestId(req: Request, res: Response, next: NextFunction): void {
  const id = (req.headers["x-request-id"] as string) ?? uuidv4();
  req.headers["x-request-id"] = id;
  res.setHeader("X-Request-ID", id);
  next();
}

/**
 * Logs the completed request (method, path, status, duration).
 * Attach after routing to capture actual status codes.
 */
export function responseLogger(req: Request, res: Response, next: NextFunction): void {
  const start = Date.now();
  const requestId = req.headers["x-request-id"];

  res.on("finish", () => {
    const duration = Date.now() - start;
    const level = res.statusCode >= 500 ? "error" : res.statusCode >= 400 ? "warn" : "http";

    logger[level](`${req.method} ${req.originalUrl}`, {
      statusCode: res.statusCode,
      durationMs: duration,
      requestId,
      ip: req.ip,
      userAgent: req.headers["user-agent"],
    });
  });

  next();
}
