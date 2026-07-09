/**
 * Express application factory.
 * Wires up middleware stack and routes.
 * No business logic lives here.
 */

import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { type Express } from "express";
import helmet from "helmet";
import morgan from "morgan";

import { config } from "./config";
import { errorHandler, notFoundHandler } from "./middlewares/error.middleware";
import { globalRateLimiter } from "./middlewares/rateLimiter.middleware";
import { router as apiRouter } from "./routes";

export function createApp(): Express {
  const app = express();

  // ── Security headers ─────────────────────────────────────────────────────
  app.use(helmet());

  // ── CORS ─────────────────────────────────────────────────────────────────
  app.use(
    cors({
      origin: config.allowedOrigins,
      credentials: true,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization", "X-Request-ID"],
    }),
  );

  // ── Body parsing ─────────────────────────────────────────────────────────
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true, limit: "10mb" }));
  app.use(cookieParser());

  // ── Compression ───────────────────────────────────────────────────────────
  app.use(compression());

  // ── HTTP logging ─────────────────────────────────────────────────────────
  if (config.nodeEnv !== "test") {
    // Pipe morgan output into Winston so all logs go through one transport
    const { httpLogger } = require("./utils/logger") as { httpLogger: (msg: string) => void };
    app.use(morgan("combined", { stream: { write: (msg) => httpLogger(msg) } }));
  }

  // ── Global rate limiter ───────────────────────────────────────────────────
  app.use(globalRateLimiter);

  // ── API Routes ────────────────────────────────────────────────────────────
  app.use(`/api/${config.apiVersion}`, apiRouter);

  // ── Health check (outside versioned path) ────────────────────────────────
  app.get("/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // ── 404 & Error handlers (must be last) ──────────────────────────────────
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
