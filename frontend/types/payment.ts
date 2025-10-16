export interface Payment {
  id: string;
  date: string;
  label?: string;
  reference: string;
  value: string;
  amount: number;
  matched: boolean;
}

export function getPaymentMatchedLabel(status: boolean): string {
  return status ? "Associé" : "Non Associé";
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
