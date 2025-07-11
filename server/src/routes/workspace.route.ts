import { Router } from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.middleware";
import { validateRequest } from "zod-express-middleware";
import { workspaceSchema } from "../validations/workspace.validation";
import { createWorkspaceController } from "../controller/workspace.controller";

const router = Router();

router.post(
  "/",
  isAuthenticated,
  validateRequest({ body: workspaceSchema }),
  createWorkspaceController
);

export const workspaceRoutes = router;
