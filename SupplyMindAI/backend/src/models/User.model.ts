import bcrypt from "bcryptjs";
import mongoose, { Document, Model, Schema } from "mongoose";

export type UserRole =
  | "ADMIN"
  | "PROCUREMENT_MANAGER"
  | "WAREHOUSE_MANAGER"
  | "LOGISTICS_MANAGER"
  | "VENDOR"
  | "ANALYST";

export interface IUser {
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  organizationId: mongoose.Types.ObjectId;
  isEmailVerified: boolean;
  isActive: boolean;
  lastLoginAt?: Date;
  emailVerificationToken?: string;
  emailVerificationExpires?: Date;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  refreshTokens: string[];
  avatar?: string;
  phone?: string;
  department?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface IUserMethods {
  comparePassword(plain: string): Promise<boolean>;
}

export type UserDocument = Document & IUser & IUserMethods;
export type UserModel = Model<IUser, Record<string, never>, IUserMethods>;

const userSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    role: {
      type: String,
      enum: ["ADMIN", "PROCUREMENT_MANAGER", "WAREHOUSE_MANAGER", "LOGISTICS_MANAGER", "VENDOR", "ANALYST"],
      required: true,
    },
    organizationId: { type: Schema.Types.ObjectId, ref: "Organization", required: true },
    isEmailVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    lastLoginAt: { type: Date },
    emailVerificationToken: { type: String, select: false },
    emailVerificationExpires: { type: Date, select: false },
    passwordResetToken: { type: String, select: false },
    passwordResetExpires: { type: Date, select: false },
    refreshTokens: { type: [String], default: [], select: false },
    avatar: { type: String },
    phone: { type: String },
    department: { type: String },
    deletedAt: { type: Date },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc, ret: Record<string, unknown>) {
        delete ret.passwordHash;
        delete ret.refreshTokens;
        delete ret.emailVerificationToken;
        delete ret.emailVerificationExpires;
        delete ret.passwordResetToken;
        delete ret.passwordResetExpires;
        return ret;
      },
    },
  },
);

// Pre-save: hash password if modified
userSchema.pre("save", async function (next) {
  if (!this.isModified("passwordHash")) return next();
  const salt = await bcrypt.genSalt(12);
  this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
  next();
});

// Method: compare password
userSchema.methods.comparePassword = async function (plain: string): Promise<boolean> {
  return bcrypt.compare(plain, this.passwordHash);
};

export const User = mongoose.model<IUser, UserModel>("User", userSchema);
