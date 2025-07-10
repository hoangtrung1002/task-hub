import { cn } from "@/lib/utils";
import { useAuth } from "@/providers/auth-context";
import type { Workspace } from "@/types";
import { ChevronsLeft, ChevronsRight, LogOut, Wrench } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import SidebarNav from "./sidebar-nav";

interface Props {
  currentWorkspace?: Workspace | null;
}
const Sidebar = ({ currentWorkspace }: Props) => {
  const { user, logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <div
      className={cn(
        "flex flex-col border-r bg-sidebar transition-all duration-300",
        isCollapsed ? "w-16 md:w-[80px]" : "w-16 md:w-[240px]"
      )}
    >
      <div className="flex h-14 items-center justify-between border-b px-4 mb-4 ">
        <Link to="/dashboard" className="flex items-center">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <Wrench className="size-6 text-blue-600" />
              <span className="font-semibold text-lg hidden md:block">
                TaskHub
              </span>
            </div>
          )}
          {isCollapsed && <Wrench className="size-6 text-blue-600" />}
        </Link>
        <Button
          variant="ghost"
          className="hidden md:block"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? (
            <ChevronsRight className="size-4 " />
          ) : (
            <ChevronsLeft className="size-4" />
          )}
        </Button>
      </div>
      <ScrollArea className="flex-1 px-3 py-2">
        <SidebarNav
          isCollapsed={isCollapsed}
          className={cn(isCollapsed && "items-center space-y-2")}
          currentWorkspace={currentWorkspace}
        />
      </ScrollArea>
      <div className="flex">
        <Button
          variant={"ghost"}
          size={isCollapsed ? "icon" : "default"}
          onClick={logout}
          className="flex-1"
        >
          {isCollapsed ? (
            <>
              <LogOut className="size-4" />
            </>
          ) : (
            <>
              <LogOut className="size-4" />
              <span className="hidden md:block">Logout</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
