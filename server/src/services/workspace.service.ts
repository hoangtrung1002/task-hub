import WorkspaceModel from "../models/workspace.model";
import { BadRequestException } from "../utils/app-error";

export async function createWorkspaceService(
  body: {
    name: string;
    color: string;
    description?: string;
  },
  userId: string
) {
  const { name, color, description } = body;

  const workspace = await WorkspaceModel.create({
    name,
    color,
    description,
    owner: userId,
    members: [{ user: userId, role: "owner", joinedAt: new Date() }],
  });
  return workspace;
}

export async function getWorkspacesService(userId: string) {
  const workspaces = await WorkspaceModel.find({ "members.user": userId }).sort(
    { createdAt: -1 }
  );
  if (!workspaces) {
    throw new BadRequestException("No workspaces found for this user");
  }

  return workspaces;
}
