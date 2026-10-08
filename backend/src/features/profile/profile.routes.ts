import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.ts";
import { validateBody } from "../middlewares/validate.middleware.ts";
import { updateProfileSchema } from "./profile.validation.ts";
import { asynHandler } from "../../utils/async-handler.ts";
import { getProfile, updateProfile } from "./profile.controller.ts";

const router = Router();

router.use(authenticate);

router.get("/", asynHandler(getProfile));

router.patch(
  "/",
  validateBody(updateProfileSchema),
  asynHandler(updateProfile),
);

export default router;
