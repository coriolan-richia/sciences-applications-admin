"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { studyBranches, mockPreselectionCriteria, baccalaureateSubjects } from "@/lib/mock-data"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function NewCriterionPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const prefilledBranchId = searchParams.get("branchId")

  const [criteriaType, setCriteriaType] = useState<"mention" | "subject" | null>(null)
  const [formData, setFormData] = useState({
    branchId: prefilledBranchId || "",
    value: "",
    priority: "",
  })
  const [validationError, setValidationError] = useState<string>("")

  useEffect(() => {
    if (prefilledBranchId && criteriaType === "mention") {
      const existingMentionCriteria = mockPreselectionCriteria.find(
        (c) => c.branchId === prefilledBranchId && c.type === "mention",
      )
      if (existingMentionCriteria && criteriaType === "mention") {
        setValidationError(
          `This branch already has a mention criterion (${existingMentionCriteria.value}). Only one mention criterion is allowed per study branch.`,
        )
      }
    }
  }, [prefilledBranchId, criteriaType])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!criteriaType) {
      setValidationError("Please select a criteria type")
      return
    }

    if (criteriaType === "mention") {
      const existingMentionCriteria = mockPreselectionCriteria.find(
        (c) => c.branchId === formData.branchId && c.type === "mention",
      )

      if (existingMentionCriteria) {
        setValidationError(
          `A mention criterion already exists for this branch (${existingMentionCriteria.value}). Only one mention criterion is allowed per study branch.`,
        )
        return
      }
    }

    if (criteriaType === "subject" && formData.priority) {
      const existingPriorityCriteria = mockPreselectionCriteria.find(
        (c) => c.branchId === formData.branchId && c.type === "subject" && c.priority.toString() === formData.priority,
      )

      if (existingPriorityCriteria) {
        setValidationError(
          `Priority ${formData.priority} is already assigned to subject "${existingPriorityCriteria.value}". Please choose a different priority.`,
        )
        return
      }
    }

    console.log("[v0] Criteria submitted:", { ...formData, type: criteriaType })
    const returnBranch = formData.branchId || "all"
    router.push(`/preselection/conditions?branch=${returnBranch}`)
  }

  const handleBranchChange = (branchId: string) => {
    setFormData({ ...formData, branchId })
    setValidationError("")

    if (criteriaType === "mention") {
      const existingMentionCriteria = mockPreselectionCriteria.find(
        (c) => c.branchId === branchId && c.type === "mention",
      )

      if (existingMentionCriteria) {
        setValidationError(
          `This branch already has a mention criterion (${existingMentionCriteria.value}). Please select a different branch or choose subject criteria.`,
        )
      }
    }
  }

  const handleCriteriaTypeChange = (value: "mention" | "subject") => {
    setCriteriaType(value)
    setValidationError("")
    if (value === "mention") {
      setFormData({ ...formData, priority: "" })
    }

    if (value === "mention" && formData.branchId) {
      const existingMentionCriteria = mockPreselectionCriteria.find(
        (c) => c.branchId === formData.branchId && c.type === "mention",
      )

      if (existingMentionCriteria) {
        setValidationError(
          `This branch already has a mention criterion (${existingMentionCriteria.value}). Only one mention criterion is allowed per study branch.`,
        )
      }
    }
  }

  const handlePriorityChange = (priority: string) => {
    setFormData({ ...formData, priority })
    setValidationError("")

    if (criteriaType === "subject" && priority && formData.branchId) {
      const existingPriorityCriteria = mockPreselectionCriteria.find(
        (c) => c.branchId === formData.branchId && c.type === "subject" && c.priority.toString() === priority,
      )

      if (existingPriorityCriteria) {
        setValidationError(
          `Priority ${priority} is already assigned to subject "${existingPriorityCriteria.value}". Please choose a different priority.`,
        )
      }
    }
  }

  const isFormValid =
    criteriaType &&
    formData.branchId &&
    formData.value &&
    (criteriaType === "mention" || formData.priority) &&
    !validationError

  const selectedBranchName = studyBranches.find((b) => b.id === formData.branchId)?.name

  const cancelUrl = formData.branchId
    ? `/preselection/conditions?branch=${formData.branchId}`
    : "/preselection/conditions"

  return (
    <div className="flex h-full flex-col">
      <PageHeader
        title="Add Selection Criterion"
        description={
          selectedBranchName
            ? `Adding criterion for ${selectedBranchName}`
            : "Configure new selection criterion for a study branch"
        }
        action={
          <Button variant="outline" asChild>
            <Link href={cancelUrl}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Link>
          </Button>
        }
      />

      <div className="flex-1 overflow-y-auto p-8">
        <Card className="mx-auto max-w-2xl">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {validationError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{validationError}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="branchId">
                  Study Branch <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={formData.branchId}
                  onValueChange={handleBranchChange}
                  disabled={!!prefilledBranchId}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a study branch" />
                  </SelectTrigger>
                  <SelectContent>
                    {studyBranches.map((branch) => (
                      <SelectItem key={branch.id} value={branch.id}>
                        {branch.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  This field is required. Selection criteria are specific to each branch.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">
                  Criteria Type <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={criteriaType || ""}
                  onValueChange={(value) => handleCriteriaTypeChange(value as "mention" | "subject")}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select criteria type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mention">Baccalaureate Mention</SelectItem>
                    <SelectItem value="subject">Subject Mark</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  Choose between mention-based or subject-based selection criteria
                </p>
              </div>

              {criteriaType === "mention" && (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>Only one mention criterion is allowed per study branch.</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="value">
                  {criteriaType === "mention" ? (
                    <>
                      Minimum Mention <span className="text-destructive">*</span>
                    </>
                  ) : criteriaType === "subject" ? (
                    <>
                      Subject Name <span className="text-destructive">*</span>
                    </>
                  ) : (
                    "Value"
                  )}
                </Label>
                {criteriaType === "mention" ? (
                  <Select
                    value={formData.value}
                    onValueChange={(value) => setFormData({ ...formData, value })}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select minimum mention" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Très Bien">Très Bien</SelectItem>
                      <SelectItem value="Bien">Bien</SelectItem>
                      <SelectItem value="Assez Bien">Assez Bien</SelectItem>
                      <SelectItem value="Passable">Passable</SelectItem>
                    </SelectContent>
                  </Select>
                ) : criteriaType === "subject" ? (
                  <Select
                    value={formData.value}
                    onValueChange={(value) => setFormData({ ...formData, value })}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {baccalaureateSubjects.map((subject) => (
                        <SelectItem key={subject} value={subject}>
                          {subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    id="value"
                    placeholder="Enter criterion value"
                    value={formData.value}
                    onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                    disabled
                  />
                )}
                <p className="text-sm text-muted-foreground">
                  {criteriaType === "mention"
                    ? "Minimum baccalaureate mention required for admission"
                    : criteriaType === "subject"
                      ? "Select the subject to evaluate from the list"
                      : "Select a criteria type first"}
                </p>
              </div>

              {criteriaType && (
                <>
                  {criteriaType === "subject" && (
                    <div className="space-y-2">
                      <Label htmlFor="minMark">Minimum Mark</Label>
                      <Input
                        id="minMark"
                        type="number"
                        min="0"
                        max="20"
                        step="0.5"
                        placeholder="e.g., 12"
                        defaultValue="10"
                      />
                      <p className="text-sm text-muted-foreground">Minimum mark required for this subject (0-20)</p>
                    </div>
                  )}

                  {criteriaType === "subject" && (
                    <div className="space-y-2">
                      <Label htmlFor="priority">
                        Priority <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="priority"
                        type="number"
                        min="1"
                        placeholder="e.g., 1"
                        value={formData.priority}
                        onChange={(e) => handlePriorityChange(e.target.value)}
                        required
                      />
                      <p className="text-sm text-muted-foreground">
                        Lower numbers = higher priority (1 is highest). Each subject must have a unique priority.
                      </p>
                    </div>
                  )}
                </>
              )}

              <div className="flex gap-4">
                <Button type="submit" className="flex-1" disabled={!isFormValid}>
                  Add Criterion
                </Button>
                <Button type="button" variant="outline" className="flex-1 bg-transparent" asChild>
                  <Link href={cancelUrl}>Cancel</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
