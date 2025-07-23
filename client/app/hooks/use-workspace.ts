import type { WorkspaceForm } from "@/components/workspace/create-workspace";
import { fetchData, postData } from "@/lib/axios";
import type { IWorkspaceResponse, Workspace } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useCreateWorkspace = () =>
  useMutation<Workspace, Error, WorkspaceForm>({
    mutationFn: async (data) => postData("/workspaces", data),
  });

export const useGetWorkspacesQuery = () =>
  useQuery<Workspace[], Error>({
    queryKey: ["workspaces"],
    queryFn: async () => fetchData("/workspaces"),
  });
export const useGetWorkspaceQuery = (workspaceId: string) => {
  return useQuery<IWorkspaceResponse, Error>({
    queryKey: ["workspace", workspaceId],
    queryFn: async () => fetchData(`/workspaces/${workspaceId}/projects`),
  });
};
