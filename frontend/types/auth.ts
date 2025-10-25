export type UserRole = "superadmin" | "admin";

export interface User {
  idUtilisateur: string;
  identifiant: string;
  nomRole: UserRole;
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
