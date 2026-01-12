import { z } from "zod";

// Create product schema
export const createProductSchema = z.object({
    name: z.string().min(1, "Product name is required").max(255, "Product name too long"),
    category: z.string().min(1, "Category is required").max(100, "Category name too long"),
    price: z.number().positive("Price must be positive").max(999999.99, "Price too high"),
});

// Update product schema
export const updateProductSchema = z.object({
    id: z.number().int().positive("Invalid product ID"),
    name: z.string().min(1, "Product name is required").max(255, "Product name too long").optional(),
    category: z.string().min(1, "Category is required").max(100, "Category name too long").optional(),
    price: z.number().positive("Price must be positive").max(999999.99, "Price too high").optional(),
});

// Search product schema
export const searchProductSchema = z.object({
    search: z.string().min(1, "Search query is required").max(100, "Search query too long"),
});

// Search category schema
export const searchCategorySchema = z.object({
    category: z.string().min(1, "Category is required").max(100, "Category name too long"),
});

// Get product by ID schema
export const getProductByIdSchema = z.object({
    id: z.string().regex(/^\d+$/, "ID must be a number"),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
export type SearchProductInput = z.infer<typeof searchProductSchema>;
export type SearchCategoryInput = z.infer<typeof searchCategorySchema>;
