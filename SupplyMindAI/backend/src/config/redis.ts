/**
 * Redis client configuration (ioredis).
 * Redis is used for: session caching, rate-limit counters, job queues (future).
 */

import type { RedisOptions } from "ioredis";

import { config } from "./index";

export const redisOptions: RedisOptions = {
  host: config.redis.host,
  port: config.redis.port,
  password: config.redis.password || undefined,
  db: config.redis.db,
  lazyConnect: true,
  maxRetriesPerRequest: 3,
  retryStrategy: (times) => {
    if (times > 5) return null; // stop retrying after 5 attempts
    return Math.min(times * 200, 2_000); // exponential back-off
  },
  enableReadyCheck: true,
};
