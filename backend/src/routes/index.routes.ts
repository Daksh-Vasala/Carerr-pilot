import { Router } from "express";
import authRoutes from "../features/auth/auth.routes.ts";
import profileRoutes from "../features/profile/profile.routes.ts";
import resumeRoutes from "../features/resume/resume.routes.ts";
import jobRoutes from "../features/job/job.routes.ts";

const router = Router();

router.use("/auth", authRoutes);
router.use("/profiles", profileRoutes);
router.use("/resumes", resumeRoutes);
router.use("/jobs", jobRoutes);

export default router;
