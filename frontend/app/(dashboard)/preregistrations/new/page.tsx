"use client";

import type React from "react";

import { useState } from "react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

// [FETCH]
import { studyBranches } from "@/lib/mock-data";
import { useRouter } from "next/navigation";

export default function NewPreregistrationPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
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
  });

  const handleNext = () => {
    // [FETCH]
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // [FETCH]
    // Here you would typically send the data to your backend
    console.log("Formulaire Soumis:", formData);
    router.push("/preregistrations");
  };

  return (
    <div className="flex h-full flex-col">
      <PageHeader
        title="Nouveelle Préinscription"
        description={`Étape ${step} sur 2`}
        action={
          <Link href="/preregistrations">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Annuler
            </Button>
          </Link>
        }
      />

      <div className="flex-1 overflow-y-auto p-8">
        <div className="mx-auto max-w-2xl">
          {/* Progress Indicator */}
          <div className="mb-8 flex items-center gap-2">
            <div
              className={`h-2 flex-1 rounded-full ${
                step >= 1 ? "bg-primary" : "bg-secondary"
              }`}
            />
            <div
              className={`h-2 flex-1 rounded-full ${
                step >= 2 ? "bg-primary" : "bg-secondary"
              }`}
            />
          </div>

          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <Card className="p-6">
                <h2 className="mb-6 text-lg font-semibold text-foreground">
                  Informations Basiques
                </h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="etudiant@email.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+212600000000"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="bacYear">Année du Bac</Label>
                      <Input
                        id="bacYear"
                        type="number"
                        placeholder="2000, 2022, ..."
                        value={formData.bacYear}
                        onChange={(e) =>
                          setFormData({ ...formData, bacYear: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bacNumber">Numéro au Bac</Label>
                      <Input
                        id="bacNumber"
                        placeholder="Ex: 2004001"
                        value={formData.bacNumber}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            bacNumber: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button type="button" onClick={handleNext}>
                      Suivant
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            {step === 2 && (
              <Card className="p-6">
                <h2 className="mb-6 text-lg font-semibold text-foreground">
                  Détails Académiques et de Paiement
                </h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="studyBranch">Mention Choisie</Label>
                    <Select
                      value={formData.studyBranch}
                      onValueChange={(value) =>
                        setFormData({ ...formData, studyBranch: value })
                      }
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner une Mention" />
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
                    <Label htmlFor="preregistrationDate">
                      Date de Préinscription
                    </Label>
                    <Input
                      id="preregistrationDate"
                      type="date"
                      value={formData.preregistrationDate}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          preregistrationDate: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="paymentReference">
                      Référence de Paiement
                    </Label>
                    <Input
                      id="paymentReference"
                      placeholder="Ex: PAY2024001"
                      value={formData.paymentReference}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          paymentReference: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="paymentAgence">Agence de Paiement</Label>
                    <Input
                      id="paymentAgence"
                      placeholder="Ex: Antaninarenina, Ambohimiandra..."
                      value={formData.paymentAgence}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          paymentAgence: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="paymentDate">Date de Paiement</Label>
                    <Input
                      id="paymentDate"
                      type="date"
                      value={formData.paymentDate}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          paymentDate: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="flex justify-between pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleBack}
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Précédent
                    </Button>
                    <Button type="submit">Soumettre la Préinscription</Button>
                  </div>
                </div>
              </Card>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
