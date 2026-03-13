export type UserRole = 'ADM' | 'USER';

export interface UserModel {
  username: string;
  email: string;
  role: UserRole;
}

export interface AuthCredentials {
  username?: string;
  email: string;
  password: string;
}

