import type { PaymentUpload } from "@/types/payment";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileSpreadsheet, Calendar, Hash } from "lucide-react";
import { getPaymentUploadStatusLabel as getStatusLabel } from "@/types/payment";
import { parseFrDate } from "@/lib/utils";
interface PaymentUploadCardProps {
  upload: PaymentUpload;
}

export function PaymentUploadCard({ upload }: PaymentUploadCardProps) {
  const statusColors = {
    true: "bg-green-500/10 text-green-500 border-green-500/20",
    // processing: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    false: "bg-red-500/10 text-red-500 border-red-500/20",
  };

  return (
    <Card className="p-5 transition-all hover:border-primary/50 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className="space-y-3 flex-1">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-foreground">{upload.filename}</h3>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>
                {new Date(parseFrDate(upload.uploadDate)).toLocaleString()}
              </span>
            </div>

            <div className="flex items-center gap-2 text-muted-foreground">
              <Hash className="h-4 w-4" />
              <span>{upload.recordCount} enregistrements</span>
            </div>
          </div>

          <Badge className={statusColors[`${upload.status}`]} variant="outline">
            {getStatusLabel(upload.status)}
          </Badge>
        </div>
      </div>
    </Card>
  );
}
