"use client";

import { useState } from "react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Settings, Search, ArrowUpDown, FileDown } from "lucide-react";
import { ResultCard } from "@/components/preselection/result-card";
import { CandidateListItem } from "@/components/preselection/candidate-list-item";
import {
  mockPreselectionResults,
  mockPreselectionCandidates,
} from "@/lib/mock-data";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function PreselectionPage() {
  const [resultsSearchQuery, setResultsSearchQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<string>("score-desc");

  const filteredResults = mockPreselectionResults.filter((result) =>
    result.branchName.toLowerCase().includes(resultsSearchQuery.toLowerCase())
  );

  // [FETCH]
  const filteredCandidates = mockPreselectionCandidates.filter(
    (c) =>
      c.bacNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.studyBranch.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedCandidates = [...filteredCandidates].sort((a, b) => {
    switch (sortBy) {
      case "score-desc":
        return b.score - a.score;
      case "score-asc":
        return a.score - b.score;
      case "name-asc":
        return a.studentName.localeCompare(b.studentName);
      case "name-desc":
        return b.studentName.localeCompare(a.studentName);
      case "branch-asc":
        return a.studyBranch.localeCompare(b.studyBranch);
      case "branch-desc":
        return b.studyBranch.localeCompare(a.studyBranch);
      case "status-accepted":
        return a.status === "selected" ? -1 : 1;
      case "status-rejected":
        return a.status === "rejected" ? -1 : 1;
      default:
        return 0;
    }
  });

  return (
    <div className="flex h-full flex-col">
      <PageHeader
        title="Présélection"
        description="Gérer les conditions et le processus de présélection"
        action={
          <div className="flex items-center gap-2">
            <Link href="/preselection/conditions">
              <Button variant="outline">
                <Settings className="mr-2 h-4 w-4" />
                Gérer les conditions
              </Button>
            </Link>
            <Link href="/preselection/run">
              <Button>
                <Play className="mr-2 h-4 w-4" />
                Lancer la présélection
              </Button>
            </Link>
          </div>
        }
      />

      <div className="flex-1 overflow-y-auto">
        <div className="p-8">
          <Tabs defaultValue="results" className="space-y-6">
            <TabsList>
              <TabsTrigger value="results">Résultats</TabsTrigger>
              <TabsTrigger value="candidates">Candidats</TabsTrigger>
            </TabsList>

            <TabsContent value="results" className="space-y-6">
              <div className="flex items-center justify-between gap-3">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Recherche par nom de mention..."
                    value={resultsSearchQuery}
                    onChange={(e) => setResultsSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Link href="/preselection/export/all">
                  <Button variant="outline">
                    <FileDown className="mr-2 h-4 w-4" />
                    Exporter toutes les mentions
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredResults.map((result) => (
                  <ResultCard key={result.branchId} result={result} />
                ))}
              </div>

              {filteredResults.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Search className="h-12 w-12 text-muted-foreground/50" />
                  <h3 className="mt-4 text-lg font-semibold text-foreground">
                    Aucun résultat trouvé
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Essayez d'ajuster votre recherche pour trouver ce que vous
                    recherchez.
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="candidates" className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Recherche par nom, numéro au bac, ou mention choisie..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <ArrowUpDown className="mr-2 h-4 w-4" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="score-desc">
                      Moyenne (Décroissante)
                    </SelectItem>
                    <SelectItem value="score-asc">
                      Moyenne (Croissante)
                    </SelectItem>
                    <SelectItem value="name-asc">Nom (A-Z)</SelectItem>
                    <SelectItem value="name-desc">Nom (Z-A)</SelectItem>
                    <SelectItem value="branch-asc">Mention (A-Z)</SelectItem>
                    <SelectItem value="branch-desc">Mention (Z-A)</SelectItem>
                    <SelectItem value="status-accepted">
                      Acceptés d'abord
                    </SelectItem>
                    <SelectItem value="status-rejected">
                      Rejetés d'abord
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="rounded-lg border border-border bg-card">
                <div className="flex items-center gap-4 border-b border-border bg-secondary/30 px-6 py-3 text-xs font-medium text-muted-foreground">
                  <div className="w-32">Numéro au bac</div>
                  <div className="flex-1">Nom de l'étudiant</div>
                  <div className="w-48">Mention choisie</div>
                  <div className="w-32">Mention au bac</div>
                  <div className="w-20">Moyenne</div>
                  <div className="w-24">Statut</div>
                </div>
                {sortedCandidates.map((candidate) => (
                  <CandidateListItem key={candidate.id} candidate={candidate} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
