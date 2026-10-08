import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { AuthRequest } from "../../types/express.types.ts";
import { ApiError } from "../../utils/api-error.ts";

export const validateBody = (schema: z.ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: result.error.flatten(),
      });
    }
    req.body = result.data;

    next();
  };
};

export const validateParams = (schema: z.ZodType<Request["params"]>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.params);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid parameters",
        errors: result.error.flatten(),
      });
    }

    req.params = result.data;
    next();
  };
};

export const validateResumeFile = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.file) {
    throw new ApiError(400, "Resume file is required");
  }

  next();
};
