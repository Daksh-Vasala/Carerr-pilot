import { NextFunction, Request, Response } from "express";
import { z, ZodSafeParseResult } from "zod";

export const validate = (schema: z.ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result: ZodSafeParseResult<typeof req.body> = schema.safeParse(req.body);

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
