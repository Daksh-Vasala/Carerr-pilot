import { z } from "zod";

export const updateProfileSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must not exceed 50 characters")
    .optional(),

  lastName: z
    .string()
    .trim()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must not exceed 50 characters")
    .optional(),
  phoneNumber: z
    .string()
    .trim()
    .regex(/^[0-9]{10}$/, "Invalid phone number").optional(),
  linkedinUrl: z
    .string()
    .trim()
    .pipe(z.url({ error: "Invalid LinkedIn URL" }))
    .optional(),
  githubUrl: z
    .string()
    .trim()
    .pipe(z.url({ error: "Invalid Github URL" }))
    .optional(),
  portfolioUrl: z
    .string()
    .trim()
    .pipe(z.url({ error: "Invalid Portfolio URL" }))
    .optional(),
  location: z
    .string()
    .trim()
    .max(150, "Location must not exceed 150 characters")
    .optional(),
  bio: z
    .string()
    .trim()
    .max(1000, "Bio must not exceed 1000 characters")
    .optional(),
});

