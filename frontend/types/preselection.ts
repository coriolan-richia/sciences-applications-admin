export interface PreselectionCriteria {
  id: string;
  branchId: string;
  branchName: string;
  type: "mention" | "subject";
  value: string;
  minScore?: number;
  priority: number;
}

export interface PreselectionCandidate {
  id: string;
  bacNumber: string;
  bacYear: number;
  studentName: string;
  studyBranch: string;
  mention: string;
  score: number;
  status: "selected" | "waiting" | "rejected";
}

export function getPreselectionCandidateStatusLabel(status: string): string {
  switch (status) {
    case "selected":
      return "Sélectionné";
    case "waiting":
      return "Liste d'attente";
    case "rejected":
      return "Rejeté";
  }
  return "Indéfini";
}
export interface PreselectionResult {
  branchId: string;
  branchName: string;
  totalCandidates: number;
  selected: number;
  waiting: number;
  rejected: number;
  lastRun?: string;
  validated: boolean;
}

export function getPreselectionResultStatusLabel(status: boolean): string {
  return status ? "Validé" : "En attente";
}
export interface BranchConfiguration {
  id: string;
  branchId: string;
  branchName: string;
  maxCapacity: number;
  overflowAction: "reject" | "waitlist" | "accept_all";
}
