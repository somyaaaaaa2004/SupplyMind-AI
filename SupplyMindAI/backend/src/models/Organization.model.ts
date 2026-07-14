import mongoose, { Document, Model, Schema } from "mongoose";

export type OrgPlan = "FREE" | "PRO" | "ENTERPRISE";

export interface IOrganization {
  organizationId: string;
  name: string;
  slug: string;
  plan: OrgPlan;
  isActive: boolean;
  settings: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

export type OrganizationDocument = Document & IOrganization;
export type OrganizationModel = Model<IOrganization>;

const organizationSchema = new Schema<IOrganization>(
  {
    organizationId: { type: String, required: true, unique: true },
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    plan: {
      type: String,
      enum: ["FREE", "PRO", "ENTERPRISE"],
      default: "FREE",
    },
    isActive: { type: Boolean, default: true },
    settings: { type: Schema.Types.Mixed, default: {} },
  },
  { timestamps: true },
);

export const Organization = mongoose.model<IOrganization, OrganizationModel>(
  "Organization",
  organizationSchema,
);
