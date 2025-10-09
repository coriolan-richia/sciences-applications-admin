"use client"

import { useState } from "react"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, FileCheck, ArrowUpDown } from "lucide-react"
import { ViewToggle } from "@/components/preregistrations/view-toggle"
import { PreregistrationCard } from "@/components/preregistrations/preregistration-card"
import { PreregistrationListItem } from "@/components/preregistrations/preregistration-list-item"
import { mockPreregistrations } from "@/lib/mock-data"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function PreregistrationsPage() {
  const [view, setView] = useState<"card" | "list">("card")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<string>("date-desc")

  const filteredPreregistrations = mockPreregistrations.filter(
    (p) =>
      p.bacNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.studyBranch.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.bacOption.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const sortedPreregistrations = [...filteredPreregistrations].sort((a, b) => {
    switch (sortBy) {
      case "date-desc":
        return new Date(b.preregistrationDate).getTime() - new Date(a.preregistrationDate).getTime()
      case "date-asc":
        return new Date(a.preregistrationDate).getTime() - new Date(b.preregistrationDate).getTime()
      case "bac-year-desc":
        return b.bacYear - a.bacYear
      case "bac-year-asc":
        return a.bacYear - b.bacYear
      case "branch-asc":
        return a.studyBranch.localeCompare(b.studyBranch)
      case "branch-desc":
        return b.studyBranch.localeCompare(a.studyBranch)
      default:
        return 0
    }
  })

  return (
    <div className="flex h-full flex-col">
      <PageHeader
        title="Preregistrations"
        description="Manage student preregistration files"
        action={
          <div className="flex items-center gap-2">
            <Link href="/preregistrations/analyze">
              <Button variant="outline">
                <FileCheck className="mr-2 h-4 w-4" />
                Analyze Files
              </Button>
            </Link>
            <Link href="/preregistrations/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Preregistration
              </Button>
            </Link>
          </div>
        }
      />

      <div className="flex-1 overflow-y-auto">
        <div className="space-y-6 p-8">
          {/* Filters and View Toggle */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-1 items-center gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by BAC number, branch, or option..."
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
                  <SelectItem value="date-desc">Date (Newest)</SelectItem>
                  <SelectItem value="date-asc">Date (Oldest)</SelectItem>
                  <SelectItem value="bac-year-desc">BAC Year (Newest)</SelectItem>
                  <SelectItem value="bac-year-asc">BAC Year (Oldest)</SelectItem>
                  <SelectItem value="branch-asc">Branch (A-Z)</SelectItem>
                  <SelectItem value="branch-desc">Branch (Z-A)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <ViewToggle view={view} onViewChange={setView} />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-lg border border-border bg-card p-4">
              <p className="text-sm text-muted-foreground">Total</p>
              <p className="text-2xl font-semibold text-foreground">{mockPreregistrations.length}</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-4">
              <p className="text-sm text-muted-foreground">Verified</p>
              <p className="text-2xl font-semibold text-green-500">
                {mockPreregistrations.filter((p) => p.status === "verified").length}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-4">
              <p className="text-sm text-muted-foreground">Pending</p>
              <p className="text-2xl font-semibold text-yellow-500">
                {mockPreregistrations.filter((p) => p.status === "pending").length}
              </p>
            </div>
          </div>

          {/* List/Card View */}
          {view === "card" ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {sortedPreregistrations.map((preregistration) => (
                <PreregistrationCard key={preregistration.id} preregistration={preregistration} />
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-border bg-card">
              <div className="flex items-center gap-4 border-b border-border bg-secondary/30 px-6 py-3 text-xs font-medium text-muted-foreground">
                <div className="w-32">BAC Number</div>
                <div className="w-20">Year</div>
                <div className="flex-1">BAC Option</div>
                <div className="w-48">Study Branch</div>
                <div className="w-32">Date</div>
                <div className="w-20">Status</div>
              </div>
              {sortedPreregistrations.map((preregistration) => (
                <PreregistrationListItem key={preregistration.id} preregistration={preregistration} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
