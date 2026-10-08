import { Response } from "express";
import { AuthRequest } from "../../types/express.types.ts";
import {
  createJobService,
  getAllJobsService,
  getJobByIdService,
} from "./job.service.ts";
import { ApiError } from "../../utils/api-error.ts";

export const createJob = async (req: AuthRequest, res: Response) => {
  const userId = req.userId!;

  const job = await createJobService(userId, req.body);

  if (!job) {
    throw new ApiError(500, "Failed to create job");
  }

  return res.status(200).json({
    success: true,
    message: "Job created successfully",
    data: job,
  });
};

export const getAllJobs = async (req: AuthRequest, res: Response) => {
  const userId = req.userId!;

  const jobs = await getAllJobsService(userId);

  return res.status(200).json({
    success: true,
    message: "Jobs fetched successfully",
    data: jobs,
  });
};

export const getJobById = async (req: AuthRequest, res: Response) => {
  const userId = req.userId!;
  const jobId = req.params.id;

  const job = await getJobByIdService(userId, String(jobId));

  if (!job) {
    throw new ApiError(404, "Job not found");
  }

  return res.status(200).json({
    success: true,
    message: "Jobs fetched successfully",
    data: job,
  });
};
