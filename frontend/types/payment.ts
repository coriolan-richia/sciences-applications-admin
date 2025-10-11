export interface Payment {
  id: string;
  reference: string;
  amount: number;
  date: string;
  agence: string;
  studentName?: string;
  bacNumber?: string;
  status: "matched" | "unmatched";
}

export function getPaymentStatusLabel(status: string) {
  return status === "matched"
    ? "Associé"
    : status === "unmatched"
    ? "Non Associé"
    : "Non Défini";
}
export interface PaymentUpload {
  id: string;
  filename: string;
  uploadDate: string;
  recordCount: number;
  status: "processing" | "completed" | "failed";
}
export function getPaymentUploadStatusLabel(status: string) {
  return status === "processing"
    ? "En Cours d'Importation"
    : status === "completed"
    ? "Accomplie"
    : "Échouée";
}
