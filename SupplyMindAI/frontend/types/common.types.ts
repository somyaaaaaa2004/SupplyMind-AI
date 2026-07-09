/**
 * Shared utility types used across the frontend.
 */

// Generic status values
export type Status = "idle" | "loading" | "success" | "error";

// Date range
export interface DateRange {
  from: Date | null;
  to: Date | null;
}

// Generic ID type
export type ID = string;

// Optional record
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// Make all properties required
export type Required<T> = { [K in keyof T]-?: T[K] };

// Nullable
export type Nullable<T> = T | null;

// Generic table column definition
export interface TableColumn<T = unknown> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  width?: string;
  align?: "left" | "center" | "right";
  render?: (value: unknown, row: T) => React.ReactNode;
}

// Generic filter state
export interface FilterState {
  search: string;
  status: string;
  dateRange: DateRange;
  [key: string]: unknown;
}

// Chart data point
export interface ChartDataPoint {
  name: string;
  value: number;
  [key: string]: unknown;
}

// Map coordinate
export interface Coordinates {
  lng: number;
  lat: number;
}
