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
import { asynHandler } from "../../utils/async-handler.ts";

const router = Router();

router.use(authenticate);

router.post("/", validateBody(createJobSchema), asynHandler(createJob));

router.get("/", asynHandler(getAllJobs));

router.get("/:id", validateParams(jobIdParamSchema), asynHandler(getJobById));

router.patch(
  "/:id",
  validateParams(jobIdParamSchema),
  validateBody(updateJobSchema),
  asynHandler(updateJob),
);

router.delete("/:id", validateParams(jobIdParamSchema), asynHandler(deleteJob));

export default router;
