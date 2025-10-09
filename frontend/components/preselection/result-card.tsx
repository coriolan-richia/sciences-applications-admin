import type { PreselectionResult } from "@/types/preselection"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Clock, FileDown } from "lucide-react"
import Link from "next/link"

interface ResultCardProps {
  result: PreselectionResult
}

export function ResultCard({ result }: ResultCardProps) {
  return (
    <Card className="p-5">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-foreground">{result.branchName}</h3>
            {result.lastRun && (
              <p className="mt-1 text-xs text-muted-foreground">
                Last run: {new Date(result.lastRun).toLocaleString()}
              </p>
            )}
          </div>
          {result.validated ? (
            <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
              <CheckCircle2 className="mr-1 h-3 w-3" />
              Validated
            </Badge>
          ) : (
            <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
              <Clock className="mr-1 h-3 w-3" />
              Pending
            </Badge>
          )}
        </div>

        <div className="grid grid-cols-4 gap-3 text-center">
          <div className="rounded-lg bg-secondary/50 p-2">
            <p className="text-xs text-muted-foreground">Total</p>
            <p className="text-lg font-semibold text-foreground">{result.totalCandidates}</p>
          </div>
          <div className="rounded-lg bg-green-500/10 p-2">
            <p className="text-xs text-green-500">Selected</p>
            <p className="text-lg font-semibold text-green-500">{result.selected}</p>
          </div>
          <div className="rounded-lg bg-yellow-500/10 p-2">
            <p className="text-xs text-yellow-500">Waiting</p>
            <p className="text-lg font-semibold text-yellow-500">{result.waiting}</p>
          </div>
          <div className="rounded-lg bg-red-500/10 p-2">
            <p className="text-xs text-red-500">Rejected</p>
            <p className="text-lg font-semibold text-red-500">{result.rejected}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Link href={`/preselection/export/${result.branchId}`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full bg-transparent">
              <FileDown className="mr-2 h-4 w-4" />
              Export PDF
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  )
}
