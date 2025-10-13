import {
  type Preregistration,
  getPreregistrationStatusLabel as getStatusLabel,
} from "@/types/preregistration";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, GraduationCap, BookOpen } from "lucide-react";
import Link from "next/link";

interface PreregistrationCardProps {
  preregistration: Preregistration;
}

export function PreregistrationCard({
  preregistration,
}: PreregistrationCardProps) {
  const statusColors = {
    verified: "bg-green-500/10 text-green-500 border-green-500/20",
    pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    rejected: "bg-red-500/10 text-red-500 border-red-500/20",
  };

  return (
    <Link href={`/preregistrations/3#${preregistration.id}`}>
      <Card className="p-5 transition-all hover:border-primary/50 hover:shadow-md">
        <div className="flex items-start justify-between">
          <div className="space-y-3 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-foreground">
                {preregistration.bacNumber}
              </h3>
              <Badge className={statusColors[preregistration.status]}>
                {getStatusLabel(preregistration.status)}
              </Badge>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <GraduationCap className="h-4 w-4" />
                <span className="font-semibold">Série du Bac</span>
                <span>{preregistration.bacOption}</span>
                <span className="text-xs">({preregistration.bacYear})</span>
              </div>

              <div className="flex items-center gap-2 text-muted-foreground">
                <BookOpen className="h-4 w-4" />
                <span className="font-semibold">Mention Choisie</span>
                <span>{preregistration.studyBranch}</span>
              </div>

              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span className="font-semibold">Date du Dossier</span>
                <span>
                  {new Date(
                    preregistration.preregistrationDate
                  ).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
