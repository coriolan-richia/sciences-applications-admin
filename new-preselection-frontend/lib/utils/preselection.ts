import type { Candidature, ConditionsPreselection, MentionBac } from "@/lib/types"

// Ordre des mentions (décroissant)
const mentionOrder: Record<MentionBac, number> = {
  TRES_BIEN: 4,
  BIEN: 3,
  ASSEZ_BIEN: 2,
  PASSABLE: 1,
}

/**
 * Applique les conditions de présélection aux candidatures
 */
export function appliquerPreselection(candidatures: Candidature[], conditions: ConditionsPreselection): Candidature[] {
  // 1. Filtrer par mention minimale
  let candidaturesFiltrees = candidatures
  if (conditions.mentionMinimale) {
    const mentionMinScore = mentionOrder[conditions.mentionMinimale]
    candidaturesFiltrees = candidaturesFiltrees.filter((c) => mentionOrder[c.mentionBac] >= mentionMinScore)
  }

  // 2. Calculer le score de chaque candidature
  const candidaturesAvecScore = candidaturesFiltrees.map((c) => {
    let score = 0

    // Score mention (40 points max)
    score += mentionOrder[c.mentionBac] * 10

    // Score série (30 points max)
    const serieConfig = conditions.series.find((s) => s.serie === c.serieBac)
    if (serieConfig) {
      score += (conditions.series.length - serieConfig.priorite + 1) * 10
    }

    // Score matières (30 points max)
    conditions.matieres.forEach((matiere, index) => {
      const note = c.notesMatieres[matiere.matiere]
      if (note !== undefined) {
        // Vérifier note minimale
        if (matiere.noteMinimale && note < matiere.noteMinimale) {
          score -= 10 // Pénalité
        } else {
          score += (conditions.matieres.length - index) * (note / 20) * 10
        }
      }
    })

    return { ...c, score }
  })

  // 3. Trier par score décroissant
  return candidaturesAvecScore.sort((a, b) => (b.score || 0) - (a.score || 0))
}

/**
 * Attribue les statuts aux candidatures selon la capacité
 */
export function attribuerStatuts(
  candidatures: Candidature[],
  capacite: number,
  tauxListeAttente: number,
): Candidature[] {
  const nombreListeAttente = Math.ceil((capacite * tauxListeAttente) / 100)

  return candidatures.map((c, index) => {
    if (index < capacite) {
      return { ...c, statut: "SELECTIONNE" as const }
    } else if (index < capacite + nombreListeAttente) {
      return { ...c, statut: "LISTE_ATTENTE" as const }
    } else {
      return { ...c, statut: "NON_SELECTIONNE" as const }
    }
  })
}
