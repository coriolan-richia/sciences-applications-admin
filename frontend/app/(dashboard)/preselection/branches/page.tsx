"use client"

import { useState } from "react"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Edit, Users, AlertCircle, Clock, CheckCircle, RotateCcw, Search, ArrowUpDown } from "lucide-react"
import Link from "next/link"
import { mockBranchConfigurations, studyBranches } from "@/lib/mock-data"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function BranchSettingsPage() {
  const [configurations, setConfigurations] = useState(mockBranchConfigurations)
  const [selectedBranch, setSelectedBranch] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<string>("name-asc")

  const handleResetAllSettings = () => {
    setConfigurations(
      configurations.map((config) => ({
        ...config,
        maxCapacity: 30,
        overflowAction: "waitlist" as const,
      })),
    )
  }

  const filteredConfigurations =
    selectedBranch === "all" ? configurations : configurations.filter((c) => c.id === selectedBranch)

  const searchedConfigurations = filteredConfigurations.filter((c) =>
    c.branchName.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const sortedConfigurations = [...searchedConfigurations].sort((a, b) => {
    switch (sortBy) {
      case "name-asc":
        return a.branchName.localeCompare(b.branchName)
      case "name-desc":
        return b.branchName.localeCompare(a.branchName)
      case "capacity-desc":
        return b.maxCapacity - a.maxCapacity
      case "capacity-asc":
        return a.maxCapacity - b.maxCapacity
      default:
        return 0
    }
  })

  return (
    <div className="flex h-full flex-col">
      <PageHeader
        title="Branch Settings"
        description="Configure admission capacity and overflow handling for each study branch"
        action={
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-muted-foreground">Branch:</label>
              <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Branches</SelectItem>
                  {studyBranches.map((branch) => (
                    <SelectItem key={branch.id} value={branch.id}>
                      {branch.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {selectedBranch === "all" && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline">
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Reset All Settings
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Reset All Branch Settings?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will reset admission capacity to 30 and overflow action to Waitlist for all branches. This
                      action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleResetAllSettings}>Reset All</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
            <Button variant="outline" asChild>
              <Link href="/preselection">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Link>
            </Button>
          </div>
        }
      />

      <div className="flex-1 overflow-y-auto p-8">
        <div className="mx-auto max-w-4xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search branches..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <ArrowUpDown className="mr-2 h-4 w-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                <SelectItem value="capacity-desc">Capacity (High to Low)</SelectItem>
                <SelectItem value="capacity-asc">Capacity (Low to High)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {sortedConfigurations.map((config) => (
            <Card key={config.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <div>
                  <CardTitle className="text-lg">{config.branchName}</CardTitle>
                  <p className="mt-1 text-sm text-muted-foreground">Admission capacity and overflow settings</p>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/preselection/branches/${config.id}/edit`}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex items-center gap-3 rounded-lg border border-border bg-secondary/30 p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Admission Capacity</p>
                      <p className="text-2xl font-bold text-foreground">{config.maxCapacity}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-lg border border-border bg-secondary/30 p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      {config.overflowAction === "reject" ? (
                        <AlertCircle className="h-5 w-5 text-primary" />
                      ) : config.overflowAction === "accept_all" ? (
                        <CheckCircle className="h-5 w-5 text-primary" />
                      ) : (
                        <Clock className="h-5 w-5 text-primary" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Overflow Action</p>
                      <Badge
                        variant={
                          config.overflowAction === "reject"
                            ? "destructive"
                            : config.overflowAction === "accept_all"
                              ? "default"
                              : "secondary"
                        }
                        className="mt-1"
                      >
                        {config.overflowAction === "reject"
                          ? "Reject"
                          : config.overflowAction === "accept_all"
                            ? "Accept All"
                            : "Waitlist"}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {sortedConfigurations.length === 0 && (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-secondary/30 py-12">
              <p className="text-sm text-muted-foreground">No branches match your search</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
