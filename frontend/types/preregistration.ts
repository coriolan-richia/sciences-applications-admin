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
  bacNumber: string;
  bacYear: number;
  bacOption: string;
  studyBranch: string;
  preregistrationDate: string;
  email: string;
  phone: string;
  paymentDate?: string;
  paymentReference?: string;
  paymentAgence?: string;
  status: "pending" | "verified" | "rejected";
}

export interface StudyBranch {
  id: string;
  name: string;
  code: string;
}
