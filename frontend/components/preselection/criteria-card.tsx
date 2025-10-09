"use client"

import type { PreselectionCriteria } from "@/types/preselection"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Award, BookOpen, Trash2 } from "lucide-react"

interface CriteriaCardProps {
  criteria: PreselectionCriteria
  onDelete?: (id: string) => void
}

export function CriteriaCard({ criteria, onDelete }: CriteriaCardProps) {
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1">
          {criteria.type === "mention" ? (
            <Award className="h-5 w-5 text-primary mt-0.5" />
          ) : (
            <BookOpen className="h-5 w-5 text-primary mt-0.5" />
          )}
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                Priority {criteria.priority}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                {criteria.type}
              </Badge>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">{criteria.branchName}</p>
              <p className="text-sm text-muted-foreground">
                {criteria.type === "mention"
                  ? `Mention: ${criteria.value}`
                  : `${criteria.value}: Min ${criteria.minScore}/20`}
              </p>
            </div>
          </div>
        </div>
        {onDelete && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(criteria.id)}
            className="h-8 w-8 p-0 text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>
    </Card>
  )
}
