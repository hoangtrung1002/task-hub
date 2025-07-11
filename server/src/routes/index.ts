import { Router } from "express";
import { authRoutes } from "./auth.route";
import { workspaceRoutes } from "./workspace.route";

const router = Router();
router.use("/auth", authRoutes);
router.use("/workspaces", workspaceRoutes);

export default router;
