import express from "express";
import { validate } from "../middlewares/validate.middleware.js";
import { loginSchema, registerSchema } from "./auth.validation.js";
import { getMe, login, logout, register } from "./auth.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { asynHandler } from "../../utils/async-handler.js";

const router = express.Router();

router.post("/register", validate(registerSchema), asynHandler(register));

router.post("/login", validate(loginSchema), asynHandler(login));

router.get("/me", authenticate, asynHandler(getMe));

router.post("/logout", authenticate, asynHandler(logout));

export default router;
