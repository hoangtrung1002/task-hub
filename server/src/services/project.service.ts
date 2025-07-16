import ProjectModel, { ProjectDocument } from "../models/project.model";

export async function getProjectService(
  workspaceId: string,
  userId: string
): Promise<ProjectDocument[]> {
  const projects = await ProjectModel.find({
    workspace: workspaceId,
    isArchived: false,
    members: { $in: [userId] },
  })
    .populate("tasks", "status")
    .sort({ createdAt: -1 });
  return projects;
}
