import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import {
  createWorkspaceService,
  getWorkspacesService,
} from "../services/workspace.service";
import { HTTPSTATUS } from "../config/http.config";

export const createWorkspaceController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req?.user?._id as string;
    const workspace = await createWorkspaceService(req.body, userId);

    res.status(HTTPSTATUS.CREATED).json(workspace);
  }
);

export const getWorkspacesController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req?.user?._id as string;
    const workspaces = await getWorkspacesService(userId);

    res.status(HTTPSTATUS.OK).json(workspaces);
  }
);
