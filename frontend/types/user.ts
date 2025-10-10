export type UserRole = "superadmin" | "admin" | "viewer";

export interface User {
  id: string;
  email: string;
  name: string;
  password?: string;
  role: UserRole;
}
