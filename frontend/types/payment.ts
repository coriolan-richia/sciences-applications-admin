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

export interface PaymentUpload {
  id: string;
  filename: string;
  uploadDate: string;
  recordCount: number;
  status: "processing" | "completed" | "failed";
}
