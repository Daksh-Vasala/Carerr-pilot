import express from "express";
import { validate } from "../middlewares/validate.middleware.ts";
import { loginSchema, registerSchema } from "./auth.validation.ts";
import { getMe, login, logout, register } from "./auth.controller.ts";
import { authenticate } from "../middlewares/auth.middleware.ts";
import { asynHandler } from "../../utils/async-handler.ts";

const router = express.Router();

router.post("/register", validate(registerSchema), asynHandler(register));

router.post("/login", validate(loginSchema), asynHandler(login));

router.get("/me", authenticate, asynHandler(getMe));

router.post("/logout", authenticate, asynHandler(logout));

export default router;
