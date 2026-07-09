/**
 * Centralised application configuration.
 * All environment variable access goes through this module.
 * Never read process.env directly in business code.
 */

function required(key: string): string {
  const value = process.env[key];
  if (!value) throw new Error(`Missing required environment variable: ${key}`);
  return value;
}

function optional(key: string, fallback: string): string {
  return process.env[key] ?? fallback;
}

export const config = {
  // Application
  nodeEnv: optional("NODE_ENV", "development") as
    | "development"
    | "staging"
    | "production"
    | "test",
  port: parseInt(optional("PORT", "5000"), 10),
  appName: optional("APP_NAME", "SupplyMind AI API"),
  apiVersion: optional("API_VERSION", "v1"),
  clientUrl: optional("CLIENT_URL", "http://localhost:3000"),

  // CORS
  allowedOrigins: optional("ALLOWED_ORIGINS", "http://localhost:3000")
    .split(",")
    .map((o) => o.trim()),

  // Database
  mongoUri: optional("MONGODB_URI", "mongodb://localhost:27017/supplymind_dev"),

  // JWT
  jwt: {
    accessSecret: optional("JWT_ACCESS_SECRET", "dev_access_secret_change_me"),
    refreshSecret: optional("JWT_REFRESH_SECRET", "dev_refresh_secret_change_me"),
    accessExpiresIn: optional("JWT_ACCESS_EXPIRES_IN", "15m"),
    refreshExpiresIn: optional("JWT_REFRESH_EXPIRES_IN", "7d"),
  },

  // Redis
  redis: {
    host: optional("REDIS_HOST", "localhost"),
    port: parseInt(optional("REDIS_PORT", "6379"), 10),
    password: optional("REDIS_PASSWORD", ""),
    db: parseInt(optional("REDIS_DB", "0"), 10),
    url: process.env["REDIS_URL"],
  },

  // Rate limiting
  rateLimit: {
    windowMs: parseInt(optional("RATE_LIMIT_WINDOW_MS", "900000"), 10),
    maxRequests: parseInt(optional("RATE_LIMIT_MAX_REQUESTS", "100"), 10),
  },

  // File uploads
  uploads: {
    maxSizeMb: parseInt(optional("UPLOAD_MAX_SIZE_MB", "10"), 10),
    allowedMimeTypes: optional(
      "UPLOAD_ALLOWED_MIME_TYPES",
      "image/jpeg,image/png,application/pdf",
    ).split(","),
  },

  // Email
  smtp: {
    host: optional("SMTP_HOST", "smtp.mailtrap.io"),
    port: parseInt(optional("SMTP_PORT", "587"), 10),
    user: optional("SMTP_USER", ""),
    pass: optional("SMTP_PASS", ""),
    from: optional("EMAIL_FROM", "noreply@supplymind.ai"),
  },

  // AI microservice
  ai: {
    serviceUrl: optional("AI_SERVICE_URL", "http://localhost:8000"),
    apiKey: optional("AI_SERVICE_API_KEY", ""),
  },

  // Logging
  logLevel: optional("LOG_LEVEL", "info"),

  get isDev(): boolean {
    return this.nodeEnv === "development";
  },
  get isProd(): boolean {
    return this.nodeEnv === "production";
  },
  get isTest(): boolean {
    return this.nodeEnv === "test";
  },
} as const;

// Validate critical secrets in production
if (config.isProd) {
  required("JWT_ACCESS_SECRET");
  required("JWT_REFRESH_SECRET");
  required("MONGODB_URI");
}
