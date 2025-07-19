export enum ProjectStatus {
  PLANNING = "Planning",
  IN_PROGRESS = "In Progress",
  ON_HOLD = "On Hold",
  COMPLETED = "Completed",
  CANCELLED = "Cancelled",
}
enum TaskStatus {
  TODO = "To Do",
  IN_PROGRESS = "In Progress",
  REVIEW = "Review",
  DONE = "Done",
}
enum Priority {
  LOW = "Low",
  MEDIUM = "Medium",
  HIGH = "High",
}

export interface User {
  _id: string;
  name: string;
  is2FAEnabled: boolean;
  isEmailVerified: boolean;
  profilePicture?: string;
  lasLogin: Date;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginResponse {
  message: string;
  token: string;
  user: User | null;
}

export interface Attachment {
  fileName: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
  uploadedBy: User | string;
  uploadedAt: Date;
}
export interface SubTask {
  title: string;
  completed: boolean;
  createdAt: Date;
}

export interface IMember {
  // _id: string;
  user: User;
  role: "admin" | "member" | "owner" | "viewer";
  joinedAt: Date;
}

export interface Task {
  _id: string;
  title: string;
  description?: string;
  project: string;
  status: TaskStatus;
  priority: Priority;
  assignees: Array<User | string>;
  watchers?: Array<User | string>;
  dueDate: Date;
  completedAt: Date;
  estimateHours: number;
  actualHours: number;
  tags: string[];
  subTasks?: SubTask[];
  comments: string[];
  attachments?: Attachment[];
  createdBy: User | string;
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export interface Workspace {
  _id: string;
  name: string;
  description?: string;
  owner: User | string;
  color: string;
  members: IMember[];
  createdAt: Date;
  updatedAt: Date;
}
export interface Project {
  _id: string;
  title: string;
  description?: string;
  workspace: Workspace | string;
  status: ProjectStatus;
  startDate: Date;
  dueDate: Date;
  progress: number;
  tasks: Array<Task | string>;
  members: {
    user: User;
    role: "contributor" | "manager" | "viewer";
  }[];
  tags: string[];
  createdBy: string;
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IWorkspaceResponse {
  workspace: Workspace;
  projects: Project[];
}
