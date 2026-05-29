"use client";

import { cn } from "@/lib/utils";
import type { Customer, LifecycleStage } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Zap, TrendingUp, Rocket, RefreshCw, AlertTriangle } from "lucide-react";

const stages: {
  id: LifecycleStage;
  label: string;
  icon: typeof Users;
  description: string;
  color: string;
}[] = [
  { id: "onboarding", label: "Onboarding", icon: Users, description: "Setup & first value", color: "border-info/30 bg-info/5" },
  { id: "activation", label: "Activation", icon: Zap, description: "Core feature adoption", color: "border-primary/30 bg-primary/5" },
  { id: "adoption", label: "Adoption", icon: TrendingUp, description: "Deep product usage", color: "border-success/30 bg-success/5" },
  { id: "expansion", label: "Expansion", icon: Rocket, description: "Upsell & growth", color: "border-violet-500/30 bg-violet-500/5" },
  { id: "renewal", label: "Renewal", icon: RefreshCw, description: "Contract renewal", color: "border-warning/30 bg-warning/5" },
  { id: "at_risk", label: "At Risk", icon: AlertTriangle, description: "Churn intervention", color: "border-destructive/30 bg-destructive/5" },
];

export function LifecycleJourneyMap({ customers }: { customers: Customer[] }) {
  return (
    <Card className="glass-card overflow-hidden">
      <CardHeader>
        <CardTitle>Lifecycle Journey Map</CardTitle>
        <p className="text-xs text-muted-foreground">
          Customer progression across operational stages with health distribution
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-6">
          {stages.map((stage, index) => {
            const stageCustomers = customers.filter((c) => c.stage === stage.id);
            const avgHealth =
              stageCustomers.length > 0
                ? Math.round(stageCustomers.reduce((s, c) => s + c.healthScore, 0) / stageCustomers.length)
                : 0;
            const Icon = stage.icon;

            return (
              <div key={stage.id} className="relative">
                <div
                  className={cn(
                    "rounded-xl border p-4 transition-all hover:scale-[1.02] hover:shadow-lg",
                    stage.color
                  )}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-foreground/70" />
                    <span className="text-xs font-semibold">{stage.label}</span>
                  </div>
                  <p className="mt-3 text-2xl font-bold">{stageCustomers.length}</p>
                  <p className="text-[10px] text-muted-foreground">accounts</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-[10px] text-muted-foreground">Avg health</span>
                    <span
                      className={cn(
                        "text-xs font-semibold",
                        avgHealth >= 70 ? "text-success" : avgHealth >= 50 ? "text-warning" : "text-destructive"
                      )}
                    >
                      {avgHealth}
                    </span>
                  </div>
                  <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-background/50">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all",
                        avgHealth >= 70 ? "bg-success" : avgHealth >= 50 ? "bg-warning" : "bg-destructive"
                      )}
                      style={{ width: `${avgHealth}%` }}
                    />
                  </div>
                  <p className="mt-2 text-[10px] text-muted-foreground">{stage.description}</p>
                </div>
                {index < stages.length - 1 && (
                  <div className="absolute -right-1.5 top-1/2 z-10 hidden h-3 w-3 -translate-y-1/2 rotate-45 border-r border-t border-border bg-card lg:block" />
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-6 rounded-xl border border-border/50 bg-accent/20 p-4">
          <p className="text-xs font-medium">Intelligence Correlation</p>
          <div className="mt-3 grid gap-3 text-[10px] text-muted-foreground md:grid-cols-3">
            <div className="rounded-lg bg-background/50 p-3">
              <span className="font-medium text-blue-400">Snowflake</span>
              <p className="mt-1">Usage events, feature adoption, subscription changes</p>
            </div>
            <div className="rounded-lg bg-background/50 p-3">
              <span className="font-medium text-violet-400">Hightouch</span>
              <p className="mt-1">Engagement scores, churn-risk segments, lifecycle sync</p>
            </div>
            <div className="rounded-lg bg-background/50 p-3">
              <span className="font-medium text-pink-400">Braze</span>
              <p className="mt-1">Campaign responses, journey completion, message engagement</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function HealthHeatmap({ customers }: { customers: Customer[] }) {
  const sorted = [...customers].sort((a, b) => a.healthScore - b.healthScore);

  return (
    <Card className="glass-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm">Account Health Heatmap</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {sorted.map((customer) => (
            <div key={customer.id} className="flex items-center gap-3">
              <span className="w-32 truncate text-xs text-muted-foreground">{customer.company}</span>
              <div className="flex-1">
                <div className="h-6 overflow-hidden rounded-md bg-secondary">
                  <div
                    className={cn(
                      "flex h-full items-center justify-end rounded-md px-2 text-[10px] font-medium text-white transition-all",
                      customer.healthScore >= 80
                        ? "bg-success"
                        : customer.healthScore >= 60
                          ? "bg-warning"
                          : customer.healthScore >= 40
                            ? "bg-orange-500"
                            : "bg-destructive"
                    )}
                    style={{ width: `${Math.max(customer.healthScore, 15)}%` }}
                  >
                    {customer.healthScore}
                  </div>
                </div>
              </div>
              <Badge
                variant={
                  customer.healthStatus === "healthy"
                    ? "success"
                    : customer.healthStatus === "watch"
                      ? "warning"
                      : "destructive"
                }
                className="w-16 justify-center text-[9px]"
              >
                {customer.healthStatus}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
