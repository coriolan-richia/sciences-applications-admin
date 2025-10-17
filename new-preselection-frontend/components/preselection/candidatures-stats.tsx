import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, XCircle, AlertCircle, TrendingUp } from "lucide-react"
import type { Candidature, Parcours } from "@/lib/types"

interface CandidaturesStatsProps {
  candidatures: Candidature[]
  parcours: Parcours
}

export function CandidaturesStats({ candidatures, parcours }: CandidaturesStatsProps) {
  const stats = {
    total: candidatures.length,
    selectionnes: candidatures.filter((c) => c.statut === "SELECTIONNE").length,
    listeAttente: candidatures.filter((c) => c.statut === "LISTE_ATTENTE").length,
    nonSelectionnes: candidatures.filter((c) => c.statut === "NON_SELECTIONNE").length,
    nonTraites: candidatures.filter((c) => c.statut === "NON_TRAITE").length,
  }

  const moyenneBac = candidatures.reduce((acc, c) => acc + c.noteBac, 0) / candidatures.length || 0

  const tauxSelection = Math.round((stats.selectionnes / stats.total) * 100)

  return (
    <div className="mb-8 grid gap-4 md:grid-cols-3 lg:grid-cols-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total</CardTitle>
          <AlertCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">{stats.total}</div>
          <p className="text-xs text-muted-foreground">Candidatures</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Sélectionnés</CardTitle>
          <CheckCircle className="h-4 w-4 text-chart-3" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-chart-3">{stats.selectionnes}</div>
          <p className="text-xs text-muted-foreground">{parcours.capacite} places</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Liste d'attente</CardTitle>
          <Clock className="h-4 w-4 text-chart-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-chart-4">{stats.listeAttente}</div>
          <p className="text-xs text-muted-foreground">En attente</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Non sélectionnés</CardTitle>
          <XCircle className="h-4 w-4 text-destructive" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-destructive">{stats.nonSelectionnes}</div>
          <p className="text-xs text-muted-foreground">Refusés</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Non traités</CardTitle>
          <AlertCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">{stats.nonTraites}</div>
          <p className="text-xs text-muted-foreground">À traiter</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Taux</CardTitle>
          <TrendingUp className="h-4 w-4 text-chart-2" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">{tauxSelection}%</div>
          <p className="text-xs text-muted-foreground">Moy: {moyenneBac.toFixed(1)}/20</p>
        </CardContent>
      </Card>
    </div>
  )
}
