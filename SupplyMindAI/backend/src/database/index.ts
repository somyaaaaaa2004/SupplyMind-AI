/**
 * Database connection management.
 * Handles connect, disconnect, and connection events.
 *
 * Strategy:
 *  - Mongoose is used for the runtime connection lifecycle (connect/disconnect/events).
 *  - Prisma Client is used for all query operations (type-safe, declarative CRUD).
 *  - Do NOT write raw Mongoose queries in business code — use Prisma repositories.
 *  - This file boots the shared connection; `@prisma/client` reads DATABASE_URL directly.
 */

import mongoose from "mongoose";

import { mongooseOptions } from "../config/database";
import { config } from "../config/index";
import { logger } from "../utils/logger";

let isConnected = false;

export async function connectDatabase(): Promise<void> {
  if (isConnected) {
    logger.debug("MongoDB already connected");
    return;
  }

  mongoose.connection.on("connected", () => {
    isConnected = true;
    logger.info("MongoDB connected", { host: mongoose.connection.host });
  });

  mongoose.connection.on("error", (error) => {
    logger.error("MongoDB connection error", { error });
  });

  mongoose.connection.on("disconnected", () => {
    isConnected = false;
    logger.warn("MongoDB disconnected");
  });

  await mongoose.connect(config.mongoUri, mongooseOptions);
}

export async function disconnectDatabase(): Promise<void> {
  if (!isConnected) return;
  await mongoose.disconnect();
  isConnected = false;
  logger.info("MongoDB disconnected gracefully");
}

export { mongoose };
