import {
  IDashboardStats,
  IActivityFeedItem,
  IRevenueChartPoint,
  IOrdersChartPoint,
  ISupplierChartPoint,
  IInventoryChartPoint,
} from "../models/DashboardStat.model";
import { v4 as uuidv4 } from "uuid";

export const dashboardService = {
  getStats(): IDashboardStats {
    return {
      revenue:          { current: 2400000, previousValue: 2142857, trend: 12 },
      orders:           { current: 1847,    previousValue: 1710,    trend: 8 },
      shipments:        { current: 423,     previousValue: 436,     trend: -3 },
      inventoryValue:   { current: 8200000, previousValue: 7809524, trend: 5 },
      suppliers:        { current: 247,     previousValue: 242,     trend: 2 },
      warehouseCapacity:{ current: 78,      previousValue: 75,      trend: 4 },
      riskScore:        { current: 23,      previousValue: 27,      trend: -15 },
      aiConfidence:     { current: 94,      previousValue: 92,      trend: 2 },
    };
  },

  getActivityFeed(): IActivityFeedItem[] {
    const now = new Date();
    const ago = (mins: number) => new Date(now.getTime() - mins * 60000).toISOString();
    return [
      { id: uuidv4(), type: "PURCHASE_ORDER", title: "PO-20240115-0042 Created", description: "New purchase order for office supplies submitted to Apex Supplies Ltd.", user: { name: "Sarah Johnson" }, timestamp: ago(5), status: "PENDING" },
      { id: uuidv4(), type: "PURCHASE_REQUEST", title: "PR-20240115-0018 Approved", description: "Purchase request for IT equipment approved by procurement manager.", user: { name: "Michael Chen" }, timestamp: ago(12), status: "APPROVED" },
      { id: uuidv4(), type: "VENDOR", title: "New Vendor Onboarded", description: "TechPro Solutions has been added as an approved vendor.", user: { name: "Emily Davis" }, timestamp: ago(25), status: "ACTIVE" },
      { id: uuidv4(), type: "RFQ", title: "RFQ-20240115-0005 Sent", description: "Request for quotation sent to 4 vendors for Q1 materials.", user: { name: "Robert Kim" }, timestamp: ago(45), status: "SENT" },
      { id: uuidv4(), type: "SHIPMENT", title: "Shipment SHP-2024-0089 Delivered", description: "Consignment from GlobalLogistics arrived at Warehouse B.", user: { name: "Alice Wang" }, timestamp: ago(60), status: "DELIVERED" },
      { id: uuidv4(), type: "PURCHASE_ORDER", title: "PO-20240114-0038 Acknowledged", description: "Vendor confirmed receipt of purchase order.", user: { name: "David Brown" }, timestamp: ago(90), status: "ACKNOWLEDGED" },
      { id: uuidv4(), type: "PURCHASE_REQUEST", title: "PR-20240114-0015 Submitted", description: "Maintenance department submitted request for spare parts.", user: { name: "Lisa Park" }, timestamp: ago(120), status: "PENDING" },
      { id: uuidv4(), type: "VENDOR", title: "Vendor Rating Updated", description: "Oceanic Trading Co. rating updated to 4.7 after delivery review.", user: { name: "James Wilson" }, timestamp: ago(180), status: "ACTIVE" },
      { id: uuidv4(), type: "RFQ", title: "RFQ-20240114-0004 Awarded", description: "Contract awarded to Summit Industrial for raw materials.", user: { name: "Sophia Turner" }, timestamp: ago(240), status: "AWARDED" },
      { id: uuidv4(), type: "PURCHASE_ORDER", title: "PO-20240114-0031 Disputed", description: "Partial delivery issue raised for chemical supplies order.", user: { name: "Nathan Lee" }, timestamp: ago(300), status: "DISPUTED" },
      { id: uuidv4(), type: "PURCHASE_REQUEST", title: "PR-20240114-0012 Rejected", description: "Budget exceeded for requested lab equipment. Revision required.", user: { name: "Chloe Martinez" }, timestamp: ago(360), status: "REJECTED" },
      { id: uuidv4(), type: "SHIPMENT", title: "Shipment SHP-2024-0085 In Transit", description: "Freight container departed Singapore port, ETA 7 days.", user: { name: "Oscar Hughes" }, timestamp: ago(420), status: "IN_TRANSIT" },
      { id: uuidv4(), type: "VENDOR", title: "Vendor Blocked", description: "Horizon Supplies blocked due to repeated delivery failures.", user: { name: "Grace Kim" }, timestamp: ago(480), status: "BLOCKED" },
      { id: uuidv4(), type: "PURCHASE_ORDER", title: "PO-20240113-0027 Delivered", description: "All items received and quality checked. PO closed.", user: { name: "Ethan Clark" }, timestamp: ago(600), status: "DELIVERED" },
      { id: uuidv4(), type: "RFQ", title: "RFQ-20240113-0003 Closed", description: "Quotation period ended with 3 responses received.", user: { name: "Mia Anderson" }, timestamp: ago(720), status: "CLOSED" },
      { id: uuidv4(), type: "PURCHASE_REQUEST", title: "PR-20240113-0008 Approved", description: "Fleet maintenance purchase request approved.", user: { name: "Liam Thompson" }, timestamp: ago(900), status: "APPROVED" },
      { id: uuidv4(), type: "SHIPMENT", title: "Shipment SHP-2024-0079 Delayed", description: "Weather delay reported. New ETA added to tracking.", user: { name: "Ava Roberts" }, timestamp: ago(1080), status: "DELAYED" },
      { id: uuidv4(), type: "PURCHASE_ORDER", title: "PO-20240112-0019 Sent", description: "Purchase order dispatched to Asia Pacific Distributors.", user: { name: "Noah Evans" }, timestamp: ago(1440), status: "SENT" },
      { id: uuidv4(), type: "VENDOR", title: "Vendor Profile Updated", description: "Contact person and payment terms updated for Prime Tech Inc.", user: { name: "Isabella Scott" }, timestamp: ago(1800), status: "ACTIVE" },
      { id: uuidv4(), type: "PURCHASE_REQUEST", title: "PR-20240112-0004 Completed", description: "Purchase cycle completed. Items received and logged.", user: { name: "William Harris" }, timestamp: ago(2160), status: "COMPLETED" },
    ];
  },

  getRevenueChart(): IRevenueChartPoint[] {
    return [
      { month: "Jan", spend: 180000, budget: 200000, savings: 20000 },
      { month: "Feb", spend: 195000, budget: 210000, savings: 15000 },
      { month: "Mar", spend: 210000, budget: 220000, savings: 10000 },
      { month: "Apr", spend: 175000, budget: 190000, savings: 15000 },
      { month: "May", spend: 220000, budget: 240000, savings: 20000 },
      { month: "Jun", spend: 245000, budget: 260000, savings: 15000 },
      { month: "Jul", spend: 198000, budget: 210000, savings: 12000 },
      { month: "Aug", spend: 215000, budget: 230000, savings: 15000 },
      { month: "Sep", spend: 230000, budget: 250000, savings: 20000 },
      { month: "Oct", spend: 205000, budget: 220000, savings: 15000 },
      { month: "Nov", spend: 240000, budget: 260000, savings: 20000 },
      { month: "Dec", spend: 287000, budget: 300000, savings: 13000 },
    ];
  },

  getOrdersChart(): IOrdersChartPoint[] {
    const data: IOrdersChartPoint[] = [];
    const base = new Date();
    for (let i = 29; i >= 0; i--) {
      const d = new Date(base.getTime() - i * 86400000);
      const dateStr = d.toISOString().slice(0, 10);
      data.push({
        date: dateStr,
        created: Math.floor(40 + Math.random() * 30),
        approved: Math.floor(25 + Math.random() * 20),
        rejected: Math.floor(2 + Math.random() * 8),
      });
    }
    return data;
  },

  getSupplierChart(): ISupplierChartPoint[] {
    return [
      { name: "Technology",    value: 35, color: "#6366f1" },
      { name: "Raw Materials", value: 22, color: "#8b5cf6" },
      { name: "Office Supplies", value: 15, color: "#a78bfa" },
      { name: "Logistics",     value: 12, color: "#c4b5fd" },
      { name: "Maintenance",   value: 10, color: "#ddd6fe" },
      { name: "Other",         value: 6,  color: "#ede9fe" },
    ];
  },

  getInventoryChart(): IInventoryChartPoint[] {
    return [
      { warehouse: "Warehouse A – Chicago",   current: 8200,  capacity: 10000, percentage: 82 },
      { warehouse: "Warehouse B – Los Angeles", current: 6750, capacity: 9000,  percentage: 75 },
      { warehouse: "Warehouse C – New York",  current: 4500,  capacity: 6000,  percentage: 75 },
      { warehouse: "Warehouse D – Houston",   current: 3100,  capacity: 5000,  percentage: 62 },
      { warehouse: "Warehouse E – Phoenix",   current: 2200,  capacity: 4000,  percentage: 55 },
    ];
  },
};
