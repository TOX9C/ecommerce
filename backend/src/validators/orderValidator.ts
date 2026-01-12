import { z } from "zod";

// Update order status schema - params validation (from URL)
export const updateOrderStatusParamsSchema = z.object({
    id: z.string().regex(/^\d+$/, "Invalid order ID"),
});

// Update order status schema - body validation 
export const updateOrderStatusBodySchema = z.object({
    status: z.enum(["pending", "processing", "shipped", "delivered", "cancelled"]),
});

export type UpdateOrderStatusParams = z.infer<typeof updateOrderStatusParamsSchema>;
export type UpdateOrderStatusBody = z.infer<typeof updateOrderStatusBodySchema>;
