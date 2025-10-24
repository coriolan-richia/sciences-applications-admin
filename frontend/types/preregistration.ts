export const STATUS_PENDING = { code: "pending", label: "En Attente" } as const;
export const STATUS_VERIFIED = { code: "verified", label: "Vérifié" } as const;
export const STATUS_REJECTED = { code: "rejected", label: "Rejeté" } as const;

export function getPreregistrationStatusLabel(status: string): string {
  return status === "pending"
    ? "En Attente"
    : status === "verified"
    ? "Vérifié"
    : status === "rejected"
    ? "Non Conforme"
    : "Unknown";
}
export interface Preregistration {
  id: string;
  fullName: string;
  bacNumber: string;
  bacYear: number;
  bacOption: string;
  studyBranch: string;
  studyBranchAbbrev: string;
  preregistrationDate: string;
  email: string;
  phone: string;
  paymentDate?: string;
  paymentReference?: string;
  paymentAgence?: string;
  status: "pending" | "verified";
}

export interface ListingPreregistration {
  id: string;
  bacOption: string;
  personName: string;
  bacNumber: string;
  bacYear: number;
  studyBranch: string;
  studyBranchAbbrev: string;
  preregistrationDate: string;
  status: "pending" | "verified";
}

export interface StudyBranch {
  id: string;
  name: string;
  code: string;
}
