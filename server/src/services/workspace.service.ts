import { ProjectDocument } from "../models/project.model";
import WorkspaceModel, { WorkspaceDocument } from "../models/workspace.model";
import { NotFoundException } from "../utils/app-error";
import { getProjectService } from "./project.service";

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
    throw new NotFoundException("No workspaces found for this user");
  }

  return workspaces;
}

export async function getWorkspaceDetailService(
  workspaceId: string,
  userId: string
): Promise<WorkspaceDocument> {
  const workspace = await WorkspaceModel.findOne({
    _id: workspaceId,
    "members.user": userId,
  }).populate("members.user", "name email profilePicture");

  if (!workspace) throw new NotFoundException("Not found workspace");

  return workspace;
}

export async function getWorkspaceProjectsService(
  workspaceId: string,
  userId: string
): Promise<{ projects: ProjectDocument[]; workspace: WorkspaceDocument }> {
  const workspace = await WorkspaceModel.findOne({
    _id: workspaceId,
    "members.user": userId,
  }).populate("projects");

  if (!workspace) throw new NotFoundException("Workspace not found");

  const projects = await getProjectService(workspaceId, userId);

  return { workspace, projects };
}
