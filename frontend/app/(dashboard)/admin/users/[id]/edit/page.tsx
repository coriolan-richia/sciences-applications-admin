"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useRouter, useParams } from "next/navigation"
import { mockUsers } from "@/lib/mock-data"
import { useAuth } from "@/lib/auth-context"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export default function EditUserPage() {
  const router = useRouter()
  const params = useParams()
  const { user: currentUser } = useAuth()
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
  })
  const [error, setError] = useState<string | null>(null)

  const userId = params.id as string
  const userToEdit = mockUsers.find((u) => u.id === userId)

  useEffect(() => {
    if (userToEdit) {
      setFormData({
        name: userToEdit.name,
        email: userToEdit.email,
        role: userToEdit.role,
      })
    }
  }, [userToEdit])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validation: Can't change your own role
    if (currentUser?.id === userId && formData.role !== currentUser.role) {
      setError("You cannot change your own role. Please ask another administrator.")
      return
    }

    // Validation: Must have at least one superadmin
    if (userToEdit?.role === "superadmin" && formData.role !== "superadmin") {
      const superadminCount = mockUsers.filter((u) => u.role === "superadmin").length
      if (superadminCount <= 1) {
        setError("Cannot change role. At least one SuperAdmin must exist in the system.")
        return
      }
    }

    console.log("[v0] User updated:", formData)
    router.push("/admin/users")
  }

  const handleDelete = () => {
    // Validation: Can't delete yourself
    if (currentUser?.id === userId) {
      setError("You cannot delete your own account.")
      setShowDeleteDialog(false)
      return
    }

    // Validation: Must have at least one superadmin
    if (userToEdit?.role === "superadmin") {
      const superadminCount = mockUsers.filter((u) => u.role === "superadmin").length
      if (superadminCount <= 1) {
        setError("Cannot delete user. At least one SuperAdmin must exist in the system.")
        setShowDeleteDialog(false)
        return
      }
    }

    console.log("[v0] User deleted:", userId)
    router.push("/admin/users")
  }

  if (currentUser?.role !== "superadmin") {
    return (
      <div className="flex h-full items-center justify-center">
        <Card className="w-full max-w-md p-6">
          <h2 className="text-center text-xl font-semibold">Access Denied</h2>
          <p className="mt-2 text-center text-muted-foreground">You do not have permission to access this page.</p>
        </Card>
      </div>
    )
  }

  if (!userToEdit) {
    return (
      <div className="flex h-full items-center justify-center">
        <Card className="w-full max-w-md p-6">
          <h2 className="text-center text-xl font-semibold">User Not Found</h2>
          <p className="mt-2 text-center text-muted-foreground">The requested user could not be found.</p>
          <div className="mt-4 text-center">
            <Button asChild>
              <Link href="/admin/users">Back to Users</Link>
            </Button>
          </div>
        </Card>
      </div>
    )
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
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="user@college.edu"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select
                    value={formData.role}
                    onValueChange={(value) => setFormData({ ...formData, role: value })}
                    disabled={currentUser?.id === userId}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="superadmin">SuperAdmin</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="viewer">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                  {currentUser?.id === userId && (
                    <p className="text-xs text-muted-foreground">You cannot change your own role</p>
                  )}
                </div>

                <div className="flex justify-between gap-2 border-t pt-6">
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => setShowDeleteDialog(true)}
                    disabled={currentUser?.id === userId}
                  >
                    Delete User
                  </Button>
                  <div className="flex gap-2">
                    <Link href="/admin/users">
                      <Button type="button" variant="outline">
                        Cancel
                      </Button>
                    </Link>
                    <Button type="submit">Save Changes</Button>
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
              This action cannot be undone. This will permanently delete the user account for{" "}
              <strong>{userToEdit.name}</strong> ({userToEdit.email}).
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Delete User
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
