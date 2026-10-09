import { uuid, z } from "zod";
import { ApplicationStatusEnum } from "./applications.types.ts";

export const createApplicationSchema = z.object({
  jobId: uuid("Invalid job id"),
  status: z
    .enum([
      "APPLIED",
      "INTERVIEW",
      "OFFER",
      "ACCEPTED",
      "REJECTED",
      "WITHDRAWN",
    ])
    .default("APPLIED"),
  appliedAt: z.iso.datetime().optional().nullable(),
  notes: z.string().trim().optional().nullable(),
  recruiterName: z.string().trim().max(150).optional().nullable(),
  recruiterEmail: z.email().optional().nullable(),
});

export type CreateApplicationData = z.infer<typeof createApplicationSchema>;
