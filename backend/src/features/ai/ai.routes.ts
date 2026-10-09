import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.ts";
import {
  validateBody,
  validateParams,
} from "../middlewares/validate.middleware.ts";
import {
  analyzeResumeRequestSchema,
  resumeAnalysisIdSchema,
} from "./ai.validation.ts";
import { asyncHandler } from "../../utils/async-handler.ts";
import { analyzeResume, getResumeAnalysisById } from "./ai.controller.ts";

const router = Router();

router.use(authenticate);

router.post(
  "/resume-analysis",
  validateBody(analyzeResumeRequestSchema),
  asyncHandler(analyzeResume),
);

router.get(
  "/resume-analysis/:id",
  validateParams(resumeAnalysisIdSchema),
  asyncHandler(getResumeAnalysisById),
);

export default router;
