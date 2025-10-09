"use client"

import { useState } from "react"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, FileDown, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { mockPreselectionResults } from "@/lib/mock-data"

export default function ExportAllPreselectionPage() {
  const [isExporting, setIsExporting] = useState(false)
  const [exportComplete, setExportComplete] = useState(false)

  const totalCandidates = mockPreselectionResults.reduce((sum, r) => sum + r.totalCandidates, 0)
  const totalSelected = mockPreselectionResults.reduce((sum, r) => sum + r.selected, 0)
  const totalWaiting = mockPreselectionResults.reduce((sum, r) => sum + r.waiting, 0)
  const totalRejected = mockPreselectionResults.reduce((sum, r) => sum + r.rejected, 0)

  const handleExport = () => {
    setIsExporting(true)
    console.log("[v0] Exporting preselection results for all branches")

    // Simulate PDF generation
    setTimeout(() => {
      setIsExporting(false)
      setExportComplete(true)

      setTimeout(() => {
        setExportComplete(false)
      }, 3000)
    }, 2500)
  }

  return (
    <div className="flex h-full flex-col">
      <PageHeader
        title="Export All Results"
        description="Generate combined PDF report for all branches"
        action={
          <Link href="/preselection">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </Link>
        }
      />

      <div className="flex-1 overflow-y-auto p-8">
        <div className="mx-auto max-w-2xl">
          <Card className="p-6">
            {!exportComplete ? (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Export Configuration</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Export preselection results for all study branches
                  </p>
                </div>

                <div className="rounded-lg border border-border bg-secondary/30 p-4">
                  <h3 className="text-sm font-medium text-foreground">Overall Statistics</h3>
                  <div className="mt-3 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Total Candidates</p>
                      <p className="text-2xl font-bold text-foreground">{totalCandidates}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Selected</p>
                      <p className="text-2xl font-bold text-green-500">{totalSelected}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Waiting</p>
                      <p className="text-2xl font-bold text-yellow-500">{totalWaiting}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Rejected</p>
                      <p className="text-2xl font-bold text-red-500">{totalRejected}</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-border bg-secondary/30 p-4">
                  <h3 className="text-sm font-medium text-foreground">Included Branches</h3>
                  <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                    {mockPreselectionResults.map((result) => (
                      <li key={result.branchId}>
                        • {result.branchName} ({result.totalCandidates} candidates)
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-lg border border-border bg-secondary/30 p-4">
                  <h3 className="text-sm font-medium text-foreground">Export Details</h3>
                  <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                    <li>• Complete student information for all branches</li>
                    <li>• Academic details and selection criteria</li>
                    <li>• Selection status and rankings per branch</li>
                    <li>• Summary statistics and overview</li>
                    <li>• Formatted for official use</li>
                  </ul>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Link href="/preselection">
                    <Button variant="outline">Cancel</Button>
                  </Link>
                  <Button onClick={handleExport} disabled={isExporting}>
                    <FileDown className="mr-2 h-4 w-4" />
                    {isExporting ? "Generating..." : "Export Combined PDF"}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <CheckCircle2 className="h-16 w-16 text-green-500" />
                <h3 className="mt-4 text-lg font-semibold text-foreground">Export Successful!</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Combined PDF for all branches has been generated and downloaded
                </p>
                <Link href="/preselection" className="mt-6">
                  <Button variant="outline">Return to Preselection</Button>
                </Link>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
