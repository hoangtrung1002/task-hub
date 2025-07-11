import type { WorkspaceForm } from "@/components/workspace/create-workspace";
import { postData } from "@/lib/axios";
import type { Workspace } from "@/types";
import { useMutation } from "@tanstack/react-query";

export const useCreateWorkspace = () =>
  useMutation<Workspace, Error, WorkspaceForm>({
    mutationFn: async (data) => postData("/workspaces", data),
  });
