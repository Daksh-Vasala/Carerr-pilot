import express from "express";
import { validate } from "../middlewares/validate.middleware.js";
import { registerSchema } from "./auth.validation.js";
import { register } from "./auth.controller.js";

const router = express.Router();

router.post("/register", validate(registerSchema), register);

export default router;
