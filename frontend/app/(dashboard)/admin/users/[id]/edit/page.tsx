"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { API } from "@/lib/api";
import { Checkbox } from "@/components/ui/checkbox";
import { ConfirmPassword, PasswordInput } from "@/components/ui/password";

type userEditType = {
  idUser: string;
  identifiant: string;
  idRole: string;
  password?: string;
};

const initialFormData: userEditType = {
  idUser: "",
  identifiant: "",
  idRole: "",
  password: "",
};

export default function EditUserPage() {
  const router = useRouter();
  const params = useParams();
  // const { user: currentUser } = useAuth();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [userToEdit, setUserToEdit] = useState<userEditType>(initialFormData);
  const [formData, setFormData] = useState<userEditType>(initialFormData);
  const [error, setError] = useState<string | null>(null);
  const [changePassword, setChangePassword] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem("user") ?? "");
  if (currentUser == null) {
    router.push("/login");
  }
  const userId = params.id as string;

  useEffect(() => {
    setFormData((prev) => ({ ...prev, password: "" }));
  }, [changePassword]);

  useEffect(() => {
    getOneUser();
  }, [userId]);

  useEffect(() => {
    if (userToEdit.idUser) {
      setFormData({ ...userToEdit });
    }
  }, [userToEdit]);

  const getOneUser = async () => {
    const getUserUrl = `${API.utilisateur}/get-one-user`;
    try {
      const response = await fetch(getUserUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          authId: currentUser?.idUtilisateur,
          targetId: userId,
        }),
      });

      if (!response.ok) {
        alert("Erreur HTTP : " + response.statusText);
        console.error("ERROR", response);
        return;
      }

      const data = await response.json();
      setUserToEdit({
        idUser: data.idUser.toString(),
        idRole: data.idRole.toString(),
        identifiant: data.identifiant,
      });
    } catch (error) {
      console.log("Error :", error);
      return;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    const updateUserUrl = `${API.utilisateur}/update-user`;
    e.preventDefault();
    setError(null);

    if (
      currentUser?.idUtilisateur === userId &&
      formData.idRole !== currentUser.role
    ) {
      setError(
        "You cannot change your own role. Please ask another administrator."
      );
      return;
    }

    // Validation: Must have at least one superadmin
    // if (userToEdit?.idRole === "1" && formData.idRole !== "1") {
    //   const superadminCount = mockUsers.filter(
    //     (u) => u.role === "superadmin"
    //   ).length;
    //   if (superadminCount <= 1) {
    //     setError(
    //       "Cannot change role. At least one SuperAdmin must exist in the system."
    //     );
    //     return;
    //   }
    // }

    try {
      const response = await fetch(updateUserUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          authId: currentUser.idUtilisateur,
          targetIdentifiant: formData.identifiant,
          password: formData.password,
          roleId: formData.idRole,
        }),
      });

      if (!response.ok) {
        alert("Erreur HTTP : " + response.statusText);
        console.error("ERROR", response);
        return;
      }

      router.push("/admin/users");
    } catch (error) {
      console.log("Error :", error);
      return;
    }

    // console.log("[v0] User updated:", formData);
    router.push("/admin/users");
  };

  const handleDelete = async () => {
    const deleteUserUrl = `${API.utilisateur}/delete-user`;
    setError(null);

    // Validation: Can't delete yourself
    if (currentUser?.idUtilisateur === userId) {
      setError("You cannot delete your own account.");
      setShowDeleteDialog(false);
      return;
    }

    // Validation: Must have at least one superadmin
    // if (userToEdit?.idRole === "1") {
    //   const superadminCount = mockUsers.filter(
    //     (u) => u.role === "superadmin"
    //   ).length;
    //   if (superadminCount <= 1) {
    //     setError(
    //       "Cannot delete user. At least one SuperAdmin must exist in the system."
    //     );
    //     setShowDeleteDialog(false);
    //     return;
    //   }
    // }

    try {
      const response = await fetch(deleteUserUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          authId: currentUser.idUtilisateur,
          targetId: formData.idUser,
        }),
      });

      if (!response.ok) {
        alert("Erreur HTTP : " + response.statusText);
        console.error("ERROR", response);
        return;
      }

      router.push("/admin/users");
    } catch (error) {
      console.log("Error :", error);
      return;
    }

    router.push("/admin/users");
  };

  // if (currentUser?.role !== "superadmin") {
  //   return (
  //     <div className="flex h-full items-center justify-center">
  //       <Card className="w-full max-w-md p-6">
  //         <h2 className="text-center text-xl font-semibold">Access Denied</h2>
  //         <p className="mt-2 text-center text-muted-foreground">
  //           You do not have permission to access this page.
  //         </p>
  //       </Card>
  //     </div>
  //   );
  // }

  if (!userToEdit) {
    return (
      <div className="flex h-full items-center justify-center">
        <Card className="w-full max-w-md p-6">
          <h2 className="text-center text-xl font-semibold">User Not Found</h2>
          <p className="mt-2 text-center text-muted-foreground">
            The requested user could not be found.
          </p>
          <div className="mt-4 text-center">
            <Button asChild>
              <Link href="/admin/users">Back to Users</Link>
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <PageHeader
        title="Edit User"
        description="Update user information and permissions"
        action={
          <Link href="/admin/users">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </Link>
        }
      />

      <div className="flex-1 overflow-y-auto p-8">
        <div className="mx-auto max-w-2xl">
          <form onSubmit={handleSubmit}>
            <Card className="p-6">
              <div className="space-y-6">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="identifiant">Nom d'Utilisateur</Label>
                  <Input
                    id="identifiant"
                    type="text"
                    placeholder="Ex: admin"
                    value={formData.identifiant}
                    onChange={(e) =>
                      setFormData({ ...formData, identifiant: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="changePassword">Mot de passe</Label>
                    <Label htmlFor="changePassword" className="h-8">
                      <Checkbox
                        className="h-4 w-4"
                        id="changePassword"
                        checked={changePassword}
                        onCheckedChange={(e) => {
                          setChangePassword(e === true);
                        }}
                      />
                      Cochez pour modifier le mot de passe
                    </Label>
                  </div>

                  {changePassword && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="password">Nouveau mot de passe</Label>
                        <PasswordInput
                          id="password"
                          placeholder="Votre mot de passe"
                          value={formData.password}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              password: e.target.value,
                            })
                          }
                          required
                        />
                      </div>

                      <ConfirmPassword
                        password={formData.password ?? ""}
                        reset={changePassword}
                      />
                    </>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Rôle</Label>
                  <Select
                    value={formData.idRole}
                    onValueChange={(value) =>
                      setFormData({ ...formData, idRole: value })
                    }
                    disabled={currentUser?.idUtilisateur === userId}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selectionner un rôle" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Superadministrateur</SelectItem>
                      <SelectItem value="2">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                  {currentUser?.idUtilisateur === userId && (
                    <p className="text-xs text-muted-foreground">
                      You cannot change your own role
                    </p>
                  )}
                </div>

                <div className="flex justify-between gap-2 border-t pt-6">
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => setShowDeleteDialog(true)}
                    disabled={currentUser?.idUtilisateur === userId}
                  >
                    Supprimer l'utilisateur
                  </Button>
                  <div className="flex gap-2">
                    <Link href="/admin/users">
                      <Button type="button" variant="outline">
                        Annuler
                      </Button>
                    </Link>
                    <Button type="submit" onClick={handleSubmit}>
                      Enregsitrer les modifications
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </form>
        </div>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              user account for <strong>{userToEdit.identifiant}</strong> (
              {userToEdit.identifiant}).
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-white"
            >
              Delete User
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
