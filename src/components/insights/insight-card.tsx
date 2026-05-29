import { Sparkles, AlertTriangle, TrendingUp, Users, Clock, RefreshCw } from "lucide-react";
import { cn, formatRelativeTime } from "@/lib/utils";
import type { AIInsight } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const severityConfig = {
  info: { variant: "info" as const, icon: Sparkles },
  warning: { variant: "warning" as const, icon: AlertTriangle },
  critical: { variant: "destructive" as const, icon: AlertTriangle },
  opportunity: { variant: "success" as const, icon: TrendingUp },
};

const categoryIcons = {
  churn: AlertTriangle,
  onboarding: Users,
  engagement: TrendingUp,
  workload: Clock,
  renewal: RefreshCw,
  expansion: TrendingUp,
};

export function InsightCard({ insight }: { insight: AIInsight }) {
  const config = severityConfig[insight.severity];
  const CategoryIcon = categoryIcons[insight.category];

  return (
    <Card
      className={cn(
        "glass-card transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5",
        insight.severity === "critical" && "border-destructive/20"
      )}
    >
      <CardContent className="p-5">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/10">
            <CategoryIcon className="h-4 w-4 text-primary" />
          </div>
          <div className="min-w-0 flex-1 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-sm font-medium">{insight.title}</h3>
              <Badge variant={config.variant}>{insight.severity}</Badge>
              <Badge variant="outline" className="text-[10px] capitalize">{insight.category}</Badge>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">{insight.summary}</p>

            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground">AI Confidence</span>
              <div className="flex flex-1 items-center gap-2">
                <Progress value={insight.confidence} className="h-1.5" />
                <span className="text-xs font-mono font-medium text-primary">{insight.confidence}%</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              <span>{insight.affectedCustomers} customers affected</span>
              <span>·</span>
              <span>{formatRelativeTime(insight.createdAt)}</span>
            </div>

            <div className="rounded-lg border border-primary/10 bg-primary/5 px-3 py-2.5">
              <p className="text-xs font-medium text-primary">Recommended Action</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{insight.recommendedAction}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function InsightSummary({ insights }: { insights: AIInsight[] }) {
  const critical = insights.filter((i) => i.severity === "critical").length;
  const opportunities = insights.filter((i) => i.severity === "opportunity").length;

  return (
    <Card className="gradient-border">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          <CardTitle>AI Operational Summary</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
        <p>
          PulseOps detected <span className="font-medium text-foreground">{insights.length} operational signals</span> in
          the last 24 hours. {critical > 0 && (
            <><span className="font-medium text-destructive">{critical} critical</span> requiring immediate attention. </>
          )}
          {opportunities > 0 && (
            <><span className="font-medium text-success">{opportunities} expansion opportunities</span> identified. </>
          )}
        </p>
        <p>
          Primary concern: onboarding completion rate dropped 2.1% with a bottleneck at the integration step.
          Churn risk elevated in mid-market segment — recommend activating retention playbook for 8 accounts.
        </p>
      </CardContent>
    </Card>
  );
}
