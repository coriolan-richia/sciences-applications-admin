// Types pour le système de présélection

export type MentionBac = "TRES_BIEN" | "BIEN" | "ASSEZ_BIEN" | "PASSABLE"

export type SerieBac = "SCIENTIFIQUE" | "LITTERAIRE" | "ECONOMIQUE" | "TECHNIQUE" | "AUTRE"

export type StatutCandidat = "SELECTIONNE" | "LISTE_ATTENTE" | "NON_SELECTIONNE" | "NON_TRAITE"

export interface Candidature {
  id: string
  nom: string
  prenom: string
  email: string
  telephone: string
  mentionBac: MentionBac
  serieBac: SerieBac
  noteBac: number
  notesMatieres: Record<string, number>
  parcoursId: string
  statut: StatutCandidat
  dateInscription: string
  score?: number
}

export interface Parcours {
  id: string
  nom: string
  code: string
  description: string
  capacite: number
  nombreCandidatures: number
  nombreSelectionnes: number
  nombreListeAttente: number
}

export interface CritereMatiere {
  id: string
  matiere: string
  priorite: number
  noteMinimale?: number
}

export interface CritereSerie {
  id: string
  serie: SerieBac
  priorite: number
}

export interface ConditionsPreselection {
  parcoursId: string
  mentionMinimale?: MentionBac
  series: CritereSerie[]
  matieres: CritereMatiere[]
  capaciteMax: number
  tauxListeAttente: number
}

export interface StatistiquesPreselection {
  totalCandidatures: number
  selectionnes: number
  listeAttente: number
  nonSelectionnes: number
  nonTraites: number
  tauxSelection: number
  moyenneBac: number
}
