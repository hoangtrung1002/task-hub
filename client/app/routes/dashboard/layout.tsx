import Header from "@/components/header";
import Loader from "@/components/loader";
import Sidebar from "@/components/sidebar/sidebar";
import CreateWorkspace from "@/components/workspace/create-workspace";
import { useAuth } from "@/providers/auth-context";
import type { Workspace } from "@/types";
import { useState } from "react";
import { Navigate, Outlet } from "react-router";

const DashboardLayout = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace | null>(
    null
  );
  const [isCreatingWorkspace, setIsCreatingWorkspace] = useState(false);

  if (isLoading) return <Loader />;

  if (!isAuthenticated) return <Navigate to="/sign-in" />;

  const handleWorkspaceSelected = (workspace: Workspace) => {
    setCurrentWorkspace(workspace);
  };

  return (
    <div className="flex h-screen w-full">
      <Sidebar currentWorkspace={currentWorkspace} />
      <div className="flex flex-1 flex-col h-full">
        <Header
          onCreateWorkspace={() => setIsCreatingWorkspace(true)}
          onWorkspaceSelected={() => handleWorkspaceSelected}
          selectedWorkspace={null}
        />
        <main className="flex-1 overflow-y-auto h-full w-full">
          <div className="mx-auto container px-2 sm:px-6 lg:px-8 py-0 md:py-8 w-full h-full">
            <Outlet />
          </div>
        </main>
      </div>
      <CreateWorkspace
        isCreatingWorkspace={isCreatingWorkspace}
        setIsCreatingWorkspace={setIsCreatingWorkspace}
      />
    </div>
  );
};

export default DashboardLayout;
