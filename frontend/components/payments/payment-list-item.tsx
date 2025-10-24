import {
  type Payment,
  getPaymentMatchedLabel as getMatchedLabel,
} from "@/types/payment";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface PaymentListItemProps {
  payment: Payment;
}

export function PaymentListItem({ payment }: PaymentListItemProps) {
  const statusColors = {
    true: "bg-green-500/10 text-green-500 border-green-500/20",
    false: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  };

  return (
    <div className="flex items-center gap-4 border-b border-border px-6 py-4 transition-colors hover:bg-secondary/50">
      <div className="w-32 font-mono text-sm font-medium text-foreground">
        {payment.reference}
      </div>

      <div className="w-32 text-sm text-muted-foreground">{payment.date}</div>

      <div className="w-32 text-sm text-foreground">
        {payment.amount.toLocaleString()} Ar
      </div>

      <div className="flex-1 text-sm text-muted-foreground">
        {payment.label || "-"}
      </div>

      <div className="w-32 text-sm text-muted-foreground">{payment.value}</div>

      <Badge
        className={cn(
          "w-24 justify-center",
          statusColors[`${payment.matched}`]
        )}
      >
        {getMatchedLabel(payment.matched)}
      </Badge>
    </div>
  );
}
