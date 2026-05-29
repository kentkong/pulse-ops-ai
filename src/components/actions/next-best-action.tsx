import {
  ArrowUpRight,
  Headphones,
  Heart,
  MessageSquare,
  TrendingUp,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import type { NextBestAction } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const typeConfig = {
  escalate: { icon: AlertCircle, color: "text-destructive", bg: "bg-destructive/10" },
  nurture: { icon: Heart, color: "text-warning", bg: "bg-warning/10" },
  outreach: { icon: MessageSquare, color: "text-info", bg: "bg-info/10" },
  upsell: { icon: TrendingUp, color: "text-success", bg: "bg-success/10" },
  support: { icon: Headphones, color: "text-primary", bg: "bg-primary/10" },
};

const priorityVariant = {
  high: "destructive" as const,
  medium: "warning" as const,
  low: "secondary" as const,
};

export function NextBestActionPanel({ actions }: { actions: NextBestAction[] }) {
  return (
    <Card className="glass-card">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          <CardTitle className="text-sm">Next Best Actions</CardTitle>
        </div>
        <p className="text-[10px] text-muted-foreground">AI-prioritized operational recommendations</p>
      </CardHeader>
      <CardContent className="space-y-2">
        {actions.map((action, index) => {
          const config = typeConfig[action.type];
          const Icon = config.icon;

          return (
            <div
              key={action.id}
              className="group rounded-xl border border-border/50 bg-accent/20 p-3 transition-all hover:border-primary/30 hover:bg-accent/40 hover:shadow-md hover:shadow-primary/5"
            >
              <div className="flex items-start gap-3">
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${config.bg}`}>
                  <Icon className={`h-3.5 w-3.5 ${config.color}`} />
                </div>
                <div className="min-w-0 flex-1 space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium">{action.title}</p>
                    <Badge variant={priorityVariant[action.priority]} className="shrink-0 text-[10px]">
                      #{index + 1}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{action.description}</p>
                  {action.customerName && (
                    <p className="text-xs text-muted-foreground">
                      Account: <span className="font-medium text-foreground">{action.customerName}</span>
                    </p>
                  )}
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs font-medium text-primary">{action.estimatedImpact}</span>
                    <Button variant="ghost" size="sm" className="h-7 text-xs opacity-0 transition-opacity group-hover:opacity-100">
                      Execute
                      <ArrowUpRight className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
