import { z } from "zod";

const rfqItemSchema = z.object({
  name: z.string().min(1, "Item name is required"),
  description: z.string().optional(),
  quantity: z.number().positive("Quantity must be positive"),
  unit: z.string().min(1, "Unit is required"),
});

export const createRFQSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  description: z.string().optional(),
  purchaseRequestId: z.string().optional(),
  vendorIds: z.array(z.string()).min(1, "At least one vendor is required"),
  items: z.array(rfqItemSchema).min(1, "At least one item is required"),
  deadline: z.string().datetime("Invalid deadline date"),
});

export const submitQuoteSchema = z.object({
  unitPrices: z.array(z.number().positive()).min(1, "Unit prices are required"),
  totalPrice: z.number().positive("Total price must be positive"),
  deliveryDays: z.number().int().positive("Delivery days must be a positive integer"),
  notes: z.string().optional(),
});

export type CreateRFQInput = z.infer<typeof createRFQSchema>;
export type SubmitQuoteInput = z.infer<typeof submitQuoteSchema>;
