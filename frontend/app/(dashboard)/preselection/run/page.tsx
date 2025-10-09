"use client"

import { useState } from "react"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Play, CheckCircle2, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface ProcessLog {
  id: string
  type: "info" | "success" | "warning"
  message: string
  timestamp: string
}

export default function RunPreselectionPage() {
  const router = useRouter()
  const [isRunning, setIsRunning] = useState(false)
  const [hasRun, setHasRun] = useState(false)
  const [logs, setLogs] = useState<ProcessLog[]>([])

  const handleRun = () => {
    setIsRunning(true)
    setLogs([])

    const mockLogs: ProcessLog[] = [
      { id: "1", type: "info", message: "Starting preselection process...", timestamp: new Date().toISOString() },
      {
        id: "2",
        type: "info",
        message: "Loading conditions for Computer Science",
        timestamp: new Date().toISOString(),
      },
      {
        id: "3",
        type: "success",
        message: "Processed 45 candidates for Computer Science",
        timestamp: new Date().toISOString(),
      },
      {
        id: "4",
        type: "success",
        message: "Selected 30 candidates based on selection criteria",
        timestamp: new Date().toISOString(),
      },
      {
        id: "5",
        type: "info",
        message: "Loading conditions for Electrical Engineering",
        timestamp: new Date().toISOString(),
      },
      {
        id: "6",
        type: "success",
        message: "Processed 38 candidates for Electrical Engineering",
        timestamp: new Date().toISOString(),
      },
      {
        id: "7",
        type: "success",
        message: "Selected 25 candidates based on selection criteria",
        timestamp: new Date().toISOString(),
      },
      { id: "8", type: "warning", message: "3 candidates need manual review", timestamp: new Date().toISOString() },
      {
        id: "9",
        type: "success",
        message: "Preselection process completed successfully",
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
        setIsRunning(false)
        setHasRun(true)
      }
    }, 600)
  }

  const handleValidate = () => {
    router.push("/preselection")
  }

  const getLogIcon = (type?: string) => {
    if (!type) return <div className="h-4 w-4 rounded-full bg-blue-500" />

    switch (type) {
      case "success":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      default:
        return <div className="h-4 w-4 rounded-full bg-blue-500" />
    }
  }

  const getLogBadgeColor = (type?: string) => {
    if (!type) return "bg-blue-500/10 text-blue-500 border-blue-500/20"

    switch (type) {
      case "success":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "warning":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      default:
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
    }
  }

  return (
    <div className="flex h-full flex-col">
      <PageHeader
        title="Run Preselection Process"
        description="Execute preselection based on configured conditions"
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
        <div className="mx-auto max-w-4xl space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-foreground">Preselection Process</h2>
                <p className="mt-1 text-sm text-muted-foreground">Apply conditions to all verified preregistrations</p>
              </div>
              {!hasRun && (
                <Button onClick={handleRun} disabled={isRunning}>
                  <Play className="mr-2 h-4 w-4" />
                  {isRunning ? "Running..." : "Start Process"}
                </Button>
              )}
            </div>
          </Card>

          {logs.length > 0 && (
            <Card className="p-6">
              <h2 className="mb-4 text-lg font-semibold text-foreground">Process Logs</h2>
              <div className="space-y-3">
                {logs
                  .filter((log) => log && log.type)
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
                        <p className="mt-1 text-sm text-foreground">{log?.message || ""}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </Card>
          )}

          {hasRun && (
            <Card className="p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <h3 className="text-lg font-semibold text-foreground">Process Completed</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  The preselection process has been completed successfully. Review the results and validate when ready.
                </p>
                <div className="flex justify-end gap-2 pt-2">
                  <Link href="/preselection">
                    <Button variant="outline">Review Results</Button>
                  </Link>
                  <Button onClick={handleValidate}>Validate Preselection</Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
