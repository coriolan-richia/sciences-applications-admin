"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter } from "lucide-react"

export function CandidaturesFilters() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statutFilter, setStatutFilter] = useState("tous")

  return (
    <div className="flex flex-1 items-center gap-4">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Rechercher par nom, prénom, email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9"
        />
      </div>

      <Select value={statutFilter} onValueChange={setStatutFilter}>
        <SelectTrigger className="w-[200px]">
          <Filter className="mr-2 h-4 w-4" />
          <SelectValue placeholder="Filtrer par statut" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="tous">Tous les statuts</SelectItem>
          <SelectItem value="SELECTIONNE">Sélectionnés</SelectItem>
          <SelectItem value="LISTE_ATTENTE">Liste d'attente</SelectItem>
          <SelectItem value="NON_SELECTIONNE">Non sélectionnés</SelectItem>
          <SelectItem value="NON_TRAITE">Non traités</SelectItem>
        </SelectContent>
      </Select>

      <Select defaultValue="score">
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Trier par" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="score">Score (décroissant)</SelectItem>
          <SelectItem value="nom">Nom (A-Z)</SelectItem>
          <SelectItem value="noteBac">Note Bac (décroissant)</SelectItem>
          <SelectItem value="date">Date inscription</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
