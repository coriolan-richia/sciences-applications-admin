"use client"

import type React from "react"

import { useState } from "react"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"
import { studyBranches } from "@/lib/mock-data"
import { useRouter } from "next/navigation"

export default function NewPreregistrationPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    bacYear: "",
    bacNumber: "",
    studyBranch: "",
    preregistrationDate: "",
    paymentReference: "",
    paymentAgence: "",
    paymentDate: "",
  })

  const handleNext = () => {
    setStep(2)
  }

  const handleBack = () => {
    setStep(1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log("Form submitted:", formData)
    router.push("/preregistrations")
  }

  return (
    <div className="flex h-full flex-col">
      <PageHeader
        title="New Preregistration"
        description={`Step ${step} of 2`}
        action={
          <Link href="/preregistrations">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Cancel
            </Button>
          </Link>
        }
      />

      <div className="flex-1 overflow-y-auto p-8">
        <div className="mx-auto max-w-2xl">
          {/* Progress Indicator */}
          <div className="mb-8 flex items-center gap-2">
            <div className={`h-2 flex-1 rounded-full ${step >= 1 ? "bg-primary" : "bg-secondary"}`} />
            <div className={`h-2 flex-1 rounded-full ${step >= 2 ? "bg-primary" : "bg-secondary"}`} />
          </div>

          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <Card className="p-6">
                <h2 className="mb-6 text-lg font-semibold text-foreground">Basic Information</h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="student@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+212600000000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="bacYear">BAC Year</Label>
                      <Input
                        id="bacYear"
                        type="number"
                        placeholder="2024"
                        value={formData.bacYear}
                        onChange={(e) => setFormData({ ...formData, bacYear: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bacNumber">BAC Number</Label>
                      <Input
                        id="bacNumber"
                        placeholder="BAC2024001"
                        value={formData.bacNumber}
                        onChange={(e) => setFormData({ ...formData, bacNumber: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button type="button" onClick={handleNext}>
                      Next
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            {step === 2 && (
              <Card className="p-6">
                <h2 className="mb-6 text-lg font-semibold text-foreground">Academic & Payment Details</h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="studyBranch">Study Branch</Label>
                    <Select
                      value={formData.studyBranch}
                      onValueChange={(value) => setFormData({ ...formData, studyBranch: value })}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a study branch" />
                      </SelectTrigger>
                      <SelectContent>
                        {studyBranches.map((branch) => (
                          <SelectItem key={branch.id} value={branch.name}>
                            {branch.name} ({branch.code})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="preregistrationDate">Preregistration Date</Label>
                    <Input
                      id="preregistrationDate"
                      type="date"
                      value={formData.preregistrationDate}
                      onChange={(e) => setFormData({ ...formData, preregistrationDate: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="paymentReference">Payment Reference</Label>
                    <Input
                      id="paymentReference"
                      placeholder="PAY2024001"
                      value={formData.paymentReference}
                      onChange={(e) => setFormData({ ...formData, paymentReference: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="paymentAgence">Payment Bank</Label>
                    <Input
                      id="paymentAgence"
                      placeholder="Bank Al-Maghrib"
                      value={formData.paymentAgence}
                      onChange={(e) => setFormData({ ...formData, paymentAgence: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="paymentDate">Payment Date</Label>
                    <Input
                      id="paymentDate"
                      type="date"
                      value={formData.paymentDate}
                      onChange={(e) => setFormData({ ...formData, paymentDate: e.target.value })}
                    />
                  </div>

                  <div className="flex justify-between pt-4">
                    <Button type="button" variant="outline" onClick={handleBack}>
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                    <Button type="submit">Submit Preregistration</Button>
                  </div>
                </div>
              </Card>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
