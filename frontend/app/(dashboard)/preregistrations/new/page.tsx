"use client";

import type React from "react";

import { useRef, useState } from "react";
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
import { AlertCircle, ArrowLeft, ArrowRight, Eraser } from "lucide-react";
import Link from "next/link";

// [FETCH]
// import { studyBranches } from "@/lib/mock-data";
// import { useRouter } from "next/navigation";
import { isNullOrEmpty } from "@/lib/utils";
import { Alert, AlertDescription } from "@/components/ui/alert";

import { logIfDev } from "@/lib/utils";

const initialFormData = {
  email: "",
  phone: "",
  bacYear: "",
  bacNumber: "",
  studyBranch: "",
  preregistrationDate: "",
  paymentReference: "",
  paymentAgence: "",
  paymentDate: "",
};
export default function NewPreregistrationPage() {
  // const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(initialFormData);
  const formRef = useRef<HTMLFormElement>(null);
  const [formError, setFormError] = useState<string[]>([]);
  const [step1Signature, setStep1Signature] = useState("");
  const [studyBranches, setStudyBranches] = useState<
    { idPortail: number; abbreviation: string; nomPortail: string }[]
  >([]);

  const addToFormError = (value: string) => {
    setFormError((prev) => [...prev, value]);
  };

  const controlFields = (
    table: { value: string | string[]; message: string }[]
  ): boolean => {
    let dataAreOk: boolean = true;

    table.forEach((entry) => {
      let { value, message } = entry;
      if (
        (Array.isArray(value) && value.every((v) => isNullOrEmpty(v))) ||
        (typeof value === "string" && isNullOrEmpty(value))
      ) {
        addToFormError(message);
        dataAreOk = false;
      }
    });
    return dataAreOk;
  };

  const doesBacExist = async (): Promise<boolean> => {
    try {
      const fetchUrl =
        "http://localhost:5174/api/Preinscription/does-bac-exist";
      const response = await fetch(fetchUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          numBacc: formData.bacNumber,
          anneeBacc: formData.bacYear,
        }),
      });

      if (!response.ok) {
        console.error("Erreur serveur :", response.status);
        return false;
      }

      const data = await response.json();
      console.log("Esistenza :", data.exist);
      return data.exist; // supposons que l'API renvoie { exists: true/false }
    } catch (error) {
      addToFormError("Erreur du serveur.");
      return false;
    }
  };

  const getAdequateParcours = async (): Promise<void> => {
    try {
      const fetchUrl =
        "http://localhost:5174/api/Preinscription/get-adequate-parcours";
      const response = await fetch(fetchUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          numBacc: formData.bacNumber,
          anneeBacc: formData.bacYear,
        }),
      });

      if (!response.ok) {
        console.error("Erreur serveur :", response.status);
      }

      const data = await response.json();

      setStudyBranches(data.parcoursList);
    } catch (error) {
      addToFormError("Erreur du serveur.");
    }
  };

  const handleNext = async () => {
    setFormError([]);
    // [FETCH]
    let dataAreOk = controlFields([
      {
        value: formData.email,
        message:
          "Au moins un email ou un numéro de téléphone doit être fourni.",
      },
      {
        value: formData.bacYear,
        message: "L'année de bac ne doit pas être vide",
      },
      {
        value: formData.bacNumber,
        message: "Le numéro de bac ne doit pas être vide",
      },
    ]);

    // logIfDev("log", formError);
    if (!dataAreOk) return;

    const exists = await doesBacExist();
    if (!exists) {
      addToFormError("Aucune correspondance pour ce numéro de bac.");
      return;
    }
    const newSig = `${formData.email}-${formData.phone}-${formData.bacNumber}-${formData.bacYear}`;
    // logIfDev("log", newSig);
    if (step1Signature && newSig !== step1Signature) {
      resetStep2(); // vide les champs du step 2
    }
    setStep1Signature(newSig);
    await getAdequateParcours();
    setStep(2);
  };

  const handleBack = () => {
    setFormError([]);
    setStep(1);
  };

  const resetForm = () => {
    setFormError([]);
    setFormData(initialFormData);
  };

  const resetStep2 = () => {
    setFormData((prev) => ({
      ...prev,
      studyBranch: "",
      preregistrationDate: "",
      paymentReference: "",
      paymentAgence: "",
      paymentDate: "",
    }));
    setFormError([]);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError([]);

    // [FETCH]
    // Here you would typically send the data to your backend

    let dataAreOk = controlFields([
      {
        value: formData.studyBranch,
        message: "Le choix de mention est obligatoire.",
      },
      {
        value: formData.preregistrationDate,
        message: "La date de préinscription est requise.",
      },
      {
        value: formData.paymentReference,
        message: "La référence de paiement est requise.",
      },
      {
        value: formData.paymentAgence,
        message: "L'agence de paiement est requise.",
      },
      {
        value: formData.paymentDate,
        message: "La date de paiement est requise.",
      },
    ]);
    // logIfDev("log", "Formulaire Soumis:", formData);
    if (dataAreOk) {
      setTimeout(() => {}, 2000);
      setFormData(initialFormData);
      setStep(1);
    }
    // router.push("/preregistrations");
  };

  return (
    <div className="flex h-full flex-col">
      <PageHeader
        title="Nouvelle Préinscription"
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

          <form ref={formRef} onSubmit={handleSubmit}>
            <Card className="p-6">
              {step === 1 && (
                <>
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
                            setFormData({
                              ...formData,
                              bacYear: e.target.value,
                            })
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

                    <div className="flex justify-end pt-4 gap-2">
                      <Button
                        type="reset"
                        variant="outline"
                        onClick={resetForm}
                      >
                        <Eraser className="ml-2 h-4 w-4" />
                        Réinitialiser
                      </Button>
                      <Button type="button" onClick={handleNext}>
                        Suivant
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </>
                // </Card>
              )}

              {step === 2 && (
                // <Card className="p-6">
                <>
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
                            <SelectItem
                              key={branch.idPortail}
                              value={branch.idPortail.toString()}
                            >
                              {branch.nomPortail} ({branch.abbreviation})
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
                      <div className="flex flex-row gap-2">
                        <Button
                          type="reset"
                          variant="outline"
                          onClick={resetStep2}
                        >
                          <Eraser className="ml-2 h-4 w-4" />
                          Effacer
                        </Button>
                        <Button type="submit">
                          Soumettre la Préinscription
                        </Button>
                      </div>
                    </div>
                  </div>
                </>
              )}
              {formError.length != 0 && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    <ul className="list-circle">
                      {formError.map((message) => (
                        <li>{message}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}
            </Card>
          </form>
        </div>
      </div>
    </div>
  );
}
