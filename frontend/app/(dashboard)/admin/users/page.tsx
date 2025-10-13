"use client";

import { useState } from "react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Edit, Shield, Eye, ArrowUpDown } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { mockUsers } from "@/lib/mock-data";
import type { User } from "@/types/user";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function UsersPage() {
  const { user: currentUser } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<string>("id-asc");
  const [users] = useState<Array<User & { password?: string }>>(
    mockUsers as Array<User & { password?: string }>
  );

  const filteredUsers = users.filter((user) =>
    user.identifiant?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    switch (sortBy) {
      case "id-asc":
        return a.identifiant.localeCompare(b.identifiant);
      case "id-desc":
        return b.identifiant.localeCompare(a.identifiant);
      case "role-superadmin":
        return a.role === "superadmin" ? -1 : 1;
      case "role-admin":
        return a.role === "admin" ? -1 : 1;
      case "role-viewer":
        return a.role === "viewer" ? -1 : 1;
      default:
        return 0;
    }
  });

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "superadmin":
        return <Shield className="h-4 w-4" />;
      case "admin":
        return <Eye className="h-4 w-4" />;
      case "viewer":
        return <Eye className="h-4 w-4" />;
      default:
        return <Eye className="h-4 w-4" />;
    }
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "superadmin":
        return "default";
      case "admin":
        return "secondary";
      case "viewer":
        return "outline";
      default:
        return "outline";
    }
  };

  if (currentUser?.role !== "superadmin") {
    return (
      <div className="flex h-full items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Accès refusé</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground">
              Vous n'avez pas la permission d'accéder à cette page.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <PageHeader
        title="Gestion des Utilisateurs"
        description="Gérer les comptes et permissions des utilisateurs"
      />

      <div className="flex-1 space-y-6 p-6">
        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Nombre total des Utilisateurs
              </CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Administrateurs
              </CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {
                  users.filter(
                    (u) => u.role === "admin" || u.role === "superadmin"
                  ).length
                }
              </div>
            </CardContent>
          </Card>
          {/* <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Viewers</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {users.filter((u) => u.role === "viewer").length}
              </div>
            </CardContent>
          </Card> */}
        </div>

        {/* Search and Actions */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-1 items-center gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Rechercher des utilisateurs par identifiant ou rôle"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            {/* Sort dropdown */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <ArrowUpDown className="mr-2 h-4 w-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="id-asc">Identifiant (A-Z)</SelectItem>
                <SelectItem value="id-desc">Identifiant (Z-A)</SelectItem>
                <SelectItem value="role-superadmin">
                  Superutilisateurs d'abord
                </SelectItem>
                <SelectItem value="role-admin">
                  Administrateurs d'abord
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button asChild>
            <Link href="/admin/users/new">
              <Plus className="mr-2 h-4 w-4" />
              Ajout d'un utilisateur
            </Link>
          </Button>
        </div>

        {/* Users List */}
        <Card>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {sortedUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-4 hover:bg-muted/50"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      {getRoleIcon(user.role)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-foreground">
                          {user.identifiant}
                        </p>
                        {user.id === currentUser?.id && (
                          <Badge variant="outline" className="text-xs">
                            You
                          </Badge>
                        )}
                      </div>
                      <Badge variant={getRoleBadgeVariant(user.role)}>
                        {user.role}
                      </Badge>
                      {/* <p className="text-sm text-muted-foreground">
                        {user.identifiant}
                      </p> */}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/admin/users/${user.id}/edit`}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
