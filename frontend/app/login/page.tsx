"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/lib/auth-context";
import { AlertCircle } from "lucide-react";
import { PasswordInput } from "@/components/ui/password";
// La page de login
export default function LoginPage() {
  const [identifiant, setidentifiant] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    /* console.log(
      "Tentative de connexion avec:",
      `{${identifiant}, ${password}}`
    ); */

    const success = await login(identifiant, password);

    // console.log("Résultat de la connexion:", success);

    if (success.success) {
      router.push("/dashboard");
    } else {
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
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <img src="images/fs.jpg" />
          </div>
          <CardTitle className="text-2xl font-bold">
            Gestion des Candidatures
          </CardTitle>
          <CardDescription>
            Connectez-vous pour acceder aux outils d'administration.
          </CardDescription>
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

            <Button
              type="submit"
              className="w-full bg-purple-700"
              disabled={isLoading}
            >
              {isLoading ? "Connexion ..." : "Se connecter"}
            </Button>
          </form>
        </CardContent>

        <CardFooter>
          <p className="text-sm text-center w-full text-gray-500">
            © Faculté des Sciences - Université d'Antananarivo
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
