"use client"

import type React from "react"

import { useState } from "react"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Upload, FileSpreadsheet, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function UploadPaymentPage() {
  const router = useRouter()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadComplete, setUploadComplete] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) return

    setIsUploading(true)

    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false)
      setUploadComplete(true)

      // Redirect after 2 seconds
      setTimeout(() => {
        router.push("/payments")
      }, 2000)
    }, 2000)
  }

  return (
    <div className="flex h-full flex-col">
      <PageHeader
        title="Upload Payment Relevé"
        description="Import payment records from XLSX or CSV files"
        action={
          <Link href="/payments">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Payments
            </Button>
          </Link>
        }
      />

      <div className="flex-1 overflow-y-auto p-8">
        <div className="mx-auto max-w-2xl">
          <Card className="p-6">
            {!uploadComplete ? (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Upload File</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Select an XLSX or CSV file containing payment records
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="file">Payment Relevé File</Label>
                    <div className="flex items-center gap-4">
                      <label
                        htmlFor="file"
                        className="flex h-32 flex-1 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-secondary/30 transition-colors hover:border-primary/50 hover:bg-secondary/50"
                      >
                        <FileSpreadsheet className="h-8 w-8 text-muted-foreground" />
                        <span className="mt-2 text-sm text-muted-foreground">
                          {selectedFile ? selectedFile.name : "Click to select file"}
                        </span>
                        <span className="mt-1 text-xs text-muted-foreground">XLSX or CSV</span>
                      </label>
                      <input id="file" type="file" accept=".xlsx,.csv" onChange={handleFileChange} className="hidden" />
                    </div>
                  </div>

                  {selectedFile && (
                    <div className="rounded-lg border border-border bg-secondary/30 p-4">
                      <div className="flex items-center gap-3">
                        <FileSpreadsheet className="h-5 w-5 text-primary" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground">{selectedFile.name}</p>
                          <p className="text-xs text-muted-foreground">{(selectedFile.size / 1024).toFixed(2)} KB</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Link href="/payments">
                    <Button variant="outline">Cancel</Button>
                  </Link>
                  <Button onClick={handleUpload} disabled={!selectedFile || isUploading}>
                    <Upload className="mr-2 h-4 w-4" />
                    {isUploading ? "Uploading..." : "Upload File"}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <CheckCircle2 className="h-16 w-16 text-green-500" />
                <h3 className="mt-4 text-lg font-semibold text-foreground">Upload Successful!</h3>
                <p className="mt-2 text-sm text-muted-foreground">Payment records have been imported successfully</p>
                <p className="mt-1 text-xs text-muted-foreground">Redirecting...</p>
              </div>
            )}
          </Card>

          {/* File Format Info */}
          <Card className="mt-6 p-6">
            <h3 className="font-semibold text-foreground">Expected File Format</h3>
            <p className="mt-2 text-sm text-muted-foreground">Your file should contain the following columns:</p>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>• Reference (Payment reference number)</li>
              <li>• Amount (Payment amount)</li>
              <li>• Date (Payment date)</li>
              <li>• Agence (Bank or payment agency)</li>
              <li>• Student Name (Optional)</li>
              <li>• BAC Number (Optional)</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  )
}
