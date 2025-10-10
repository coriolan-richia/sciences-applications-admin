import type { Preregistration, StudyBranch } from "@/types/preregistration";
import type { Payment, PaymentUpload } from "@/types/payment";
import type {
  PreselectionCriteria,
  PreselectionCandidate,
  PreselectionResult,
} from "@/types/preselection";
import type { User } from "@/types/user";
import type { BranchConfiguration } from "@/types/preselection";

export const studyBranches: StudyBranch[] = [
  { id: "1", name: "Computer Science", code: "CS" },
  { id: "2", name: "Electrical Engineering", code: "EE" },
  { id: "3", name: "Mechanical Engineering", code: "ME" },
  { id: "4", name: "Business Administration", code: "BA" },
  { id: "5", name: "Mathematics", code: "MATH" },
];

export const mockPreregistrations: Preregistration[] = [
  {
    id: "1",
    bacNumber: "BAC2024001",
    bacYear: 2024,
    bacOption: "Sciences Mathématiques",
    studyBranch: "Computer Science",
    preregistrationDate: "2024-09-15",
    email: "student1@email.com",
    phone: "+212600000001",
    paymentDate: "2024-09-14",
    paymentReference: "PAY2024001",
    paymentAgence: "Bank Al-Maghrib",
    status: "verified",
  },
  {
    id: "2",
    bacNumber: "BAC2024002",
    bacYear: 2024,
    bacOption: "Sciences Physiques",
    studyBranch: "Electrical Engineering",
    preregistrationDate: "2024-09-16",
    email: "student2@email.com",
    phone: "+212600000002",
    paymentDate: "2024-09-15",
    paymentReference: "PAY2024002",
    paymentAgence: "Attijariwafa Bank",
    status: "verified",
  },
  {
    id: "3",
    bacNumber: "BAC2024003",
    bacYear: 2024,
    bacOption: "Sciences de la Vie et de la Terre",
    studyBranch: "Business Administration",
    preregistrationDate: "2024-09-17",
    email: "student3@email.com",
    phone: "+212600000003",
    status: "pending",
  },
  {
    id: "4",
    bacNumber: "BAC2023045",
    bacYear: 2023,
    bacOption: "Sciences Mathématiques",
    studyBranch: "Mathematics",
    preregistrationDate: "2024-09-18",
    email: "student4@email.com",
    phone: "+212600000004",
    paymentDate: "2024-09-17",
    paymentReference: "PAY2024003",
    paymentAgence: "BMCE Bank",
    status: "verified",
  },
];

export const mockPayments: Payment[] = [
  {
    id: "1",
    reference: "PAY2024001",
    amount: 5000,
    date: "2024-09-14",
    agence: "Bank Al-Maghrib",
    studentName: "Ahmed Benali",
    bacNumber: "BAC2024001",
    status: "matched",
  },
  {
    id: "2",
    reference: "PAY2024002",
    amount: 5000,
    date: "2024-09-15",
    agence: "Attijariwafa Bank",
    studentName: "Fatima Zahra",
    bacNumber: "BAC2024002",
    status: "matched",
  },
  {
    id: "3",
    reference: "PAY2024003",
    amount: 5000,
    date: "2024-09-17",
    agence: "BMCE Bank",
    studentName: "Mohammed Alami",
    bacNumber: "BAC2023045",
    status: "matched",
  },
  {
    id: "4",
    reference: "PAY2024004",
    amount: 5000,
    date: "2024-09-18",
    agence: "Banque Populaire",
    status: "unmatched",
  },
  {
    id: "5",
    reference: "PAY2024005",
    amount: 5000,
    date: "2024-09-19",
    agence: "CIH Bank",
    status: "unmatched",
  },
];

export const mockPaymentUploads: PaymentUpload[] = [
  {
    id: "1",
    filename: "payments_september_2024.xlsx",
    uploadDate: "2024-09-20T10:30:00",
    recordCount: 150,
    status: "completed",
  },
  {
    id: "2",
    filename: "payments_august_2024.csv",
    uploadDate: "2024-08-25T14:15:00",
    recordCount: 120,
    status: "completed",
  },
  {
    id: "3",
    filename: "payments_july_2024.xlsx",
    uploadDate: "2024-07-30T09:00:00",
    recordCount: 95,
    status: "completed",
  },
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
    bacNumber: "BAC2024001",
    bacYear: 2024,
    studentName: "Ahmed Benali",
    studyBranch: "Computer Science",
    mention: "Très Bien",
    score: 16.5,
    status: "selected",
  },
  {
    id: "2",
    bacNumber: "BAC2024002",
    bacYear: 2024,
    studentName: "Fatima Zahra",
    studyBranch: "Electrical Engineering",
    mention: "Bien",
    score: 14.2,
    status: "selected",
  },
  {
    id: "3",
    bacNumber: "BAC2023045",
    bacYear: 2023,
    studentName: "Mohammed Alami",
    studyBranch: "Mathematics",
    mention: "Assez Bien",
    score: 12.8,
    status: "waiting",
  },
];

export const mockPreselectionResults: PreselectionResult[] = [
  {
    branchId: "1",
    branchName: "Computer Science",
    totalCandidates: 45,
    selected: 30,
    waiting: 10,
    rejected: 5,
    lastRun: "2024-09-20T15:30:00",
    validated: true,
  },
  {
    branchId: "2",
    branchName: "Electrical Engineering",
    totalCandidates: 38,
    selected: 25,
    waiting: 8,
    rejected: 5,
    lastRun: "2024-09-20T15:30:00",
    validated: false,
  },
];

export const mockUsers: User[] = [
  {
    id: "1",
    email: "superadmin@college.edu",
    password: "super123",
    name: "Super Admin",
    role: "superadmin" as const,
  },
  {
    id: "2",
    email: "admin@college.edu",
    password: "admin123",
    name: "Admin User",
    role: "admin" as const,
  },
  {
    id: "3",
    email: "viewer@college.edu",
    password: "viewer123",
    name: "Viewer User",
    role: "viewer" as const,
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
