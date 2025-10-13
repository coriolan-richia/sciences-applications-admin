export type UserRole = "superadmin" | "admin" | "viewer";

export interface User {
  id: string;
  identifiant: string;
  name: string;
  password?: string;
  role: UserRole;
}
