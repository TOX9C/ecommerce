import { z } from "zod";

// Login validation schema
export const loginSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters").max(50, "Username too long"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

// Register validation schema
export const registerSchema = z.object({
    username: z
        .string()
        .min(3, "Username must be at least 3 characters")
        .max(50, "Username too long")
        .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(100, "Password too long")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number"),
    phoneNumber: z
        .string()
        .min(10, "Phone number must be at least 10 digits")
        .regex(/^[0-9]+$/, "Phone number must contain only numbers"),
    street: z.string().min(3, "Street address is required"),
    city: z.string().min(2, "City is required"),
    town: z.string().min(2, "Town is required"),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
