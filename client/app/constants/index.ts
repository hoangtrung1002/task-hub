import {
  CheckCircle2,
  LayoutDashboard,
  ListCheck,
  Settings,
  Users,
} from "lucide-react";

export const FIELD_NAMES = {
  name: "Name",
  email: "Email",
  password: "Password",
  confirmPassword: "Confirm Password",
};

export const FIELD_TYPES = {
  name: "text",
  email: "email",
  password: "password",
  confirmPassword: "password",
};

export const NAV_ITEMS = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Workspaces",
    href: "/workspaces",
    icon: Users,
  },
  {
    title: "My Tasks",
    href: "/my-tasks",
    icon: ListCheck,
  },
  {
    title: "Members",
    href: `/members`,
    icon: Users,
  },
  {
    title: "Achieved",
    href: `/achieved`,
    icon: CheckCircle2,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];
