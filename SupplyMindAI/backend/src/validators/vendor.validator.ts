import { z } from "zod";

export const createVendorSchema = z.object({
  name: z.string().min(1, "Vendor name is required").max(200),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  address: z.string().optional(),
  country: z.string().min(1, "Country is required"),
  taxId: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  status: z.enum(["ACTIVE", "INACTIVE", "BLOCKED", "PENDING"]).optional(),
  rating: z.number().min(1).max(5).optional(),
  paymentTerms: z.string().optional(),
  currency: z.string().default("USD"),
  contactPerson: z
    .object({
      name: z.string().min(1),
      email: z.string().email().optional(),
      phone: z.string().optional(),
    })
    .optional(),
  notes: z.string().optional(),
});

export const updateVendorSchema = createVendorSchema.partial();

export type CreateVendorInput = z.infer<typeof createVendorSchema>;
export type UpdateVendorInput = z.infer<typeof updateVendorSchema>;
