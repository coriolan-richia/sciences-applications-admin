"use client"; // Directive Next.js qui indique que ce programme s'exécute du côté client

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

import type { User, AuthState } from "@/types/auth";
import { API } from "./api";
import LoadingPage from "@/components/loading";

interface AuthContextType extends AuthState {
  login: (identifiant: string, password: string) => Promise<LoginResult>;
  logout: () => void;
  loading: boolean;
}

interface LoginResult {
  success: boolean;
  type: "ok" | "network" | "http" | "parse" | "auth";
  status?: number;
  error?: string;
}

// Un contexte qui partage l'état d'authentification à toute l'application
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  // Nous n'avons aucun utilisateur de connecté au démarrage.
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      // Si l'utilisateur existe, on le connecte
      if (storedUser) {
        setAuthState({
          user: JSON.parse(storedUser),
          isAuthenticated: true,
        });
      } else {
        setAuthState({
          user: null,
          isAuthenticated: false,
        });
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (
    identifiant: string,
    password: string
  ): Promise<LoginResult> => {
    const authUrl = `${API.authentication}`;

    try {
      const response = await fetch(authUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifiant: identifiant,
          motDePasse: password,
        }),
      });

      let responseAsText = await response.text();

      let data: any = null;
      if (responseAsText) {
        try {
          data = JSON.parse(responseAsText);
        } catch {
          return { success: false, type: "parse" };
        }
      }

      if (!response.ok) {
        const errorMessage =
          data?.error ||
          data?.message ||
          response.statusText ||
          "Erreur Inconnue";

        return {
          success: false,
          type:
            response.status === 401 || response.status === 400
              ? "auth"
              : "http",
          status: response.status,
          error: errorMessage,
        };
      }

      if (!data?.identifiant) {
        return { success: false, type: "auth" };
      }

      const { ...userWithoutPassword } = data;
      setAuthState({
        user: {
          id: data.idUtilisateur,
          role: data.nomRole,

          ...userWithoutPassword,
        },

        isAuthenticated: true,
      });

      localStorage.setItem("user", JSON.stringify(userWithoutPassword));

      return { success: true, type: "ok" };
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : String(error ?? "Erreur inconnue");
      return { success: false, type: "network", error: message };
    }
  };

  // La fonction de déconnexion:
  //  Efface l'état d'authentification
  //  Supprime l'utilisateur du localStorage
  const logout = () => {
    setAuthState({
      user: null,
      isAuthenticated: false,
    });
    localStorage.removeItem("user");
  };

  if (isLoading) return <LoadingPage />;
  
  return (
    <AuthContext.Provider
      value={{ ...authState, loading: isLoading, login, logout }}
    >
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
