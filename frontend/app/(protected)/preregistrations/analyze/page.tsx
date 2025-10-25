"use client";

import { useState } from "react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Play,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";

type LOG_TYPE =
  | { code: "success"; label: "Succès" }
  | { code: "error"; label: "Erreur" }
  | { code: "warning"; label: "Avertissement" };

const logTypeData = {
  success: "Succès",
  error: "Erreur",
  warning: "Avertissement",
} as const;

export type LOG_TYPE_CODE = keyof typeof logTypeData;

interface AnalysisLog {
  id: string;
  // type: "success" | "error" | "warning";
  type: LOG_TYPE_CODE;
  message: string;
  timestamp: string;
}

export default function AnalyzePreregistrationsPage() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const [logs, setLogs] = useState<AnalysisLog[]>([]);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setLogs([]);

    // [FETCH] !!(SIGNALR)
    // Simulate analysis process
    const mockLogs: AnalysisLog[] = [
      {
        id: "1",
        type: "success",
        message: "Analyse des Dossiers de Préinscription Commencé",
        timestamp: new Date().toISOString(),
      },
      {
        id: "2",
        type: "success",
        message: "4 Entrées de Préinscription Trouvées",
        timestamp: new Date().toISOString(),
      },
      {
        id: "3",
        type: "success",
        message:
          "Correspondance trouvée entre le Dossier 1 et le paiement PAY2024001",
        timestamp: new Date().toISOString(),
      },
      {
        id: "4",
        type: "success",
        message:
          "Correspondance trouvée entre le dossier 2 et le paiement PAY2024002",
        timestamp: new Date().toISOString(),
      },
      {
        id: "5",
        type: "warning",
        message: "Aucun paiement trouvé pour le dossier 3",
        timestamp: new Date().toISOString(),
      },
      {
        id: "6",
        type: "success",
        message:
          "Correspondance trouvée entre le Dossier 4 et le paiement PAY2024003",
        timestamp: new Date().toISOString(),
      },
      {
        id: "7",
        type: "success",
        message: "Analyse complétée: 3 Vérifiés, 1 En Attente",
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
        setIsAnalyzing(false);
        setHasAnalyzed(true);
      }
    }, 500);
  };

  const getLogIcon = (type?: string) => {
    if (!type) return <AlertCircle className="h-4 w-4 text-muted-foreground" />;

    switch (type) {
      case "success":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "error":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getLogBadgeColor = (type?: string) => {
    if (!type) return "bg-muted text-muted-foreground border-border";

    switch (type) {
      case "success":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "error":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      case "warning":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  return (
    <div className="flex h-full flex-col">
      <PageHeader
        title="Analyse des Dossiers de Préinscription"
        description="Associer automatiquement les dossiers de préinscription aux enregistrements de paiement"
        action={
          <Link href="/preregistrations">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour à la Liste
            </Button>
          </Link>
        }
      />

      <div className="flex-1 overflow-y-auto p-8">
        <div className="mx-auto max-w-4xl space-y-6">
          {/* Analysis Control */}
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  Analyse de Dossiers
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Mettre en correspondance les dossiers de préinscription avec
                  les preuves de paiement
                </p>
              </div>
              <Button onClick={handleAnalyze} disabled={isAnalyzing}>
                <Play className="mr-2 h-4 w-4" />
                {isAnalyzing ? "Analyse en Cours..." : "Commencer l'Analyse"}
              </Button>
            </div>
          </Card>

          {/* Results Summary */}
          {hasAnalyzed && (
            <div className="grid grid-cols-3 gap-4">
              <Card className="p-4">
                <p className="text-sm text-muted-foreground">Vérifié</p>
                <p className="text-2xl font-semibold text-green-500">3</p>
              </Card>
              <Card className="p-4">
                <p className="text-sm text-muted-foreground">En Attente</p>
                <p className="text-2xl font-semibold text-yellow-500">1</p>
              </Card>
              <Card className="p-4">
                <p className="text-sm text-muted-foreground">Erreurs</p>
                <p className="text-2xl font-semibold text-red-500">0</p>
              </Card>
            </div>
          )}

          {/* Analysis Logs */}
          {logs.length > 0 && (
            <Card className="p-6">
              <h2 className="mb-4 text-lg font-semibold text-foreground">
                Logs d'Analyse
              </h2>
              <div className="space-y-3">
                {logs
                  .filter((log) => log && log.id)
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
                            {logTypeData[log?.type] || "info"}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {log?.timestamp
                              ? new Date(log.timestamp).toLocaleTimeString()
                              : ""}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-foreground">
                          {log?.message || "Aucun message"}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
