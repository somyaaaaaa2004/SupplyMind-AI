import mongoose, { Document, Model, Schema } from "mongoose";

export type POStatus =
  | "DRAFT"
  | "SENT"
  | "ACKNOWLEDGED"
  | "DELIVERED"
  | "CANCELLED"
  | "DISPUTED";

export interface IPOItem {
  name: string;
  description?: string;
  quantity: number;
  actualUnitPrice: number;
  unit: string;
}

export interface IPOAttachment {
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  uploadedBy: mongoose.Types.ObjectId;
  uploadedAt: Date;
}

export interface IPOComment {
  userId: mongoose.Types.ObjectId;
  text: string;
  createdAt: Date;
}

export interface IPurchaseOrder {
  orderNumber: string;
  purchaseRequestId?: mongoose.Types.ObjectId;
  vendorId: mongoose.Types.ObjectId;
  items: IPOItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  currency: string;
  status: POStatus;
  paymentTerms?: string;
  deliveryAddress?: string;
  expectedDeliveryDate?: Date;
  actualDeliveryDate?: Date;
  notes?: string;
  attachments: IPOAttachment[];
  comments: IPOComment[];
  organizationId: mongoose.Types.ObjectId;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export type PurchaseOrderDocument = Document & IPurchaseOrder;
export type PurchaseOrderModel = Model<IPurchaseOrder>;

const poItemSchema = new Schema<IPOItem>(
  {
    name: { type: String, required: true },
    description: { type: String },
    quantity: { type: Number, required: true },
    actualUnitPrice: { type: Number, required: true },
    unit: { type: String, required: true },
  },
  { _id: true },
);

const poAttachmentSchema = new Schema<IPOAttachment>(
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

const poCommentSchema = new Schema<IPOComment>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: true },
);

const purchaseOrderSchema = new Schema<IPurchaseOrder>(
  {
    orderNumber: { type: String, required: true, unique: true },
    purchaseRequestId: { type: Schema.Types.ObjectId, ref: "PurchaseRequest" },
    vendorId: { type: Schema.Types.ObjectId, ref: "Vendor", required: true },
    items: [poItemSchema],
    subtotal: { type: Number, required: true },
    tax: { type: Number, required: true },
    shipping: { type: Number, default: 0 },
    total: { type: Number, required: true },
    currency: { type: String, default: "USD" },
    status: {
      type: String,
      enum: ["DRAFT", "SENT", "ACKNOWLEDGED", "DELIVERED", "CANCELLED", "DISPUTED"],
      default: "DRAFT",
    },
    paymentTerms: { type: String },
    deliveryAddress: { type: String },
    expectedDeliveryDate: { type: Date },
    actualDeliveryDate: { type: Date },
    notes: { type: String },
    attachments: [poAttachmentSchema],
    comments: [poCommentSchema],
    organizationId: { type: Schema.Types.ObjectId, ref: "Organization", required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    deletedAt: { type: Date },
  },
  { timestamps: true },
);

purchaseOrderSchema.index({ organizationId: 1, status: 1 });
purchaseOrderSchema.index({ organizationId: 1, vendorId: 1 });

export const PurchaseOrder = mongoose.model<IPurchaseOrder, PurchaseOrderModel>(
  "PurchaseOrder",
  purchaseOrderSchema,
);
