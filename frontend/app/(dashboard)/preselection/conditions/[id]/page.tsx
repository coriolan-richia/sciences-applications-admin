import { Sidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save, Trash2 } from "lucide-react";
import Link from "next/link";
import { parcours, conditionsPreselection } from "@/lib/mock-data";
import { notFound } from "next/navigation";
import { MentionCriteria } from "@/components/preselection/conditions/mention-criteria";
import { SerieCriteria } from "@/components/preselection/conditions/serie-criteria";
import { MatiereCriteria } from "@/components/preselection/conditions/matiere-criteria";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function ConditionsPage({ params }: { params: { id: string } }) {
  const parcoursData = parcours.find((p) => p.id === params.id);

  if (!parcoursData) {
    notFound();
  }

  const conditions = conditionsPreselection[params.id];

  return (
    <div className="flex h-full flex-col">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-6">
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link href={`/preselection/parcours/${params.id}`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour au parcours
            </Link>
          </Button>

          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                Conditions de présélection
              </h1>
              <p className="mt-2 text-muted-foreground">
                {parcoursData.nom} - Configuration des critères de sélection
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="gap-2 bg-transparent"
              >
                <Trash2 className="h-4 w-4" />
                Réinitialiser
              </Button>
              <Button size="sm" className="gap-2">
                <Save className="h-4 w-4" />
                Enregistrer
              </Button>
            </div>
          </div>
        </div>

        {/* Info Alert */}
        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Les critères sont appliqués dans l'ordre de priorité : Mention au
            bac → Série au bac → Notes par matière. Configurez chaque critère
            selon vos besoins.
          </AlertDescription>
        </Alert>

        {/* Capacité et paramètres généraux */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Paramètres généraux</CardTitle>
            <CardDescription>
              Configuration de la capacité et du taux de liste d'attente
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-foreground">
                  Capacité maximale
                </label>
                <input
                  type="number"
                  defaultValue={
                    conditions?.capaciteMax || parcoursData.capacite
                  }
                  className="mt-1.5 flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring"
                />
                <p className="mt-1 text-xs text-muted-foreground">
                  Nombre maximum d'étudiants à sélectionner
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">
                  Taux liste d'attente (%)
                </label>
                <input
                  type="number"
                  defaultValue={conditions?.tauxListeAttente || 20}
                  min="0"
                  max="100"
                  className="mt-1.5 flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring"
                />
                <p className="mt-1 text-xs text-muted-foreground">
                  Pourcentage de la capacité pour la liste d'attente
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Critère 1: Mention au bac */}
        <MentionCriteria mentionMinimale={conditions?.mentionMinimale} />

        {/* Critère 2: Série au bac */}
        <SerieCriteria series={conditions?.series || []} />

        {/* Critère 3: Notes par matière */}
        <MatiereCriteria matieres={conditions?.matieres || []} />
      </div>
    </div>
  );
}
