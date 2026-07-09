/**
 * Winston logger singleton.
 * Use this everywhere instead of console.log.
 */

import winston from "winston";

const { combine, timestamp, errors, json, colorize, simple } = winston.format;

const isDev = process.env["NODE_ENV"] !== "production";

export const logger = winston.createLogger({
  level: process.env["LOG_LEVEL"] ?? (isDev ? "debug" : "info"),
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss.SSS" }),
    errors({ stack: true }),
    json(),
  ),
  defaultMeta: { service: "supplymind-api" },
  transports: [
    // Console transport (pretty in dev, JSON in prod)
    new winston.transports.Console({
      format: isDev ? combine(colorize(), simple()) : json(),
    }),
    // File transports (production)
    ...(!isDev
      ? [
          new winston.transports.File({
            filename: "logs/error.log",
            level: "error",
            maxsize: 10 * 1024 * 1024, // 10 MB
            maxFiles: 5,
          }),
          new winston.transports.File({
            filename: "logs/combined.log",
            maxsize: 10 * 1024 * 1024,
            maxFiles: 10,
          }),
        ]
      : []),
  ],
});

/** Stream adapter for morgan HTTP logger */
export const httpLogger = (message: string): void => {
  logger.http(message.trim());
};
