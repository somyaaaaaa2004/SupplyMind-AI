/**
 * Procurement feature types and interfaces.
 */

// ─── Status Enums ─────────────────────────────────────────────────────────────

export type PRStatus =
  | 'DRAFT'
  | 'PENDING'
  | 'APPROVED'
  | 'REJECTED'
  | 'CANCELLED'
  | 'PROCESSING'
  | 'COMPLETED';

export type POStatus =
  | 'DRAFT'
  | 'PENDING'
  | 'SENT'
  | 'ACKNOWLEDGED'
  | 'PARTIALLY_RECEIVED'
  | 'RECEIVED'
  | 'CANCELLED'
  | 'DISPUTED';

export type RFQStatus =
  | 'DRAFT'
  | 'SENT'
  | 'QUOTES_RECEIVED'
  | 'AWARDED'
  | 'CANCELLED';

export type VendorStatus = 'ACTIVE' | 'INACTIVE' | 'PENDING' | 'BLOCKED';

export type UrgencyLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

// ─── Core Interfaces ──────────────────────────────────────────────────────────

export interface PRItem {
  id: string;
  name: string;
  description?: string;
  quantity: number;
  unit: string;
  estimatedUnitPrice: number;
  totalPrice: number;
  category?: string;
  sku?: string;
}

export interface POItem {
  id: string;
  name: string;
  description?: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  totalPrice: number;
  receivedQuantity?: number;
  sku?: string;
  prItemId?: string;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
}

export interface Attachment {
  id: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  url: string;
  uploadedBy: string;
  uploadedAt: string;
}

export interface ApprovalStep {
  id: string;
  label: string;
  status: 'pending' | 'approved' | 'rejected' | 'skipped';
  user?: string;
  userId?: string;
  time?: string;
  comment?: string;
}

// ─── Purchase Request ─────────────────────────────────────────────────────────

export interface PurchaseRequest {
  id: string;
  requestNumber: string;
  title: string;
  description?: string;
  status: PRStatus;
  urgency: UrgencyLevel;
  category: string;
  estimatedBudget: number;
  currency: string;
  requesterId: string;
  requesterName: string;
  requesterAvatar?: string;
  approverId?: string;
  approverName?: string;
  items: PRItem[];
  comments: Comment[];
  attachments: Attachment[];
  approvalSteps: ApprovalStep[];
  submittedAt?: string;
  approvedAt?: string;
  rejectedAt?: string;
  rejectionReason?: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Purchase Order ───────────────────────────────────────────────────────────

export interface PurchaseOrder {
  id: string;
  orderNumber: string;
  title?: string;
  status: POStatus;
  vendorId: string;
  vendorName: string;
  vendorLogo?: string;
  prId?: string;
  prNumber?: string;
  items: POItem[];
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  total: number;
  currency: string;
  paymentTerms: string;
  deliveryAddress: string;
  expectedDelivery: string;
  actualDelivery?: string;
  notes?: string;
  createdById: string;
  createdByName: string;
  comments: Comment[];
  attachments: Attachment[];
  createdAt: string;
  updatedAt: string;
}

// ─── Vendor ───────────────────────────────────────────────────────────────────

export interface Vendor {
  id: string;
  name: string;
  email: string;
  phone?: string;
  website?: string;
  country: string;
  countryFlag?: string;
  category: string;
  status: VendorStatus;
  rating: number;
  totalOrders: number;
  totalSpend: number;
  currency: string;
  paymentTerms: string;
  contactPerson: string;
  contactEmail?: string;
  logoUrl?: string;
  address?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// ─── RFQ ──────────────────────────────────────────────────────────────────────

export interface RFQVendor {
  vendorId: string;
  vendorName: string;
  status: 'INVITED' | 'DECLINED' | 'QUOTED' | 'AWARDED';
  quotedAt?: string;
}

export interface RFQQuote {
  id: string;
  vendorId: string;
  vendorName: string;
  items: Array<{
    name: string;
    unitPrice: number;
    quantity: number;
    totalPrice: number;
    deliveryDays: number;
  }>;
  totalAmount: number;
  deliveryDays: number;
  paymentTerms: string;
  validUntil: string;
  notes?: string;
  submittedAt: string;
}

export interface RFQ {
  id: string;
  rfqNumber: string;
  title: string;
  description?: string;
  status: RFQStatus;
  vendors: RFQVendor[];
  items: PRItem[];
  quotes: RFQQuote[];
  deadline: string;
  notes?: string;
  awardedVendorId?: string;
  awardedVendorName?: string;
  createdById: string;
  createdByName: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Filter / Pagination ──────────────────────────────────────────────────────

export interface PRFilters {
  search?: string;
  status?: string;
  urgency?: string;
  category?: string;
  dateFrom?: string;
  dateTo?: string;
  sort?: string;
  order?: 'asc' | 'desc';
}

export interface POFilters {
  search?: string;
  status?: string;
  vendorId?: string;
  dateFrom?: string;
  dateTo?: string;
}

export interface VendorFilters {
  search?: string;
  status?: string;
  category?: string;
}

export interface RFQFilters {
  search?: string;
  status?: string;
}

export interface PaginationState {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}
