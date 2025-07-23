import type { Project } from "@/types";
import NotFoundData from "../not-found-data";
import ProjectCard from "./project-card";

interface Props {
  workspaceId: string;
  projects?: Project[];
  onCreateProject: () => void;
}
const ProjectList = ({ onCreateProject, projects, workspaceId }: Props) => {
  return (
    <div>
      <h3 className="text-xl font-medium mb-4">Projects</h3>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {!projects || projects.length === 0 ? (
          <NotFoundData
            title="No projects found"
            description="Create a project to get started"
            buttonText="Create Project"
            buttonAction={onCreateProject}
          />
        ) : (
          projects.map((project) => (
            <ProjectCard
              key={project._id}
              project={project}
              progress={0}
              workspaceId={workspaceId}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ProjectList;
