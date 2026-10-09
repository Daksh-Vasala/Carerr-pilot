import { NextFunction, Response } from "express";
import { AuthRequest } from "../types/express.types.ts";

export const asyncHandler = (
  handler: (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) => Promise<unknown>,
) => {
  return (req: AuthRequest, res: Response, next: NextFunction) =>
    Promise.resolve(handler(req, res, next)).catch(next);
};
