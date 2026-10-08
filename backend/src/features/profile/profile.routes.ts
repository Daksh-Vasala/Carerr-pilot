import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { updateProfileSchema } from "./profile.validation.js";
import { asynHandler } from "../../utils/async-handler.js";
import { getProfile, updateProfile } from "./profile.controller.js";

const router = Router();

router.use(authenticate);

router.get("/", asynHandler(getProfile));

router.patch("/", validate(updateProfileSchema), asynHandler(updateProfile));

export default router;
