import mongoose, { Document, Model, Schema } from "mongoose";

export type RFQStatus = "DRAFT" | "SENT" | "CLOSED" | "AWARDED";
export type QuoteStatus = "PENDING" | "SUBMITTED" | "ACCEPTED" | "REJECTED";

export interface IRFQItem {
  name: string;
  description?: string;
  quantity: number;
  unit: string;
}

export interface IQuote {
  vendorId: mongoose.Types.ObjectId;
  unitPrices: number[];
  totalPrice: number;
  deliveryDays: number;
  notes?: string;
  submittedAt: Date;
  status: QuoteStatus;
}

export interface IRFQ {
  rfqNumber: string;
  title: string;
  description?: string;
  purchaseRequestId?: mongoose.Types.ObjectId;
  vendorIds: mongoose.Types.ObjectId[];
  items: IRFQItem[];
  deadline: Date;
  status: RFQStatus;
  quotes: IQuote[];
  awardedVendorId?: mongoose.Types.ObjectId;
  organizationId: mongoose.Types.ObjectId;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export type RFQDocument = Document & IRFQ;
export type RFQModel = Model<IRFQ>;

const rfqItemSchema = new Schema<IRFQItem>(
  {
    name: { type: String, required: true },
    description: { type: String },
    quantity: { type: Number, required: true },
    unit: { type: String, required: true },
  },
  { _id: true },
);

const quoteSchema = new Schema<IQuote>(
  {
    vendorId: { type: Schema.Types.ObjectId, ref: "Vendor", required: true },
    unitPrices: { type: [Number], required: true },
    totalPrice: { type: Number, required: true },
    deliveryDays: { type: Number, required: true },
    notes: { type: String },
    submittedAt: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ["PENDING", "SUBMITTED", "ACCEPTED", "REJECTED"],
      default: "SUBMITTED",
    },
  },
  { _id: true },
);

const rfqSchema = new Schema<IRFQ>(
  {
    rfqNumber: { type: String, required: true, unique: true },
    title: { type: String, required: true, trim: true },
    description: { type: String },
    purchaseRequestId: { type: Schema.Types.ObjectId, ref: "PurchaseRequest" },
    vendorIds: [{ type: Schema.Types.ObjectId, ref: "Vendor" }],
    items: [rfqItemSchema],
    deadline: { type: Date, required: true },
    status: {
      type: String,
      enum: ["DRAFT", "SENT", "CLOSED", "AWARDED"],
      default: "DRAFT",
    },
    quotes: [quoteSchema],
    awardedVendorId: { type: Schema.Types.ObjectId, ref: "Vendor" },
    organizationId: { type: Schema.Types.ObjectId, ref: "Organization", required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true },
);

rfqSchema.index({ organizationId: 1, status: 1 });

export const RFQ = mongoose.model<IRFQ, RFQModel>("RFQ", rfqSchema);
