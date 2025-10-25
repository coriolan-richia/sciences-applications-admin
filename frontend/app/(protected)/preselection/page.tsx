"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Download,
  Eye,
  TrendingUp,
  Users,
  CheckCircle,
  Clock,
  Search,
  Filter,
  Shield,
} from "lucide-react";
import Link from "next/link";
import { parcours } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState, useMemo } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { PageHeader } from "@/components/page-header";

export default function PreselectionPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"nom" | "candidatures" | "taux">("nom");
  const [filterCapacite, setFilterCapacite] = useState<
    "all" | "low" | "medium" | "high"
  >("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Calcul des statistiques globales
  const statsGlobales = useMemo(() => {
    const stats = {
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
      capaciteTotale: parcours.reduce((acc, p) => acc + p.capacite, 0),
      tauxRemplissageGlobal: 0,
    };
    stats.tauxSelection = Math.round(
      (stats.totalSelectionnes / stats.totalCandidatures) * 100
    );
    stats.tauxRemplissageGlobal = Math.round(
      (stats.totalSelectionnes / stats.capaciteTotale) * 100
    );
    return stats;
  }, []);

  const filteredAndSortedParcours = useMemo(() => {
    let filtered = [...parcours];

    // Recherche
    if (searchQuery) {
      filtered = filtered.filter(
        (p) =>
          p.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filtre par capacité
    if (filterCapacite !== "all") {
      filtered = filtered.filter((p) => {
        if (filterCapacite === "low") return p.capacite < 60;
        if (filterCapacite === "medium")
          return p.capacite >= 60 && p.capacite < 100;
        if (filterCapacite === "high") return p.capacite >= 100;
        return true;
      });
    }

    // Tri
    filtered.sort((a, b) => {
      if (sortBy === "nom") return a.nom.localeCompare(b.nom);
      if (sortBy === "candidatures")
        return b.nombreCandidatures - a.nombreCandidatures;
      if (sortBy === "taux") {
        const tauxA = (a.nombreSelectionnes / a.nombreCandidatures) * 100;
        const tauxB = (b.nombreSelectionnes / b.nombreCandidatures) * 100;
        return tauxB - tauxA;
      }
      return 0;
    });

    return filtered;
  }, [searchQuery, sortBy, filterCapacite]);

  const totalPages = Math.ceil(filteredAndSortedParcours.length / itemsPerPage);
  const paginatedParcours = filteredAndSortedParcours.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <PageHeader
        title="Présélection"
        description="Vue d'ensemble des résultats de présélection par parcours"
        action={
          <div className="flex gap-2">
            <Link href="/preselection/admin">
              <Button variant="outline">
                <Shield className="h-4 w-4" />
                Espace admin
              </Button>
            </Link>

            <Button>
              <Download className="h-4 w-4" />
              Exporter tout (PDF)
            </Button>
          </div>
        }
      />

      <div className="flex-1 overflow-y-auto p-8">
        <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-5">
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

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Capacité totale
              </CardTitle>
              <Users className="h-5 w-5 text-chart-5" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {statsGlobales.capaciteTotale}
              </div>
              <p className="text-xs text-muted-foreground">
                Remplie à {statsGlobales.tauxRemplissageGlobal}%
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filtres et recherche
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Rechercher un parcours..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="pl-9"
                />
              </div>
              <Select
                value={sortBy}
                onValueChange={(value: "nom" | "candidatures" | "taux") => {
                  setSortBy(value);
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Trier par" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nom">Nom (A-Z)</SelectItem>
                  <SelectItem value="candidatures">Candidatures</SelectItem>
                  <SelectItem value="taux">Taux de sélection</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={filterCapacite}
                onValueChange={(value: "all" | "low" | "medium" | "high") => {
                  setFilterCapacite(value);
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Capacité" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes capacités</SelectItem>
                  <SelectItem value="low">Petite (&lt; 60)</SelectItem>
                  <SelectItem value="medium">Moyenne (60-99)</SelectItem>
                  <SelectItem value="high">Grande (≥ 100)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="mt-3 text-sm text-muted-foreground">
              {filteredAndSortedParcours.length} parcours trouvé
              {filteredAndSortedParcours.length > 1 ? "s" : ""}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Résultats par parcours</CardTitle>
            <CardDescription>
              Liste synthétique des résultats de présélection pour tous les
              parcours
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {paginatedParcours.map((p) => {
                const tauxRemplissage = Math.round(
                  (p.nombreSelectionnes / p.capacite) * 100
                );
                const tauxSelection = Math.round(
                  (p.nombreSelectionnes / p.nombreCandidatures) * 100
                );
                const nonSelectionnes =
                  p.nombreCandidatures -
                  p.nombreSelectionnes -
                  p.nombreListeAttente;

                return (
                  <AccordionItem key={p.id} value={p.id}>
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex w-full items-center justify-between pr-4">
                        <div className="flex items-center gap-3">
                          <div>
                            <h3 className="text-left font-semibold text-card-foreground">
                              {p.nom}
                            </h3>
                            <p className="text-left text-sm text-muted-foreground">
                              {p.description}
                            </p>
                          </div>
                          <Badge variant="outline" className="ml-2">
                            {p.code}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-6 text-sm">
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground">
                              Candidatures:
                            </span>
                            <span className="font-medium text-foreground">
                              {p.nombreCandidatures}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground">Taux:</span>
                            <span className="font-medium text-foreground">
                              {tauxSelection}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 pt-2">
                        {/* Statistiques détaillées */}
                        <div className="grid gap-4 md:grid-cols-4">
                          <div className="rounded-lg border border-border bg-card p-3">
                            <div className="text-sm text-muted-foreground">
                              Sélectionnés
                            </div>
                            <div className="mt-1 text-2xl font-bold text-chart-3">
                              {p.nombreSelectionnes}/{p.capacite}
                            </div>
                          </div>
                          <div className="rounded-lg border border-border bg-card p-3">
                            <div className="text-sm text-muted-foreground">
                              Liste d'attente
                            </div>
                            <div className="mt-1 text-2xl font-bold text-chart-4">
                              {p.nombreListeAttente}
                            </div>
                          </div>
                          <div className="rounded-lg border border-border bg-card p-3">
                            <div className="text-sm text-muted-foreground">
                              Non sélectionnés
                            </div>
                            <div className="mt-1 text-2xl font-bold text-muted-foreground">
                              {nonSelectionnes}
                            </div>
                          </div>
                          <div className="rounded-lg border border-border bg-card p-3">
                            <div className="text-sm text-muted-foreground">
                              Taux de remplissage
                            </div>
                            <div className="mt-1 text-2xl font-bold text-foreground">
                              {tauxRemplissage}%
                            </div>
                          </div>
                        </div>

                        {/* Barre de progression */}
                        <div>
                          <div className="mb-2 flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">
                              Progression de la capacité
                            </span>
                            <span className="font-medium text-foreground">
                              {tauxRemplissage}%
                            </span>
                          </div>
                          <div className="h-3 w-full overflow-hidden rounded-full bg-secondary">
                            <div
                              className="h-full bg-chart-3 transition-all"
                              style={{ width: `${tauxRemplissage}%` }}
                            />
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                          <Button variant="default" size="sm" asChild>
                            <Link href={`/preselection/parcours/${p.id}`}>
                              <Eye className="mr-2 h-4 w-4" />
                              Voir les détails
                            </Link>
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="mr-2 h-4 w-4" />
                            Exporter en PDF
                          </Button>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>

            {totalPages > 1 && (
              <div className="mt-6">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage > 1) setCurrentPage(currentPage - 1);
                        }}
                        className={
                          currentPage === 1
                            ? "pointer-events-none opacity-50"
                            : "cursor-pointer"
                        }
                      />
                    </PaginationItem>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => {
                        if (
                          page === 1 ||
                          page === totalPages ||
                          (page >= currentPage - 1 && page <= currentPage + 1)
                        ) {
                          return (
                            <PaginationItem key={page}>
                              <PaginationLink
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setCurrentPage(page);
                                }}
                                isActive={currentPage === page}
                                className="cursor-pointer"
                              >
                                {page}
                              </PaginationLink>
                            </PaginationItem>
                          );
                        } else if (
                          page === currentPage - 2 ||
                          page === currentPage + 2
                        ) {
                          return (
                            <PaginationItem key={page}>
                              <PaginationEllipsis />
                            </PaginationItem>
                          );
                        }
                        return null;
                      }
                    )}
                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage < totalPages)
                            setCurrentPage(currentPage + 1);
                        }}
                        className={
                          currentPage === totalPages
                            ? "pointer-events-none opacity-50"
                            : "cursor-pointer"
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
