import NotFoundData from "@/components/not-found-data";
import SkeletonCard from "@/components/skeleton-card";
import { Button } from "@/components/ui/button";
import CreateWorkspace from "@/components/workspace/create-workspace";
import WorkspaceCard from "@/components/workspace/workspace-card";
import { useGetWorkspacesQuery } from "@/hooks/use-workspace";
import { PlusCircle } from "lucide-react";
import { useState } from "react";

const Workspaces = () => {
  const [isCreatingWorkspace, setIsCreatingWorkspace] = useState(false);
  const { data: workspaces, isLoading } = useGetWorkspacesQuery();

  return (
    <>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl md:text-3xl font-bold">Workspaces</h2>
          <Button onClick={() => setIsCreatingWorkspace(true)}>
            <PlusCircle className="size-6 " />
            New Workspaces
          </Button>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading && (
            <>
              {Array.from({ length: 6 }).map((_, idx) => (
                <div key={idx} className="space-y-2">
                  <SkeletonCard />
                </div>
              ))}
            </>
          )}
          {workspaces?.map((workspace) => (
            <WorkspaceCard key={workspace._id} workspace={workspace} />
          ))}
          {workspaces?.length === 0 && (
            <NotFoundData
              title="No Workspace found"
              description="Create a new workspace to get started"
              buttonText="Create Workspace"
              buttonAction={() => setIsCreatingWorkspace(true)}
            />
          )}
        </div>
      </div>
      <CreateWorkspace
        isCreatingWorkspace={isCreatingWorkspace}
        setIsCreatingWorkspace={setIsCreatingWorkspace}
      />
    </>
  );
};

export default Workspaces;
