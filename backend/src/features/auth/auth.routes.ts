import express from "express";
import { validateBody } from "../middlewares/validate.middleware.ts";
import { loginSchema, registerSchema } from "./auth.validation.ts";
import { getMe, login, logout, register } from "./auth.controller.ts";
import { authenticate } from "../middlewares/auth.middleware.ts";
import { asyncHandler } from "../../utils/async-handler.ts";

const router = express.Router();

router.post("/register", validateBody(registerSchema), asyncHandler(register));

router.post("/login", validateBody(loginSchema), asyncHandler(login));

router.get("/me", authenticate, asyncHandler(getMe));

router.post("/logout", authenticate, asyncHandler(logout));

export default router;
