import { Router } from "express";
import { authRoutes } from "./auth.route";
import { workspaceRoutes } from "./workspace.route";
import { isAuthenticated } from "../middlewares/isAuthenticated.middleware";

const router = Router();
router.use("/auth", authRoutes);
router.use("/workspaces", isAuthenticated, workspaceRoutes);

export default router;
