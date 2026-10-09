import { AuthRequest } from "../../types/express.types.ts";
import {
  createApplicationService,
  deleteApplicationService,
  getApplicationByIdService,
  getApplicationsService,
  updateApplicationService,
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

export const getApplicationById = async (req: AuthRequest, res: Response) => {
  const userId = req.userId!;
  const applicationId = req.params.id;

  const application = await getApplicationByIdService(
    String(applicationId),
    userId,
  );

  return res.status(200).json({
    success: true,
    message: "Application fetched successfully",
    data: application,
  });
};

export const updateApplication = async (req: AuthRequest, res: Response) => {
  const userId = req.userId!;
  const applicationId = req.params.id;

  const application = await updateApplicationService(
    String(applicationId),
    userId,
    req.body,
  );

  return res.status(200).json({
    success: true,
    message: "Application updated successfully",
    data: application,
  });
};

export const deleteApplication = async (req: AuthRequest, res: Response) => {
  const userId = req.userId!;
  const applicationId = req.params.id;

  const application = await deleteApplicationService(
    String(applicationId),
    userId,
  );

  return res.status(200).json({
    success: true,
    message: "Application deleted successfully",
    data: application,
  });
};
