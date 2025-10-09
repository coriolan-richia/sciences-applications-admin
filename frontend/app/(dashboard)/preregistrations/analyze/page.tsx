"use client"

import { useState } from "react"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Play, CheckCircle2, XCircle, AlertCircle } from "lucide-react"
import Link from "next/link"

interface AnalysisLog {
  id: string
  type: "success" | "error" | "warning"
  message: string
  timestamp: string
}

export default function AnalyzePreregistrationsPage() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [hasAnalyzed, setHasAnalyzed] = useState(false)
  const [logs, setLogs] = useState<AnalysisLog[]>([])

  const handleAnalyze = () => {
    setIsAnalyzing(true)
    setLogs([])

    // Simulate analysis process
    const mockLogs: AnalysisLog[] = [
      {
        id: "1",
        type: "success",
        message: "Started analysis of preregistration files",
        timestamp: new Date().toISOString(),
      },
      {
        id: "2",
        type: "success",
        message: "Found 4 preregistration entries",
        timestamp: new Date().toISOString(),
      },
      {
        id: "3",
        type: "success",
        message: "Matched BAC2024001 with payment PAY2024001",
        timestamp: new Date().toISOString(),
      },
      {
        id: "4",
        type: "success",
        message: "Matched BAC2024002 with payment PAY2024002",
        timestamp: new Date().toISOString(),
      },
      {
        id: "5",
        type: "warning",
        message: "No payment found for BAC2024003",
        timestamp: new Date().toISOString(),
      },
      {
        id: "6",
        type: "success",
        message: "Matched BAC2023045 with payment PAY2024003",
        timestamp: new Date().toISOString(),
      },
      {
        id: "7",
        type: "success",
        message: "Analysis completed: 3 verified, 1 pending",
        timestamp: new Date().toISOString(),
      },
    ]

    let currentIndex = 0
    const interval = setInterval(() => {
      if (currentIndex < mockLogs.length) {
        setLogs((prev) => [...prev, mockLogs[currentIndex]])
        currentIndex++
      } else {
        clearInterval(interval)
        setIsAnalyzing(false)
        setHasAnalyzed(true)
      }
    }, 500)
  }

  const getLogIcon = (type?: string) => {
    if (!type) return <AlertCircle className="h-4 w-4 text-muted-foreground" />

    switch (type) {
      case "success":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case "error":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getLogBadgeColor = (type?: string) => {
    if (!type) return "bg-muted text-muted-foreground border-border"

    switch (type) {
      case "success":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "error":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      case "warning":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      default:
        return "bg-muted text-muted-foreground border-border"
    }
  }

  return (
    <div className="flex h-full flex-col">
      <PageHeader
        title="Analyze Preregistrations"
        description="Automatically match preregistrations with payment records"
        action={
          <Link href="/preregistrations">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to List
            </Button>
          </Link>
        }
      />

      <div className="flex-1 overflow-y-auto p-8">
        <div className="mx-auto max-w-4xl space-y-6">
          {/* Analysis Control */}
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-foreground">File Analysis</h2>
                <p className="mt-1 text-sm text-muted-foreground">Match preregistration files with payment records</p>
              </div>
              <Button onClick={handleAnalyze} disabled={isAnalyzing}>
                <Play className="mr-2 h-4 w-4" />
                {isAnalyzing ? "Analyzing..." : "Start Analysis"}
              </Button>
            </div>
          </Card>

          {/* Results Summary */}
          {hasAnalyzed && (
            <div className="grid grid-cols-3 gap-4">
              <Card className="p-4">
                <p className="text-sm text-muted-foreground">Verified</p>
                <p className="text-2xl font-semibold text-green-500">3</p>
              </Card>
              <Card className="p-4">
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-semibold text-yellow-500">1</p>
              </Card>
              <Card className="p-4">
                <p className="text-sm text-muted-foreground">Errors</p>
                <p className="text-2xl font-semibold text-red-500">0</p>
              </Card>
            </div>
          )}

          {/* Analysis Logs */}
          {logs.length > 0 && (
            <Card className="p-6">
              <h2 className="mb-4 text-lg font-semibold text-foreground">Analysis Logs</h2>
              <div className="space-y-3">
                {logs
                  .filter((log) => log && log.id)
                  .map((log) => (
                    <div
                      key={log.id}
                      className="flex items-start gap-3 rounded-lg border border-border bg-secondary/30 p-3"
                    >
                      {getLogIcon(log?.type)}
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Badge className={getLogBadgeColor(log?.type)} variant="outline">
                            {log?.type || "info"}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {log?.timestamp ? new Date(log.timestamp).toLocaleTimeString() : ""}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-foreground">{log?.message || "No message"}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
