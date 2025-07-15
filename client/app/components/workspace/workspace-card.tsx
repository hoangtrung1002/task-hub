import { formatDate } from "@/lib/utils";
import type { Workspace } from "@/types";
import { Users } from "lucide-react";
import { Link } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import WorkspaceAvatar from "./workspace-avatar";

interface Props {
  workspace: Workspace;
}
const WorkspaceCard = ({ workspace }: Props) => {
  return (
    <Link to={`/workspaces/${workspace._id}`}>
      <Card className="transition-all hover:shadow-md hover:-translate-y-1">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex gap-2 w-full items-center">
              <WorkspaceAvatar name={workspace.name} color={workspace.color} />
              <div className="flex flex-col flex-1">
                <CardTitle>{workspace.name}</CardTitle>
                <span className="text-xs text-muted-foreground">
                  Created at {formatDate(workspace.createdAt)}
                </span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Users className="size-4 mr-1" />
                <span className="text-xs">{workspace.members.length}</span>
              </div>
            </div>
          </div>
          <CardDescription>
            {workspace.description || "No description"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>View workspace details and projects</div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default WorkspaceCard;
