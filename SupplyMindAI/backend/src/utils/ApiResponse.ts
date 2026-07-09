/**
 * Typed API response helpers.
 * Use these in every route handler to keep response shape consistent.
 */

import type { Response } from "express";
import { StatusCodes } from "http-status-codes";

export interface ApiResponseBody<T = unknown> {
  success: true;
  message: string;
  data: T;
  meta?: PaginationMeta;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

/**
 * Send a successful JSON response.
 *
 * @example
 * sendSuccess(res, user, "User retrieved", StatusCodes.OK);
 */
export function sendSuccess<T>(
  res: Response,
  data: T,
  message = "Success",
  statusCode = StatusCodes.OK,
  meta?: PaginationMeta,
): void {
  const body: ApiResponseBody<T> = { success: true, message, data, ...(meta && { meta }) };
  res.status(statusCode).json(body);
}

/**
 * Send a 201 Created response.
 */
export function sendCreated<T>(
  res: Response,
  data: T,
  message = "Created successfully",
): void {
  sendSuccess(res, data, message, StatusCodes.CREATED);
}

/**
 * Send a 204 No Content response (for DELETEs).
 */
export function sendNoContent(res: Response): void {
  res.status(StatusCodes.NO_CONTENT).send();
}

/**
 * Build a PaginationMeta object from count + query params.
 */
export function buildPaginationMeta(
  total: number,
  page: number,
  limit: number,
): PaginationMeta {
  const totalPages = Math.ceil(total / limit);
  return {
    page,
    limit,
    total,
    totalPages,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  };
}
