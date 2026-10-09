import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.ts";
import { asyncHandler } from "../../utils/async-handler.ts";
import {
  createResume,
  deleteResume,
  getResumeById,
  getResumes,
} from "./resume.controller.ts";
import {
  validateBody,
  validateParams,
  validateResumeFile,
} from "../middlewares/validate.middleware.ts";
import {
  createResumeSchema,
  updateResumeSchema,
} from "./resume.validation.ts";
import { uploadResume } from "../middlewares/upload.middleware.ts";
import { IdParamSchema } from "../validation/idParamSchema.ts";

const router = Router();

router.use(authenticate);

router.get("/", asyncHandler(getResumes));

router.get(
  "/:id",
  validateParams(IdParamSchema),
  asyncHandler(getResumeById),
);

router.patch(
  "/:id",
  validateParams(IdParamSchema),
  validateBody(updateResumeSchema),
  asyncHandler(getResumeById),
);

router.delete(
  "/:id",
  validateParams(IdParamSchema),
  asyncHandler(deleteResume),
);

router.post(
  "/",
  uploadResume.single("file"),
  validateResumeFile,
  validateBody(createResumeSchema),
  asyncHandler(createResume),
);

export default router;
