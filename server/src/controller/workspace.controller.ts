import { Request, Response } from "express";
import { HTTPSTATUS } from "../config/http.config";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import {
  createWorkspaceService,
  getWorkspaceDetailService,
  getWorkspaceProjectsService,
  getWorkspacesService,
} from "../services/workspace.service";
import { serialize as v8Serialize } from "v8";

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

export const getWorkspaceDetailController = asyncHandler(
  async (req: Request, res: Response) => {
    const { workspaceId } = req.params;
    const userId = req?.user?._id as string;
    const workspace = await getWorkspaceDetailService(workspaceId, userId);

    res.status(HTTPSTATUS.OK).json(workspace);
  }
);

export const getWorkspaceProjectsController = asyncHandler(
  async (req: Request, res: Response) => {
    const { workspaceId } = req.params;
    const userId = req?.user?._id as string;
    const { projects, workspace } = await getWorkspaceProjectsService(
      workspaceId,
      userId
    );

    res.status(HTTPSTATUS.OK).json({ projects, workspace });
  }
);
