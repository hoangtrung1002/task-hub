import { Router } from "express";
import { validateRequest } from "zod-express-middleware";
import {
  createWorkspaceController,
  getWorkspaceDetailController,
  getWorkspaceProjectsController,
  getWorkspacesController,
} from "../controller/workspace.controller";
import { isAuthenticated } from "../middlewares/isAuthenticated.middleware";
import { workspaceSchema } from "../validations/workspace.validation";

const router = Router();

router.post(
  "/",
  isAuthenticated,
  validateRequest({ body: workspaceSchema }),
  createWorkspaceController
);
router.get("/", getWorkspacesController);
router.get("/:workspaceId", getWorkspaceDetailController);
router.get("/:workspaceId/projects", getWorkspaceProjectsController);

export const workspaceRoutes = router;
