import {
  type Preregistration,
  getPreregistrationStatusLabel as getStatusLabel,
} from "@/types/preregistration";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { cn, parseFrDate } from "@/lib/utils";

interface PreregistrationListItemProps {
  preregistration: Preregistration;
}

export function PreregistrationListItem({
  preregistration,
}: PreregistrationListItemProps) {
  const statusColors = {
    verified: "bg-green-500/10 text-green-500 border-green-500/20",
    pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    rejected: "bg-red-500/10 text-red-500 border-red-500/20",
  };

  return (
    <Link href={`/preregistrations/${preregistration.id}`}>
      <div className="flex items-center gap-4 border-b border-border px-6 py-4 transition-colors hover:bg-secondary/50">
        <div className="w-32 font-mono text-sm font-medium text-foreground">
          {preregistration.bacNumber}
        </div>
        <div className="w-20 text-sm text-muted-foreground">
          {preregistration.bacYear}
        </div>
        <div className="w-48 text-sm text-muted-foreground">
          {preregistration.bacOption}
        </div>
        <div className="flex-1 text-sm text-muted-foreground">
          {preregistration.studyBranch}
        </div>
        <div className="w-32 text-sm text-muted-foreground">
          {new Date(
            parseFrDate(preregistration.preregistrationDate)
          ).toLocaleDateString()}
        </div>
        <Badge
          className={cn(
            "w-20 justify-center",
            statusColors[preregistration.status]
          )}
        >
          {getStatusLabel(preregistration.status)}
        </Badge>
      </div>
    </Link>
  );
}
