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
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewUserPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    identifiant: "",
    password: "",
    role: "admin",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // In a real app, this would call an API
    console.log("Création de l'utilisateur:", formData);
    router.push("/admin/users");
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
              {/* <div className="space-y-2">
                <Label htmlFor="name"></Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div> */}

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
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Mot de passe"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Rôle</Label>
                <Select
                  value={formData.role}
                  onValueChange={(value) =>
                    setFormData({ ...formData, role: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrateur</SelectItem>
                    <SelectItem value="superadmin">
                      Superadministrateur
                    </SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  {formData.role === "superadmin" &&
                    "Accès complet à toutes les fonctionnalités, y compris la gestion des utilisateurs"}
                  {formData.role === "admin" &&
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
