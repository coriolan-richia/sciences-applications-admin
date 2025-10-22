"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { API } from "@/lib/api";
import { ConfirmPassword, PasswordInput } from "@/components/ui/password";

export default function NewUserPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    identifiant: "",
    password: "",
    role: "",
  });

  const fetchUrl = `${API.utilisateur}/insert-user`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let user = JSON.parse(localStorage.getItem("user") ?? "");
    if (user === null) {
      router.push("/login");
      return;
    }
    try {
      const response = await fetch(fetchUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idUser: user.idUtilisateur ?? 0,
          newUserIdentifiant: formData.identifiant,
          newUserMotDePasse: formData.password,
          NewUserRoleName: formData.role,
        }),
      });

      // console.log("UserId ", user.idUtilisateur);

      if (!response.ok) {
        console.error("Problème HTTP :", response.statusText);
        return;
      }

      // In a real app, this would call an API
      // console.log("Création de l'utilisateur:", formData);
      router.push("/admin/users");
    } catch (error) {
      console.error("Erreur de réseau :", error);
    }
  };

  return (
    <div className="flex h-full flex-col">
      <PageHeader
        title="Ajouter un Nouvel Utilisateur"
        description="Créer un nouveau compte utilisateur"
        action={
          <Button variant="outline" asChild>
            <Link href="/admin/users">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour
            </Link>
          </Button>
        }
      />

      <div className="flex-1 p-6">
        <Card className="mx-auto max-w-2xl">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="identifiant">Identifiant</Label>
                <Input
                  id="identifiant"
                  type="identifiant"
                  placeholder="Identifiant (username)"
                  value={formData.identifiant}
                  onChange={(e) =>
                    setFormData({ ...formData, identifiant: e.target.value })
                  }
                  required
                  autoComplete="username"
                />
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Mot de passe</Label>
                  <PasswordInput
                    id="password"
                    className="pr-10"
                    placeholder="Mot de passe"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    autoComplete="new-password"
                    required
                  />
                </div>
                <ConfirmPassword password={formData.password} reset={true} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Rôle</Label>
                <Select
                  value={formData.role || undefined}
                  onValueChange={(value) =>
                    setFormData({ ...formData, role: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir un rôle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="superadmin">
                      Super administrateur
                    </SelectItem>
                    <SelectItem value="admin">Administrateur</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  {formData.role === "1" &&
                    "Accès complet à toutes les fonctionnalités, y compris la gestion des utilisateurs"}
                  {formData.role === "2" &&
                    "Peut gérer les préinscriptions, les paiements et les présélection"}
                  {/* {formData.role === "viewer" &&
                    "Read-only access to all sections"} */}
                </p>
              </div>

              <div className="flex gap-4">
                <Button type="submit" className="flex-1">
                  Créer l'utilisateur
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 bg-transparent"
                  asChild
                >
                  <Link href="/admin/users">Annuler</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
