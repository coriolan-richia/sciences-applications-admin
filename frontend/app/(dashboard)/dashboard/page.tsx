import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, CreditCard, Users, ClipboardCheck } from "lucide-react";
import { PageHeader } from "@/components/page-header";

export default function DashboardPage() {
  const stats = [
    {
      title: "Préinscriptions",
      value: "1,234",
      description: "Total des candidatures",
      icon: FileText,
      color: "text-chart-1",
    },
    {
      title: "Paiements",
      value: "856",
      description: "Paiements validés",
      icon: CreditCard,
      color: "text-chart-2",
    },
    {
      title: "Utilisateurs",
      value: "42",
      description: "Administrateurs actifs",
      icon: Users,
      color: "text-chart-3",
    },
    {
      title: "Présélection",
      value: "8",
      description: "Parcours configurés",
      icon: ClipboardCheck,
      color: "text-chart-4",
    },
  ];

  return (
    <div className="flex h-full flex-col">
      <PageHeader
        title={"Gestion des Candidatures - Tableau de bord"}
        description={"Vue d'ensemble de la gestion des préinscriptions"}
      />

      <div className="p-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className={cn("h-5 w-5", stat.color)} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">
                  {stat.value}
                </div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
