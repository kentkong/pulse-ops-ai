"use client";

import { GitBranch, Play, Pause, ArrowRight, Database, Layers, MessageSquare, Sparkles } from "lucide-react";
import { cn, formatRelativeTime } from "@/lib/utils";
import type { Workflow } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const statusConfig = {
  active: { variant: "success" as const, icon: Play },
  paused: { variant: "warning" as const, icon: Pause },
  completed: { variant: "secondary" as const, icon: Play },
  pending: { variant: "info" as const, icon: Play },
};

export function WorkflowCard({ workflow }: { workflow: Workflow }) {
  const config = statusConfig[workflow.status];
  const StatusIcon = config.icon;

  return (
    <Card className={cn("glass-card transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5", workflow.status === "paused" && "opacity-80")}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-medium">{workflow.name}</h3>
              <Badge variant={config.variant} className="gap-1 text-[10px]">
                <StatusIcon className="h-2.5 w-2.5" />
                {workflow.status}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">{workflow.description}</p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
          <div className="rounded-lg bg-accent/50 py-2">
            <p className="text-lg font-semibold">{workflow.triggerCount.toLocaleString()}</p>
            <p className="text-[10px] text-muted-foreground">Triggers</p>
          </div>
          <div className="rounded-lg bg-accent/50 py-2">
            <p className="text-lg font-semibold">{workflow.completionRate}%</p>
            <p className="text-[10px] text-muted-foreground">Completion</p>
          </div>
          <div className="rounded-lg bg-accent/50 py-2">
            <p className="text-lg font-semibold">{workflow.avgDuration}</p>
            <p className="text-[10px] text-muted-foreground">Avg Duration</p>
          </div>
        </div>

        <div className="mt-3">
          <Progress value={workflow.completionRate} />
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {workflow.dependencies.map((dep) => (
            <Badge key={dep} variant="outline" className="text-[10px]">
              {dep}
            </Badge>
          ))}
        </div>

        {workflow.aiRecommendation && (
          <div className="mt-4 rounded-lg border border-primary/15 bg-primary/5 p-3">
            <div className="flex items-center gap-1.5 text-xs font-medium text-primary">
              <Sparkles className="h-3 w-3" />
              AI Recommendation
            </div>
            <p className="mt-1 text-xs text-muted-foreground">{workflow.aiRecommendation}</p>
          </div>
        )}

        <p className="mt-3 text-[10px] text-muted-foreground">
          Last triggered {formatRelativeTime(workflow.lastTriggered)}
        </p>
      </CardContent>
    </Card>
  );
}

export function OrchestrationDiagram({ workflows }: { workflows: Workflow[] }) {
  const lifecycleFlow = [
    { stage: "Trigger", icon: Database, tool: "Snowflake", desc: "Usage events, milestones" },
    { stage: "Segment", icon: Layers, tool: "Hightouch", desc: "Audience & score sync" },
    { stage: "Engage", icon: MessageSquare, tool: "Braze", desc: "Journey activation" },
    { stage: "Intelligence", icon: Sparkles, tool: "PulseOps", desc: "Monitor & optimize" },
  ];

  const activeWorkflows = workflows.filter((w) => w.status === "active");

  return (
    <Card className="glass-card overflow-hidden">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GitBranch className="h-4 w-4 text-primary" />
            <CardTitle>Orchestration Flow</CardTitle>
          </div>
          <Badge variant="success">{activeWorkflows.length} active workflows</Badge>
        </div>
        <p className="text-xs text-muted-foreground">
          End-to-end lifecycle automation from warehouse events to engagement delivery
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="relative rounded-xl border border-border/50 bg-accent/20 p-6">
          <div className="grid gap-4 md:grid-cols-4">
            {lifecycleFlow.map((node, index) => {
              const Icon = node.icon;
              return (
                <div key={node.stage} className="relative flex flex-col items-center text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/15 to-transparent shadow-lg shadow-primary/5">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <p className="mt-3 text-xs font-semibold">{node.stage}</p>
                  <p className="text-[10px] font-medium text-primary">{node.tool}</p>
                  <p className="mt-0.5 text-[10px] text-muted-foreground">{node.desc}</p>
                  {index < lifecycleFlow.length - 1 && (
                    <ArrowRight className="absolute -right-2 top-5 hidden h-4 w-4 text-primary/40 md:block" />
                  )}
                </div>
              );
            })}
          </div>
          <svg className="absolute inset-0 h-full w-full pointer-events-none opacity-30" preserveAspectRatio="none">
            <line x1="20%" y1="50%" x2="40%" y2="50%" stroke="#6366f1" strokeWidth="1" strokeDasharray="4 4" className="flow-line" />
            <line x1="45%" y1="50%" x2="65%" y2="50%" stroke="#6366f1" strokeWidth="1" strokeDasharray="4 4" className="flow-line" />
            <line x1="70%" y1="50%" x2="90%" y2="50%" stroke="#6366f1" strokeWidth="1" strokeDasharray="4 4" className="flow-line" />
          </svg>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">Active Workflow Triggers</p>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {activeWorkflows.slice(0, 6).map((wf) => (
              <div
                key={wf.id}
                className="flex items-center justify-between rounded-lg border border-border/50 bg-background/50 px-3 py-2"
              >
                <div className="min-w-0">
                  <p className="truncate text-xs font-medium">{wf.name}</p>
                  <p className="text-[10px] text-muted-foreground">{wf.triggerCount.toLocaleString()} triggers</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse-glow" />
                  <span className="text-[10px] font-mono text-success">{wf.completionRate}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
