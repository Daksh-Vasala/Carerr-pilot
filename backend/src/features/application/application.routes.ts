import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.ts";
import { asyncHandler } from "../../utils/async-handler.ts";
import {
  createApplication,
  getApplications,
} from "./application.controller.ts";
import {
  validateBody,
} from "../middlewares/validate.middleware.ts";
import { createApplicationSchema } from "./application.validation.ts";

const router = Router();

router.use(authenticate);

router.get("/", asyncHandler(getApplications));

router.post(
  "/",
  validateBody(createApplicationSchema),
  asyncHandler(createApplication),
);

export default router;
