"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, GripVertical, Equal } from "lucide-react"
import type { CritereSerie, SerieBac } from "@/lib/types"

interface SerieCriteriaProps {
  series: CritereSerie[]
}

const seriesDisponibles: { value: SerieBac; label: string }[] = [
  { value: "SCIENTIFIQUE", label: "Scientifique" },
  { value: "LITTERAIRE", label: "Littéraire" },
  { value: "ECONOMIQUE", label: "Économique" },
  { value: "TECHNIQUE", label: "Technique" },
  { value: "AUTRE", label: "Autre" },
]

export function SerieCriteria({ series: initialSeries }: SerieCriteriaProps) {
  const [series, setSeries] = useState<CritereSerie[]>(initialSeries)
  const [newSerie, setNewSerie] = useState<SerieBac | "">("")

  const addSerie = () => {
    if (newSerie && !series.find((s) => s.serie === newSerie)) {
      setSeries([
        ...series,
        {
          id: `s${Date.now()}`,
          serie: newSerie,
          priorite: series.length + 1,
        },
      ])
      setNewSerie("")
    }
  }

  const removeSerie = (id: string) => {
    setSeries(series.filter((s) => s.id !== id))
  }

  const setPrioriteEgale = (id: string) => {
    const index = series.findIndex((s) => s.id === id)
    if (index > 0) {
      const newSeries = [...series]
      newSeries[index].priorite = newSeries[index - 1].priorite
      setSeries(newSeries)
    }
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                2
              </span>
              Série au baccalauréat
            </CardTitle>
            <CardDescription className="mt-2">
              Définissez les séries acceptées et leur ordre de priorité. Les séries peuvent avoir une priorité égale.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Ajout d'une série */}
          <div className="flex gap-2">
            <Select value={newSerie} onValueChange={(value) => setNewSerie(value as SerieBac)}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Sélectionner une série" />
              </SelectTrigger>
              <SelectContent>
                {seriesDisponibles
                  .filter((s) => !series.find((serie) => serie.serie === s.value))
                  .map((serie) => (
                    <SelectItem key={serie.value} value={serie.value}>
                      {serie.label}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            <Button onClick={addSerie} disabled={!newSerie}>
              <Plus className="mr-2 h-4 w-4" />
              Ajouter
            </Button>
          </div>

          {/* Liste des séries */}
          {series.length > 0 ? (
            <div className="space-y-2">
              {series.map((serie, index) => {
                const serieInfo = seriesDisponibles.find((s) => s.value === serie.serie)
                const hasSamePriorityAsPrevious = index > 0 && series[index - 1].priorite === serie.priorite

                return (
                  <div
                    key={serie.id}
                    className="flex items-center gap-3 rounded-lg border border-border bg-card p-3 transition-colors hover:bg-accent/50"
                  >
                    <GripVertical className="h-5 w-5 text-muted-foreground" />
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                      {hasSamePriorityAsPrevious ? "=" : serie.priorite}
                    </div>
                    <Badge variant="outline" className="text-sm">
                      {serieInfo?.label}
                    </Badge>
                    <div className="ml-auto flex gap-2">
                      {index > 0 && (
                        <Button variant="ghost" size="sm" onClick={() => setPrioriteEgale(serie.id)}>
                          <Equal className="h-4 w-4" />
                        </Button>
                      )}
                      <Button variant="ghost" size="sm" onClick={() => removeSerie(serie.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-border bg-muted/30 p-8 text-center">
              <p className="text-sm text-muted-foreground">Aucune série configurée. Ajoutez des séries ci-dessus.</p>
            </div>
          )}

          {/* Visualisation de l'ordre */}
          {series.length > 0 && (
            <div className="rounded-lg border border-border bg-muted/30 p-4">
              <p className="mb-3 text-sm font-medium text-foreground">Ordre de priorité</p>
              <div className="flex flex-wrap gap-2">
                {series.map((serie, index) => {
                  const serieInfo = seriesDisponibles.find((s) => s.value === serie.serie)
                  const hasSamePriorityAsPrevious = index > 0 && series[index - 1].priorite === serie.priorite

                  return (
                    <div key={serie.id} className="flex items-center gap-2">
                      <Badge className="bg-chart-2 text-white">
                        {hasSamePriorityAsPrevious ? "=" : `${serie.priorite}.`} {serieInfo?.label}
                      </Badge>
                      {index < series.length - 1 && !hasSamePriorityAsPrevious && (
                        <span className="text-muted-foreground">→</span>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
