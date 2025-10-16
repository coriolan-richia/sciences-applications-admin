"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Search, FileSpreadsheet, ArrowUpDown } from "lucide-react";
import { PaymentUploadCard } from "@/components/payments/payment-upload-card";
import { PaymentListItem } from "@/components/payments/payment-list-item";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  type Payment,
  PaymentUpload,
  getPaymentMatchedLabel as getMatchedLabel,
} from "@/types/payment";
import { API } from "@/lib/api";
import { Card } from "@/components/ui/card";

export default function PaymentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<string>("date-desc");
  const [paymentList, setPaymentList] = useState<Payment[]>([]);
  const [historyList, setHistoryList] = useState<PaymentUpload[]>([]);
  const listAllUrl = `${API.payment}/list-all`;

  const listHitoryUrl = `${API.payment}/list-history`;
  // [FETCH]
  const mapPayment = (entry: any): Payment => ({
    ...entry,
    label: entry.libelle,
    value: entry.valeur,
    amount: entry.debitCredit,
  });

  const loadPaymentList = async () => {
    try {
      const response = await fetch(listAllUrl, { method: "POST" });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status} ${response.statusText}`);
      }
      const list = await response.json();

      setPaymentList(list.map(mapPayment));
    } catch (err) {
      console.error("Failed to fetch payments:", err);
    }
  };

  const loadUploadList = async () => {
    try {
      const response = await fetch(listHitoryUrl, { method: "POST" });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status} ${response.statusText}`);
      }
      const list = await response.json();

      setHistoryList(list);
    } catch (err) {
      console.error("Failed to fetch upload history:", err);
    }
  };

  useEffect(() => {
    loadPaymentList();
    loadUploadList();
  }, []);

  const filteredPayments = paymentList.filter(
    (p) =>
      p.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.value?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.label?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedPayments = [...filteredPayments].sort((a, b) => {
    switch (sortBy) {
      case "date-desc":
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case "date-asc":
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case "amount-desc":
        return b.amount - a.amount;
      case "amount-asc":
        return a.amount - b.amount;
      case "status-matched":
        return a.matched ? -1 : 1;
      case "status-unmatched":
        return !a.matched ? -1 : 1;
      default:
        return 0;
    }
  });

  return (
    <div className="flex h-full flex-col">
      <PageHeader
        title="Paiements"
        description="Gestion des données de paiements et des relevés"
        action={
          <Link href="/payments/upload">
            <Button>
              <Upload className="mr-2 h-4 w-4" />
              Importer un Relevé
            </Button>
          </Link>
        }
      />

      <div className="flex-1 overflow-y-auto">
        <div className="p-8">
          <Tabs defaultValue="payments" className="space-y-6">
            <TabsList>
              <TabsTrigger value="payments">Relevés de Paiement</TabsTrigger>
              <TabsTrigger value="uploads">
                Historique d'Importation
              </TabsTrigger>
            </TabsList>

            <TabsContent value="payments" className="space-y-6">
              {/* Search and Sort */}
              <div className="flex items-center gap-3">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher par référence, agence, numéro au bac..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                {/* Sort dropdown */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <ArrowUpDown className="mr-2 h-4 w-4" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date-desc">Date (Récente)</SelectItem>
                    <SelectItem value="date-asc">Date (Ancienne)</SelectItem>
                    <SelectItem value="amount-desc">
                      Montant (Décroissante)
                    </SelectItem>
                    <SelectItem value="amount-asc">
                      Montant (Croissante)
                    </SelectItem>
                    <SelectItem value="status-matched">
                      {getMatchedLabel(true)} en Premier
                    </SelectItem>
                    <SelectItem value="status-unmatched">
                      {getMatchedLabel(false)} en Premier
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="rounded-lg border border-border bg-card p-4">
                  <p className="text-sm text-muted-foreground">
                    Nombre Total de Paiements
                  </p>
                  <p className="text-2xl font-semibold text-foreground">
                    {sortedPayments.length}
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-card p-4">
                  <p className="text-sm text-muted-foreground">
                    {getMatchedLabel(true)}
                  </p>
                  <p className="text-2xl font-semibold text-green-500">
                    {sortedPayments.filter((p) => p.matched).length}
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-card p-4">
                  <p className="text-sm text-muted-foreground">
                    {getMatchedLabel(false)}
                  </p>
                  <p className="text-2xl font-semibold text-yellow-500">
                    {sortedPayments.filter((p) => !p.matched).length}
                  </p>
                </div>
              </div>

              {/* Payment List */}
              <div className="rounded-lg border border-border bg-card">
                <div className="flex items-center gap-4 border-b border-border bg-secondary/30 px-6 py-3 text-xs font-medium text-muted-foreground">
                  <div className="w-32">Reéférence</div>
                  <div className="w-32">Date</div>
                  <div className="w-32">Montant</div>
                  <div className="flex-1">Libellé</div>
                  <div className="w-32">Valeur?</div>
                  <div className="w-24">Statut</div>
                </div>
                {sortedPayments.length == 0 ? (
                  <div className="flex items-center gap-4 border-b border-border px-6 py-4">
                    <div className="flex-1 text-center text-sm text-muted-foreground">
                      Aucun enregistrement
                    </div>
                  </div>
                ) : (
                  sortedPayments.map((payment) => (
                    <PaymentListItem key={payment.id} payment={payment} />
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="uploads" className="space-y-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FileSpreadsheet className="h-4 w-4" />
                <span>{historyList.length} fichiers importés</span>
              </div>

              {historyList.length != 0 ? (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {historyList.map((upload) => (
                    <PaymentUploadCard key={upload.id} upload={upload} />
                  ))}
                </div>
              ) : (
                <Card className="flex items-center p-5">
                  <div className="flex-1 text-center text-sm text-muted-foreground">
                    Aucune importation de relevés enregistrée.
                  </div>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
