import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockPreregistrations } from "@/lib/mock-data"
import { notFound } from "next/navigation"
import { ArrowLeft, Mail, Phone, Calendar, CreditCard, Building2, GraduationCap, BookOpen } from "lucide-react"
import Link from "next/link"

export default function PreregistrationDetailPage({ params }: { params: { id: string } }) {
  const preregistration = mockPreregistrations.find((p) => p.id === params.id)

  if (!preregistration) {
    notFound()
  }

  const statusColors = {
    verified: "bg-green-500/10 text-green-500 border-green-500/20",
    pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    rejected: "bg-red-500/10 text-red-500 border-red-500/20",
  }

  return (
    <div className="flex h-full flex-col">
      <PageHeader
        title="Preregistration Details"
        description={`BAC Number: ${preregistration.bacNumber}`}
        action={
          <Link href="/preregistrations">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to List
            </Button>
          </Link>
        }
      />

      <div className="flex-1 overflow-y-auto p-8">
        <div className="mx-auto max-w-4xl space-y-6">
          {/* Status Badge */}
          <div className="flex items-center gap-3">
            <Badge className={statusColors[preregistration.status]} variant="outline">
              {preregistration.status}
            </Badge>
          </div>

          {/* Student Information */}
          <Card className="p-6">
            <h2 className="mb-4 text-lg font-semibold text-foreground">Student Information</h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Email</p>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <p className="font-medium text-foreground">{preregistration.email}</p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Phone</p>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <p className="font-medium text-foreground">{preregistration.phone}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Academic Information */}
          <Card className="p-6">
            <h2 className="mb-4 text-lg font-semibold text-foreground">Academic Information</h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">BAC Number</p>
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                  <p className="font-mono font-medium text-foreground">{preregistration.bacNumber}</p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">BAC Year</p>
                <p className="font-medium text-foreground">{preregistration.bacYear}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">BAC Option</p>
                <p className="font-medium text-foreground">{preregistration.bacOption}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Chosen Study Branch</p>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <p className="font-medium text-foreground">{preregistration.studyBranch}</p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Preregistration Date</p>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <p className="font-medium text-foreground">
                    {new Date(preregistration.preregistrationDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Payment Information */}
          <Card className="p-6">
            <h2 className="mb-4 text-lg font-semibold text-foreground">Payment Information</h2>
            {preregistration.paymentDate ? (
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Payment Date</p>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <p className="font-medium text-foreground">
                      {new Date(preregistration.paymentDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Payment Reference</p>
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                    <p className="font-mono font-medium text-foreground">{preregistration.paymentReference}</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Payment Agence</p>
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <p className="font-medium text-foreground">{preregistration.paymentAgence}</p>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No payment information available</p>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
