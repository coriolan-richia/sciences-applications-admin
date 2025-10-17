import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Mail } from "lucide-react"
import type { Candidature } from "@/lib/types"
import { cn } from "@/lib/utils"

interface CandidaturesListProps {
  candidatures: Candidature[]
}

const statutConfig = {
  SELECTIONNE: {
    label: "Sélectionné",
    variant: "default" as const,
    color: "bg-chart-3 text-white",
  },
  LISTE_ATTENTE: {
    label: "Liste d'attente",
    variant: "secondary" as const,
    color: "bg-chart-4 text-white",
  },
  NON_SELECTIONNE: {
    label: "Non sélectionné",
    variant: "destructive" as const,
    color: "bg-destructive text-destructive-foreground",
  },
  NON_TRAITE: {
    label: "Non traité",
    variant: "outline" as const,
    color: "bg-muted text-muted-foreground",
  },
}

const mentionConfig = {
  TRES_BIEN: { label: "Très Bien", color: "text-chart-3" },
  BIEN: { label: "Bien", color: "text-chart-2" },
  ASSEZ_BIEN: { label: "Assez Bien", color: "text-chart-4" },
  PASSABLE: { label: "Passable", color: "text-muted-foreground" },
}

export function CandidaturesList({ candidatures }: CandidaturesListProps) {
  return (
    <Card>
      <CardContent className="p-0">
        <div className="divide-y divide-border">
          {/* Header */}
          <div className="grid grid-cols-12 gap-4 bg-muted/50 px-6 py-3 text-sm font-medium text-muted-foreground">
            <div className="col-span-3">Candidat</div>
            <div className="col-span-2">Baccalauréat</div>
            <div className="col-span-2">Série</div>
            <div className="col-span-2">Note/Score</div>
            <div className="col-span-2">Statut</div>
            <div className="col-span-1 text-right">Actions</div>
          </div>

          {/* Rows */}
          {candidatures.slice(0, 20).map((candidature) => (
            <div
              key={candidature.id}
              className="grid grid-cols-12 gap-4 px-6 py-4 transition-colors hover:bg-accent/50"
            >
              <div className="col-span-3">
                <div className="font-medium text-foreground">
                  {candidature.nom} {candidature.prenom}
                </div>
                <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Mail className="h-3 w-3" />
                    {candidature.email}
                  </span>
                </div>
              </div>

              <div className="col-span-2 flex items-center">
                <span className={cn("font-medium", mentionConfig[candidature.mentionBac].color)}>
                  {mentionConfig[candidature.mentionBac].label}
                </span>
              </div>

              <div className="col-span-2 flex items-center">
                <Badge variant="outline">{candidature.serieBac}</Badge>
              </div>

              <div className="col-span-2 flex items-center">
                <div>
                  <div className="font-medium text-foreground">{candidature.noteBac}/20</div>
                  {candidature.score && <div className="text-xs text-muted-foreground">Score: {candidature.score}</div>}
                </div>
              </div>

              <div className="col-span-2 flex items-center">
                <Badge
                  variant={statutConfig[candidature.statut].variant}
                  className={statutConfig[candidature.statut].color}
                >
                  {statutConfig[candidature.statut].label}
                </Badge>
              </div>

              <div className="col-span-1 flex items-center justify-end">
                <Button variant="ghost" size="sm">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination info */}
        <div className="border-t border-border px-6 py-4 text-sm text-muted-foreground">
          Affichage de 1 à {Math.min(20, candidatures.length)} sur {candidatures.length} candidatures
        </div>
      </CardContent>
    </Card>
  )
}
