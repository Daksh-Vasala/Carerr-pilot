import { AuthRequest } from "../../types/express.types.ts";
import {
  createApplicationService,
  getApplicationsService,
} from "./application.service.ts";
import { Response } from "express";

export const getApplications = async (req: AuthRequest, res: Response) => {
  const userId = req.userId!;

  const applications = await getApplicationsService(userId);

  return res.status(200).json({
    success: true,
    message: "Applications fetched successfully",
    data: applications,
  });
};

export const createApplication = async (req: AuthRequest, res: Response) => {
  const userId = req.userId!;

  const application = await createApplicationService(userId, req.body);

  return res.status(200).json({
    success: true,
    message: "Application created successfully",
    data: application,
  });
};
