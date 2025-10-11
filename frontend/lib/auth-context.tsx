"use client"; // Directive Next.js qui indique que ce programme s'exécute du côté client

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

import type { User, AuthState } from "@/types/auth";
import { logIfDev } from "@/lib/utils";

interface AuthContextType extends AuthState {
  login: (identifiant: string, password: string) => Promise<LoginResult>;
  logout: () => void;
}

interface LoginResult {
  success: boolean;
  type: "ok" | "network" | "http" | "parse" | "auth";
  status?: number;
  error?: string;
}

// Un contexte qui partage l'état d'authentification à toute l'application
const AuthContext = createContext<AuthContextType | undefined>(undefined);

//[!] Un PROVIDER est un composant React qui fournit des données ou fonctions à tout ce qui est au dessous de lui dans l'arbre.

// Un PROVIDER qui:
//    Fournit l'état global d'authentification (AuthState)
//    Recharge l'utilisateur stocké dans localStorage au montage (useEffect) => et le stockq (voir code)
//    Fournit les fonctions login() et logout() qui sont utilisées pour s'authentifier et se déconnecter.
export function AuthProvider({ children }: { children: ReactNode }) {
  // Nous n'avons aucun utilisateur de connecté au démarrage.
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
  });

  // On recherche s'il y a un utilisateur connecté stocké dans le localStorage
  // S'il existe, alors on connecte cet utilisateur à l'application
  useEffect(() => {
    // Quand l'appli est monté, on cherche s'il y a un utilisateur connecté dans le localStorage
    const storedUser = localStorage.getItem("user");

    // Si l'utilisateur existe, on le connecte
    if (storedUser) {
      setAuthState({
        user: JSON.parse(storedUser),
        isAuthenticated: true,
      });
    }
  }, []);

  // La fonction Login authentifie une personne depuis la page d'authentification
  // La fonction login:
  //    est Asynchrone
  //    prend en paramètre un identifiant et un mot de passe.
  //    retourne une promesse qui se résoudra plus tard en booléen
  const login = async (
    identifiant: string,
    password: string
  ): Promise<LoginResult> => {
    // L'url d'athentification
    const authUrl = "http://localhost:5174/api/Authentication";

    try {
      // Requête vers l'api
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

      // Lecture du message
      let data: any = null;
      if (responseAsText) {
        try {
          data = JSON.parse(responseAsText);
        } catch {
          logIfDev("log", "Réponse Non JSON:", responseAsText);
          return { success: false, type: "parse" };
        }
      }

      // Erreurs HTTP
      if (!response.ok) {
        const errorMessage =
          data?.error ||
          data?.message ||
          response.statusText ||
          "Erreur Inconnue";
        logIfDev(
          "error",
          `Erreur HTTP: ${response.status} ${response.statusText}`
        );
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

      // Si un identifiant est disponible dans la réponse, on enregistre l'utilisateur authentifié dans:
      //  Le localStorage
      //  L'état d'authentification, qui est alors marqué comme authentifié.
      //  La fonction de login retourne un booléen true
      if (!data?.identifiant) {
        logIfDev("error", "Identifiants incorrects ou Utilisateur Introuvable");
        return { success: false, type: "auth" };
      }

      const { ...userWithoutPassword } = data;
      setAuthState({
        user: { ...userWithoutPassword, role: "superadmin" },
        isAuthenticated: true,
      });

      localStorage.setItem("user", JSON.stringify(userWithoutPassword));
      logIfDev("log", "Utilisateur authentifié:", localStorage.getItem("user"));

      return { success: true, type: "ok" };
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : String(error ?? "Erreur inconnue");
      logIfDev("log", "Erreur réseau ou requête échouée:", error);
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
