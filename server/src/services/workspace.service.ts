import WorkspaceModel from "../models/workspace.model";

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
