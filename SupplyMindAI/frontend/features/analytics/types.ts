/**
 * Analytics feature — TypeScript interfaces for dashboard API responses.
 */

// ─── Shared ──────────────────────────────────────────────────────────────────

export interface TrendMetric {
  value: number;
  previousValue: number;
  trend: number; // percentage change
}

// ─── Dashboard Stats ─────────────────────────────────────────────────────────

export interface DashboardStats {
  revenue: TrendMetric;
  orders: TrendMetric;
  shipments: TrendMetric;
  inventoryValue: TrendMetric;
  suppliers: TrendMetric;
  warehouseCapacity: TrendMetric;
  riskScore: TrendMetric;
  aiConfidence: TrendMetric;
}

// ─── Activity Feed ───────────────────────────────────────────────────────────

export type ActivityStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "DRAFT"
  | "ACTIVE"
  | "CANCELLED"
  | "PROCESSING"
  | "COMPLETED";

export interface ActivityItem {
  id: string;
  type: string;
  title: string;
  description: string;
  user: { name: string };
  timestamp: string;
  status: ActivityStatus;
}

// ─── Revenue Chart ────────────────────────────────────────────────────────────

export interface RevenueChartItem {
  month: string;
  spend: number;
  budget: number;
  savings: number;
}

// ─── Orders Chart ─────────────────────────────────────────────────────────────

export interface OrdersChartItem {
  date: string;
  created: number;
  approved: number;
  rejected: number;
}

// ─── Supplier Chart ───────────────────────────────────────────────────────────

export interface SupplierChartItem {
  name: string;
  value: number;
  color: string;
}

// ─── Inventory Chart ──────────────────────────────────────────────────────────

export interface InventoryChartItem {
  warehouse: string;
  current: number;
  capacity: number;
  percentage: number;
}
