import { z } from "zod";

// Login validation schema
export const loginSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters").max(50, "Username too long"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

// Register validation schema
// Register validation schema
export const registerSchema = z.object({
    username: z.preprocess(
        (val) => (val === undefined ? "" : val),
        z.string().min(3, "Username must be at least 3 characters").max(50, "Username too long")
    ),
    password: z.preprocess(
        (val) => (val === undefined ? "" : val),
        z.string().min(6, "Password must be at least 6 characters").max(100, "Password too long")
    ),
    phoneNumber: z.preprocess(
        (val) => (val === undefined ? "" : val),
        z.string().min(10, "Phone number must be at least 10 digits")
    ),
    street: z.preprocess(
        (val) => (val === undefined ? "" : val),
        z.string().min(3, "Street address is required")
    ),
    city: z.preprocess(
        (val) => (val === undefined ? "" : val),
        z.string().min(2, "City is required")
    ),
    town: z.preprocess(
        (val) => (val === undefined ? "" : val),
        z.string().min(2, "Town is required")
    ),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
