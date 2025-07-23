import type { Project } from "@/types";
import React from "react";

interface Props {
  project: Project;
  progress: number;
  workspaceId: string;
}
const ProjectCard = ({ progress, project, workspaceId }: Props) => {
  return <div>ProjectCard</div>;
};

export default ProjectCard;
