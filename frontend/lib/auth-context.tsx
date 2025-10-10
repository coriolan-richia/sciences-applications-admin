"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { User, AuthState } from "@/types/auth";

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
// This will be replaced when linked to the backend
const MOCK_USERS: Array<User & { password: string }> = [
  {
    id: "1",
    email: "superadmin@college.edu",
    password: "super123",
    name: "Super Admin",
    role: "superadmin",
  },
  {
    id: "2",
    email: "admin@college.edu",
    password: "admin123",
    name: "Admin User",
    role: "admin",
  },
  {
    id: "3",
    email: "viewer@college.edu",
    password: "viewer123",
    name: "Viewer User",
    role: "viewer",
  },
  {
    id: "4",
    email: "admin",
    password: "123456",
    name: "Main Admin",
    role: "superadmin",
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
  });

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setAuthState({
        user: JSON.parse(storedUser),
        isAuthenticated: true,
      });
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    const user = MOCK_USERS.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      const { password: _, ...userWithoutPassword } = user;
      setAuthState({
        user: userWithoutPassword,
        isAuthenticated: true,
      });
      localStorage.setItem("user", JSON.stringify(userWithoutPassword));
      return true;
    }

    return false;
  };

  const logout = () => {
    setAuthState({
      user: null,
      isAuthenticated: false,
    });
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
