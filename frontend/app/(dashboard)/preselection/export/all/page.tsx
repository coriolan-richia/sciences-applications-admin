"use client";

import { useState } from "react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, FileDown, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { mockPreselectionResults } from "@/lib/mock-data";
import { getPreselectionCandidateStatusLabel as getStatusLabel } from "@/types/preselection";

export default function ExportAllPreselectionPage() {
  const [isExporting, setIsExporting] = useState(false);
  const [exportComplete, setExportComplete] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);

  const totalCandidates = mockPreselectionResults.reduce(
    (sum, r) => sum + r.totalCandidates,
    0
  );
  const totalSelected = mockPreselectionResults.reduce(
    (sum, r) => sum + r.selected,
    0
  );
  const totalWaiting = mockPreselectionResults.reduce(
    (sum, r) => sum + r.waiting,
    0
  );
  const totalRejected = mockPreselectionResults.reduce(
    (sum, r) => sum + r.rejected,
    0
  );

  const handleExport = () => {
    setExportSuccess(false);
    setExportComplete(false);
    setIsExporting(true);

    console.log(
      "Exportation en cours des résultats de présélection de toutes les mentions"
    );

    // Simulate PDF generation
    setTimeout(() => {
      setIsExporting(false);
      setExportComplete(true);

      setTimeout(() => {
        setExportSuccess(Date.now() % 2 === 0);
      }, 3000);
    }, 2500);
  };

  return (
    <div className="flex h-full flex-col">
      <PageHeader
        title="Export All Results"
        description="Generate combined PDF report for all branches"
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
                    Exportation des résultats de présélection pour toutes les
                    mentions
                  </p>
                </div>

                <div className="rounded-lg border border-border bg-secondary/30 p-4">
                  <h3 className="text-sm font-medium text-foreground">
                    Statistiques générales
                  </h3>
                  <div className="mt-3 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Nombre total des candidats
                      </p>
                      <p className="text-2xl font-bold text-foreground">
                        {totalCandidates}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">
                        {getStatusLabel("selected")}
                      </p>
                      <p className="text-2xl font-bold text-green-500">
                        {totalSelected}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">
                        {getStatusLabel("waiting")}
                      </p>
                      <p className="text-2xl font-bold text-yellow-500">
                        {totalWaiting}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">
                        {getStatusLabel("rejected")}
                      </p>
                      <p className="text-2xl font-bold text-red-500">
                        {totalRejected}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-border bg-secondary/30 p-4">
                  <h3 className="text-sm font-medium text-foreground">
                    Mentions inclues
                  </h3>
                  <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                    {mockPreselectionResults.map((result) => (
                      <li key={result.branchId}>
                        • {result.branchName} ({result.totalCandidates}{" "}
                        candidats)
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-lg border border-border bg-secondary/30 p-4">
                  <h3 className="text-sm font-medium text-foreground">
                    Détails de l'exportation
                  </h3>
                  <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                    <li>
                      • Information complète des étudiants pour toutes les
                      mentions
                    </li>
                    <li>
                      • Détails de performances académiques et critères de
                      sélection
                    </li>
                    <li>• Statuts de sélection et rangs par mention</li>
                    <li>• Statistiques et survol récapitulatifs</li>
                    <li>• Formatage pour usage officiel</li>
                  </ul>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Link href="/preselection">
                    <Button variant="outline">Annuler</Button>
                  </Link>
                  <Button onClick={handleExport} disabled={isExporting}>
                    <FileDown className="mr-2 h-4 w-4" />
                    {isExporting ? "Génération..." : "Exporter PDF combiné"}
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
                    Le PDF pour toutes les mentions combinées a été généré et
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
