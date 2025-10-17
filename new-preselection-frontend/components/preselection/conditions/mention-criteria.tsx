"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import type { MentionBac } from "@/lib/types"

interface MentionCriteriaProps {
  mentionMinimale?: MentionBac
}

const mentions = [
  { value: "TRES_BIEN", label: "Très Bien", color: "bg-chart-3 text-white" },
  { value: "BIEN", label: "Bien", color: "bg-chart-2 text-white" },
  { value: "ASSEZ_BIEN", label: "Assez Bien", color: "bg-chart-4 text-white" },
  { value: "PASSABLE", label: "Passable", color: "bg-muted text-muted-foreground" },
]

export function MentionCriteria({ mentionMinimale }: MentionCriteriaProps) {
  const [selectedMention, setSelectedMention] = useState<string | undefined>(mentionMinimale)

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                1
              </span>
              Mention au baccalauréat
            </CardTitle>
            <CardDescription className="mt-2">
              Tri décroissant par mention. Définissez une mention minimale requise (optionnel).
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground">Mention minimale requise</label>
            <Select value={selectedMention} onValueChange={setSelectedMention}>
              <SelectTrigger className="mt-1.5 w-full md:w-[300px]">
                <SelectValue placeholder="Aucune mention minimale" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Aucune mention minimale</SelectItem>
                {mentions.map((mention) => (
                  <SelectItem key={mention.value} value={mention.value}>
                    {mention.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="mt-1.5 text-xs text-muted-foreground">
              Les candidats sans cette mention minimale seront automatiquement exclus
            </p>
          </div>

          {/* Visualisation de l'ordre */}
          <div className="rounded-lg border border-border bg-muted/30 p-4">
            <p className="mb-3 text-sm font-medium text-foreground">Ordre de priorité (décroissant)</p>
            <div className="flex flex-wrap gap-2">
              {mentions.map((mention, index) => (
                <div key={mention.value} className="flex items-center gap-2">
                  <Badge className={mention.color}>
                    {index + 1}. {mention.label}
                  </Badge>
                  {index < mentions.length - 1 && <span className="text-muted-foreground">→</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
