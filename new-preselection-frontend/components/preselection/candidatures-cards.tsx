import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import type { Candidature } from "@/lib/types"
import { cn } from "@/lib/utils"

interface CandidaturesCardsProps {
  candidatures: Candidature[]
}

const statutConfig = {
  SELECTIONNE: {
    label: "Sélectionné",
    color: "bg-chart-3 text-white",
  },
  LISTE_ATTENTE: {
    label: "Liste d'attente",
    color: "bg-chart-4 text-white",
  },
  NON_SELECTIONNE: {
    label: "Non sélectionné",
    color: "bg-destructive text-destructive-foreground",
  },
  NON_TRAITE: {
    label: "Non traité",
    color: "bg-muted text-muted-foreground",
  },
}

const mentionConfig = {
  TRES_BIEN: { label: "Très Bien", color: "text-chart-3" },
  BIEN: { label: "Bien", color: "text-chart-2" },
  ASSEZ_BIEN: { label: "Assez Bien", color: "text-chart-4" },
  PASSABLE: { label: "Passable", color: "text-muted-foreground" },
}

export function CandidaturesCards({ candidatures }: CandidaturesCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {candidatures.slice(0, 20).map((candidature) => (
        <Card key={candidature.id} className="transition-shadow hover:shadow-md">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-card-foreground">
                  {candidature.nom} {candidature.prenom}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">{candidature.email}</p>
              </div>
              <Badge className={statutConfig[candidature.statut].color}>{statutConfig[candidature.statut].label}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Mention:</span>
              <span className={cn("font-medium", mentionConfig[candidature.mentionBac].color)}>
                {mentionConfig[candidature.mentionBac].label}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Série:</span>
              <Badge variant="outline">{candidature.serieBac}</Badge>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Note Bac:</span>
              <span className="font-medium text-foreground">{candidature.noteBac}/20</span>
            </div>
            {candidature.score && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Score:</span>
                <span className="font-medium text-foreground">{candidature.score}</span>
              </div>
            )}
            <Button variant="outline" size="sm" className="w-full bg-transparent">
              <Eye className="mr-2 h-4 w-4" />
              Voir les détails
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
