export type UserRole = "superadmin" | "admin";

export interface User {
  id: string;
  identifiant: string;
  email?: string;
  name?: string;
  role: UserRole;
}

export interface ResponseUser {
  id: string;
  identifiant: string;
  role: UserRole;
  [key: string]: any;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}
