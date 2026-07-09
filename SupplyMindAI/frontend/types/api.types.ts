/**
 * Generic API response types.
 * Mirrors the backend ApiResponse / ApiError shape.
 */

export interface ApiResponse<T = unknown> {
  success: true;
  message: string;
  data: T;
  meta?: PaginationMeta;
}

export interface ApiError {
  success: false;
  message: string;
  errorCode: string;
  errors?: Record<string, string[]>;
  stack?: string; // only in development
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: "asc" | "desc";
  search?: string;
}

export type ApiResult<T> = ApiResponse<T> | ApiError;

// HTTP Methods
export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

// Generic select option
export interface SelectOption<T = string> {
  label: string;
  value: T;
  disabled?: boolean;
}
