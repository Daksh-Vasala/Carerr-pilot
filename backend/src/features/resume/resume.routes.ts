import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.ts";
import { asynHandler } from "../../utils/async-handler.ts";
import {
  deleteResume,
  getResumeById,
  getResumes,
} from "./resume.controller.ts";
import {
  validate,
  validateParams,
} from "../middlewares/validate.middleware.ts";
import {
  resumeIdParamSchema,
  updateResumeSchema,
} from "./resume.validation.ts";

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
  validate(updateResumeSchema),
  asynHandler(getResumeById),
);

router.delete(
  "/:id",
  validateParams(resumeIdParamSchema),
  asynHandler(deleteResume),
);

export default router;
