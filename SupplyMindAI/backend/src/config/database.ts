/**
 * Database connection configuration.
 * Mongoose options for MongoDB.
 */

import type { ConnectOptions } from "mongoose";

export const mongooseOptions: ConnectOptions = {
  // Connection pool
  maxPoolSize: 10,
  minPoolSize: 2,
  maxIdleTimeMS: 30_000,
  serverSelectionTimeoutMS: 5_000,
  socketTimeoutMS: 45_000,
  connectTimeoutMS: 10_000,

  // Heartbeat
  heartbeatFrequencyMS: 10_000,

  // Compression
  compressors: ["zlib"],
};
