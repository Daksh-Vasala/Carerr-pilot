import { NextFunction, Response } from "express";
import { AuthRequest } from "../../types/express.types.js";
import { ApiError } from "../../utils/api-error.js";

export const errorMiddleware = (
  error: unknown,
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  console.error(error);

  if (error instanceof ApiError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};
