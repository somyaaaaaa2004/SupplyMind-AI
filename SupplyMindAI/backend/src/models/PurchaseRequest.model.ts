import mongoose, { Document, Model, Schema } from "mongoose";

export type PRUrgency = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
export type PRStatus =
  | "DRAFT"
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "CANCELLED"
  | "PROCESSING"
  | "COMPLETED";
export type ApprovalStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface IPRItem {
  name: string;
  description?: string;
  quantity: number;
  estimatedUnitPrice: number;
  unit: string;
}

export interface IApprovalStep {
  approverId: mongoose.Types.ObjectId;
  status: ApprovalStatus;
  comment?: string;
  actedAt?: Date;
  level: number;
}

export interface IAttachment {
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  uploadedBy: mongoose.Types.ObjectId;
  uploadedAt: Date;
}

export interface IPRComment {
  userId: mongoose.Types.ObjectId;
  text: string;
  createdAt: Date;
}

export interface IPurchaseRequest {
  requestNumber: string;
  title: string;
  description?: string;
  requesterId: mongoose.Types.ObjectId;
  departmentId?: string;
  category: string;
  estimatedBudget: number;
  currency: string;
  urgency: PRUrgency;
  status: PRStatus;
  items: IPRItem[];
  approvalWorkflow: IApprovalStep[];
  attachments: IAttachment[];
  comments: IPRComment[];
  approvedBy?: mongoose.Types.ObjectId;
  approvedAt?: Date;
  rejectedBy?: mongoose.Types.ObjectId;
  rejectedAt?: Date;
  rejectionReason?: string;
  purchaseOrderId?: mongoose.Types.ObjectId;
  organizationId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export type PurchaseRequestDocument = Document & IPurchaseRequest;
export type PurchaseRequestModel = Model<IPurchaseRequest>;

const prItemSchema = new Schema<IPRItem>(
  {
    name: { type: String, required: true },
    description: { type: String },
    quantity: { type: Number, required: true },
    estimatedUnitPrice: { type: Number, required: true },
    unit: { type: String, required: true },
  },
  { _id: true },
);

const approvalStepSchema = new Schema<IApprovalStep>(
  {
    approverId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, enum: ["PENDING", "APPROVED", "REJECTED"], default: "PENDING" },
    comment: { type: String },
    actedAt: { type: Date },
    level: { type: Number, required: true },
  },
  { _id: true },
);

const attachmentSchema = new Schema<IAttachment>(
  {
    filename: { type: String, required: true },
    originalName: { type: String, required: true },
    mimeType: { type: String, required: true },
    size: { type: Number, required: true },
    url: { type: String, required: true },
    uploadedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    uploadedAt: { type: Date, default: Date.now },
  },
  { _id: true },
);

const prCommentSchema = new Schema<IPRComment>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: true },
);

const purchaseRequestSchema = new Schema<IPurchaseRequest>(
  {
    requestNumber: { type: String, required: true, unique: true },
    title: { type: String, required: true, trim: true },
    description: { type: String },
    requesterId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    departmentId: { type: String },
    category: { type: String, required: true },
    estimatedBudget: { type: Number, required: true },
    currency: { type: String, default: "USD" },
    urgency: { type: String, enum: ["LOW", "MEDIUM", "HIGH", "CRITICAL"], required: true },
    status: {
      type: String,
      enum: ["DRAFT", "PENDING", "APPROVED", "REJECTED", "CANCELLED", "PROCESSING", "COMPLETED"],
      default: "DRAFT",
    },
    items: [prItemSchema],
    approvalWorkflow: [approvalStepSchema],
    attachments: [attachmentSchema],
    comments: [prCommentSchema],
    approvedBy: { type: Schema.Types.ObjectId, ref: "User" },
    approvedAt: { type: Date },
    rejectedBy: { type: Schema.Types.ObjectId, ref: "User" },
    rejectedAt: { type: Date },
    rejectionReason: { type: String },
    purchaseOrderId: { type: Schema.Types.ObjectId, ref: "PurchaseOrder" },
    organizationId: { type: Schema.Types.ObjectId, ref: "Organization", required: true },
    deletedAt: { type: Date },
  },
  { timestamps: true },
);

purchaseRequestSchema.index({ organizationId: 1, status: 1 });
purchaseRequestSchema.index({ organizationId: 1, requesterId: 1 });

export const PurchaseRequest = mongoose.model<IPurchaseRequest, PurchaseRequestModel>(
  "PurchaseRequest",
  purchaseRequestSchema,
);
