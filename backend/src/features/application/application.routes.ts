import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.ts";
import { asyncHandler } from "../../utils/async-handler.ts";
import {
  createApplication,
  deleteApplication,
  getApplicationById,
  getApplications,
  updateApplication,
} from "./application.controller.ts";
import {
  validateBody,
  validateParams,
} from "../middlewares/validate.middleware.ts";
import {
  createApplicationSchema,
  updateApplicationSchema,
} from "./application.validation.ts";
import { IdParamSchema } from "../validation/idParamSchema.ts";

const router = Router();

router.use(authenticate);

router.get("/", asyncHandler(getApplications));

router.post(
  "/",
  validateBody(createApplicationSchema),
  asyncHandler(createApplication),
);

router.get(
  "/:id",
  validateParams(IdParamSchema),
  asyncHandler(getApplicationById),
);

router.patch(
  "/:id",
  validateParams(IdParamSchema),
  validateBody(updateApplicationSchema),
  asyncHandler(updateApplication),
);

router.delete(
  "/:id",
  validateParams(IdParamSchema),
  asyncHandler(deleteApplication),
);

export default router;
