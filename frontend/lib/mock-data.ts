import { Preregistration, StudyBranch } from "@/types/preregistration";
import type { Payment, PaymentUpload } from "@/types/payment";
import type {
  PreselectionCriteria,
  PreselectionCandidate,
  PreselectionResult,
} from "@/types/preselection";
import type { User } from "@/types/user";
import type { BranchConfiguration } from "@/types/preselection";

import type {
  Parcours,
  Candidature,
  ConditionsPreselection,
  MentionBac,
  SerieBac,
  StatutCandidat,
} from "@/types/preselections";

export const studyBranches: StudyBranch[] = [
  { id: "1", name: "Computer Science", code: "CS" },
  { id: "2", name: "Electrical Engineering", code: "EE" },
  { id: "3", name: "Mechanical Engineering", code: "ME" },
  { id: "4", name: "Business Administration", code: "BA" },
  { id: "5", name: "Mathematics", code: "MATH" },
];

export const mockPreselectionCriteria: PreselectionCriteria[] = [
  {
    id: "1",
    branchId: "1",
    branchName: "Computer Science",
    type: "mention",
    value: "Très Bien",
    priority: 1,
  },
  {
    id: "2",
    branchId: "1",
    branchName: "Computer Science",
    type: "subject",
    value: "Mathematics",
    minScore: 14,
    priority: 2,
  },
  {
    id: "3",
    branchId: "2",
    branchName: "Electrical Engineering",
    type: "mention",
    value: "Bien",
    priority: 1,
  },
];

export const mockPreselectionCandidates: PreselectionCandidate[] = [
  {
    id: "1",
    bacNumber: "3182035",
    bacYear: 2024,
    studentName: "Rakoto Andry",
    studyBranch: "C",
    mention: "Très Bien",
    score: 17.3,
    status: "selected",
  },
  {
    id: "2",
    bacNumber: "3182036",
    bacYear: 2024,
    studentName: "Randrianarisoa Fanja",
    studyBranch: "D",
    mention: "Bien",
    score: 14.8,
    status: "selected",
  },
  {
    id: "3",
    bacNumber: "3182037",
    bacYear: 2023,
    studentName: "Rasoanaivo Hery",
    studyBranch: "A2",
    mention: "Assez Bien",
    score: 12.5,
    status: "waiting",
  },
  {
    id: "4",
    bacNumber: "3182038",
    bacYear: 2023,
    studentName: "Razanakoto Lalao",
    studyBranch: "A1",
    mention: "Passable",
    score: 10.4,
    status: "rejected",
  },
  {
    id: "5",
    bacNumber: "1182039",
    bacYear: 2024,
    studentName: "Rabarison Tojo",
    studyBranch: "S",
    mention: "Très Bien",
    score: 18.1,
    status: "selected",
  },
];

export const mockPreselectionResults: PreselectionResult[] = [
  {
    branchId: "1",
    branchName: "Informatique et Technologie",
    totalCandidates: 45,
    selected: 30,
    waiting: 10,
    rejected: 5,
    lastRun: "2024-09-20T15:30:00",
    validated: true,
  },
  {
    branchId: "2",
    branchName: "Physique et Application",
    totalCandidates: 38,
    selected: 25,
    waiting: 8,
    rejected: 5,
    lastRun: "2024-09-20T15:30:00",
    validated: false,
  },
];

export const mockBranchConfigurations: BranchConfiguration[] = [
  {
    id: "1",
    branchId: "1",
    branchName: "Computer Science",
    maxCapacity: 30,
    overflowAction: "waitlist",
  },
  {
    id: "2",
    branchId: "2",
    branchName: "Electrical Engineering",
    maxCapacity: 25,
    overflowAction: "reject",
  },
  {
    id: "3",
    branchId: "3",
    branchName: "Mechanical Engineering",
    maxCapacity: 20,
    overflowAction: "accept_all",
  },
  {
    id: "4",
    branchId: "4",
    branchName: "Business Administration",
    maxCapacity: 35,
    overflowAction: "waitlist",
  },
  {
    id: "5",
    branchId: "5",
    branchName: "Mathematics",
    maxCapacity: 15,
    overflowAction: "reject",
  },
];

export const baccalaureateSubjects = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Computer Science",
  "Philosophy",
  "French",
  "English",
  "Arabic",
  "History & Geography",
  "Economics",
  "Accounting",
  "Engineering Sciences",
  "Earth & Life Sciences",
];

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
  {
    id: "6",
    nom: "Géologie",
    code: "GEO",
    description: "Licence en Géologie et Sciences de la Terre",
    capacite: 40,
    nombreCandidatures: 65,
    nombreSelectionnes: 35,
    nombreListeAttente: 5,
  },
  {
    id: "7",
    nom: "Statistiques",
    code: "STAT",
    description: "Licence en Statistiques et Analyse de Données",
    capacite: 70,
    nombreCandidatures: 134,
    nombreSelectionnes: 60,
    nombreListeAttente: 10,
  },
  {
    id: "8",
    nom: "Biochimie",
    code: "BIOCH",
    description: "Licence en Biochimie et Biologie Moléculaire",
    capacite: 55,
    nombreCandidatures: 112,
    nombreSelectionnes: 50,
    nombreListeAttente: 5,
  },
  {
    id: "9",
    nom: "Physique-Chimie",
    code: "PC",
    description: "Licence en Physique-Chimie",
    capacite: 45,
    nombreCandidatures: 78,
    nombreSelectionnes: 40,
    nombreListeAttente: 5,
  },
  {
    id: "10",
    nom: "Sciences de l'Environnement",
    code: "ENV",
    description: "Licence en Sciences de l'Environnement et Écologie",
    capacite: 65,
    nombreCandidatures: 143,
    nombreSelectionnes: 58,
    nombreListeAttente: 7,
  },
];

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
};

// Fonction pour générer des candidatures mock
export function generateMockCandidatures(
  parcoursId: string,
  count: number
): Candidature[] {
  const noms = [
    "Dupont",
    "Martin",
    "Bernard",
    "Dubois",
    "Thomas",
    "Robert",
    "Richard",
    "Petit",
    "Durand",
    "Leroy",
  ];
  const prenoms = [
    "Jean",
    "Marie",
    "Pierre",
    "Sophie",
    "Luc",
    "Anne",
    "Paul",
    "Julie",
    "Marc",
    "Claire",
  ];
  const mentions: MentionBac[] = [
    "TRES_BIEN",
    "BIEN",
    "ASSEZ_BIEN",
    "PASSABLE",
  ];
  const series: SerieBac[] = [
    "SCIENTIFIQUE",
    "LITTERAIRE",
    "ECONOMIQUE",
    "TECHNIQUE",
  ];
  const statuts: StatutCandidat[] = [
    "SELECTIONNE",
    "LISTE_ATTENTE",
    "NON_SELECTIONNE",
    "NON_TRAITE",
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: `${parcoursId}-${i + 1}`,
    nom: noms[Math.floor(Math.random() * noms.length)],
    prenom: prenoms[Math.floor(Math.random() * prenoms.length)],
    email: `candidat${i + 1}@email.com`,
    telephone: `+261 34 ${Math.floor(Math.random() * 90 + 10)} ${Math.floor(
      Math.random() * 900 + 100
    )} ${Math.floor(Math.random() * 90 + 10)}`,
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
    dateInscription: new Date(
      2025,
      0,
      Math.floor(Math.random() * 30 + 1)
    ).toISOString(),
    score: Math.floor(Math.random() * 100),
  }));
}
