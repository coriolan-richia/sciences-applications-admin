import { AppSidebar } from "@/components/app-sidebar"
import { CandidaturesList } from "@/components/preselection/candidatures-list"
import { CandidaturesFilters } from "@/components/preselection/candidatures-filters"
import { CandidaturesStats } from "@/components/preselection/candidatures-stats"
import { ViewToggle } from "@/components/preselection/view-toggle"
import { Button } from "@/components/ui/button"
import { Download, ArrowLeft, Settings } from "lucide-react"
import Link from "next/link"
import { parcours, generateMockCandidatures } from "@/lib/data/mock-data"
import { notFound } from "next/navigation"

export default function ParcoursDetailPage({ params }: { params: { id: string } }) {
  const parcoursData = parcours.find((p) => p.id === params.id)

  if (!parcoursData) {
    notFound()
  }

  const candidatures = generateMockCandidatures(params.id, parcoursData.nombreCandidatures)

  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <main className="ml-64 flex-1 p-8">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-6">
            <Button variant="ghost" size="sm" asChild className="mb-4">
              <Link href="/preselection">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour aux résultats
              </Link>
            </Button>

            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground">{parcoursData.nom}</h1>
                <p className="mt-2 text-muted-foreground">{parcoursData.description}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/preselection/conditions/${params.id}`}>
                    <Settings className="mr-2 h-4 w-4" />
                    Conditions
                  </Link>
                </Button>
                <Button size="sm" className="gap-2">
                  <Download className="h-4 w-4" />
                  Exporter PDF
                </Button>
              </div>
            </div>
          </div>

          {/* Statistiques */}
          <CandidaturesStats candidatures={candidatures} parcours={parcoursData} />

          {/* Filtres et vue */}
          <div className="mb-6 flex items-center justify-between gap-4">
            <CandidaturesFilters />
            <ViewToggle />
          </div>

          {/* Liste des candidatures - Vue par défaut */}
          <CandidaturesList candidatures={candidatures} />

          {/* Vue en cartes - Alternative (commentée pour l'instant) */}
          {/* <CandidaturesCards candidatures={candidatures} /> */}
        </div>
      </main>
    </div>
  )
}
