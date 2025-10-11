import {
  type Payment,
  getPaymentStatusLabel as getStatusLabel,
} from "@/types/payment";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface PaymentListItemProps {
  payment: Payment;
}

export function PaymentListItem({ payment }: PaymentListItemProps) {
  const statusColors = {
    matched: "bg-green-500/10 text-green-500 border-green-500/20",
    unmatched: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  };

  return (
    <div className="flex items-center gap-4 border-b border-border px-6 py-4 transition-colors hover:bg-secondary/50">
      <div className="w-32 font-mono text-sm font-medium text-foreground">
        {payment.reference}
      </div>
      <div className="w-32 text-sm text-foreground">
        {payment.amount.toLocaleString()} MAD
      </div>
      <div className="w-32 text-sm text-muted-foreground">
        {new Date(payment.date).toLocaleDateString()}
      </div>
      <div className="w-48 text-sm text-muted-foreground">{payment.agence}</div>
      <div className="flex-1 text-sm text-muted-foreground">
        {payment.studentName || "-"}
      </div>
      <div className="w-32 font-mono text-sm text-muted-foreground">
        {payment.bacNumber || "-"}
      </div>
      <Badge
        className={cn("w-24 justify-center", statusColors[payment.status])}
      >
        {getStatusLabel(payment.status)}
      </Badge>
    </div>
  );
}
