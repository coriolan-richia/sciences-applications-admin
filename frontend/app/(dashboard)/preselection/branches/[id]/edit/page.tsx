"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, RotateCcw } from "lucide-react"
import Link from "next/link"
import { mockBranchConfigurations } from "@/lib/mock-data"
import { Plus } from "lucide-react"

export default function EditBranchPage() {
  const router = useRouter()
  const params = useParams()
  const branchConfig = mockBranchConfigurations.find((b) => b.id === params.id)

  const DEFAULT_VALUES = {
    maxCapacity: 30,
    overflowAction: "waitlist" as const,
  }

  const [formData, setFormData] = useState({
    maxCapacity: branchConfig?.maxCapacity || DEFAULT_VALUES.maxCapacity,
    overflowAction: branchConfig?.overflowAction || DEFAULT_VALUES.overflowAction,
  })

  const handleResetToDefaults = () => {
    setFormData(DEFAULT_VALUES)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Updating branch configuration:", formData)
    router.push("/preselection/branches")
  }

  if (!branchConfig) {
    return <div>Branch not found</div>
  }

  return (
    <div className="flex h-full flex-col">
      <PageHeader
        title={`Edit ${branchConfig.branchName}`}
        description="Configure admission capacity and overflow handling"
        action={
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href={`/preselection/conditions/new?branchId=${branchConfig.id}`}>
                <Plus className="mr-2 h-4 w-4" />
                Add Criterion
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/preselection/branches">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Link>
            </Button>
          </div>
        }
      />

      <div className="flex-1 p-6">
        <Card className="mx-auto max-w-2xl">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="maxCapacity">Admission Capacity</Label>
                <Input
                  id="maxCapacity"
                  type="number"
                  min="1"
                  value={formData.maxCapacity}
                  onChange={(e) => setFormData({ ...formData, maxCapacity: Number.parseInt(e.target.value) })}
                  required
                />
                <p className="text-sm text-muted-foreground">
                  Maximum number of students that can be admitted to this branch
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="overflowAction">Overflow Action</Label>
                <Select
                  value={formData.overflowAction}
                  onValueChange={(value: "reject" | "waitlist" | "accept_all") =>
                    setFormData({ ...formData, overflowAction: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="waitlist">Waitlist</SelectItem>
                    <SelectItem value="reject">Reject</SelectItem>
                    <SelectItem value="accept_all">Accept All</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  {formData.overflowAction === "waitlist"
                    ? "Qualified candidates exceeding capacity will be placed on a waitlist and can be promoted if spots open up"
                    : formData.overflowAction === "reject"
                      ? "Qualified candidates exceeding capacity will be automatically rejected"
                      : "All qualified candidates will be accepted regardless of the capacity limit"}
                </p>
              </div>

              <div className="flex gap-4">
                <Button type="submit" className="flex-1">
                  Save Changes
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={handleResetToDefaults}
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reset to Defaults
                </Button>
                <Button type="button" variant="outline" className="flex-1 bg-transparent" asChild>
                  <Link href="/preselection/branches">Cancel</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
