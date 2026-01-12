import { z } from "zod";

// Add item to cart schema
export const addItemSchema = z.object({
    id: z.number().int().positive("Invalid product ID"),
    quantity: z.number().int().positive("Quantity must be positive").max(100, "Cannot add more than 100 items at once"),
});

// Remove item from cart schema
export const removeItemSchema = z.object({
    id: z.number().int().positive("Invalid product ID"),
});

export type AddItemInput = z.infer<typeof addItemSchema>;
export type RemoveItemInput = z.infer<typeof removeItemSchema>;
