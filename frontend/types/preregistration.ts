export const STATUS_PENDING = { code: "pending", label: "En Attente" } as const;
export const STATUS_VERIFIED = { code: "verified", label: "Vérifié" } as const;
export const STATUS_REJECTED = { code: "rejected", label: "Rejeté" } as const;

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
  status:
    | { code: "pending"; label: "En Attente" }
    | { code: "verified"; label: "Vérifié" }
    | { code: "rejected"; label: "Rejeté" };
}

export interface StudyBranch {
  id: string;
  name: string;
  code: string;
}
