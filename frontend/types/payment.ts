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
  status: boolean;
}
export function getPaymentUploadStatusLabel(status: boolean): string {
  return status ? "Accomplie" : "Échouée";
}
