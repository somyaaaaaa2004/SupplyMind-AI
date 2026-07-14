import mongoose, { Document, Model, Schema } from "mongoose";

export type VendorStatus = "ACTIVE" | "INACTIVE" | "BLOCKED" | "PENDING";

export interface IVendorContactPerson {
  name: string;
  email?: string;
  phone?: string;
}

export interface IVendorDocument {
  filename: string;
  originalName: string;
  mimeType: string;
  url: string;
  uploadedAt: Date;
}

export interface IVendor {
  name: string;
  code: string;
  email: string;
  phone?: string;
  address?: string;
  country: string;
  taxId?: string;
  category: string;
  status: VendorStatus;
  rating?: number;
  paymentTerms?: string;
  currency?: string;
  contactPerson?: IVendorContactPerson;
  documents: IVendorDocument[];
  notes?: string;
  organizationId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export type VendorDocument = Document & IVendor;
export type VendorModel = Model<IVendor>;

const vendorDocumentSchema = new Schema<IVendorDocument>(
  {
    filename: { type: String, required: true },
    originalName: { type: String, required: true },
    mimeType: { type: String, required: true },
    url: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now },
  },
  { _id: true },
);

const vendorSchema = new Schema<IVendor>(
  {
    name: { type: String, required: true, trim: true },
    code: { type: String, required: true, unique: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String },
    address: { type: String },
    country: { type: String, required: true },
    taxId: { type: String },
    category: { type: String, required: true },
    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE", "BLOCKED", "PENDING"],
      default: "PENDING",
    },
    rating: { type: Number, min: 1, max: 5 },
    paymentTerms: { type: String },
    currency: { type: String, default: "USD" },
    contactPerson: {
      name: { type: String },
      email: { type: String },
      phone: { type: String },
    },
    documents: [vendorDocumentSchema],
    notes: { type: String },
    organizationId: { type: Schema.Types.ObjectId, ref: "Organization", required: true },
    deletedAt: { type: Date },
  },
  { timestamps: true },
);

vendorSchema.index({ organizationId: 1, status: 1 });
vendorSchema.index({ organizationId: 1, code: 1 }, { unique: true });

export const Vendor = mongoose.model<IVendor, VendorModel>("Vendor", vendorSchema);
