"use client";

import { useState, useEffect } from "react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  Edit,
  Users,
  AlertCircle,
  Clock,
  CheckCircle,
  Trash2,
  Plus,
  Building2,
  Search,
  ArrowUpDown,
} from "lucide-react";
import { CriteriaCard } from "@/components/preselection/criteria-card";
import {
  mockPreselectionCriteria,
  studyBranches,
  mockBranchConfigurations,
} from "@/lib/mock-data";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useRouter, useSearchParams } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function ConditionsManagementPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const branchParam = searchParams.get("branch") || "all";

  const [criteria, setCriteria] = useState(mockPreselectionCriteria);
  const [selectedBranch, setSelectedBranch] = useState<string>(branchParam);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<string>("branch-asc");

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (selectedBranch === "all") {
      params.delete("branch");
    } else {
      params.set("branch", selectedBranch);
    }
    router.replace(`/preselection/conditions?${params.toString()}`, {
      scroll: false,
    });
  }, [selectedBranch, router, searchParams]);

  const handleDelete = (id: string) => {
    setCriteria(criteria.filter((c) => c.id !== id));
  };

  const handleDeleteAll = () => {
    if (selectedBranch === "all") {
      setCriteria([]);
    } else {
      setCriteria(criteria.filter((c) => c.branchId !== selectedBranch));
    }
  };

  const filteredCriteria =
    selectedBranch === "all"
      ? criteria
      : criteria.filter((c) => c.branchId === selectedBranch);

  const searchedCriteria = filteredCriteria.filter((c) => {
    const branchName =
      studyBranches.find((b) => b.id === c.branchId)?.name || "";
    const searchLower = searchQuery.toLowerCase();
    return (
      branchName.toLowerCase().includes(searchLower) ||
      c.type.toLowerCase().includes(searchLower) ||
      (c.type === "subject" &&
        c.subjectName?.toLowerCase().includes(searchLower)) ||
      (c.type === "mention" &&
        c.minimumMention?.toLowerCase().includes(searchLower))
    );
  });

  const sortedCriteria = [...searchedCriteria].sort((a, b) => {
    const branchA = studyBranches.find((b) => b.id === a.branchId)?.name || "";
    const branchB = studyBranches.find((b) => b.id === b.id)?.name || "";

    switch (sortBy) {
      case "branch-asc":
        return branchA.localeCompare(branchB);
      case "branch-desc":
        return branchB.localeCompare(branchA);
      case "type-asc":
        return a.type.localeCompare(b.type);
      case "type-desc":
        return b.type.localeCompare(a.type);
      case "priority-asc":
        return (a.priority || 999) - (b.priority || 999);
      case "priority-desc":
        return (b.priority || 999) - (a.priority || 999);
      default:
        return 0;
    }
  });

  const selectedBranchConfig =
    selectedBranch !== "all"
      ? mockBranchConfigurations.find((config) => config.id === selectedBranch)
      : null;

  return (
    <div className="flex h-full flex-col">
      <PageHeader
        title="Manage Conditions"
        description="Configure preselection conditions for each study branch"
        action={
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-muted-foreground">
                Branch:
              </label>
              <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Branches</SelectItem>
                  {studyBranches.map((branch) => (
                    <SelectItem key={branch.id} value={branch.id}>
                      {branch.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Link href="/preselection">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            </Link>
          </div>
        }
      />

      <div className="flex-1 overflow-y-auto p-8">
        <div className="mx-auto max-w-4xl space-y-6">
          {selectedBranch === "all" && (
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <div>
                  <CardTitle className="text-base">Branch Settings</CardTitle>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Configure admission capacity and overflow actions for all
                    branches
                  </p>
                </div>
                <Button variant="default" size="sm" asChild>
                  <Link href="/preselection/branches">
                    <Building2 className="mr-2 h-4 w-4" />
                    View All Branch Settings
                  </Link>
                </Button>
              </CardHeader>
            </Card>
          )}

          {selectedBranchConfig && (
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <div>
                  <CardTitle className="text-base">
                    {selectedBranchConfig.branchName} - Branch Conditions
                  </CardTitle>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Admission capacity and selection criteria configuration
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="default" size="sm" asChild>
                    <Link
                      href={`/preselection/conditions/new?branchId=${selectedBranchConfig.id}`}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Criterion
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link
                      href={`/preselection/branches/${selectedBranchConfig.id}/edit`}
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Settings
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex items-center gap-3 rounded-lg border border-border bg-background p-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                      <Users className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Admission Capacity
                      </p>
                      <p className="text-xl font-bold text-foreground">
                        {selectedBranchConfig.maxCapacity}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-lg border border-border bg-background p-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                      {selectedBranchConfig.overflowAction === "reject" ? (
                        <AlertCircle className="h-4 w-4 text-primary" />
                      ) : selectedBranchConfig.overflowAction ===
                        "accept_all" ? (
                        <CheckCircle className="h-4 w-4 text-primary" />
                      ) : (
                        <Clock className="h-4 w-4 text-primary" />
                      )}
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Overflow Action
                      </p>
                      <Badge
                        variant={
                          selectedBranchConfig.overflowAction === "reject"
                            ? "destructive"
                            : selectedBranchConfig.overflowAction ===
                              "accept_all"
                            ? "default"
                            : "secondary"
                        }
                        className="mt-1"
                      >
                        {selectedBranchConfig.overflowAction === "reject"
                          ? "Reject"
                          : selectedBranchConfig.overflowAction === "accept_all"
                          ? "Accept All"
                          : "Waitlist"}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {filteredCriteria.length > 0 && (
            <div className="flex items-center justify-between gap-3">
              <div className="flex flex-1 items-center gap-3">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search by branch, type, subject..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <ArrowUpDown className="mr-2 h-4 w-4" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="branch-asc">Branch (A-Z)</SelectItem>
                    <SelectItem value="branch-desc">Branch (Z-A)</SelectItem>
                    <SelectItem value="type-asc">Type (A-Z)</SelectItem>
                    <SelectItem value="type-desc">Type (Z-A)</SelectItem>
                    <SelectItem value="priority-asc">
                      Priority (Low to High)
                    </SelectItem>
                    <SelectItem value="priority-desc">
                      Priority (High to Low)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete All
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete{" "}
                      {selectedBranch === "all"
                        ? "all selection criteria across all branches"
                        : `all selection criteria for ${selectedBranchConfig?.branchName}`}
                      . This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDeleteAll}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Delete All
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}

          {sortedCriteria.length > 0 ? (
            sortedCriteria.map((criterion) => (
              <CriteriaCard
                key={criterion.id}
                criteria={criterion}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-secondary/30 py-12">
              <p className="text-sm text-muted-foreground">
                {searchQuery
                  ? "No criteria match your search"
                  : selectedBranch === "all"
                  ? "No selection criteria configured yet. Select a specific branch to add criteria."
                  : "No selection criteria for this branch"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
