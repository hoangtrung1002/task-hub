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

export interface Workspace {
  _id: string;
  name: string;
  description?: string;
  owner: User | string;
  color: string;
  members: {
    user: User;
    role: "owner" | "admin" | "member" | "viewer";
    joinedAt: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
}
