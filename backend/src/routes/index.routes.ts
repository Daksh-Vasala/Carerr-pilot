import { Router } from "express";
import authRoutes from "../features/auth/auth.routes.js";
import profileRoutes from "../features/profile/profile.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/profile", profileRoutes);

export default router;
