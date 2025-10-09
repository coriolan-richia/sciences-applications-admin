"use client"

import { useState } from "react"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, Settings, Search, ArrowUpDown, FileDown } from "lucide-react"
import { ResultCard } from "@/components/preselection/result-card"
import { CandidateListItem } from "@/components/preselection/candidate-list-item"
import { mockPreselectionResults, mockPreselectionCandidates } from "@/lib/mock-data"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function PreselectionPage() {
  const [resultsSearchQuery, setResultsSearchQuery] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<string>("score-desc")

  const filteredResults = mockPreselectionResults.filter((result) =>
    result.branchName.toLowerCase().includes(resultsSearchQuery.toLowerCase()),
  )

  const filteredCandidates = mockPreselectionCandidates.filter(
    (c) =>
      c.bacNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.studyBranch.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const sortedCandidates = [...filteredCandidates].sort((a, b) => {
    switch (sortBy) {
      case "score-desc":
        return b.score - a.score
      case "score-asc":
        return a.score - b.score
      case "name-asc":
        return a.studentName.localeCompare(b.studentName)
      case "name-desc":
        return b.studentName.localeCompare(a.studentName)
      case "branch-asc":
        return a.studyBranch.localeCompare(b.studyBranch)
      case "branch-desc":
        return b.studyBranch.localeCompare(a.studyBranch)
      case "status-accepted":
        return a.status === "accepted" ? -1 : 1
      case "status-rejected":
        return a.status === "rejected" ? -1 : 1
      default:
        return 0
    }
  })

  return (
    <div className="flex h-full flex-col">
      <PageHeader
        title="Preselection"
        description="Manage preselection conditions and process"
        action={
          <div className="flex items-center gap-2">
            <Link href="/preselection/conditions">
              <Button variant="outline">
                <Settings className="mr-2 h-4 w-4" />
                Manage Conditions
              </Button>
            </Link>
            <Link href="/preselection/run">
              <Button>
                <Play className="mr-2 h-4 w-4" />
                Run Preselection
              </Button>
            </Link>
          </div>
        }
      />

      <div className="flex-1 overflow-y-auto">
        <div className="p-8">
          <Tabs defaultValue="results" className="space-y-6">
            <TabsList>
              <TabsTrigger value="results">Results</TabsTrigger>
              <TabsTrigger value="candidates">Candidates</TabsTrigger>
            </TabsList>

            <TabsContent value="results" className="space-y-6">
              <div className="flex items-center justify-between gap-3">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search by branch name..."
                    value={resultsSearchQuery}
                    onChange={(e) => setResultsSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Link href="/preselection/export/all">
                  <Button variant="outline">
                    <FileDown className="mr-2 h-4 w-4" />
                    Export All Branches
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredResults.map((result) => (
                  <ResultCard key={result.branchId} result={result} />
                ))}
              </div>

              {filteredResults.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Search className="h-12 w-12 text-muted-foreground/50" />
                  <h3 className="mt-4 text-lg font-semibold text-foreground">No results found</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Try adjusting your search to find what you're looking for.
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="candidates" className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, BAC number, or branch..."
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
                    <SelectItem value="score-desc">Score (High to Low)</SelectItem>
                    <SelectItem value="score-asc">Score (Low to High)</SelectItem>
                    <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                    <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                    <SelectItem value="branch-asc">Branch (A-Z)</SelectItem>
                    <SelectItem value="branch-desc">Branch (Z-A)</SelectItem>
                    <SelectItem value="status-accepted">Accepted First</SelectItem>
                    <SelectItem value="status-rejected">Rejected First</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="rounded-lg border border-border bg-card">
                <div className="flex items-center gap-4 border-b border-border bg-secondary/30 px-6 py-3 text-xs font-medium text-muted-foreground">
                  <div className="w-32">BAC Number</div>
                  <div className="flex-1">Student Name</div>
                  <div className="w-48">Study Branch</div>
                  <div className="w-32">Mention</div>
                  <div className="w-20">Score</div>
                  <div className="w-24">Status</div>
                </div>
                {sortedCandidates.map((candidate) => (
                  <CandidateListItem key={candidate.id} candidate={candidate} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
