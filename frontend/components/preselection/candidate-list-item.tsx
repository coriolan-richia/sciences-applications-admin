import type { PreselectionCandidate } from "@/types/preselection"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface CandidateListItemProps {
  candidate: PreselectionCandidate
}

export function CandidateListItem({ candidate }: CandidateListItemProps) {
  const statusColors = {
    selected: "bg-green-500/10 text-green-500 border-green-500/20",
    waiting: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    rejected: "bg-red-500/10 text-red-500 border-red-500/20",
  }

  return (
    <div className="flex items-center gap-4 border-b border-border px-6 py-4 transition-colors hover:bg-secondary/50">
      <div className="w-32 font-mono text-sm font-medium text-foreground">{candidate.bacNumber}</div>
      <div className="flex-1 text-sm text-foreground">{candidate.studentName}</div>
      <div className="w-48 text-sm text-muted-foreground">{candidate.studyBranch}</div>
      <div className="w-32 text-sm text-muted-foreground">{candidate.mention}</div>
      <div className="w-20 text-sm font-medium text-foreground">{candidate.score.toFixed(2)}</div>
      <Badge className={cn("w-24 justify-center", statusColors[candidate.status])}>{candidate.status}</Badge>
    </div>
  )
}
