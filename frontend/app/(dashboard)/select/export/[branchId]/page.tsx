"use client";

import { useState } from "react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, FileDown, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { studyBranches, mockPreselectionResults } from "@/lib/mock-data";
import { getPreselectionCandidateStatusLabel as getStatusLabel } from "@/types/preselection";

export default function ExportPreselectionPage() {
  const params = useParams();
  const branchId = params.branchId as string;

  const [isExporting, setIsExporting] = useState(false);
  const [exportComplete, setExportComplete] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);

  const branch = studyBranches.find((b) => b.id === branchId);
  const result = mockPreselectionResults.find((r) => r.branchId === branchId);

  const handleExport = () => {
    setExportSuccess(false);
    setExportComplete(false);
    setIsExporting(true);

    // Simulate PDF generation
    setTimeout(() => {
      setIsExporting(false);
      setExportComplete(true);

      setTimeout(() => {
        setExportSuccess(Date.now() % 2 === 0);
      }, 3000);
    }, 2000);
  };

  if (!branch) {
    return (
      <div className="flex h-full items-center justify-center">
        <Card className="w-full max-w-md p-6">
          <p className="text-center text-muted-foreground">
            Mention non trouvée
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <PageHeader
        title={`Exportation des Résultats - ${branch.name}`}
        description="Générer des raports PDF pour les résultats de présélection"
        action={
          <Link href="/preselection">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour
            </Button>
          </Link>
        }
      />

      <div className="flex-1 overflow-y-auto p-8">
        <div className="mx-auto max-w-2xl">
          <Card className="p-6">
            {!exportComplete ? (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-foreground">
                    Configuration de l'exportation
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Exportation des résultats de présélection pour la mention{" "}
                    {branch.name}
                  </p>
                </div>

                {result && (
                  <div className="rounded-lg border border-border bg-secondary/30 p-4">
                    <h3 className="text-sm font-medium text-foreground">
                      Statistiques de la mention
                    </h3>
                    <div className="mt-3 grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Nombre total des candidats
                        </p>
                        <p className="text-2xl font-bold text-foreground">
                          {result.totalCandidates}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">
                          {getStatusLabel("selected")}s
                        </p>
                        <p className="text-2xl font-bold text-green-500">
                          {result.selected}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">
                          {getStatusLabel("waiting")}
                        </p>
                        <p className="text-2xl font-bold text-yellow-500">
                          {result.waiting}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">
                          {getStatusLabel("rejected")}s
                        </p>
                        <p className="text-2xl font-bold text-red-500">
                          {result.rejected}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="rounded-lg border border-border bg-secondary/30 p-4">
                  <h3 className="text-sm font-medium text-foreground">
                    Détails de l'exportation
                  </h3>
                  <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                    <li>
                      • Information de l'étudiant (Nom, numéro au bac, année de
                      bac)
                    </li>
                    <li>
                      • Détails de performances académiques (Mention, notes)
                    </li>
                    <li>• Statut de sélection et rang</li>
                    <li>• Mention de choix: {branch.name}</li>
                    <li>• Formatage pour usage officiel</li>
                  </ul>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Link href="/preselection">
                    <Button variant="outline">Annuler</Button>
                  </Link>
                  <Button onClick={handleExport} disabled={isExporting}>
                    <FileDown className="mr-2 h-4 w-4" />
                    {isExporting ? "Génération..." : "Exporter PDF"}
                  </Button>
                </div>
              </div>
            ) : exportSuccess ? (
              <div className="space-y-6">
                <div className="flex flex-col items-center justify-center py-12">
                  <CheckCircle2 className="h-16 w-16 text-green-500" />
                  <h3 className="mt-4 text-lg font-semibold text-foreground">
                    Exportation Réussie!
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Le PDF pour la mention {branch.name} a été généré et
                    téléchargé.
                  </p>
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Link href="/preselection" className="mt-6">
                    <Button variant="outline">
                      Revenir au tableau de bord
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex flex-col items-center justify-center py-12">
                  <AlertCircle className="h-16 w-16 text-red-500" />
                  <h3 className="mt-4 text-lg font-semibold text-foreground">
                    Échec de l'exportation.
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Veuillez réessayer l'exportation des résultats de la
                    présélection.
                  </p>
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={handleExport}>
                    Réessayer
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
