"use client";

import { motion } from "framer-motion";
import {
  DollarSign,
  ShoppingCart,
  Truck,
  Package,
  Building2,
  Warehouse,
  Shield,
  Brain,
  AlertTriangle,
  TrendingUp,
  Info,
  Zap,
  Calendar,
  Download,
  CheckCircle,
  XCircle,
  ChevronRight,
} from "lucide-react";
import { useAuthStore } from "@/store/auth.store";
import {
  useDashboardStats,
  useDashboardActivity,
  useRevenueChart,
  useOrdersChart,
  useSupplierChart,
  useInventoryChart,
} from "@/features/analytics/hooks";

// ─── Design tokens ────────────────────────────────────────────────────────────
const T = {
  bgBase: "#09090B",
  bgSurface: "#111827",
  bgSurfaceHover: "#1F2937",
  bgSurface2: "#0F172A",
  accent: "#3B82F6",
  accentHover: "#2563EB",
  accentGlow: "rgba(59,130,246,0.15)",
  success: "#22C55E",
  warning: "#F59E0B",
  danger: "#EF4444",
  textPrimary: "#F9FAFB",
  textSecondary: "#9CA3AF",
  textMuted: "#6B7280",
  border: "rgba(255,255,255,0.06)",
  borderStrong: "rgba(255,255,255,0.12)",
};

// ─── Animation helpers ────────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay, ease: "easeOut" },
});

// ─── Static dummy data ────────────────────────────────────────────────────────
const SPARKLINE_REVENUE = [2.0, 2.1, 2.2, 2.15, 2.3, 2.35, 2.4];
const SPARKLINE_ORDERS = [1600, 1650, 1700, 1720, 1780, 1820, 1847];
const SPARKLINE_SHIPMENTS = [440, 435, 430, 428, 425, 424, 423];
const SPARKLINE_INVENTORY = [7.8, 7.9, 8.0, 8.1, 8.15, 8.18, 8.2];

const REVENUE_DATA = [
  { month: "Jan", spend: 1800000, budget: 2000000, savings: 200000 },
  { month: "Feb", spend: 1950000, budget: 2000000, savings: 50000 },
  { month: "Mar", spend: 1750000, budget: 2100000, savings: 350000 },
  { month: "Apr", spend: 2050000, budget: 2100000, savings: 50000 },
  { month: "May", spend: 1900000, budget: 2200000, savings: 300000 },
  { month: "Jun", spend: 2100000, budget: 2200000, savings: 100000 },
  { month: "Jul", spend: 2200000, budget: 2300000, savings: 100000 },
  { month: "Aug", spend: 2050000, budget: 2300000, savings: 250000 },
  { month: "Sep", spend: 2150000, budget: 2400000, savings: 250000 },
  { month: "Oct", spend: 2300000, budget: 2400000, savings: 100000 },
  { month: "Nov", spend: 2250000, budget: 2500000, savings: 250000 },
  { month: "Dec", spend: 2400000, budget: 2500000, savings: 100000 },
];

const ORDERS_DATA = Array.from({ length: 14 }, (_, i) => ({
  date: `Dec ${i + 1}`,
  created: Math.floor(50 + Math.random() * 30),
  approved: Math.floor(35 + Math.random() * 25),
  rejected: Math.floor(3 + Math.random() * 8),
}));

const SUPPLIER_DATA = [
  { name: "Manufacturing", value: 35, color: "#3B82F6" },
  { name: "IT", value: 22, color: "#8B5CF6" },
  { name: "Services", value: 18, color: "#22C55E" },
  { name: "Logistics", value: 15, color: "#F59E0B" },
  { name: "Others", value: 10, color: "#6B7280" },
];

const WAREHOUSES = [
  { name: "Main Hub", pct: 78 },
  { name: "East Wing", pct: 62 },
  { name: "West Wing", pct: 91 },
  { name: "Cold Storage", pct: 45 },
];

const AI_INSIGHTS = [
  {
    icon: TrendingUp,
    color: T.accent,
    title: "Demand Spike Predicted",
    desc: "Supplier XYZ shows 34% demand increase projected next quarter.",
    confidence: 97,
  },
  {
    icon: DollarSign,
    color: T.success,
    title: "Cost Savings Opportunity",
    desc: "Consolidating 3 vendors could save $45K annually in procurement costs.",
    confidence: 89,
  },
  {
    icon: AlertTriangle,
    color: T.danger,
    title: "Risk Alert: Single Source",
    desc: "5 critical items are sourced from a single supplier — diversify now.",
    confidence: 92,
  },
  {
    icon: Package,
    color: T.warning,
    title: "Inventory Optimization",
    desc: "12 SKUs are overstocked. Recommend reducing reorder quantities.",
    confidence: 84,
  },
  {
    icon: Zap,
    color: "#8B5CF6",
    title: "Contract Renewal",
    desc: "3 vendor contracts expire within 30 days. Initiate renewal process.",
    confidence: 99,
  },
];

const PENDING_APPROVALS = [
  { id: "PR-2041", title: "Server Infrastructure Q1", requester: "Alice Chen", amount: "$48,500", urgency: "HIGH", submitted: "2 hrs ago" },
  { id: "PR-2039", title: "Office Supplies Restock", requester: "Bob Martinez", amount: "$3,200", urgency: "LOW", submitted: "5 hrs ago" },
  { id: "PR-2037", title: "Cloud Licenses Renewal", requester: "Sara Kim", amount: "$24,000", urgency: "MEDIUM", submitted: "1 day ago" },
  { id: "PR-2035", title: "Warehouse Forklift Lease", requester: "Tom Brown", amount: "$12,800", urgency: "HIGH", submitted: "1 day ago" },
  { id: "PR-2033", title: "Marketing Analytics Tools", requester: "Eva Patel", amount: "$6,750", urgency: "MEDIUM", submitted: "2 days ago" },
];

const DUMMY_ACTIVITY = [
  { id: "1", user: { name: "Alice Chen" }, title: "Purchase Order Approved", description: "PO-4821 for $48,500 approved", timestamp: "2 min ago", status: "APPROVED" as const },
  { id: "2", user: { name: "Bob Martinez" }, title: "New Supplier Onboarded", description: "TechParts Inc. added to vendor list", timestamp: "15 min ago", status: "ACTIVE" as const },
  { id: "3", user: { name: "Sara Kim" }, title: "Shipment Dispatched", description: "SHP-1923 departed warehouse", timestamp: "34 min ago", status: "PROCESSING" as const },
  { id: "4", user: { name: "Tom Brown" }, title: "Invoice Rejected", description: "INV-9042 failed three-way match", timestamp: "1 hr ago", status: "REJECTED" as const },
  { id: "5", user: { name: "Eva Patel" }, title: "Contract Renewed", description: "Vendor contract extended 12 months", timestamp: "2 hrs ago", status: "COMPLETED" as const },
  { id: "6", user: { name: "Mark Liu" }, title: "RFQ Submitted", description: "RFQ-3311 sent to 5 suppliers", timestamp: "3 hrs ago", status: "PENDING" as const },
  { id: "7", user: { name: "Nina Ford" }, title: "Inventory Alert", description: "SKU-224 below reorder threshold", timestamp: "4 hrs ago", status: "PENDING" as const },
  { id: "8", user: { name: "James Roy" }, title: "Budget Approved", description: "Q1 procurement budget approved", timestamp: "5 hrs ago", status: "APPROVED" as const },
  { id: "9", user: { name: "Priya Das" }, title: "Audit Complete", description: "Supplier audit report filed", timestamp: "6 hrs ago", status: "COMPLETED" as const },
  { id: "10", user: { name: "Carlos Ortiz" }, title: "Risk Flag Raised", description: "Supplier dependency risk detected", timestamp: "8 hrs ago", status: "PENDING" as const },
];

// ─── Mini helpers ─────────────────────────────────────────────────────────────

function getInitials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

function formatM(val: number) {
  if (val >= 1_000_000) return `$${(val / 1_000_000).toFixed(1)}M`;
  if (val >= 1_000) return `$${(val / 1_000).toFixed(0)}K`;
  return `$${val}`;
}

// ─── Sparkline (pure SVG) ─────────────────────────────────────────────────────
function Sparkline({ data, color }: { data: number[]; color: string }) {
  const w = 80, h = 32;
  const min = Math.min(...data), max = Math.max(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * (h - 4) - 2;
    return `${x},${y}`;
  });
  const polyline = pts.join(" ");
  const area = `0,${h} ${polyline} ${w},${h}`;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none">
      <defs>
        <linearGradient id={`sg-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={area} fill={`url(#sg-${color.replace("#", "")})`} />
      <polyline points={polyline} stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── KPI Card ─────────────────────────────────────────────────────────────────
interface KPIProps {
  title: string;
  value: string;
  trend: number;
  icon: React.ElementType;
  color: string;
  sparkline: number[];
}

function KPICardComponent({ title, value, trend, icon: Icon, color, sparkline }: KPIProps) {
  const trendUp = trend >= 0;
  return (
    <div
      style={{
        background: T.bgSurface,
        border: `1px solid ${T.border}`,
        borderRadius: 12,
        padding: "20px 24px",
        display: "flex",
        flexDirection: "column",
        gap: 12,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* accent glow top-left */}
      <div style={{ position: "absolute", top: 0, left: 0, width: 80, height: 80, background: color, opacity: 0.06, borderRadius: "0 0 80px 0", pointerEvents: "none" }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <p style={{ color: T.textMuted, fontSize: 12, fontWeight: 500, letterSpacing: "0.04em", textTransform: "uppercase", margin: 0 }}>{title}</p>
          <p style={{ color: T.textPrimary, fontSize: 28, fontWeight: 700, margin: "4px 0 0", letterSpacing: "-0.02em" }}>{value}</p>
        </div>
        <div style={{ background: `${color}22`, borderRadius: 10, padding: 10 }}>
          <Icon size={20} color={color} />
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ color: trendUp ? T.success : T.danger, fontSize: 12, fontWeight: 600 }}>
            {trendUp ? "↑" : "↓"} {Math.abs(trend)}%
          </span>
          <span style={{ color: T.textMuted, fontSize: 11 }}>vs last month</span>
        </div>
        <Sparkline data={sparkline} color={color} />
      </div>
    </div>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCardComponent({ title, value, icon: Icon, trend, color }: { title: string; value: string; icon: React.ElementType; trend?: number; color: string }) {
  return (
    <div style={{ background: T.bgSurface, border: `1px solid ${T.border}`, borderRadius: 12, padding: "16px 20px", display: "flex", alignItems: "center", gap: 14 }}>
      <div style={{ background: `${color}22`, borderRadius: 10, padding: 10, flexShrink: 0 }}>
        <Icon size={18} color={color} />
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ color: T.textMuted, fontSize: 11, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.04em", margin: 0 }}>{title}</p>
        <p style={{ color: T.textPrimary, fontSize: 20, fontWeight: 700, margin: "2px 0 0" }}>{value}</p>
      </div>
      {trend !== undefined && (
        <span style={{ color: trend >= 0 ? T.success : T.danger, fontSize: 12, fontWeight: 600, background: trend >= 0 ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)", padding: "2px 8px", borderRadius: 20 }}>
          {trend >= 0 ? "↑" : "↓"} {Math.abs(trend)}%
        </span>
      )}
    </div>
  );
}

// ─── Area Chart (ECharts-based via SVG path approximation, pure React) ─────
// Using a simple SVG area chart implementation to avoid SSR issues
function AreaChartComponent({ data }: { data: typeof REVENUE_DATA }) {
  const w = 600, h = 260;
  const padL = 50, padR = 10, padT = 20, padB = 30;
  const chartW = w - padL - padR;
  const chartH = h - padT - padB;
  const maxVal = Math.max(...data.map((d) => d.budget)) * 1.05;

  const toX = (i: number) => padL + (i / (data.length - 1)) * chartW;
  const toY = (v: number) => padT + chartH - (v / maxVal) * chartH;

  const pathFor = (key: "spend" | "budget" | "savings") => {
    return data.map((d, i) => `${i === 0 ? "M" : "L"}${toX(i)},${toY(d[key])}`).join(" ");
  };

  const areaFor = (key: "spend" | "budget" | "savings") => {
    const line = data.map((d, i) => `${i === 0 ? "M" : "L"}${toX(i)},${toY(d[key])}`).join(" ");
    return `${line} L${toX(data.length - 1)},${padT + chartH} L${padL},${padT + chartH} Z`;
  };

  const seriesColors = { spend: T.accent, budget: "#8B5CF6", savings: T.success };

  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" style={{ display: "block" }}>
      <defs>
        {(["spend", "budget", "savings"] as const).map((k) => (
          <linearGradient key={k} id={`area-${k}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={seriesColors[k]} stopOpacity="0.3" />
            <stop offset="100%" stopColor={seriesColors[k]} stopOpacity="0.02" />
          </linearGradient>
        ))}
      </defs>
      {/* Grid lines */}
      {[0, 0.25, 0.5, 0.75, 1].map((f) => (
        <line key={f} x1={padL} y1={padT + chartH * (1 - f)} x2={padL + chartW} y2={padT + chartH * (1 - f)}
          stroke={T.border} strokeWidth="1" />
      ))}
      {/* Areas */}
      {(["savings", "budget", "spend"] as const).map((k) => (
        <path key={k} d={areaFor(k)} fill={`url(#area-${k})`} />
      ))}
      {/* Lines */}
      {(["savings", "budget", "spend"] as const).map((k) => (
        <path key={k} d={pathFor(k)} fill="none" stroke={seriesColors[k]}
          strokeWidth={k === "budget" ? 1.5 : 2}
          strokeDasharray={k === "budget" ? "5,3" : undefined}
          strokeLinecap="round" strokeLinejoin="round" />
      ))}
      {/* X labels */}
      {data.map((d, i) => (
        <text key={i} x={toX(i)} y={h - 6} textAnchor="middle" fill={T.textMuted} fontSize="10">{d.month}</text>
      ))}
      {/* Y labels */}
      {[0, 0.5, 1].map((f) => (
        <text key={f} x={padL - 6} y={padT + chartH * (1 - f) + 4} textAnchor="end" fill={T.textMuted} fontSize="10">
          {formatM(maxVal * f)}
        </text>
      ))}
      {/* Legend */}
      {(["spend", "budget", "savings"] as const).map((k, idx) => (
        <g key={k} transform={`translate(${padL + idx * 110}, ${padT - 4})`}>
          <line x1="0" y1="6" x2="16" y2="6" stroke={seriesColors[k]} strokeWidth="2" strokeDasharray={k === "budget" ? "5,3" : undefined} />
          <text x="20" y="10" fill={T.textSecondary} fontSize="10" textTransform="capitalize">{k.charAt(0).toUpperCase() + k.slice(1)}</text>
        </g>
      ))}
    </svg>
  );
}

// ─── Donut Chart ──────────────────────────────────────────────────────────────
function DonutChartComponent({ data }: { data: typeof SUPPLIER_DATA }) {
  const size = 200, cx = 100, cy = 100, r = 70, innerR = 46;
  const total = data.reduce((s, d) => s + d.value, 0);
  let angle = -Math.PI / 2;
  const arcs = data.map((d) => {
    const a = (d.value / total) * 2 * Math.PI;
    const x1 = cx + r * Math.cos(angle);
    const y1 = cy + r * Math.sin(angle);
    angle += a;
    const x2 = cx + r * Math.cos(angle);
    const y2 = cy + r * Math.sin(angle);
    const ix1 = cx + innerR * Math.cos(angle - a);
    const iy1 = cy + innerR * Math.sin(angle - a);
    const ix2 = cx + innerR * Math.cos(angle);
    const iy2 = cy + innerR * Math.sin(angle);
    const largeArc = a > Math.PI ? 1 : 0;
    return { ...d, path: `M${x1},${y1} A${r},${r} 0 ${largeArc},1 ${x2},${y2} L${ix2},${iy2} A${innerR},${innerR} 0 ${largeArc},0 ${ix1},${iy1} Z` };
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
      <svg viewBox="0 0 200 200" width="200" height="200">
        {arcs.map((arc, i) => (
          <path key={i} d={arc.path} fill={arc.color} opacity="0.9" />
        ))}
        <text x={cx} y={cy - 6} textAnchor="middle" fill={T.textPrimary} fontSize="14" fontWeight="700">247</text>
        <text x={cx} y={cy + 12} textAnchor="middle" fill={T.textMuted} fontSize="10">Suppliers</text>
      </svg>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 16px", width: "100%" }}>
        {data.map((d) => (
          <div key={d.name} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: d.color, flexShrink: 0 }} />
            <span style={{ color: T.textSecondary, fontSize: 12 }}>{d.name}</span>
            <span style={{ color: T.textPrimary, fontSize: 12, fontWeight: 600, marginLeft: "auto" }}>{d.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Bar Chart ────────────────────────────────────────────────────────────────
function BarChartComponent({ data }: { data: typeof ORDERS_DATA }) {
  const w = 580, h = 200;
  const padL = 30, padR = 10, padT = 10, padB = 24;
  const chartW = w - padL - padR;
  const chartH = h - padT - padB;
  const maxVal = Math.max(...data.flatMap((d) => [d.created, d.approved, d.rejected])) * 1.1;
  const barGroups = 3;
  const groupW = chartW / data.length;
  const barW = (groupW * 0.75) / barGroups;
  const colors = [T.accent, T.success, T.danger];
  const keys = ["created", "approved", "rejected"] as const;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" style={{ display: "block" }}>
      {[0, 0.5, 1].map((f) => (
        <line key={f} x1={padL} y1={padT + chartH * (1 - f)} x2={padL + chartW} y2={padT + chartH * (1 - f)}
          stroke={T.border} strokeWidth="1" />
      ))}
      {data.map((d, i) => {
        const groupX = padL + i * groupW + groupW * 0.125;
        return keys.map((k, ki) => {
          const barH = (d[k] / maxVal) * chartH;
          const x = groupX + ki * barW;
          const y = padT + chartH - barH;
          return (
            <rect key={`${i}-${k}`} x={x} y={y} width={barW - 1} height={barH}
              fill={colors[ki]} opacity="0.85" rx="2" />
          );
        });
      })}
      {data.map((d, i) => (
        <text key={i} x={padL + i * groupW + groupW / 2} y={h - 6}
          textAnchor="middle" fill={T.textMuted} fontSize="9">{d.date}</text>
      ))}
      <g transform={`translate(${padL}, ${padT - 4})`}>
        {keys.map((k, ki) => (
          <g key={k} transform={`translate(${ki * 90}, 0)`}>
            <rect x="0" y="2" width="10" height="8" fill={colors[ki]} rx="2" />
            <text x="14" y="10" fill={T.textSecondary} fontSize="10">{k.charAt(0).toUpperCase() + k.slice(1)}</text>
          </g>
        ))}
      </g>
    </svg>
  );
}

// ─── Progress Bar ─────────────────────────────────────────────────────────────
function ProgressBar({ label, pct }: { label: string; pct: number }) {
  const color = pct > 85 ? T.danger : pct > 70 ? T.warning : T.success;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span style={{ color: T.textSecondary, fontSize: 13 }}>{label}</span>
        <span style={{ color: T.textPrimary, fontSize: 13, fontWeight: 600 }}>{pct}%</span>
      </div>
      <div style={{ height: 6, background: T.bgSurface2, borderRadius: 99, overflow: "hidden" }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ height: "100%", background: color, borderRadius: 99 }}
        />
      </div>
    </div>
  );
}

// ─── Status Badge ─────────────────────────────────────────────────────────────
function StatusPill({ status }: { status: string }) {
  const map: Record<string, { bg: string; color: string }> = {
    APPROVED: { bg: "rgba(34,197,94,0.15)", color: T.success },
    ACTIVE: { bg: "rgba(59,130,246,0.15)", color: T.accent },
    PROCESSING: { bg: "rgba(245,158,11,0.15)", color: T.warning },
    REJECTED: { bg: "rgba(239,68,68,0.15)", color: T.danger },
    COMPLETED: { bg: "rgba(34,197,94,0.1)", color: T.success },
    PENDING: { bg: "rgba(107,114,128,0.2)", color: T.textSecondary },
    DRAFT: { bg: "rgba(107,114,128,0.15)", color: T.textMuted },
    CANCELLED: { bg: "rgba(239,68,68,0.1)", color: T.danger },
  };
  const s = map[status] ?? { bg: "rgba(107,114,128,0.2)", color: T.textSecondary };
  return (
    <span style={{ background: s.bg, color: s.color, padding: "2px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600, letterSpacing: "0.03em" }}>
      {status}
    </span>
  );
}

function UrgencyPill({ urgency }: { urgency: string }) {
  const map: Record<string, { bg: string; color: string }> = {
    HIGH: { bg: "rgba(239,68,68,0.15)", color: T.danger },
    MEDIUM: { bg: "rgba(245,158,11,0.15)", color: T.warning },
    LOW: { bg: "rgba(34,197,94,0.15)", color: T.success },
  };
  const s = map[urgency] ?? { bg: "rgba(107,114,128,0.2)", color: T.textSecondary };
  return (
    <span style={{ background: s.bg, color: s.color, padding: "2px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600 }}>
      {urgency}
    </span>
  );
}

// ─── Avatar ───────────────────────────────────────────────────────────────────
function AvatarComp({ name, size = 32 }: { name: string; size?: number }) {
  const colors = ["#3B82F6", "#8B5CF6", "#22C55E", "#F59E0B", "#EF4444", "#06B6D4"];
  const idx = name.charCodeAt(0) % colors.length;
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: colors[idx], display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: size * 0.35, fontWeight: 700, color: "#fff" }}>
      {getInitials(name)}
    </div>
  );
}

// ─── Card wrapper ─────────────────────────────────────────────────────────────
function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ background: T.bgSurface, border: `1px solid ${T.border}`, borderRadius: 12, overflow: "hidden", ...style }}>
      {children}
    </div>
  );
}

function CardHead({ title, subtitle, action }: { title: string; subtitle?: string; action?: React.ReactNode }) {
  return (
    <div style={{ padding: "16px 20px", borderBottom: `1px solid ${T.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div>
        <h3 style={{ color: T.textPrimary, fontSize: 14, fontWeight: 600, margin: 0 }}>{title}</h3>
        {subtitle && <p style={{ color: T.textMuted, fontSize: 12, margin: "2px 0 0" }}>{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

// ─── Loading Skeleton ─────────────────────────────────────────────────────────
function Skeleton({ w = "100%", h = 20 }: { w?: string | number; h?: number }) {
  return (
    <div style={{ width: w, height: h, background: T.bgSurfaceHover, borderRadius: 6, animation: "pulse 1.5s ease-in-out infinite" }} />
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const user = useAuthStore((s: { user: { firstName: string } | null }) => s.user);
  const firstName = user?.firstName ?? "there";

  const statsQuery = useDashboardStats();
  const activityQuery = useDashboardActivity();
  const revenueQuery = useRevenueChart();
  const ordersQuery = useOrdersChart();
  const supplierQuery = useSupplierChart();

  const revenueData = revenueQuery.data ?? REVENUE_DATA;
  const ordersData = ordersQuery.data ?? ORDERS_DATA;
  const supplierData = supplierQuery.data ?? SUPPLIER_DATA;
  const activityData = activityQuery.data ?? DUMMY_ACTIVITY;

  return (
    <div style={{ minHeight: "100vh", background: T.bgBase, color: T.textPrimary, padding: "0" }}>
      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
        @keyframes brainPulse { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.12);opacity:0.8} }
        @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
        @keyframes borderRotate { 0%{--border-angle:0deg} 100%{--border-angle:360deg} }
        .hover-row:hover { background: ${T.bgSurfaceHover} !important; }
        .btn-approve:hover { background: rgba(34,197,94,0.25) !important; }
        .btn-reject:hover { background: rgba(239,68,68,0.25) !important; }
        .view-all:hover { color: ${T.accent} !important; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: ${T.bgBase}; }
        ::-webkit-scrollbar-thumb { background: ${T.border}; border-radius: 3px; }
      `}</style>

      {/* ── Page Header ─────────────────────────────────────────── */}
      <motion.div {...fadeUp(0)} style={{ padding: "24px 28px 0", display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <span style={{ color: T.textMuted, fontSize: 12 }}>Home</span>
            <ChevronRight size={12} color={T.textMuted} />
            <span style={{ color: T.textSecondary, fontSize: 12 }}>Dashboard</span>
          </div>
          <h1 style={{ color: T.textPrimary, fontSize: 24, fontWeight: 700, margin: 0, letterSpacing: "-0.02em" }}>Dashboard</h1>
          <p style={{ color: T.textSecondary, fontSize: 14, margin: "4px 0 0" }}>
            Welcome back, <span style={{ color: T.accent, fontWeight: 600 }}>{firstName}</span>. Here&apos;s what&apos;s happening.
          </p>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <button style={{ display: "flex", alignItems: "center", gap: 6, background: T.bgSurface, border: `1px solid ${T.borderStrong}`, borderRadius: 8, padding: "8px 14px", color: T.textSecondary, fontSize: 13, cursor: "pointer" }}>
            <Calendar size={14} />
            Dec 1 – Dec 31, 2024
          </button>
          <button style={{ display: "flex", alignItems: "center", gap: 6, background: T.accent, border: "none", borderRadius: 8, padding: "8px 16px", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
            <Download size={14} />
            Export Report
          </button>
        </div>
      </motion.div>

      <div style={{ padding: "20px 28px", display: "flex", flexDirection: "column", gap: 20 }}>

        {/* ── Row 1: Primary KPIs ──────────────────────────────────── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {[
            { title: "Total Revenue", value: "$2.4M", trend: 12, icon: DollarSign, color: T.accent, sparkline: SPARKLINE_REVENUE },
            { title: "Total Orders", value: "1,847", trend: 8, icon: ShoppingCart, color: T.success, sparkline: SPARKLINE_ORDERS },
            { title: "Active Shipments", value: "423", trend: -3, icon: Truck, color: T.warning, sparkline: SPARKLINE_SHIPMENTS },
            { title: "Inventory Value", value: "$8.2M", trend: 5, icon: Package, color: T.accent, sparkline: SPARKLINE_INVENTORY },
          ].map((kpi, i) => (
            <motion.div key={kpi.title} {...fadeUp(i * 0.1)}>
              {statsQuery.isLoading ? (
                <div style={{ background: T.bgSurface, border: `1px solid ${T.border}`, borderRadius: 12, padding: 20, display: "flex", flexDirection: "column", gap: 12 }}>
                  <Skeleton h={14} w="60%" />
                  <Skeleton h={28} w="70%" />
                  <Skeleton h={12} w="80%" />
                </div>
              ) : (
                <KPICardComponent {...kpi} />
              )}
            </motion.div>
          ))}
        </div>

        {/* ── Row 2: Secondary Stats ───────────────────────────────── */}
        <motion.div {...fadeUp(0.2)} style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          <StatCardComponent title="Active Suppliers" value="247" icon={Building2} trend={2} color={T.accent} />
          <StatCardComponent title="Warehouse Capacity" value="78%" icon={Warehouse} trend={4} color={T.warning} />
          <StatCardComponent title="Risk Score" value="23 (Low)" icon={Shield} trend={-15} color={T.success} />
          <StatCardComponent title="AI Confidence" value="94%" icon={Brain} trend={2} color="#8B5CF6" />
        </motion.div>

        {/* ── Row 3: Area Chart + Donut Chart ──────────────────────── */}
        <motion.div {...fadeUp(0.25)} style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16 }}>
          {/* Area chart card */}
          <Card>
            <CardHead
              title="Procurement Spend Overview"
              subtitle="vs budget allocation — last 12 months"
              action={
                <span style={{ color: T.textMuted, fontSize: 11, background: T.bgSurface2, padding: "3px 10px", borderRadius: 20 }}>2024</span>
              }
            />
            <div style={{ padding: "16px 16px 8px" }}>
              {revenueQuery.isLoading ? (
                <Skeleton h={260} />
              ) : (
                <AreaChartComponent data={revenueData as typeof REVENUE_DATA} />
              )}
            </div>
          </Card>

          {/* Donut chart card */}
          <Card>
            <CardHead title="Supplier Distribution" subtitle="By category" />
            <div style={{ padding: "20px 16px", display: "flex", justifyContent: "center" }}>
              {supplierQuery.isLoading ? (
                <Skeleton h={280} />
              ) : (
                <DonutChartComponent data={supplierData as typeof SUPPLIER_DATA} />
              )}
            </div>
          </Card>
        </motion.div>

        {/* ── Row 4: Bar Chart + Warehouse Progress ────────────────── */}
        <motion.div {...fadeUp(0.3)} style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16 }}>
          {/* Bar chart */}
          <Card>
            <CardHead title="Order Processing" subtitle="Last 14 days — created / approved / rejected" />
            <div style={{ padding: "16px 16px 8px" }}>
              {ordersQuery.isLoading ? (
                <Skeleton h={200} />
              ) : (
                <BarChartComponent data={ordersData as typeof ORDERS_DATA} />
              )}
            </div>
          </Card>

          {/* Warehouse progress */}
          <Card>
            <CardHead title="Warehouse Capacity" subtitle="By location" />
            <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 16 }}>
              {WAREHOUSES.map((w) => <ProgressBar key={w.name} label={w.name} pct={w.pct} />)}
              <div style={{ marginTop: 4, display: "flex", gap: 12 }}>
                {[{ label: "Critical >85%", color: T.danger }, { label: "High >70%", color: T.warning }, { label: "Normal", color: T.success }].map((l) => (
                  <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: l.color }} />
                    <span style={{ color: T.textMuted, fontSize: 10 }}>{l.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* ── Row 5: Activity Feed + AI Insights ───────────────────── */}
        <motion.div {...fadeUp(0.35)} style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: 16 }}>
          {/* Activity Feed */}
          <Card>
            <CardHead
              title="Recent Activity"
              action={
                <button className="view-all" style={{ color: T.textMuted, fontSize: 12, background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, transition: "color 0.2s" }}>
                  View All <ChevronRight size={12} />
                </button>
              }
            />
            <div style={{ padding: "8px 0" }}>
              {activityQuery.isLoading ? (
                <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 12 }}>
                  {[...Array(5)].map((_, i) => <Skeleton key={i} h={52} />)}
                </div>
              ) : (
                <div>
                  {activityData.slice(0, 10).map((item, i) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.3 }}
                      className="hover-row"
                      style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 20px", transition: "background 0.15s", cursor: "pointer" }}
                    >
                      <AvatarComp name={item.user.name} size={34} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ color: T.textPrimary, fontSize: 13, fontWeight: 500, margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.title}</p>
                        <p style={{ color: T.textMuted, fontSize: 11, margin: "2px 0 0", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.description}</p>
                      </div>
                      <div style={{ textAlign: "right", flexShrink: 0 }}>
                        <StatusPill status={item.status} />
                        <p style={{ color: T.textMuted, fontSize: 10, margin: "3px 0 0" }}>{item.timestamp}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </Card>

          {/* AI Insights */}
          <div style={{ background: T.bgSurface, borderRadius: 12, overflow: "hidden", position: "relative", border: "1px solid transparent", backgroundClip: "padding-box" }}>
            {/* Animated border shimmer */}
            <div style={{ position: "absolute", inset: 0, borderRadius: 12, padding: 1, background: `linear-gradient(135deg, ${T.accent}, #8B5CF6, ${T.success}, ${T.accent})`, backgroundSize: "300% 300%", animation: "shimmer 4s linear infinite", zIndex: 0, pointerEvents: "none" }}>
              <div style={{ inset: 1, position: "absolute", background: T.bgSurface, borderRadius: 11 }} />
            </div>
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ padding: "16px 20px", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ background: T.accentGlow, borderRadius: 8, padding: 8 }}>
                  <Brain size={18} color={T.accent} style={{ animation: "brainPulse 2s ease-in-out infinite" }} />
                </div>
                <div>
                  <h3 style={{ color: T.textPrimary, fontSize: 14, fontWeight: 600, margin: 0 }}>AI Insights</h3>
                  <p style={{ color: T.textMuted, fontSize: 11, margin: 0 }}>Powered by AUTONOMOUS PROCUREMENT AND LOGISTICS BRAIN</p>
                </div>
                <span style={{ marginLeft: "auto", background: "rgba(34,197,94,0.1)", color: T.success, fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 20 }}>LIVE</span>
              </div>
              <div style={{ padding: "8px 0" }}>
                {AI_INSIGHTS.map((insight, i) => (
                  <motion.div
                    key={insight.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.08 }}
                    className="hover-row"
                    style={{ display: "flex", gap: 12, padding: "12px 20px", cursor: "pointer", transition: "background 0.15s" }}
                  >
                    <div style={{ background: `${insight.color}20`, borderRadius: 8, padding: 7, flexShrink: 0, height: "fit-content" }}>
                      <insight.icon size={14} color={insight.color} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ color: T.textPrimary, fontSize: 13, fontWeight: 600, margin: 0 }}>{insight.title}</p>
                      <p style={{ color: T.textMuted, fontSize: 11, margin: "3px 0 5px", lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{insight.desc}</p>
                      <span style={{ background: `${T.accent}20`, color: T.accent, fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20 }}>
                        {insight.confidence}% confidence
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Row 6: Pending Approvals ──────────────────────────────── */}
        <motion.div {...fadeUp(0.4)}>
          <Card>
            <CardHead
              title="Pending Approvals"
              subtitle={`${PENDING_APPROVALS.length} requests awaiting review`}
              action={
                <button style={{ background: T.accent, border: "none", borderRadius: 8, padding: "7px 16px", color: "#fff", fontSize: 12, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 5 }}>
                  View All <ChevronRight size={12} />
                </button>
              }
            />
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${T.border}` }}>
                    {["Request #", "Title", "Requester", "Amount", "Urgency", "Submitted", "Actions"].map((h) => (
                      <th key={h} style={{ padding: "10px 16px", textAlign: "left", color: T.textMuted, fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em", whiteSpace: "nowrap" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {PENDING_APPROVALS.map((req, i) => (
                    <motion.tr
                      key={req.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.45 + i * 0.05 }}
                      className="hover-row"
                      style={{ borderBottom: `1px solid ${T.border}`, transition: "background 0.15s", cursor: "pointer" }}
                    >
                      <td style={{ padding: "12px 16px", color: T.accent, fontSize: 13, fontWeight: 600 }}>{req.id}</td>
                      <td style={{ padding: "12px 16px", color: T.textPrimary, fontSize: 13 }}>{req.title}</td>
                      <td style={{ padding: "12px 16px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <AvatarComp name={req.requester} size={26} />
                          <span style={{ color: T.textSecondary, fontSize: 13 }}>{req.requester}</span>
                        </div>
                      </td>
                      <td style={{ padding: "12px 16px", color: T.textPrimary, fontSize: 13, fontWeight: 600 }}>{req.amount}</td>
                      <td style={{ padding: "12px 16px" }}><UrgencyPill urgency={req.urgency} /></td>
                      <td style={{ padding: "12px 16px", color: T.textMuted, fontSize: 12 }}>{req.submitted}</td>
                      <td style={{ padding: "12px 16px" }}>
                        <div style={{ display: "flex", gap: 8 }}>
                          <button className="btn-approve" style={{ display: "flex", alignItems: "center", gap: 4, background: "rgba(34,197,94,0.1)", border: `1px solid rgba(34,197,94,0.3)`, borderRadius: 6, padding: "5px 12px", color: T.success, fontSize: 12, fontWeight: 600, cursor: "pointer", transition: "background 0.15s" }}>
                            <CheckCircle size={12} /> Approve
                          </button>
                          <button className="btn-reject" style={{ display: "flex", alignItems: "center", gap: 4, background: "rgba(239,68,68,0.1)", border: `1px solid rgba(239,68,68,0.3)`, borderRadius: 6, padding: "5px 12px", color: T.danger, fontSize: 12, fontWeight: 600, cursor: "pointer", transition: "background 0.15s" }}>
                            <XCircle size={12} /> Reject
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </motion.div>

      </div>
    </div>
  );
}
