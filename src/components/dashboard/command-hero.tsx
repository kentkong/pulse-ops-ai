"use client";

import { Activity, ArrowRight, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const pipelineSteps = [
  { id: "ingest", label: "Event Ingestion", source: "Snowflake", count: "2.4M/day", status: "healthy" as const },
  { id: "segment", label: "Audience Sync", source: "Hightouch", count: "34 syncs", status: "healthy" as const },
  { id: "engage", label: "Engagement", source: "Braze", count: "12K sends", status: "healthy" as const },
  { id: "analyze", label: "AI Analysis", source: "PulseOps", count: "5 signals", status: "active" as const },
  { id: "action", label: "Orchestration", source: "Workflows", count: "5 queued", status: "active" as const },
];

export function CommandHero() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card to-violet-500/5 p-6 md:p-8">
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-violet-500/10 blur-2xl" />

      <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20">
              <Zap className="h-4 w-4 text-primary" />
            </div>
            <Badge variant="default" className="text-[10px]">Operational Command Center</Badge>
          </div>
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            <span className="text-gradient">Lifecycle operations,</span>
            <br />
            <span className="text-gradient-primary">orchestrated by AI</span>
          </h2>
          <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
            Unifying customer intelligence from Snowflake, activation via Hightouch,
            and engagement through Braze into a single operational intelligence layer.
          </p>
        </div>

        <div className="flex shrink-0 flex-col gap-3 rounded-xl border border-border/50 bg-background/50 p-4 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Activity className="h-3.5 w-3.5 text-success animate-pulse-glow" />
            System Status
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-2xl font-semibold text-success">847</p>
              <p className="text-[10px] text-muted-foreground">Active accounts</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-primary">5</p>
              <p className="text-[10px] text-muted-foreground">AI signals</p>
            </div>
            <div>
              <p className="text-2xl font-semibold">94%</p>
              <p className="text-[10px] text-muted-foreground">SLA compliance</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-warning">23</p>
              <p className="text-[10px] text-muted-foreground">At-risk</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function OrchestrationPanel() {
  return (
    <Card className="glass-card">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm">Live Orchestration Pipeline</CardTitle>
          <Badge variant="success" className="gap-1 text-[10px]">
            <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse-glow" />
            Streaming
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-0">
          {pipelineSteps.map((step, index) => (
            <div key={step.id} className="flex flex-1 items-center">
              <div
                className={cn(
                  "flex-1 rounded-lg border p-3 transition-all hover:border-primary/30",
                  step.status === "active"
                    ? "border-primary/30 bg-primary/5"
                    : "border-border bg-accent/30"
                )}
              >
                <p className="text-xs font-medium">{step.label}</p>
                <p className="text-[10px] text-muted-foreground">{step.source}</p>
                <p className="mt-1 text-[10px] font-mono text-primary">{step.count}</p>
              </div>
              {index < pipelineSteps.length - 1 && (
                <ArrowRight className="mx-1 hidden h-4 w-4 shrink-0 text-muted-foreground md:block" />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
