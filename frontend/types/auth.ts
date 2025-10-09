export type UserRole = "superadmin" | "admin" | "viewer"

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  createdAt: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
}
