"use client";

import type React from "react";

import { useState } from "react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  Upload,
  FileSpreadsheet,
  CheckCircle2,
  CircleAlert,
  RotateCcw,
  FileUp,
  Eraser,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { API } from "@/lib/api";

export default function UploadPaymentPage() {
  // const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleErase = () => {
    setSelectedFile(null);
  };

  const handleUpload = async () => {
    const currentUser = JSON.parse(localStorage.getItem("user") ?? "");

    if (!selectedFile) return;
    const uploadURL = `${API.payment}/upload-releve`;

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("idUploader", currentUser.idUtilisateur);
    setIsUploading(true);
    try {
      const response = await fetch(uploadURL, {
        method: "POST",
        // headers:{"Content-Type":"multipart/form-data"}
        body: formData,
      });

      if (!response.ok) {
        console.log(response.statusText);
        setIsUploading(false);
        setUploadComplete(true);
        setUploadSuccess(false);
        return;
      }

      setIsUploading(false);
      setUploadComplete(true);
      setUploadSuccess(true);
    } catch (error) {
      setIsUploading(false);
      setUploadComplete(true);
      setUploadSuccess(false);
    }
  };

  const handleRetry = async () => {
    setUploadComplete(false);
    if (!selectedFile) return;

    handleUpload();
  };

  const handleNew = async () => {
    setUploadComplete(false);
    setSelectedFile(null);
  };

  return (
    <div className="flex h-full flex-col">
      <PageHeader
        title="Importation de Relevés de Paiement"
        description="Importation de relevés de paiement depuis des fichiers Excels (XLSX) ou CSV"
        action={
          <Link href="/payments">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour aux paiements
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
                  <h2 className="text-lg font-semibold text-foreground">
                    Importer un Fichier
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Selectionner un fichier Excel (XLSX) or CSV contenant des
                    relevés de paiement
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="file">Fichier de Relevés de Paiement</Label>
                    <div className="flex items-center gap-4">
                      <label
                        htmlFor="file"
                        className="flex h-32 flex-1 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-secondary/30 transition-colors hover:border-primary/50 hover:bg-secondary/50"
                      >
                        <FileSpreadsheet className="h-8 w-8 text-muted-foreground" />
                        <span className="mt-2 text-sm text-muted-foreground">
                          {selectedFile
                            ? selectedFile.name
                            : "Cliquer pour sélectionner un fichier"}
                        </span>
                        <span className="mt-1 text-xs text-muted-foreground">
                          XLSX ou CSV
                        </span>
                      </label>
                      <input
                        id="file"
                        type="file"
                        accept=".xlsx,.csv"
                        onChange={handleFileChange}
                        className="hidden"
                        disabled={isUploading}
                      />
                    </div>
                  </div>

                  {selectedFile && (
                    <div className="rounded-lg border border-border bg-secondary/30 p-4">
                      <div className="flex items-center gap-3">
                        <FileSpreadsheet className="h-5 w-5 text-primary" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground">
                            {selectedFile.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {(selectedFile.size / 1024).toFixed(2)} KB
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  {/* <Link href="/payments"> */}
                  <Button
                    variant="outline"
                    onClick={handleErase}
                    disabled={!selectedFile || isUploading}
                  >
                    <Eraser className="mr-2 h-4 w-4" /> Effacer
                  </Button>
                  {/* </Link> */}
                  <Button
                    onClick={handleUpload}
                    disabled={!selectedFile || isUploading}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    {isUploading ? "Importation..." : "Importer le Fichier"}
                  </Button>
                </div>
              </div>
            ) : uploadSuccess ? (
              <div className="space-y-6">
                <div className="flex flex-col items-center justify-center py-12">
                  <CheckCircle2 className="h-16 w-16 text-green-500" />
                  <h3 className="mt-4 text-lg font-semibold text-foreground">
                    Importation Réussie!
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Les relevés de paiements ont été importés avec succès.
                  </p>
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Link href="/payments">
                    <Button variant="outline">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Retour aux paiements
                    </Button>
                  </Link>
                  <Button onClick={handleNew}>
                    <FileUp className="mr-2 h-4 w-4" />
                    Importer de nouveaux relevés
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex flex-col items-center justify-center py-12">
                  <CircleAlert className="h-16 w-16 text-red-500" />
                  <h3 className="mt-4 text-lg font-semibold text-foreground">
                    Importation Échouée!
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Veuillez réessayer l'importation.
                  </p>
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button onClick={handleNew} variant="outline">
                    <FileUp className="mr-2 h-4 w-4" />
                    Choisir un autre fichier
                  </Button>
                  <Button onClick={handleRetry}>
                    <RotateCcw className="mr-2 h-4 w-4" />
                    {isUploading ? "Importation..." : "Réessayer l'Importation"}
                  </Button>
                </div>
              </div>
            )}
          </Card>

          {/* File Format Info */}
          <Card className="mt-6 p-6">
            <h3 className="font-semibold text-foreground">
              Format de fichier attendu
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Votre fichier doit contenir les colonnes suivantes:
            </p>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>• Référence (Numéro de référence de paiement)</li>
              <li>• Montant (Montant de paiement)</li>
              <li>• Date (Date de paiement)</li>
              <li>• Agence (Agence bancaire du paiement)</li>
              <li>• Nom de l'étudiant (Optionnel)</li>
              <li>• Numéro au Bac (Optionnel)</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
