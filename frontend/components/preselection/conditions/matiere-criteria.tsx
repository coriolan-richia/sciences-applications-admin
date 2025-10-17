"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, GripVertical, Equal, Edit2 } from "lucide-react"
import type { CritereMatiere } from "@/lib/types"

interface MatiereCriteriaProps {
  matieres: CritereMatiere[]
}

export function MatiereCriteria({ matieres: initialMatieres }: MatiereCriteriaProps) {
  const [matieres, setMatieres] = useState<CritereMatiere[]>(initialMatieres)
  const [newMatiere, setNewMatiere] = useState("")
  const [newNoteMin, setNewNoteMin] = useState<number | undefined>(undefined)

  const addMatiere = () => {
    if (newMatiere.trim() && !matieres.find((m) => m.matiere === newMatiere.trim())) {
      setMatieres([
        ...matieres,
        {
          id: `m${Date.now()}`,
          matiere: newMatiere.trim(),
          priorite: matieres.length + 1,
          noteMinimale: newNoteMin,
        },
      ])
      setNewMatiere("")
      setNewNoteMin(undefined)
    }
  }

  const removeMatiere = (id: string) => {
    setMatieres(matieres.filter((m) => m.id !== id))
  }

  const setPrioriteEgale = (id: string) => {
    const index = matieres.findIndex((m) => m.id === id)
    if (index > 0) {
      const newMatieres = [...matieres]
      newMatieres[index].priorite = newMatieres[index - 1].priorite
      setMatieres(newMatieres)
    }
  }

  const updateNoteMinimale = (id: string, note: number | undefined) => {
    setMatieres(matieres.map((m) => (m.id === id ? { ...m, noteMinimale: note } : m)))
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                3
              </span>
              Notes par matière
            </CardTitle>
            <CardDescription className="mt-2">
              Définissez les matières considérées, leur ordre de priorité et une note minimale optionnelle.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Ajout d'une matière */}
          <div className="flex gap-2">
            <Input
              placeholder="Nom de la matière"
              value={newMatiere}
              onChange={(e) => setNewMatiere(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addMatiere()}
              className="flex-1"
            />
            <Input
              type="number"
              placeholder="Note min (opt.)"
              value={newNoteMin ?? ""}
              onChange={(e) => setNewNoteMin(e.target.value ? Number(e.target.value) : undefined)}
              onKeyDown={(e) => e.key === "Enter" && addMatiere()}
              className="w-32"
              min="0"
              max="20"
            />
            <Button onClick={addMatiere} disabled={!newMatiere.trim()}>
              <Plus className="mr-2 h-4 w-4" />
              Ajouter
            </Button>
          </div>

          {/* Liste des matières */}
          {matieres.length > 0 ? (
            <div className="space-y-2">
              {matieres.map((matiere, index) => {
                const hasSamePriorityAsPrevious = index > 0 && matieres[index - 1].priorite === matiere.priorite

                return (
                  <div
                    key={matiere.id}
                    className="flex items-center gap-3 rounded-lg border border-border bg-card p-3 transition-colors hover:bg-accent/50"
                  >
                    <GripVertical className="h-5 w-5 text-muted-foreground" />
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                      {hasSamePriorityAsPrevious ? "=" : matiere.priorite}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground">{matiere.matiere}</span>
                        {matiere.noteMinimale && (
                          <Badge variant="secondary" className="text-xs">
                            Min: {matiere.noteMinimale}/20
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {index > 0 && (
                        <Button variant="ghost" size="sm" onClick={() => setPrioriteEgale(matiere.id)}>
                          <Equal className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          const note = prompt(
                            "Note minimale (0-20, vide pour aucune):",
                            matiere.noteMinimale?.toString() || "",
                          )
                          if (note !== null) {
                            updateNoteMinimale(matiere.id, note ? Number(note) : undefined)
                          }
                        }}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => removeMatiere(matiere.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-border bg-muted/30 p-8 text-center">
              <p className="text-sm text-muted-foreground">
                Aucune matière configurée. Ajoutez des matières ci-dessus.
              </p>
            </div>
          )}

          {/* Visualisation de l'ordre */}
          {matieres.length > 0 && (
            <div className="rounded-lg border border-border bg-muted/30 p-4">
              <p className="mb-3 text-sm font-medium text-foreground">Ordre de priorité</p>
              <div className="flex flex-wrap gap-2">
                {matieres.map((matiere, index) => {
                  const hasSamePriorityAsPrevious = index > 0 && matieres[index - 1].priorite === matiere.priorite

                  return (
                    <div key={matiere.id} className="flex items-center gap-2">
                      <Badge className="bg-chart-1 text-white">
                        {hasSamePriorityAsPrevious ? "=" : `${matiere.priorite}.`} {matiere.matiere}
                        {matiere.noteMinimale && ` (≥${matiere.noteMinimale})`}
                      </Badge>
                      {index < matieres.length - 1 && !hasSamePriorityAsPrevious && (
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
