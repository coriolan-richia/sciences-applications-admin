"use client";

import { useState, use } from "react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Play, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { parcours } from "@/lib/mock-data";

interface ProcessLog {
  id: string;
  type: "info" | "success" | "warning";
  message: string;
  timestamp: string;
}

export function getProcessLogTypeLabel(
  type: "info" | "success" | "warning"
): string {
  switch (type) {
    case "info":
      return "Information";
    case "success":
      return "Succès";
    case "warning":
      return "Avertissement";
  }
}

export default function RunPreselectionPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [isRunning, setIsRunning] = useState(false);
  const [hasRun, setHasRun] = useState(false);
  const [logs, setLogs] = useState<ProcessLog[]>([]);

  const { id } = useParams<{ id: string }>();
  const current = parcours.find((p) => p.id === id);
  const handleRun = () => {
    setIsRunning(true);
    setLogs([]);

    // [FETCH]
    const mockLogs: ProcessLog[] = [
      {
        id: "1",
        type: "info",
        message: "Début du processus de sélection...",
        timestamp: new Date().toISOString(),
      },
      {
        id: "2",
        type: "info",
        message: "Chargement des conditions pour Informatique et Technologie",
        timestamp: new Date().toISOString(),
      },
      {
        id: "3",
        type: "success",
        message: "45 candidatures traitées pour Informatique et Technologie",
        timestamp: new Date().toISOString(),
      },
      {
        id: "4",
        type: "success",
        message: "30 candidats sélectionnés basés sur le critère de sélection.",
        timestamp: new Date().toISOString(),
      },
      {
        id: "5",
        type: "info",
        message: "Chargement des conditions pour Physique et Application",
        timestamp: new Date().toISOString(),
      },
      {
        id: "6",
        type: "success",
        message: `38 candidatures traitées pour la mention ${current?.nom}`,
        timestamp: new Date().toISOString(),
      },
      {
        id: "7",
        type: "success",
        message: "25 candidats sélectionnés basés sur le critère de sélection",
        timestamp: new Date().toISOString(),
      },
      {
        id: "8",
        type: "warning",
        message: "3 candidats ont besoin de révision manuelles",
        timestamp: new Date().toISOString(),
      },
      {
        id: "9",
        type: "success",
        message: "Le processus de présélection accompli avec succès",
        timestamp: new Date().toISOString(),
      },
    ];

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < mockLogs.length) {
        setLogs((prev) => [...prev, mockLogs[currentIndex]]);
        currentIndex++;
      } else {
        clearInterval(interval);
        setIsRunning(false);
        setHasRun(true);
      }
    }, 600);
  };

  const handleValidate = () => {
    router.push("/preselection");
  };

  const getLogIcon = (type?: string) => {
    if (!type) return <div className="h-4 w-4 rounded-full bg-blue-500"></div>;

    switch (type) {
      case "success":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      default:
        return <div className="h-4 w-4 rounded-full bg-blue-500" />;
    }
  };

  const getLogBadgeColor = (type?: string) => {
    if (!type) return "bg-blue-500/10 text-blue-500 border-blue-500/20";

    switch (type) {
      case "success":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "warning":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      default:
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
    }
  };

  return (
    <div className="flex h-full flex-col">
      <PageHeader
        title={`Présélection  - ${current?.nom}`}
        description="Exécution la présélection basée sur les conditions établies"
        action={
          <Link href={`/preselection/admin/${current?.id}`}>
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour
            </Button>
          </Link>
        }
      />

      <div className="flex-1 overflow-y-auto p-8">
        <div className="mx-auto max-w-4xl space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  Lancement de l'opération de présélection
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Appliquer les conditions à toutes les préinscriptions
                  vérifiées
                </p>
              </div>
              {!hasRun && (
                <Button onClick={handleRun} disabled={isRunning}>
                  <Play className="mr-2 h-4 w-4" />
                  {isRunning ? "En cours..." : "Commencer l'opération"}
                </Button>
              )}
            </div>
          </Card>

          {logs.length > 0 && (
            <Card className="p-6">
              <h2 className="mb-4 text-lg font-semibold text-foreground">
                Logs de l'opération
              </h2>
              <div className="space-y-3">
                {logs
                  .filter((log) => log && log.type)
                  .map((log) => (
                    <div
                      key={log.id}
                      className="flex items-start gap-3 rounded-lg border border-border bg-secondary/30 p-3"
                    >
                      {getLogIcon(log?.type)}
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Badge
                            className={getLogBadgeColor(log?.type)}
                            variant="outline"
                          >
                            {getProcessLogTypeLabel(log?.type || "info")}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {log?.timestamp
                              ? new Date(log.timestamp).toLocaleTimeString()
                              : ""}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-foreground">
                          {log?.message || ""}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </Card>
          )}

          {hasRun && (
            <Card className="p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <h3 className="text-lg font-semibold text-foreground">
                    Opération accomplie
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Le processus de présélection a été accomplie avec succès.
                  Revoir les résultats et valider quand prêts.
                </p>
                <div className="flex justify-end gap-2 pt-2">
                  <Link href="/preselection">
                    <Button variant="outline" disabled>
                      Révision des résultats
                    </Button>
                  </Link>
                  <Button onClick={handleValidate}>
                    Valider la présélection
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
