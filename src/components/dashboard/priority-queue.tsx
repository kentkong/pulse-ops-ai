import { cn, formatCurrency } from "@/lib/utils";
import type { PriorityAccount } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowUpRight, AlertTriangle } from "lucide-react";

const urgencyVariant = {
  critical: "destructive" as const,
  high: "warning" as const,
  medium: "info" as const,
};

const healthVariant = {
  healthy: "success" as const,
  watch: "warning" as const,
  at_risk: "destructive" as const,
  critical: "destructive" as const,
};

export function PriorityQueue({ accounts }: { accounts: PriorityAccount[] }) {
  return (
    <Card className="glass-card scroll-mt-24" id="section-priority">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Top Priority Accounts</CardTitle>
          <p className="mt-1 text-xs text-muted-foreground">
            The next accounts queued for intervention — ranked by urgency, health, and revenue impact
          </p>
        </div>
        <Link
          href="/lifecycle"
          className="flex items-center gap-1 text-xs text-primary hover:underline"
        >
          View all
          <ArrowUpRight className="h-3 w-3" />
        </Link>
      </CardHeader>
      <CardContent className="space-y-2">
        {accounts.map((account, index) => (
          <div
            key={account.id}
            className={cn(
              "flex items-start gap-3 rounded-xl border border-border/50 p-3 transition-colors hover:border-primary/30 hover:bg-accent/20",
              account.urgency === "critical" && "border-destructive/20 bg-destructive/5"
            )}
          >
            <div
              className={cn(
                "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold",
                account.urgency === "critical"
                  ? "bg-destructive/15 text-destructive"
                  : "bg-primary/10 text-primary"
              )}
            >
              {index + 1}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-medium">{account.company}</p>
                <Badge variant={urgencyVariant[account.urgency]} className="text-[10px]">
                  {account.urgency}
                </Badge>
                {account.urgency === "critical" && (
                  <AlertTriangle className="h-3.5 w-3.5 text-destructive" />
                )}
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground">{account.reason}</p>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-[10px] text-muted-foreground">
                <span>{account.owner}</span>
                <span>·</span>
                <span>{formatCurrency(account.mrr)} MRR</span>
                <span>·</span>
                <Badge variant={healthVariant[account.healthStatus]} className="text-[9px]">
                  Health {account.healthScore}
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
