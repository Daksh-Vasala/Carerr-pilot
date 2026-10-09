import { z } from "zod";

export const createJobSchema = z.object({
  companyName: z
    .string()
    .trim()
    .min(1, "Company name is required")
    .max(150, "Company name must not exceed 150 characters"),

  jobTitle: z
    .string()
    .trim()
    .min(1, "Job title is required")
    .max(150, "Job title must not exceed 150 characters"),

  jobUrl: z
    .url("Invalid job URL")
    .max(1000, "Job URL must not exceed 1000 characters")
    .optional(),

  location: z
    .string()
    .trim()
    .max(150, "Location must not exceed 150 characters")
    .optional(),

  employmentType: z
    .string()
    .trim()
    .max(50, "Employment type must not exceed 50 characters")
    .optional(),

  salary: z
    .string()
    .trim()
    .max(100, "Salary must not exceed 100 characters")
    .optional(),

  description: z.string().trim().optional(),
});

export const updateJobSchema = z.object({
  companyName: z
    .string()
    .trim()
    .min(1, "Company name cannot be empty")
    .max(150, "Company name must not exceed 150 characters")
    .optional(),

  jobTitle: z
    .string()
    .trim()
    .min(1, "Job title cannot be empty")
    .max(150, "Job title must not exceed 150 characters")
    .optional(),

  jobUrl: z
    .url("Invalid job URL")
    .max(1000, "Job URL must not exceed 1000 characters")
    .nullable()
    .optional(),

  location: z
    .string()
    .trim()
    .min(1, "Location cannot be empty")
    .max(150, "Location must not exceed 150 characters")
    .nullable()
    .optional(),

  employmentType: z
    .string()
    .trim()
    .min(1, "Employment type cannot be empty")
    .max(50, "Employment type must not exceed 50 characters")
    .nullable()
    .optional(),

  salary: z
    .string()
    .trim()
    .min(1, "Salary cannot be empty")
    .max(100, "Salary must not exceed 100 characters")
    .nullable()
    .optional(),

  description: z
    .string()
    .trim()
    .min(1, "Description cannot be empty")
    .nullable()
    .optional(),
});

export const jobIdParamSchema = z.object({
  id: z.uuid("Invalid job id"),
});

export type UpdateJobData = z.infer<typeof updateJobSchema>;
export type CreateJobData = z.infer<typeof createJobSchema>;
export type JobIdParam = z.infer<typeof jobIdParamSchema>;
