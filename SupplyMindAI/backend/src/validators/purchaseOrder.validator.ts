import { z } from "zod";

const poItemSchema = z.object({
  name: z.string().min(1, "Item name is required"),
  description: z.string().optional(),
  quantity: z.number().positive("Quantity must be positive"),
  actualUnitPrice: z.number().positive("Actual unit price must be positive"),
  unit: z.string().min(1, "Unit is required"),
});

export const createPOSchema = z.object({
  purchaseRequestId: z.string().optional(),
  vendorId: z.string().min(1, "Vendor ID is required"),
  items: z.array(poItemSchema).min(1, "At least one item is required"),
  paymentTerms: z.string().optional(),
  deliveryAddress: z.string().optional(),
  expectedDeliveryDate: z.string().datetime().optional(),
  shipping: z.number().min(0).default(0),
  notes: z.string().optional(),
  currency: z.string().default("USD"),
});

export const updatePOSchema = createPOSchema.partial();

export const updatePOStatusSchema = z.object({
  status: z.enum(["DRAFT", "SENT", "ACKNOWLEDGED", "DELIVERED", "CANCELLED", "DISPUTED"]),
  notes: z.string().optional(),
});

export type CreatePOInput = z.infer<typeof createPOSchema>;
export type UpdatePOInput = z.infer<typeof updatePOSchema>;
export type UpdatePOStatusInput = z.infer<typeof updatePOStatusSchema>;
