import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.ts";
import { asynHandler } from "../../utils/async-handler.ts";
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
  resumeIdParamSchema,
  updateResumeSchema,
} from "./resume.validation.ts";
import {
  uploadResume,
  uploadResumeFile,
} from "../middlewares/upload.middleware.ts";

const router = Router();

router.use(authenticate);

router.get("/", asynHandler(getResumes));

router.get(
  "/:id",
  validateParams(resumeIdParamSchema),
  asynHandler(getResumeById),
);

router.patch(
  "/:id",
  validateParams(resumeIdParamSchema),
  validateBody(updateResumeSchema),
  asynHandler(getResumeById),
);

router.delete(
  "/:id",
  validateParams(resumeIdParamSchema),
  asynHandler(deleteResume),
);

router.post(
  "/",
  uploadResume.single("file"),
  validateResumeFile,
  validateBody(createResumeSchema),
  asynHandler(createResume),
);

export default router;
