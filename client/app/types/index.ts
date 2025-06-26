export interface User {
  _id: string;
  name: string;
  is2FAEnabled: boolean;
  isEmailVerified: boolean;
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
