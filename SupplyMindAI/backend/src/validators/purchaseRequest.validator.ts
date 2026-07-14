import { z } from "zod";

const prItemSchema = z.object({
  name: z.string().min(1, "Item name is required"),
  description: z.string().optional(),
  quantity: z.number().positive("Quantity must be positive"),
  estimatedUnitPrice: z.number().positive("Estimated unit price must be positive"),
  unit: z.string().min(1, "Unit is required"),
});

export const createPRSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  description: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  estimatedBudget: z.number().positive("Estimated budget must be positive"),
  currency: z.string().default("USD"),
  urgency: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]),
  items: z.array(prItemSchema).min(1, "At least one item is required"),
  attachments: z.array(z.string()).optional(),
  departmentId: z.string().optional(),
});

export const updatePRSchema = createPRSchema.partial();

export const approvePRSchema = z.object({
  comment: z.string().optional(),
});

export const rejectPRSchema = z.object({
  reason: z.string().min(10, "Rejection reason must be at least 10 characters"),
});

export const addCommentSchema = z.object({
  text: z.string().min(1, "Comment text is required").max(2000),
});

export type CreatePRInput = z.infer<typeof createPRSchema>;
export type UpdatePRInput = z.infer<typeof updatePRSchema>;
export type ApprovePRInput = z.infer<typeof approvePRSchema>;
export type RejectPRInput = z.infer<typeof rejectPRSchema>;
export type AddCommentInput = z.infer<typeof addCommentSchema>;
