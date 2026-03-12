export type UserRole = 'ADM' | 'USER';

export interface UserModel {
  username?: string;
  email: string;
  password: string;
  role?: UserRole;
}

export interface SessionUser {
  username: string;
  email: string;
  role: UserRole;
}
