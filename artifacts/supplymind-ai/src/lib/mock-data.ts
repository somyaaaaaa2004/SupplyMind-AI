// Dummy/demo data for AUTONOMOUS PROCUREMENT AND LOGISTICS BRAIN.
// No backend is wired up yet -- everything
// here is static seed data used to make the product feel real end to end.

export type Role =
  | 'admin'
  | 'procurement_manager'
  | 'approver'
  | 'buyer'
  | 'vendor_manager'
  | 'viewer';

export const ROLE_LABELS: Record<Role, string> = {
  admin: 'Administrator',
  procurement_manager: 'Procurement Manager',
  approver: 'Approver',
  buyer: 'Buyer',
  vendor_manager: 'Vendor Manager',
  viewer: 'Viewer',
};

export interface DemoUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  department: string;
  avatarInitials: string;
}

export const DEMO_USERS: DemoUser[] = [
  {
    id: 'u1',
    name: 'Avery Chen',
    email: 'avery.chen@supplymind.ai',
    role: 'admin',
    department: 'Operations',
    avatarInitials: 'AC',
  },
  {
    id: 'u2',
    name: 'Priya Natarajan',
    email: 'priya.n@supplymind.ai',
    role: 'procurement_manager',
    department: 'Procurement',
    avatarInitials: 'PN',
  },
  {
    id: 'u3',
    name: 'Marcus Webb',
    email: 'marcus.webb@supplymind.ai',
    role: 'approver',
    department: 'Finance',
    avatarInitials: 'MW',
  },
];

export interface Kpi {
  id: string;
  label: string;
  value: string;
  delta: number;
  deltaLabel: string;
  trend: 'up' | 'down';
  good: boolean;
  sparkline: number[];
}

export const KPIS: Kpi[] = [
  {
    id: 'spend',
    label: 'Total Spend (MTD)',
    value: '$4.82M',
    delta: 8.4,
    deltaLabel: 'vs last month',
    trend: 'up',
    good: false,
    sparkline: [3.9, 4.0, 4.1, 4.3, 4.2, 4.5, 4.6, 4.7, 4.75, 4.82],
  },
  {
    id: 'savings',
    label: 'Cost Savings (YTD)',
    value: '$612K',
    delta: 14.2,
    deltaLabel: 'vs target',
    trend: 'up',
    good: true,
    sparkline: [420, 440, 470, 500, 520, 550, 560, 580, 600, 612],
  },
  {
    id: 'open-pos',
    label: 'Open Purchase Orders',
    value: '286',
    delta: -5.1,
    deltaLabel: 'vs last week',
    trend: 'down',
    good: true,
    sparkline: [320, 310, 305, 300, 298, 295, 292, 290, 288, 286],
  },
  {
    id: 'cycle-time',
    label: 'Avg. Approval Cycle',
    value: '2.3 days',
    delta: -18.0,
    deltaLabel: 'vs last quarter',
    trend: 'down',
    good: true,
    sparkline: [3.4, 3.2, 3.0, 2.9, 2.8, 2.6, 2.5, 2.4, 2.35, 2.3],
  },
  {
    id: 'vendor-risk',
    label: 'Vendors On-Time %',
    value: '94.6%',
    delta: 2.1,
    deltaLabel: 'vs last month',
    trend: 'up',
    good: true,
    sparkline: [90, 90.5, 91, 91.8, 92.5, 93, 93.4, 94, 94.3, 94.6],
  },
  {
    id: 'inventory',
    label: 'Inventory Turnover',
    value: '6.8x',
    delta: 3.6,
    deltaLabel: 'vs last quarter',
    trend: 'up',
    good: true,
    sparkline: [5.9, 6.0, 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7, 6.8],
  },
];

export const SPEND_TREND = [
  { month: 'Feb', spend: 3.6, budget: 4.0 },
  { month: 'Mar', spend: 3.9, budget: 4.0 },
  { month: 'Apr', spend: 4.1, budget: 4.1 },
  { month: 'May', spend: 3.8, budget: 4.1 },
  { month: 'Jun', spend: 4.3, budget: 4.2 },
  { month: 'Jul', spend: 4.5, budget: 4.2 },
  { month: 'Aug', spend: 4.4, budget: 4.3 },
  { month: 'Sep', spend: 4.6, budget: 4.3 },
  { month: 'Oct', spend: 4.7, budget: 4.4 },
  { month: 'Nov', spend: 4.75, budget: 4.4 },
  { month: 'Dec', spend: 4.9, budget: 4.5 },
  { month: 'Jan', spend: 4.82, budget: 4.6 },
];

export const CATEGORY_BREAKDOWN = [
  { name: 'Raw Materials', value: 38, color: 'var(--color-chart-1)' },
  { name: 'Logistics', value: 22, color: 'var(--color-chart-2)' },
  { name: 'IT & Software', value: 16, color: 'var(--color-chart-3)' },
  { name: 'MRO & Facilities', value: 14, color: 'var(--color-chart-4)' },
  { name: 'Professional Services', value: 10, color: 'var(--color-chart-5)' },
];

export const TOP_VENDORS_CHART = [
  { name: 'Nexus Components', spend: 812 },
  { name: 'Atlas Freight', spend: 654 },
  { name: 'Meridian Steel', spend: 598 },
  { name: 'Cascade Logistics', spend: 421 },
  { name: 'Vertex Materials', spend: 388 },
];

export interface ActivityItem {
  id: string;
  actor: string;
  action: string;
  target: string;
  time: string;
  type: 'approval' | 'order' | 'vendor' | 'alert' | 'request';
}

export const ACTIVITY_FEED: ActivityItem[] = [
  {
    id: 'a1',
    actor: 'Marcus Webb',
    action: 'approved',
    target: 'PR-2451 — Steel coil restock',
    time: '6 min ago',
    type: 'approval',
  },
  {
    id: 'a2',
    actor: 'System',
    action: 'flagged a price anomaly on',
    target: 'PO-1187 with Nexus Components',
    time: '22 min ago',
    type: 'alert',
  },
  {
    id: 'a3',
    actor: 'Priya Natarajan',
    action: 'issued RFQ',
    target: 'RFQ-0092 to 4 vendors',
    time: '1 hr ago',
    type: 'request',
  },
  {
    id: 'a4',
    actor: 'Atlas Freight',
    action: 'confirmed delivery for',
    target: 'PO-1180',
    time: '2 hr ago',
    type: 'order',
  },
  {
    id: 'a5',
    actor: 'Avery Chen',
    action: 'onboarded new vendor',
    target: 'Solstice Packaging Co.',
    time: '4 hr ago',
    type: 'vendor',
  },
  {
    id: 'a6',
    actor: 'System',
    action: 'auto-approved',
    target: 'PR-2449 (under threshold)',
    time: '5 hr ago',
    type: 'approval',
  },
];

export interface AiInsight {
  id: string;
  title: string;
  description: string;
  severity: 'info' | 'warning' | 'critical';
  cta: string;
}

export const AI_INSIGHTS: AiInsight[] = [
  {
    id: 'i1',
    title: 'Consolidate steel orders to save ~$48K',
    description:
      'Merging PR-2451 and PR-2458 into a single order with Meridian Steel qualifies for a volume discount tier.',
    severity: 'info',
    cta: 'Review recommendation',
  },
  {
    id: 'i2',
    title: 'Nexus Components price drift detected',
    description:
      'Unit price on connector assemblies is 11% above the 90-day rolling average across 3 recent POs.',
    severity: 'warning',
    cta: 'Investigate pricing',
  },
  {
    id: 'i3',
    title: 'Single-source risk: Cascade Logistics',
    description:
      '68% of West Coast freight volume routes through one carrier. Consider qualifying a backup vendor.',
    severity: 'critical',
    cta: 'View risk report',
  },
  {
    id: 'i4',
    title: 'Forecasted stockout in 12 days',
    description:
      'Polymer resin inventory will fall below safety stock by Jul 25 at current consumption rate.',
    severity: 'warning',
    cta: 'Create purchase request',
  },
];

export type PRStatus =
  | 'draft'
  | 'pending_approval'
  | 'approved'
  | 'rejected'
  | 'converted';

export const PR_STATUS_LABEL: Record<PRStatus, string> = {
  draft: 'Draft',
  pending_approval: 'Pending Approval',
  approved: 'Approved',
  rejected: 'Rejected',
  converted: 'Converted to PO',
};

export interface Comment {
  id: string;
  author: string;
  text: string;
  time: string;
}

export interface ApprovalStep {
  step: string;
  approver: string;
  status: 'pending' | 'approved' | 'rejected';
  time?: string;
}

export interface PurchaseRequest {
  id: string;
  title: string;
  requester: string;
  department: string;
  category: string;
  amount: number;
  currency: string;
  status: PRStatus;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdAt: string;
  neededBy: string;
  vendor?: string;
  items: { name: string; qty: number; unitPrice: number }[];
  approvalTimeline: ApprovalStep[];
  comments: Comment[];
  attachments: string[];
}

export const PURCHASE_REQUESTS: PurchaseRequest[] = [
  {
    id: 'PR-2451',
    title: 'Steel coil restock — Q3 production',
    requester: 'Diego Alvarez',
    department: 'Manufacturing',
    category: 'Raw Materials',
    amount: 184500,
    currency: 'USD',
    status: 'approved',
    priority: 'high',
    createdAt: '2026-07-08',
    neededBy: '2026-07-28',
    vendor: 'Meridian Steel',
    items: [
      { name: 'Cold-rolled steel coil, 2mm', qty: 40, unitPrice: 3850 },
      { name: 'Freight & handling', qty: 1, unitPrice: 12500 },
    ],
    approvalTimeline: [
      { step: 'Manager review', approver: 'Priya Natarajan', status: 'approved', time: 'Jul 8, 10:02 AM' },
      { step: 'Finance approval', approver: 'Marcus Webb', status: 'approved', time: 'Jul 8, 4:41 PM' },
    ],
    comments: [
      { id: 'c1', author: 'Priya Natarajan', text: 'Confirmed with Meridian — lead time is 9 business days.', time: 'Jul 8, 10:00 AM' },
    ],
    attachments: ['meridian-quote-2451.pdf'],
  },
  {
    id: 'PR-2458',
    title: 'Additional steel coil — line 3 expansion',
    requester: 'Diego Alvarez',
    department: 'Manufacturing',
    category: 'Raw Materials',
    amount: 96200,
    currency: 'USD',
    status: 'pending_approval',
    priority: 'medium',
    createdAt: '2026-07-10',
    neededBy: '2026-08-02',
    vendor: 'Meridian Steel',
    items: [{ name: 'Cold-rolled steel coil, 2mm', qty: 20, unitPrice: 3850 }],
    approvalTimeline: [
      { step: 'Manager review', approver: 'Priya Natarajan', status: 'approved', time: 'Jul 10, 9:12 AM' },
      { step: 'Finance approval', approver: 'Marcus Webb', status: 'pending' },
    ],
    comments: [],
    attachments: [],
  },
  {
    id: 'PR-2460',
    title: 'Cloud data warehouse expansion',
    requester: 'Lena Ford',
    department: 'IT',
    category: 'IT & Software',
    amount: 42000,
    currency: 'USD',
    status: 'pending_approval',
    priority: 'high',
    createdAt: '2026-07-11',
    neededBy: '2026-07-20',
    items: [{ name: 'Annual warehouse compute reservation', qty: 1, unitPrice: 42000 }],
    approvalTimeline: [
      { step: 'Manager review', approver: 'Priya Natarajan', status: 'pending' },
    ],
    comments: [
      { id: 'c2', author: 'Lena Ford', text: 'This unblocks the new forecasting models — flagged as high priority.', time: 'Jul 11, 2:15 PM' },
    ],
    attachments: ['vendor-proposal.pdf', 'cost-comparison.xlsx'],
  },
  {
    id: 'PR-2462',
    title: 'Pallet wrap & packaging supplies',
    requester: 'Sam Okafor',
    department: 'Warehouse',
    category: 'MRO & Facilities',
    amount: 8750,
    currency: 'USD',
    status: 'converted',
    priority: 'low',
    createdAt: '2026-07-02',
    neededBy: '2026-07-15',
    vendor: 'Solstice Packaging Co.',
    items: [
      { name: 'Stretch wrap rolls', qty: 200, unitPrice: 18 },
      { name: 'Corner protectors', qty: 500, unitPrice: 9.5 },
    ],
    approvalTimeline: [
      { step: 'Auto-approved (under threshold)', approver: 'System', status: 'approved', time: 'Jul 2, 8:00 AM' },
    ],
    comments: [],
    attachments: [],
  },
  {
    id: 'PR-2465',
    title: 'Freight contract renewal — West Coast lanes',
    requester: 'Priya Natarajan',
    department: 'Procurement',
    category: 'Logistics',
    amount: 265000,
    currency: 'USD',
    status: 'draft',
    priority: 'medium',
    createdAt: '2026-07-12',
    neededBy: '2026-09-01',
    items: [{ name: 'Annual freight contract — Lanes 4-9', qty: 1, unitPrice: 265000 }],
    approvalTimeline: [],
    comments: [],
    attachments: [],
  },
  {
    id: 'PR-2440',
    title: 'Contractor: SOC2 audit prep',
    requester: 'Avery Chen',
    department: 'Operations',
    category: 'Professional Services',
    amount: 31000,
    currency: 'USD',
    status: 'rejected',
    priority: 'low',
    createdAt: '2026-06-28',
    neededBy: '2026-07-10',
    items: [{ name: 'External audit consulting, 3 weeks', qty: 1, unitPrice: 31000 }],
    approvalTimeline: [
      { step: 'Finance approval', approver: 'Marcus Webb', status: 'rejected', time: 'Jun 29, 11:00 AM' },
    ],
    comments: [
      { id: 'c3', author: 'Marcus Webb', text: 'Re-scope with in-house team first; resubmit if still needed.', time: 'Jun 29, 11:00 AM' },
    ],
    attachments: [],
  },
];

export type POStatus = 'issued' | 'in_transit' | 'delivered' | 'closed' | 'disputed';

export const PO_STATUS_LABEL: Record<POStatus, string> = {
  issued: 'Issued',
  in_transit: 'In Transit',
  delivered: 'Delivered',
  closed: 'Closed',
  disputed: 'Disputed',
};

export interface PurchaseOrder {
  id: string;
  prId?: string;
  vendor: string;
  amount: number;
  status: POStatus;
  issuedAt: string;
  expectedDelivery: string;
  items: { name: string; qty: number; unitPrice: number }[];
}

export const PURCHASE_ORDERS: PurchaseOrder[] = [
  { id: 'PO-1187', prId: 'PR-2410', vendor: 'Nexus Components', amount: 152300, status: 'in_transit', issuedAt: '2026-06-30', expectedDelivery: '2026-07-18', items: [{ name: 'Connector assembly, type-C', qty: 12000, unitPrice: 12.69 }] },
  { id: 'PO-1180', prId: 'PR-2398', vendor: 'Atlas Freight', amount: 88900, status: 'delivered', issuedAt: '2026-06-20', expectedDelivery: '2026-07-05', items: [{ name: 'LTL freight — Midwest region', qty: 1, unitPrice: 88900 }] },
  { id: 'PO-1179', prId: 'PR-2451', vendor: 'Meridian Steel', amount: 184500, status: 'issued', issuedAt: '2026-07-09', expectedDelivery: '2026-07-28', items: [{ name: 'Cold-rolled steel coil, 2mm', qty: 40, unitPrice: 3850 }] },
  { id: 'PO-1172', prId: 'PR-2462', vendor: 'Solstice Packaging Co.', amount: 8750, status: 'delivered', issuedAt: '2026-07-03', expectedDelivery: '2026-07-09', items: [{ name: 'Stretch wrap rolls', qty: 200, unitPrice: 18 }] },
  { id: 'PO-1165', vendor: 'Vertex Materials', amount: 62400, status: 'closed', issuedAt: '2026-06-01', expectedDelivery: '2026-06-15', items: [{ name: 'Polymer resin pellets', qty: 8000, unitPrice: 7.8 }] },
  { id: 'PO-1159', vendor: 'Cascade Logistics', amount: 41200, status: 'disputed', issuedAt: '2026-05-22', expectedDelivery: '2026-06-01', items: [{ name: 'West Coast freight — June', qty: 1, unitPrice: 41200 }] },
];

export type VendorStatus = 'active' | 'pending_review' | 'suspended';

export interface Vendor {
  id: string;
  name: string;
  category: string;
  rating: number;
  status: VendorStatus;
  onTimeRate: number;
  ytdSpend: number;
  contact: string;
  email: string;
  location: string;
}

export const VENDORS: Vendor[] = [
  { id: 'v1', name: 'Nexus Components', category: 'Electronics', rating: 4.6, status: 'active', onTimeRate: 96, ytdSpend: 812000, contact: 'Hana Kim', email: 'hana.kim@nexuscomp.com', location: 'Seoul, KR' },
  { id: 'v2', name: 'Atlas Freight', category: 'Logistics', rating: 4.3, status: 'active', onTimeRate: 93, ytdSpend: 654000, contact: 'Ben Torres', email: 'ben.t@atlasfreight.com', location: 'Chicago, US' },
  { id: 'v3', name: 'Meridian Steel', category: 'Raw Materials', rating: 4.8, status: 'active', onTimeRate: 98, ytdSpend: 598000, contact: 'Ingrid Voss', email: 'ingrid@meridiansteel.eu', location: 'Essen, DE' },
  { id: 'v4', name: 'Cascade Logistics', category: 'Logistics', rating: 3.4, status: 'pending_review', onTimeRate: 81, ytdSpend: 421000, contact: 'Owen Marsh', email: 'owen@cascadelog.com', location: 'Portland, US' },
  { id: 'v5', name: 'Vertex Materials', category: 'Raw Materials', rating: 4.1, status: 'active', onTimeRate: 90, ytdSpend: 388000, contact: 'Sofia Reyes', email: 'sofia@vertexmat.com', location: 'Monterrey, MX' },
  { id: 'v6', name: 'Solstice Packaging Co.', category: 'Packaging', rating: 4.5, status: 'active', onTimeRate: 97, ytdSpend: 96000, contact: 'Theo James', email: 'theo@solsticepkg.com', location: 'Austin, US' },
  { id: 'v7', name: 'Ironclad Fasteners', category: 'MRO & Facilities', rating: 2.9, status: 'suspended', onTimeRate: 62, ytdSpend: 54000, contact: 'Wendy Zhao', email: 'wendy@ironcladf.com', location: 'Shenzhen, CN' },
  { id: 'v8', name: 'Cirrus IT Solutions', category: 'IT & Software', rating: 4.7, status: 'active', onTimeRate: 99, ytdSpend: 128000, contact: 'Noah Park', email: 'noah@cirrusit.com', location: 'Remote' },
];

export interface RFQResponse {
  vendor: string;
  price: number;
  leadTimeDays: number;
  status: 'submitted' | 'awaiting' | 'declined';
}

export interface RFQ {
  id: string;
  title: string;
  issuedBy: string;
  issuedAt: string;
  deadline: string;
  status: 'open' | 'closed' | 'awarded';
  responses: RFQResponse[];
}

export const RFQS: RFQ[] = [
  {
    id: 'RFQ-0092',
    title: 'Injection-molded housing units, 50K volume',
    issuedBy: 'Priya Natarajan',
    issuedAt: '2026-07-12',
    deadline: '2026-07-22',
    status: 'open',
    responses: [
      { vendor: 'Nexus Components', price: 2.14, leadTimeDays: 21, status: 'submitted' },
      { vendor: 'Vertex Materials', price: 2.32, leadTimeDays: 18, status: 'submitted' },
      { vendor: 'Cirrus IT Solutions', price: 0, leadTimeDays: 0, status: 'declined' },
      { vendor: 'Ironclad Fasteners', price: 0, leadTimeDays: 0, status: 'awaiting' },
    ],
  },
  {
    id: 'RFQ-0091',
    title: 'Corporate laptop refresh — 400 units',
    issuedBy: 'Lena Ford',
    issuedAt: '2026-07-05',
    deadline: '2026-07-19',
    status: 'open',
    responses: [
      { vendor: 'Cirrus IT Solutions', price: 1180, leadTimeDays: 14, status: 'submitted' },
      { vendor: 'Nexus Components', price: 1245, leadTimeDays: 20, status: 'submitted' },
    ],
  },
  {
    id: 'RFQ-0087',
    title: 'West Coast LTL freight — Q4',
    issuedBy: 'Priya Natarajan',
    issuedAt: '2026-06-18',
    deadline: '2026-06-30',
    status: 'awarded',
    responses: [
      { vendor: 'Atlas Freight', price: 84500, leadTimeDays: 5, status: 'submitted' },
      { vendor: 'Cascade Logistics', price: 79900, leadTimeDays: 6, status: 'submitted' },
    ],
  },
  {
    id: 'RFQ-0083',
    title: 'Recycled resin pellets, annual supply',
    issuedBy: 'Diego Alvarez',
    issuedAt: '2026-06-01',
    deadline: '2026-06-15',
    status: 'closed',
    responses: [
      { vendor: 'Vertex Materials', price: 7.8, leadTimeDays: 30, status: 'submitted' },
      { vendor: 'Meridian Steel', price: 0, leadTimeDays: 0, status: 'declined' },
    ],
  },
];

export function formatCurrency(value: number, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: value % 1 === 0 ? 0 : 2,
  }).format(value);
}
