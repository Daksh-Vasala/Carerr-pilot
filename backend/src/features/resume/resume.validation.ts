import { z } from "zod";

export const updateResumeSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, "Title should be atleast 2 characters")
    .max(100, "Title should be atmost 100 charcaters"),
  // fileName: z
  //   .string()
  //   .min(2, "fileName should be atleast 2 characters")
  //   .max(255, "fileName should be atmost 255 charcaters")
  //   .optional(),
  // fileUrl: z
  //   .string()
  //   .min(2, "fileName should be atleast 2 characters")
  //   .max(1000, "fileName should be atmost 255 charcaters"),
  // fileType: z
  //   .string()
  //   .min(2, "fileName should be atleast 2 characters")
  //   .max(1000, "fileName should be atmost 255 charcaters"),
  // publicId: z
  //   .string()
  //   .min(2, "Public id should be atleast 2 characters")
  //   .max(1000, "Public id should be atmost 500 charcaters"),
  // extractedText: z.string(),
});

export const resumeIdParamSchema = z.object({
  id: z.uuid("Invalid resume id"),
});

export const createResumeSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, "Title must be at least 2 characters")
    .max(100, "Title must not exceed 100 characters"),
})

export type UpdateResume = z.infer<typeof updateResumeSchema>;
export type ResumeIdParam = z.infer<typeof resumeIdParamSchema>;
export type CreateResumeData = z.infer<typeof createResumeSchema>;
