import { Router } from "express";

import {
  createJobSchema,
  jobIdParamSchema,
  updateJobSchema,
} from "./job.validation.ts";
import {
  createJob,
  deleteJob,
  getAllJobs,
  getJobById,
  updateJob,
} from "./job.controller.ts";
import { authenticate } from "../middlewares/auth.middleware.ts";
import {
  validateBody,
  validateParams,
} from "../middlewares/validate.middleware.ts";
import { asyncHandler } from "../../utils/async-handler.ts";

const router = Router();

router.use(authenticate);

router.post("/", validateBody(createJobSchema), asyncHandler(createJob));

router.get("/", asyncHandler(getAllJobs));

router.get("/:id", validateParams(jobIdParamSchema), asyncHandler(getJobById));

router.patch(
  "/:id",
  validateParams(jobIdParamSchema),
  validateBody(updateJobSchema),
  asyncHandler(updateJob),
);

router.delete(
  "/:id",
  validateParams(jobIdParamSchema),
  asyncHandler(deleteJob),
);

export default router;
