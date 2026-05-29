import { cn } from "@/lib/utils";
import type { HealthStatus, SLARisk } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const statusVariant: Record<HealthStatus, "success" | "warning" | "destructive"> = {
  healthy: "success",
  watch: "warning",
  at_risk: "destructive",
  critical: "destructive",
};

export function SLAPanel({ risks }: { risks: SLARisk[] }) {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>SLA Risk Indicators</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {risks.map((risk) => {
          const pct = risk.unit === "%" ? risk.current : (risk.current / risk.threshold) * 100;
          const isInverted = risk.unit !== "%" && risk.label.includes("Time");
          const progressValue = isInverted
            ? Math.max(0, 100 - (risk.current / risk.threshold) * 100)
            : Math.min(100, pct);

          return (
            <div key={risk.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">{risk.label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">
                    {risk.current}
                    {risk.unit}
                  </span>
                  <Badge variant={statusVariant[risk.status]} className="text-[10px]">
                    {risk.status.replace("_", " ")}
                  </Badge>
                </div>
              </div>
              <Progress
                value={progressValue}
                className={cn(
                  risk.status === "healthy" && "[&>div]:bg-success",
                  risk.status === "watch" && "[&>div]:bg-warning",
                  (risk.status === "at_risk" || risk.status === "critical") && "[&>div]:bg-destructive"
                )}
              />
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
