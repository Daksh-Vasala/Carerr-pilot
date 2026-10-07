import express from "express";
import { validate } from "../middlewares/validate.middleware.js";
import { loginSchema, registerSchema } from "./auth.validation.js";
import { login, register } from "./auth.controller.js";

const router = express.Router();

router.post("/register", validate(registerSchema), register);

router.post("/login", validate(loginSchema), login);

export default router;
