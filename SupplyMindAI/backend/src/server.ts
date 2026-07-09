/**
 * Server entry point.
 * Boots the Express app, connects to the database, and starts listening.
 */

import "dotenv/config";

import { createApp } from "./app";
import { config } from "./config";
import { connectDatabase, disconnectDatabase } from "./database";
import { logger } from "./utils/logger";

async function bootstrap(): Promise<void> {
  // 1. Connect to MongoDB
  await connectDatabase();

  // 2. Create Express app
  const app = createApp();

  // 3. Start HTTP server
  const server = app.listen(config.port, () => {
    logger.info(`🚀 SupplyMind AI API running`, {
      port: config.port,
      env: config.nodeEnv,
      version: config.apiVersion,
      url: `http://localhost:${config.port}/api/${config.apiVersion}`,
    });
  });

  // 4. Graceful shutdown
  const shutdown = async (signal: string) => {
    logger.info(`${signal} received – shutting down gracefully`);
    server.close(async () => {
      await disconnectDatabase();
      logger.info("Server closed");
      process.exit(0);
    });
  };

  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT", () => shutdown("SIGINT"));

  process.on("unhandledRejection", (reason) => {
    logger.error("Unhandled Promise Rejection", { reason });
    process.exit(1);
  });

  process.on("uncaughtException", (error) => {
    logger.error("Uncaught Exception", { error });
    process.exit(1);
  });
}

bootstrap().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
