import { Request, Response } from "express";
import { loginService, registerService } from "./auth.service.js";
import { generateToken } from "../../lib/jwt.js";
import { setAuthCookie } from "../../lib/auth-cookie.js";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const user = await registerService(name, email, password);

    if (!user) {
      return res.status(500).json({
        success: false,
        message: "Failed to register user",
      });
    }

    const token = generateToken(user.id);
    setAuthCookie(res, token);

    return res.status(201).json({
      success: true,
      message: "User Registration successfull",
      data: user,
    });
  } catch (error) {
    if (error instanceof Error && error.message === "USERALREADYEXISTS") {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await loginService(email, password);

    if (!user) {
      return res.status(500).json({
        success: false,
        message: "Failed to login user",
      });
    }

    const token = generateToken(user.id);
    setAuthCookie(res, token);

    return res.status(200).json({
      success: true,
      message: "User logged in successfull",
      data: user,
    });
  } catch (error) {
    if (
      error instanceof Error &&
      (error.message === "PASSWORDDOESNTMATCH" || "USERDOESNTEXISTS")
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
