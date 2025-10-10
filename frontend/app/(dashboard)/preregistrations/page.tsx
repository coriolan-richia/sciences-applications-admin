"use client";

import { useState } from "react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, FileCheck, ArrowUpDown } from "lucide-react";
import { ViewToggle } from "@/components/preregistrations/view-toggle";
import { PreregistrationCard } from "@/components/preregistrations/preregistration-card";
import { PreregistrationListItem } from "@/components/preregistrations/preregistration-list-item";
import { mockPreregistrations } from "@/lib/mock-data";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// La page d'accueil de la préinscription
export default function PreregistrationsPage() {
  const [view, setView] = useState<"card" | "list">("card");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<string>("date-desc");

  // Need a fetch
  const filteredPreregistrations = mockPreregistrations.filter(
    (p) =>
      p.bacNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.studyBranch.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.bacOption.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedPreregistrations = [...filteredPreregistrations].sort((a, b) => {
    switch (sortBy) {
      case "date-desc":
        return (
          new Date(b.preregistrationDate).getTime() -
          new Date(a.preregistrationDate).getTime()
        );
      case "date-asc":
        return (
          new Date(a.preregistrationDate).getTime() -
          new Date(b.preregistrationDate).getTime()
        );
      case "bac-year-desc":
        return b.bacYear - a.bacYear;
      case "bac-year-asc":
        return a.bacYear - b.bacYear;
      case "branch-asc":
        return a.studyBranch.localeCompare(b.studyBranch);
      case "branch-desc":
        return b.studyBranch.localeCompare(a.studyBranch);
      default:
        return 0;
    }
  });

  return (
    <div className="flex h-full flex-col">
      <PageHeader
        title="Préinscriptions"
        description="Gestion des dossiers de préinscription des étudiants"
        action={
          <div className="flex items-center gap-2">
            <Link href="/preregistrations/analyze">
              <Button
                variant="outline"
                className=" border-purple-500 text-purple-800"
              >
                <FileCheck className="mr-2 h-4 w-4 " />
                Analyser les Dossiers
              </Button>
            </Link>
            <Link href="/preregistrations/new">
              <Button className="bg-purple-700">
                <Plus className="mr-2 h-4 w-4" />
                Nouveaux dossiers
              </Button>
            </Link>
          </div>
        }
      />

      <div className="flex-1 overflow-y-auto">
        <div className="space-y-6 p-8">
          {/* Filters and View Toggle */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-1 items-center gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Rechercher par numéro du bac, mention choisie..."
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
                  <SelectItem value="date-desc">Date (Récente)</SelectItem>
                  <SelectItem value="date-asc">Date (Ancienne)</SelectItem>
                  <SelectItem value="bac-year-desc">
                    Année du BAC (Récente)
                  </SelectItem>
                  <SelectItem value="bac-year-asc">
                    Année du BAC (Ancienne)
                  </SelectItem>
                  <SelectItem value="branch-asc">Mention (A-Z)</SelectItem>
                  <SelectItem value="branch-desc">Mention (Z-A)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <ViewToggle view={view} onViewChange={setView} />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4">
            <div className="rounded-lg border border-border bg-card p-4">
              <p className="text-sm text-muted-foreground">Total</p>
              <p className="text-2xl font-semibold text-foreground">
                {mockPreregistrations.length}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-4">
              <p className="text-sm text-muted-foreground">Vérifié</p>
              <p className="text-2xl font-semibold text-green-500">
                {
                  mockPreregistrations.filter((p) => p.status === "verified")
                    .length
                }
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-4">
              <p className="text-sm text-muted-foreground">En Attente</p>
              <p className="text-2xl font-semibold text-yellow-500">
                {
                  mockPreregistrations.filter((p) => p.status === "pending")
                    .length
                }
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-4">
              <p className="text-sm text-muted-foreground">Non Conformes</p>
              <p className="text-2xl font-semibold text-red-500">
                {
                  mockPreregistrations.filter((p) => p.status === "rejected")
                    .length
                }
              </p>
            </div>
          </div>

          {/* List/Card View */}
          {view === "card" ? (
            <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,auto))]  gap-4 fmd:grid-cols-2 flg:grid-cols-3 ">
              {sortedPreregistrations.map((preregistration) => (
                <PreregistrationCard
                  key={preregistration.id}
                  preregistration={preregistration}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-border bg-card">
              <div className="flex items-center gap-4 border-b border-border bg-secondary/30 px-6 py-3 text-xs font-medium text-muted-foreground">
                <div className="w-32">Numéro au Bac</div>
                <div className="w-20">Année</div>
                <div className="flex-1">Option au Bac</div>
                <div className="w-48">Portail</div>
                <div className="w-32">Date</div>
                <div className="w-20">Statut</div>
              </div>
              {sortedPreregistrations.map((preregistration) => (
                <PreregistrationListItem
                  key={preregistration.id}
                  preregistration={preregistration}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
