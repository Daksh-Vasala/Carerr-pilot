import { z } from "zod";
export const registerSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Name must be at least 2 characters")
        .max(100, "Name must be at most 100 characters"),
    email: z
        .email("Invalid email address")
        .trim()
        .transform((value) => value.toLowerCase()),
    password: z
        .string()
        .trim()
        .min(8, "Password must be at least 8 characters")
        .max(72, "Password must not exceed 72 characters"),
});
