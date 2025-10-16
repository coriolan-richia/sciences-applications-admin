import { Preregistration, StudyBranch } from "@/types/preregistration";
import type { Payment, PaymentUpload } from "@/types/payment";
import type {
  PreselectionCriteria,
  PreselectionCandidate,
  PreselectionResult,
} from "@/types/preselection";
import type { User } from "@/types/user";
import type { BranchConfiguration } from "@/types/preselection";

export const studyBranches: StudyBranch[] = [
  { id: "1", name: "Informatique et Technologie", code: "IT" },
  { id: "2", name: "Mathématiques et Informatique", code: "MI" },
  { id: "3", name: "Physique et Application", code: "PA" },
  { id: "4", name: "Sciences de la Vie et de la Terre", code: "SVT" },
  { id: "5", name: "Chimie", code: "Chimie" },
];

export const mockPreregistrations: Preregistration[] = [
  {
    id: "3",
    bacNumber: "4182037", // D → 4
    bacYear: 2024,
    bacOption: "D",
    studyBranch: "Chimie",
    studyBranchAbbrev: "Chim",
    preregistrationDate: "2024-09-17",
    email: "etudiant3@email.com",
    phone: "+261340000003",
    status: "pending",
  },
];
// --- Mock Payments ---
export const mockPayments: Payment[] = [
  {
    id: "1",
    reference: "PAY2024001",
    amount: 5000,
    date: "2024-09-14",
    label: "Etudiant 1",
    value: "N/A",
    matched: true,
  },
  {
    id: "2",
    reference: "PAY2024002",
    amount: 5000,
    date: "2024-09-15",
    label: "Etudiant 2",
    value: "N/A",
    matched: true,
  },
  {
    id: "3",
    reference: "PAY2024003",
    amount: 5000,
    date: "2024-09-17",
    label: "Etudiant 4",
    value: "N/A",
    matched: false,
  },
  {
    id: "4",
    reference: "PAY2024005",
    amount: 5000,
    date: "2024-09-18",
    label: "Etudiant 5",
    value: "N/A",
    matched: true,
  },
  {
    id: "5",
    reference: "PAY2024007",
    amount: 5000,
    date: "2024-09-20",
    label: "Etudiant 7",
    value: "N/A",
    matched: false,
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
    bacNumber: "3182035",
    bacYear: 2024,
    studentName: "Rakoto Andry",
    studyBranch: "C",
    mention: "Très Bien",
    score: 17.3,
    status: "selected",
  },
  {
    id: "2",
    bacNumber: "3182036",
    bacYear: 2024,
    studentName: "Randrianarisoa Fanja",
    studyBranch: "D",
    mention: "Bien",
    score: 14.8,
    status: "selected",
  },
  {
    id: "3",
    bacNumber: "3182037",
    bacYear: 2023,
    studentName: "Rasoanaivo Hery",
    studyBranch: "A2",
    mention: "Assez Bien",
    score: 12.5,
    status: "waiting",
  },
  {
    id: "4",
    bacNumber: "3182038",
    bacYear: 2023,
    studentName: "Razanakoto Lalao",
    studyBranch: "A1",
    mention: "Passable",
    score: 10.4,
    status: "rejected",
  },
  {
    id: "5",
    bacNumber: "1182039",
    bacYear: 2024,
    studentName: "Rabarison Tojo",
    studyBranch: "S",
    mention: "Très Bien",
    score: 18.1,
    status: "selected",
  },
];

export const mockPreselectionResults: PreselectionResult[] = [
  {
    branchId: "1",
    branchName: "Informatique et Technologie",
    totalCandidates: 45,
    selected: 30,
    waiting: 10,
    rejected: 5,
    lastRun: "2024-09-20T15:30:00",
    validated: true,
  },
  {
    branchId: "2",
    branchName: "Physique et Application",
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
    identifiant: "superadmin",
    password: "super123",
    name: "Super Admin",
    role: "superadmin" as const,
  },
  {
    id: "2",
    identifiant: "admin",
    password: "admin123",
    name: "Admin User",
    role: "admin" as const,
  },
  {
    id: "3",
    identifiant: "viewer",
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
