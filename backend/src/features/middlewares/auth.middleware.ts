import { NextFunction, Response } from "express";
import { AuthRequest } from "../../types/express.types.js";
import { verifyToken } from "../../lib/jwt.js";

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies.token;

  if (!token || token === undefined) {
    return res.status(401).json({
      success: false,
      message: "Authentication required",
    });
  }

  try {
    const decoded = verifyToken(token);
    req.userId = decoded.sub?.toString();
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
