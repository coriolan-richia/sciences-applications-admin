import { Sidebar } from "@/components/ui/sidebar";
import { CandidaturesList } from "@/components/preselection/candidatures-list";
import { CandidaturesFilters } from "@/components/preselection/candidatures-filters";
import { CandidaturesStats } from "@/components/preselection/candidatures-stats";
import { ViewToggle } from "@/components/preselection/view-toggle";
import { Button } from "@/components/ui/button";
import { Download, ArrowLeft, Settings } from "lucide-react";
import Link from "next/link";
import { parcours, generateMockCandidatures } from "@/lib/mock-data";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/page-header";

export default function ParcoursDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const parcoursData = parcours.find((p) => p.id === params.id);

  if (!parcoursData) {
    notFound();
  }

  const candidatures = generateMockCandidatures(
    params.id,
    parcoursData.nombreCandidatures
  );

  return (
    <div className="flex h-full flex-col">
      <PageHeader
        title={parcoursData.nom}
        description={parcoursData.description}
        action={
          <div className="flex flex-row items-center gap-2">
            <Link href="/preselection">
              <Button variant={"outline"}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour aux résultats
              </Button>
            </Link>
            <Link href={`/preselection/conditions/${params.id}`}>
              <Button>
                <Settings className="mr-2 h-4 w-4" />
                Conditions
              </Button>
            </Link>
            <Button>
              <Download className="h-4 w-4" />
              Exporter PDF
            </Button>
          </div>
        }
      />

      <div className="flex-1 overflow-y-auto">
        <div className="space-y-6 p-8">
          <CandidaturesStats
            candidatures={candidatures}
            parcours={parcoursData}
          />

          <div className="mb-6 flex items-center justify-between gap-4">
            <CandidaturesFilters />
            <ViewToggle />
          </div>

          <CandidaturesList candidatures={candidatures} />
        </div>
      </div>
    </div>
  );
}
