"use client";

import { Database, Layers, MessageSquare, Sparkles, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const layers = [
  {
    id: "snowflake",
    name: "Snowflake",
    role: "Data Warehouse",
    description: "Customer profiles, usage events, subscriptions, support interactions",
    icon: Database,
    color: "from-blue-500/20 to-blue-600/5",
    borderColor: "border-blue-500/30",
    iconColor: "text-blue-400",
    metrics: ["2.4M events/day", "847 accounts", "12ms latency"],
  },
  {
    id: "hightouch",
    name: "Hightouch",
    role: "Reverse ETL & Activation",
    description: "Audience segmentation, churn-risk scoring, lifecycle sync to engagement tools",
    icon: Layers,
    color: "from-violet-500/20 to-violet-600/5",
    borderColor: "border-violet-500/30",
    iconColor: "text-violet-400",
    metrics: ["34 active syncs", "156 segments", "340ms sync"],
  },
  {
    id: "braze",
    name: "Braze",
    role: "Engagement Platform",
    description: "Onboarding journeys, retention campaigns, triggered lifecycle messaging",
    icon: MessageSquare,
    color: "from-pink-500/20 to-pink-600/5",
    borderColor: "border-pink-500/30",
    iconColor: "text-pink-400",
    metrics: ["6 active canvases", "89ms delivery", "12K sends/day"],
  },
  {
    id: "pulseops",
    name: "PulseOps AI",
    role: "Intelligence Layer",
    description: "Operational visibility, AI insights, workflow prioritization, next-best-actions",
    icon: Sparkles,
    color: "from-indigo-500/20 to-indigo-600/5",
    borderColor: "border-indigo-500/30",
    iconColor: "text-indigo-400",
    metrics: ["5 active signals", "GPT-4o", "Real-time"],
    highlight: true,
  },
];

export function StackDiagram({ compact = false }: { compact?: boolean }) {
  return (
    <Card className={cn("glass-card overflow-hidden", compact && "border-primary/20")}>
      <CardHeader className={compact ? "pb-2" : undefined}>
        <div className="flex items-center justify-between">
          <CardTitle className={compact ? "text-sm" : undefined}>
            Warehouse-Native Architecture
          </CardTitle>
          <Badge variant="success" className="text-[10px]">All systems operational</Badge>
        </div>
        {!compact && (
          <p className="text-xs text-muted-foreground">
            Unified data flows from warehouse → activation → engagement → intelligence
          </p>
        )}
      </CardHeader>
      <CardContent className={compact ? "pt-0" : undefined}>
        <div className="relative space-y-0">
          {layers.map((layer, index) => {
            const Icon = layer.icon;
            return (
              <div key={layer.id} className="relative">
                <div
                  className={cn(
                    "relative rounded-xl border bg-gradient-to-br p-4 transition-all hover:scale-[1.01]",
                    layer.color,
                    layer.borderColor,
                    layer.highlight && "glow-primary ring-1 ring-primary/20"
                  )}
                >
                  <div className="flex items-start gap-4">
                    <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-background/50", layer.iconColor)}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-sm font-semibold">{layer.name}</h3>
                        <Badge variant="outline" className="text-[10px]">{layer.role}</Badge>
                      </div>
                      {!compact && (
                        <p className="mt-1 text-xs text-muted-foreground">{layer.description}</p>
                      )}
                      <div className="mt-2 flex flex-wrap gap-2">
                        {layer.metrics.map((m) => (
                          <span key={m} className="rounded-md bg-background/40 px-2 py-0.5 text-[10px] text-muted-foreground">
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                {index < layers.length - 1 && (
                  <div className="flex justify-center py-1">
                    <div className="flex flex-col items-center">
                      <div className="h-4 w-px bg-gradient-to-b from-border to-primary/50" />
                      <ArrowDown className="h-3 w-3 text-primary/60" />
                      <div className="h-4 w-px bg-gradient-to-b from-primary/50 to-border" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

export function StackFlowHorizontal() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4">
      {layers.map((layer, index) => {
        const Icon = layer.icon;
        return (
          <div key={layer.id} className="flex items-center gap-2 md:gap-4">
            <div
              className={cn(
                "flex flex-col items-center rounded-xl border bg-gradient-to-br px-4 py-3 text-center transition-all hover:border-primary/40",
                layer.color,
                layer.borderColor,
                layer.highlight && "ring-1 ring-primary/30"
              )}
            >
              <Icon className={cn("h-5 w-5", layer.iconColor)} />
              <p className="mt-1.5 text-xs font-semibold">{layer.name}</p>
              <p className="text-[10px] text-muted-foreground">{layer.role}</p>
            </div>
            {index < layers.length - 1 && (
              <svg width="24" height="12" className="hidden shrink-0 text-primary/40 md:block">
                <line x1="0" y1="6" x2="20" y2="6" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" className="flow-line" />
                <polygon points="20,3 24,6 20,9" fill="currentColor" />
              </svg>
            )}
          </div>
        );
      })}
    </div>
  );
}
