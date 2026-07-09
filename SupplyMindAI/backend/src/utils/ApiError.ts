/**
 * Custom API error class.
 * Thrown in route handlers and caught by the global error middleware.
 */

import { StatusCodes } from "http-status-codes";

export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly errorCode: string;
  public readonly errors?: Record<string, string[]>;
  public readonly isOperational: boolean;

  constructor(
    statusCode: number,
    message: string,
    errorCode: string,
    errors?: Record<string, string[]>,
    isOperational = true,
  ) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.errors = errors;
    this.isOperational = isOperational;

    // Capture stack trace (V8 engines)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  // ── Factory helpers ──────────────────────────────────────────────────────

  static badRequest(message: string, errors?: Record<string, string[]>): ApiError {
    return new ApiError(StatusCodes.BAD_REQUEST, message, "BAD_REQUEST", errors);
  }

  static unauthorized(message = "Unauthorized"): ApiError {
    return new ApiError(StatusCodes.UNAUTHORIZED, message, "UNAUTHORIZED");
  }

  static forbidden(message = "Forbidden"): ApiError {
    return new ApiError(StatusCodes.FORBIDDEN, message, "FORBIDDEN");
  }

  static notFound(resource: string): ApiError {
    return new ApiError(
      StatusCodes.NOT_FOUND,
      `${resource} not found`,
      "NOT_FOUND",
    );
  }

  static conflict(message: string): ApiError {
    return new ApiError(StatusCodes.CONFLICT, message, "CONFLICT");
  }

  static tooManyRequests(message = "Too many requests"): ApiError {
    return new ApiError(
      StatusCodes.TOO_MANY_REQUESTS,
      message,
      "TOO_MANY_REQUESTS",
    );
  }

  static internal(message = "Internal server error"): ApiError {
    return new ApiError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      message,
      "INTERNAL_ERROR",
      undefined,
      false,
    );
  }

  static validationError(errors: Record<string, string[]>): ApiError {
    return new ApiError(
      StatusCodes.UNPROCESSABLE_ENTITY,
      "Validation failed",
      "VALIDATION_ERROR",
      errors,
    );
  }
}
