import type { Workspace } from "@/types";
import { Plus, UserPlus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import WorkspaceAvatar from "./workspace-avatar";

interface Props {
  workspace?: Workspace;
  onCreateProject: () => void;
  onInviteMember: () => void;
}

const WorkspaceHeader = ({
  workspace,
  onCreateProject,
  onInviteMember,
}: Props) => {
  if (!workspace) return null;
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <div className="flex flex-col-reverse md:flex-row md:justify-between md:items-center gap-3">
          <div className="flex md:items-center gap-3">
            {workspace.color && (
              <WorkspaceAvatar color={workspace.color} name={workspace.name} />
            )}
            <h2 className="text-xl md:text-2xl font-semibold">
              {workspace.name}
            </h2>
          </div>
          <div className="flex items-center justify-between mt-4 md:mt-0 md:justify-start gap-3 mb-4 md:mb-0">
            <Button variant="outline" onClick={onInviteMember}>
              <UserPlus className="size-4" />
              Invite
            </Button>
            <Button onClick={onCreateProject}>
              <Plus className="size-4" />
              Create Project
            </Button>
          </div>
        </div>
        {workspace.description && (
          <p className="text-sm md:text-base text-muted-foreground">
            {workspace.description}
          </p>
        )}
      </div>
      {workspace.members.length > 0 && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Members</span>
          <div className="flex space-x-2">
            {workspace.members.map(({ user }) => (
              <Avatar key={user._id}>
                <AvatarImage src={user.profilePicture} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkspaceHeader;
