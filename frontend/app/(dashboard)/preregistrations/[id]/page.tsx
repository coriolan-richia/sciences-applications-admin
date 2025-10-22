"use client";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { use, useState, useEffect } from "react";
import {
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  CreditCard,
  Building2,
  GraduationCap,
  BookOpen,
} from "lucide-react";
import Link from "next/link";
import {
  getPreregistrationStatusLabel as getStatusLabel,
  Preregistration,
} from "@/types/preregistration";
import { API } from "@/lib/api";

export default function PreregistrationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [preregistration, setPreregistration] = useState<
    Preregistration | undefined
  >(undefined);
  const { id } = use(params);

  const fetchUrl = `${API.preinscription}/get-one-preinscription`;

  const getUser = async () => {
    try {
      const response = await fetch(fetchUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          preregistrationId: id,
        }),
      });

      if (!response.ok) {
        console.error("Erreur : ", await response.json());
        return;
      }
      const data = await response.json();

      setPreregistration(data as Preregistration);
    } catch (error) {
      console.error("Erreur de connexion : ", error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  // const prereg = mockPreregistrations.find((p) => p.id === id);

  // if (!preregistration) {
  //   notFound();
  // }

  const statusColors = {
    verified: "bg-green-500/10 text-green-500 border-green-500/20",
    pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    rejected: "bg-red-500/10 text-red-500 border-red-500/20",
  };

  return (
    <div className="flex h-full flex-col">
      <PageHeader
        title="Détails de Préinscription"
        description={`Numéro au bac: ${preregistration?.bacNumber}`}
        action={
          <Link href="/preregistrations">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour à la Liste
            </Button>
          </Link>
        }
      />

      <div className="flex-1 overflow-y-auto p-8">
        <div className="mx-auto max-w-4xl space-y-6">
          {/* Status Badge */}
          <div className="flex items-center gap-3">
            <Badge
              className={statusColors[preregistration?.status ?? "pending"]}
              // variant="outline"
            >
              {getStatusLabel(preregistration?.status ?? "pending")}
            </Badge>
          </div>

          {/* Student Information */}
          <Card className="p-6">
            <h2 className="mb-4 text-lg font-semibold text-foreground">
              Informations sur l'étudiant
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Email</p>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <p className="font-medium text-foreground">
                    {preregistration?.email}
                  </p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Téléphone</p>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <p className="font-medium text-foreground">
                    {preregistration?.phone}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Academic Information */}
          <Card className="p-6">
            <h2 className="mb-4 text-lg font-semibold text-foreground">
              Informations du Bac
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Numéro au Bac</p>
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                  <p className="font-mono font-medium text-foreground">
                    {preregistration?.bacNumber}
                  </p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Année du Bac</p>
                <p className="font-medium text-foreground">
                  {preregistration?.bacYear}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Série du Bac</p>
                <p className="font-medium text-foreground">
                  {preregistration?.bacOption}
                </p>
              </div>
            </div>
          </Card>

          {/* Preregistration Information */}
          <Card className="p-6">
            <h2 className="mb-4 text-lg font-semibold text-foreground">
              Informations sur l'Inscription
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Mention Choisie</p>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <p className="font-medium text-foreground">
                    {preregistration?.studyBranch}
                  </p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">
                  Date de Préinscription
                </p>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <p className="font-medium text-foreground">
                    {new Date(
                      preregistration?.preregistrationDate ?? ""
                    ).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Payment Information */}
          <Card className="p-6">
            <h2 className="mb-4 text-lg font-semibold text-foreground">
              Informations de Paiement
            </h2>
            {preregistration?.paymentDate ? (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">
                    Date de Paiement
                  </p>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <p className="font-medium text-foreground">
                      {new Date(
                        preregistration?.paymentDate
                      ).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">
                    Référence de Paiement
                  </p>
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                    <p className="font-mono font-medium text-foreground">
                      {preregistration?.paymentReference}
                    </p>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">
                    Agence de Paiement
                  </p>
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <p className="font-medium text-foreground">
                      {preregistration?.paymentAgence}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Aucune Information de Paiement Disponible
              </p>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
