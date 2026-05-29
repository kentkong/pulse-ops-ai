import { cn, formatPercent } from "@/lib/utils";
import type { HealthStatus, OperationalMetric } from "@/types";
import { ArrowDown, ArrowUp, Minus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkline } from "@/components/ui/sparkline";

const statusColors: Record<HealthStatus, string> = {
  healthy: "text-success",
  watch: "text-warning",
  at_risk: "text-destructive",
  critical: "text-destructive",
};

const sparklineData: Record<string, number[]> = {
  "Active Customers": [812, 820, 825, 831, 838, 842, 847],
  "Onboarding Health": [82, 81, 80, 79, 79, 78, 78],
  "Avg Health Score": [70, 71, 71, 72, 73, 73, 74],
  "At-Risk Accounts": [18, 19, 19, 20, 21, 22, 23],
  "Renewal Pipeline": [980, 1020, 1050, 1080, 1120, 1160, 1200],
  "SLA Compliance": [96, 96, 95, 95, 94, 94, 94],
};

const sparklineColors: Record<string, string> = {
  "Active Customers": "#22c55e",
  "Onboarding Health": "#f59e0b",
  "Avg Health Score": "#6366f1",
  "At-Risk Accounts": "#ef4444",
  "Renewal Pipeline": "#22c55e",
  "SLA Compliance": "#3b82f6",
};

export function MetricCard({ metric, index = 0 }: { metric: OperationalMetric; index?: number }) {
  const TrendIcon = metric.trend === "up" ? ArrowUp : metric.trend === "down" ? ArrowDown : Minus;
  const trendColor =
    metric.trend === "up"
      ? metric.status && metric.status !== "healthy"
        ? "text-destructive"
        : "text-success"
      : metric.trend === "down"
        ? metric.status && metric.status !== "healthy"
          ? "text-destructive"
          : "text-muted-foreground"
        : "text-muted-foreground";

  const sparkData = sparklineData[metric.label] ?? [50, 55, 52, 58, 60, 57, 62];
  const sparkColor = sparklineColors[metric.label] ?? "#6366f1";

  return (
    <Card
      className={cn(
        "glass-card animate-fade-up transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5",
        `stagger-${Math.min(index + 1, 6)}`
      )}
    >
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <p className="text-xs font-medium text-muted-foreground">{metric.label}</p>
          <Sparkline data={sparkData} color={sparkColor} height={28} />
        </div>
        <div className="mt-2 flex items-end justify-between">
          <p
            className={cn(
              "text-2xl font-semibold tracking-tight",
              metric.status && statusColors[metric.status]
            )}
          >
            {metric.value}
          </p>
          <div className={cn("flex items-center gap-0.5 text-xs font-medium", trendColor)}>
            <TrendIcon className="h-3 w-3" />
            {formatPercent(metric.change)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
