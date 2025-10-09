export interface Preregistration {
  id: string
  bacNumber: string
  bacYear: number
  bacOption: string
  studyBranch: string
  preregistrationDate: string
  email: string
  phone: string
  paymentDate?: string
  paymentReference?: string
  paymentAgence?: string
  status: "pending" | "verified" | "rejected"
}

export interface StudyBranch {
  id: string
  name: string
  code: string
}
