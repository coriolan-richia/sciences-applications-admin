import { Sidebar } from "@/components/ui/sidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Download,
  Eye,
  TrendingUp,
  Users,
  CheckCircle,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { parcours } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/page-header";

export default function PreselectionPage() {
  // Calcul des statistiques globales
  const statsGlobales = {
    totalCandidatures: parcours.reduce(
      (acc, p) => acc + p.nombreCandidatures,
      0
    ),
    totalSelectionnes: parcours.reduce(
      (acc, p) => acc + p.nombreSelectionnes,
      0
    ),
    totalListeAttente: parcours.reduce(
      (acc, p) => acc + p.nombreListeAttente,
      0
    ),
    totalParcours: parcours.length,
    tauxSelection: 0,
  };
  statsGlobales.tauxSelection = Math.round(
    (statsGlobales.totalSelectionnes / statsGlobales.totalCandidatures) * 100
  );

  return (
    <div className="flex h-full flex-col">
      <PageHeader
        title="Présélection"
        description="Vue d'ensemble des résultats de présélection par parcours"
        action={
          <Button size="lg" className="gap-2">
            <Download className="h-4 w-4" />
            Exporter tout (PDF)
          </Button>
        }
      />

      {/* Statistiques globales */}
      <div className="flex-1 overflow-y-auto space-y-6 p-8">
        <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Candidatures
              </CardTitle>
              <Users className="h-5 w-5 text-chart-1" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {statsGlobales.totalCandidatures}
              </div>
              <p className="text-xs text-muted-foreground">
                {statsGlobales.totalParcours} parcours
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Sélectionnés
              </CardTitle>
              <CheckCircle className="h-5 w-5 text-chart-3" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {statsGlobales.totalSelectionnes}
              </div>
              <p className="text-xs text-muted-foreground">
                {statsGlobales.tauxSelection}% du total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Liste d'attente
              </CardTitle>
              <Clock className="h-5 w-5 text-chart-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {statsGlobales.totalListeAttente}
              </div>
              <p className="text-xs text-muted-foreground">
                En attente de places
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Taux de sélection
              </CardTitle>
              <TrendingUp className="h-5 w-5 text-chart-2" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {statsGlobales.tauxSelection}%
              </div>
              <p className="text-xs text-muted-foreground">Moyenne générale</p>
            </CardContent>
          </Card>
        </div>

        {/* Liste des parcours */}
        <Card>
          <CardHeader>
            <CardTitle>Résultats par parcours</CardTitle>
            <CardDescription>
              Liste synthétique des résultats de présélection pour tous les
              parcours
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {parcours.map((p) => {
                const tauxRemplissage = Math.round(
                  (p.nombreSelectionnes / p.capacite) * 100
                );
                const tauxSelection = Math.round(
                  (p.nombreSelectionnes / p.nombreCandidatures) * 100
                );

                return (
                  <div
                    key={p.id}
                    className="flex items-center justify-between rounded-lg border border-border bg-card p-4 transition-colors hover:bg-accent/50"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <div>
                          <h3 className="font-semibold text-card-foreground">
                            {p.nom}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {p.description}
                          </p>
                        </div>
                        <Badge variant="outline" className="ml-2">
                          {p.code}
                        </Badge>
                      </div>

                      <div className="mt-3 flex items-center gap-6 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">
                            Candidatures:
                          </span>
                          <span className="font-medium text-foreground">
                            {p.nombreCandidatures}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">
                            Sélectionnés:
                          </span>
                          <span className="font-medium text-chart-3">
                            {p.nombreSelectionnes}/{p.capacite}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">
                            Liste d'attente:
                          </span>
                          <span className="font-medium text-chart-4">
                            {p.nombreListeAttente}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">Taux:</span>
                          <span className="font-medium text-foreground">
                            {tauxSelection}%
                          </span>
                        </div>
                      </div>

                      {/* Barre de progression */}
                      <div className="mt-3">
                        <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                          <div
                            className="h-full bg-chart-3 transition-all"
                            style={{ width: `${tauxRemplissage}%` }}
                          />
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Capacité remplie à {tauxRemplissage}%
                        </p>
                      </div>
                    </div>

                    <div className="ml-6 flex gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/preselection/parcours/${p.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          Détails
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        PDF
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
