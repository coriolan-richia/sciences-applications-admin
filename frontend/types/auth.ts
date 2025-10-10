export type UserRole = "superadmin" | "admin" | "viewer";

export interface User {
  id: string;
  identifiant: string;
  email?: string;
  name: string;
  role: UserRole;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}
