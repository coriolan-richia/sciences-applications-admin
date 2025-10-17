import type { Parcours, Candidature, ConditionsPreselection, MentionBac, SerieBac, StatutCandidat } from "@/lib/types"

export const parcours: Parcours[] = [
  {
    id: "1",
    nom: "Informatique",
    code: "INFO",
    description: "Licence en Informatique et Systèmes d'Information",
    capacite: 120,
    nombreCandidatures: 245,
    nombreSelectionnes: 100,
    nombreListeAttente: 20,
  },
  {
    id: "2",
    nom: "Mathématiques",
    code: "MATH",
    description: "Licence en Mathématiques Appliquées",
    capacite: 80,
    nombreCandidatures: 156,
    nombreSelectionnes: 70,
    nombreListeAttente: 10,
  },
  {
    id: "3",
    nom: "Physique",
    code: "PHYS",
    description: "Licence en Physique et Applications",
    capacite: 60,
    nombreCandidatures: 98,
    nombreSelectionnes: 55,
    nombreListeAttente: 5,
  },
  {
    id: "4",
    nom: "Chimie",
    code: "CHIM",
    description: "Licence en Chimie et Sciences des Matériaux",
    capacite: 50,
    nombreCandidatures: 87,
    nombreSelectionnes: 45,
    nombreListeAttente: 5,
  },
  {
    id: "5",
    nom: "Biologie",
    code: "BIO",
    description: "Licence en Biologie et Sciences de la Vie",
    capacite: 100,
    nombreCandidatures: 198,
    nombreSelectionnes: 85,
    nombreListeAttente: 15,
  },
]

export const conditionsPreselection: Record<string, ConditionsPreselection> = {
  "1": {
    parcoursId: "1",
    mentionMinimale: "ASSEZ_BIEN",
    series: [
      { id: "s1", serie: "SCIENTIFIQUE", priorite: 1 },
      { id: "s2", serie: "TECHNIQUE", priorite: 2 },
    ],
    matieres: [
      { id: "m1", matiere: "Mathématiques", priorite: 1, noteMinimale: 12 },
      { id: "m2", matiere: "Physique", priorite: 2, noteMinimale: 10 },
      { id: "m3", matiere: "Informatique", priorite: 3 },
    ],
    capaciteMax: 120,
    tauxListeAttente: 20,
  },
  "2": {
    parcoursId: "2",
    mentionMinimale: "BIEN",
    series: [{ id: "s1", serie: "SCIENTIFIQUE", priorite: 1 }],
    matieres: [
      { id: "m1", matiere: "Mathématiques", priorite: 1, noteMinimale: 14 },
      { id: "m2", matiere: "Physique", priorite: 2, noteMinimale: 12 },
    ],
    capaciteMax: 80,
    tauxListeAttente: 15,
  },
}

// Fonction pour générer des candidatures mock
export function generateMockCandidatures(parcoursId: string, count: number): Candidature[] {
  const noms = ["Dupont", "Martin", "Bernard", "Dubois", "Thomas", "Robert", "Richard", "Petit", "Durand", "Leroy"]
  const prenoms = ["Jean", "Marie", "Pierre", "Sophie", "Luc", "Anne", "Paul", "Julie", "Marc", "Claire"]
  const mentions: MentionBac[] = ["TRES_BIEN", "BIEN", "ASSEZ_BIEN", "PASSABLE"]
  const series: SerieBac[] = ["SCIENTIFIQUE", "LITTERAIRE", "ECONOMIQUE", "TECHNIQUE"]
  const statuts: StatutCandidat[] = ["SELECTIONNE", "LISTE_ATTENTE", "NON_SELECTIONNE", "NON_TRAITE"]

  return Array.from({ length: count }, (_, i) => ({
    id: `${parcoursId}-${i + 1}`,
    nom: noms[Math.floor(Math.random() * noms.length)],
    prenom: prenoms[Math.floor(Math.random() * prenoms.length)],
    email: `candidat${i + 1}@email.com`,
    telephone: `+261 34 ${Math.floor(Math.random() * 90 + 10)} ${Math.floor(Math.random() * 900 + 100)} ${Math.floor(Math.random() * 90 + 10)}`,
    mentionBac: mentions[Math.floor(Math.random() * mentions.length)],
    serieBac: series[Math.floor(Math.random() * series.length)],
    noteBac: Math.floor(Math.random() * 8 + 10),
    notesMatieres: {
      Mathématiques: Math.floor(Math.random() * 10 + 8),
      Physique: Math.floor(Math.random() * 10 + 8),
      Chimie: Math.floor(Math.random() * 10 + 8),
      Informatique: Math.floor(Math.random() * 10 + 8),
    },
    parcoursId,
    statut: statuts[Math.floor(Math.random() * statuts.length)],
    dateInscription: new Date(2025, 0, Math.floor(Math.random() * 30 + 1)).toISOString(),
    score: Math.floor(Math.random() * 100),
  }))
}
