import { AppShell } from "@/components/layout/sidebar";
import { PageSectionHeader } from "@/components/layout/page-section-header";
import { WorkflowCard, OrchestrationDiagram } from "@/components/workflows/orchestration-diagram";
import { StackFlowHorizontal } from "@/components/architecture/stack-diagram";
import { workflows } from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GitBranch, Play, Pause } from "lucide-react";

export default function WorkflowsPage() {
  const activeCount = workflows.filter((w) => w.status === "active").length;
  const pausedCount = workflows.filter((w) => w.status === "paused").length;
  const totalTriggers = workflows.reduce((sum, w) => sum + w.triggerCount, 0);
  const avgCompletion = Math.round(
    workflows.reduce((sum, w) => sum + w.completionRate, 0) / workflows.length
  );

  return (
    <AppShell>
      <PageSectionHeader
        title="Operational Orchestration"
        description="Pulse-Ops AI monitors workflow performance, detects bottlenecks, and recommends optimizations across the lifecycle pipeline."
        pills={[
          { label: `${activeCount} active`, accent: true },
          { label: `${pausedCount} paused` },
        ]}
        meta={`${avgCompletion}% avg completion`}
      >
        <div className="mt-4 opacity-90">
          <StackFlowHorizontal />
        </div>
      </PageSectionHeader>
      <div className="flex-1 overflow-y-auto space-y-6 p-8">
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="glass-card">
            <CardContent className="flex items-center gap-3 p-5">
              <Play className="h-5 w-5 text-success" />
              <div>
                <p className="text-2xl font-semibold">{activeCount}</p>
                <p className="text-xs text-muted-foreground">Active Workflows</p>
              </div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="flex items-center gap-3 p-5">
              <Pause className="h-5 w-5 text-warning" />
              <div>
                <p className="text-2xl font-semibold">{pausedCount}</p>
                <p className="text-xs text-muted-foreground">Paused</p>
              </div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="flex items-center gap-3 p-5">
              <GitBranch className="h-5 w-5 text-primary" />
              <div>
                <p className="text-2xl font-semibold">{totalTriggers.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Total Triggers</p>
              </div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-5">
              <p className="text-2xl font-semibold">{avgCompletion}%</p>
              <p className="text-xs text-muted-foreground">Avg Completion Rate</p>
            </CardContent>
          </Card>
        </div>

        <OrchestrationDiagram workflows={workflows} />

        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold">All Workflows</h2>
            <div className="flex gap-2">
              <Badge variant="success">{activeCount} active</Badge>
              <Badge variant="warning">{pausedCount} paused</Badge>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {workflows.map((workflow) => (
              <WorkflowCard key={workflow.id} workflow={workflow} />
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
