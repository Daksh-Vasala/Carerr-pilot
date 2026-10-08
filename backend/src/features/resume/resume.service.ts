import { and, eq } from "drizzle-orm";
import { db } from "../../db/index.ts";
import { resumes } from "../../db/schema/resume.ts";
import { ApiError } from "../../utils/api-error.ts";
import { UpdateResume } from "./resume.types.ts";
import { CreateResumeData } from "./resume.validation.ts";
import { uploadResumeToCloudinary } from "../../lib/cloudinary.ts";
import cloudinary from "../../config/cloudinary.ts";

const resumeColumns = {
  id: resumes.id,
  title: resumes.title,
  userId: resumes.userId,
  fileName: resumes.fileName,
  fileUrl: resumes.fileUrl,
  publicId: resumes.publicId,
  fileSize: resumes.fileSize,
  fileType: resumes.fileType,
  createdAt: resumes.createdAt,
  updatedAt: resumes.updatedAt,
};

export const getResumesService = async (userId: string) => {
  const allResumes = await db
    .select(resumeColumns)
    .from(resumes)
    .where(eq(resumes.userId, userId));

  return allResumes;
};

export const getResumeByIdService = async (
  resumeId: string,
  userId: string,
) => {
  const [resume] = await db
    .select(resumeColumns)
    .from(resumes)
    .where(and(eq(resumes.id, resumeId), eq(resumes.userId, userId)));

  return resume;
};

export const updateResumeService = async (
  resumeId: string,
  userId: string,
  data: UpdateResume,
) => {
  const [resume] = await db
    .select(resumeColumns)
    .from(resumes)
    .where(and(eq(resumes.id, resumeId), eq(resumes.userId, userId)));

  if (!resume) {
    throw new ApiError(404, "Resume not found");
  }

  if (data.title === undefined || resume.title === data.title) {
    throw new ApiError(400, "No changes detected");
  }

  const [updatedResume] = await db
    .update(resumes)
    .set({ title: data.title, updatedAt: new Date() })
    .where(and(eq(resumes.id, resumeId), eq(resumes.userId, userId)))
    .returning(resumeColumns);

  return updatedResume;
};

export const deleteResumeService = async (resumeId: string, userId: string) => {
  const [resume] = await db
    .select()
    .from(resumes)
    .where(and(eq(resumes.id, resumeId), eq(resumes.userId, userId)));

  if (!resume) {
    throw new ApiError(404, "Resume not found");
  }

  try {
    await cloudinary.uploader.destroy(resume.publicId, {
      resource_type: "image",
      type: "upload",
    });
  } catch (error) {
    console.error("Cloudinary deletion failed:", error);

    throw new ApiError(502, "Failed to delete resume from storage");
  }

  const [deletedResume] = await db
    .delete(resumes)
    .where(eq(resumes.id, resumeId))
    .returning(resumeColumns);

  return deletedResume;
};

export const createResumeService = async (
  userId: string,
  data: CreateResumeData,
  file: Express.Multer.File,
) => {
  const uploadResult = await uploadResumeToCloudinary(
    file.buffer,
    file.originalname,
  );

  const [resume] = await db
    .insert(resumes)
    .values({
      userId,
      title: data.title,
      fileName: file.originalname,
      fileUrl: uploadResult.secureUrl,
      fileSize: file.size,
      fileType: file.mimetype,
      publicId: uploadResult.publicId,
    })
    .returning(resumeColumns);

  return resume;
};
