import { Request, Response } from "express";
import { getMeService, loginService, registerService } from "./auth.service.js";
import { generateToken } from "../../lib/jwt.js";
import { setAuthCookie } from "../../lib/auth-cookie.js";
import { AuthRequest } from "../../types/express.types.js";
import { ApiError } from "../../utils/api-error.js";

export const register = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;

  const user = await registerService(firstName, lastName, email, password);

  if (!user) {
    throw new ApiError(500, "Failed to register user");
  }

  const token = generateToken(user.id);
  setAuthCookie(res, token);

  return res.status(201).json({
    success: true,
    message: "User Registration successfull",
    data: user,
  });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await loginService(email, password);

  if (!user) {
    throw new ApiError(500, "Failed to login user");
  }

  const token = generateToken(user.id);
  setAuthCookie(res, token);

  return res.status(200).json({
    success: true,
    message: "User logged in successfull",
    data: user,
  });
};

export const getMe = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    if (!userId) {
      throw new ApiError(401, "No user id");
    }

    const user = await getMeService(userId);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    return res.status(200).json({
      success: true,
      message: "User retreived  successfull",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const logout = async (req: AuthRequest, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  return res.status(200).json({
    success: true,
    message: "User logged out successfull",
  });
};
