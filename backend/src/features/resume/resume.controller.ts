import { Response } from "express";
import { AuthRequest } from "../../types/express.types.ts";
import {
  deleteResumeService,
  getResumeByIdService,
  getResumesService,
  updateResumeService,
} from "./resume.service.ts";
import { ApiError } from "../../utils/api-error.ts";

export const getResumes = async (req: AuthRequest, res: Response) => {
  const userId = req.userId!;

  const allResumes = await getResumesService(userId);

  return res.status(200).json({
    success: true,
    message: "Resumes fetched successfully",
    data: allResumes,
  });
};

export const getResumeById = async (req: AuthRequest, res: Response) => {
  const resumeId = req.params.id;
  const userId = req.userId!;

  const resume = await getResumeByIdService(String(resumeId), userId);

  if (!resume) {
    throw new ApiError(404, "Resume not found");
  }

  return res.status(200).json({
    success: true,
    message: "Resume fetched successfully",
    data: resume,
  });
};

export const updateResume = async (req: AuthRequest, res: Response) => {
  const resumeId = req.params.id;
  const userId = req.userId!;

  const updatedResume = await updateResumeService(
    String(resumeId),
    userId,
    req.body,
  );

  return res.status(200).json({
    success: true,
    message: "Resume updated successfully",
    data: updatedResume,
  });
};

export const deleteResume = async (req: AuthRequest, res: Response) => {
  const resumeId = req.params.id;
  const userId = req.userId!;

  const deletedResume = await deleteResumeService(String(resumeId), userId);

  return res.status(200).json({
    success: true,
    message: "Resume deleted successfully",
    data: deletedResume,
  });
};
