export interface IStatMetric {
  current: number;
  previousValue: number;
  trend: number; // percentage change
}

export interface IDashboardStats {
  revenue: IStatMetric;
  orders: IStatMetric;
  shipments: IStatMetric;
  inventoryValue: IStatMetric;
  suppliers: IStatMetric;
  warehouseCapacity: IStatMetric;
  riskScore: IStatMetric;
  aiConfidence: IStatMetric;
}

export interface IActivityFeedItem {
  id: string;
  type: string;
  title: string;
  description: string;
  user: {
    name: string;
    avatar?: string;
  };
  timestamp: string;
  status: string;
}

export interface IRevenueChartPoint {
  month: string;
  spend: number;
  budget: number;
  savings: number;
}

export interface IOrdersChartPoint {
  date: string;
  created: number;
  approved: number;
  rejected: number;
}

export interface ISupplierChartPoint {
  name: string;
  value: number;
  color: string;
}

export interface IInventoryChartPoint {
  warehouse: string;
  current: number;
  capacity: number;
  percentage: number;
}
