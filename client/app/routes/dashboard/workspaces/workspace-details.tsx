import Loader from "@/components/loader";
import CreateProjectDialog from "@/components/project/create-project-dialog";
import ProjectList from "@/components/project/project-list";
import WorkspaceHeader from "@/components/workspace/workspace-header";
import { useGetWorkspaceQuery } from "@/hooks/use-workspace";
import { useState } from "react";
import { useParams } from "react-router";

const WorkspaceDetails = () => {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const [isCreateProject, setIsCreateProject] = useState(false);
  const [isInviteMember, setIsInviteMember] = useState(false);

  if (!workspaceId) return <div>No workspace found</div>;
  const { data, isLoading } = useGetWorkspaceQuery(workspaceId);

  if (isLoading) return <Loader />;
  return (
    <div className="space-y-8">
      <WorkspaceHeader
        workspace={data?.workspace}
        onCreateProject={() => setIsCreateProject(true)}
        onInviteMember={() => setIsInviteMember(true)}
      />
      <ProjectList
        workspaceId={workspaceId}
        projects={data?.projects}
        onCreateProject={() => setIsCreateProject(true)}
      />
      <CreateProjectDialog
        isOpen={isCreateProject}
        onOpenChange={setIsCreateProject}
        workspaceId={workspaceId}
        workspaceMembers={data?.workspace.members}
      />
    </div>
  );
};

export default WorkspaceDetails;
