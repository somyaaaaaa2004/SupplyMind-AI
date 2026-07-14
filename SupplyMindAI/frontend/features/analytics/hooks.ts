/**
 * Analytics feature — TanStack Query hooks for dashboard endpoints.
 */

"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/services/api";
import type {
  DashboardStats,
  ActivityItem,
  RevenueChartItem,
  OrdersChartItem,
  SupplierChartItem,
  InventoryChartItem,
} from "./types";

// ─── Query Keys ───────────────────────────────────────────────────────────────

export const analyticsKeys = {
  all: ["analytics"] as const,
  stats: () => [...analyticsKeys.all, "stats"] as const,
  activity: () => [...analyticsKeys.all, "activity"] as const,
  revenueChart: () => [...analyticsKeys.all, "revenue-chart"] as const,
  ordersChart: () => [...analyticsKeys.all, "orders-chart"] as const,
  supplierChart: () => [...analyticsKeys.all, "supplier-chart"] as const,
  inventoryChart: () => [...analyticsKeys.all, "inventory-chart"] as const,
};

// ─── Hooks ────────────────────────────────────────────────────────────────────

export function useDashboardStats() {
  return useQuery<DashboardStats>({
    queryKey: analyticsKeys.stats(),
    queryFn: async () => {
      const res = await apiClient.get("/dashboard/stats");
      return res.data;
    },
    staleTime: 60_000,
  });
}

export function useDashboardActivity() {
  return useQuery<ActivityItem[]>({
    queryKey: analyticsKeys.activity(),
    queryFn: async () => {
      const res = await apiClient.get("/dashboard/activity");
      return res.data;
    },
    staleTime: 30_000,
  });
}

export function useRevenueChart() {
  return useQuery<RevenueChartItem[]>({
    queryKey: analyticsKeys.revenueChart(),
    queryFn: async () => {
      const res = await apiClient.get("/dashboard/charts/revenue");
      return res.data;
    },
    staleTime: 120_000,
  });
}

export function useOrdersChart() {
  return useQuery<OrdersChartItem[]>({
    queryKey: analyticsKeys.ordersChart(),
    queryFn: async () => {
      const res = await apiClient.get("/dashboard/charts/orders");
      return res.data;
    },
    staleTime: 120_000,
  });
}

export function useSupplierChart() {
  return useQuery<SupplierChartItem[]>({
    queryKey: analyticsKeys.supplierChart(),
    queryFn: async () => {
      const res = await apiClient.get("/dashboard/supplier-chart");
      return res.data;
    },
    staleTime: 300_000,
  });
}

export function useInventoryChart() {
  return useQuery<InventoryChartItem[]>({
    queryKey: analyticsKeys.inventoryChart(),
    queryFn: async () => {
      const res = await apiClient.get("/dashboard/inventory-chart");
      return res.data;
    },
    staleTime: 120_000,
  });
}
