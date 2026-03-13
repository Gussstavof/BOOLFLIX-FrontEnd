export type UserRole = 'USER' | 'ADM';

export interface UserModel {
  username?: string;
  email: string;
  password: string;
}
