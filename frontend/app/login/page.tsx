"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/lib/auth-context";
import { AlertCircle, Loader2 } from "lucide-react";
import { PasswordInput } from "@/components/ui/password";
import Image from "next/image";

// La page de login
export default function LoginPage() {
  const [identifiant, setidentifiant] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { loading, isAuthenticated, login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated && !loading) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router, loading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const success = await login(identifiant, password);

    if (!success.success) {
      switch (success.type) {
        case "auth":
          setError(
            typeof success.error === "string"
              ? success.error
              : "Erreur inconnue survenue"
          );
          break;

        case "network":
          setError("Erreur de connexion au serveur");
          break;

        case "parse":
          setError("Format de données non reconnu");
          break;

        case "http":
          setError(`Erreur HTTP survenue : ${success.status}`);
          break;

        default:
          setError("Une erreur inconnue est survenue");
      }
    }

    setIsLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <Image
              src="/images/fs.jpg"
              alt="Logo"
              className="rounded-full"
              width={60}
              height={60}
            />
          </div>
          <div>
            <CardTitle className="text-2xl">Faculté des Sciences</CardTitle>
            <CardDescription className="mt-2">
              Système de gestion des candidatures
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="identifier">Identifiant</Label>
              <Input
                id="identifier"
                type="text"
                placeholder="science-admin"
                value={identifiant}
                onChange={(e) => setidentifiant(e.target.value)}
                required
                autoComplete="username"
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <PasswordInput
                id="password"
                placeholder="Insérez votre mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                disabled={isLoading}
                required
              />
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Connexion en
                  cours...{" "}
                </>
              ) : (
                "Se connecter"
              )}
            </Button>
          </form>
          <div className="mt-4 text-sm text-center text-muted-foreground">
            <p>© Faculté des Sciences - Université d'Antananarivo</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
