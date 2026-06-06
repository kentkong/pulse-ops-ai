import { AppShell } from "@/components/layout/sidebar";
import { PageSectionHeader } from "@/components/layout/page-section-header";
import { WorkflowCard, OrchestrationDiagram } from "@/components/workflows/orchestration-diagram";
import { workflows } from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GitBranch, Pause, Play } from "lucide-react";

export default function WorkflowsPage() {
  const activeCount = workflows.filter((w) => w.status === "active").length;
  const pausedCount = workflows.filter((w) => w.status === "paused").length;
  const totalTriggers = workflows.reduce((sum, w) => sum + w.triggerCount, 0);
  const avgCompletion = Math.round(
    workflows.reduce((sum, w) => sum + w.completionRate, 0) / workflows.length
  );
  const pausedWorkflow = workflows.find((w) => w.status === "paused");

  return (
    <AppShell>
      <PageSectionHeader
        title="Workflow Orchestration"
        description="Lifecycle automations triggered from Snowflake events, synced via Hightouch, and executed in Braze."
        pills={[
          { label: `${activeCount} active`, accent: true },
          { label: `${pausedCount} paused` },
          { label: `${avgCompletion}% avg completion` },
        ]}
      />
      <div className="flex-1 overflow-y-auto space-y-6 p-8">
        {pausedWorkflow && (
          <Card className="glass-card border-warning/25 bg-warning/5">
            <CardContent className="flex flex-wrap items-start justify-between gap-4 p-5">
              <div className="flex min-w-0 items-start gap-3">
                <Pause className="mt-0.5 h-5 w-5 shrink-0 text-warning" aria-hidden />
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-warning">
                    Paused workflow
                  </p>
                  <p className="mt-0.5 text-sm font-semibold">{pausedWorkflow.name}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {pausedWorkflow.pauseReason ?? "Awaiting operator review"}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {pausedWorkflow.dependencies.map((dep) => (
                      <Badge key={dep} variant="outline" className="text-[10px]">
                        {dep}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              {pausedWorkflow.aiRecommendation && (
                <p className="max-w-md text-xs text-muted-foreground">
                  {pausedWorkflow.aiRecommendation}
                </p>
              )}
            </CardContent>
          </Card>
        )}

        <div className="grid gap-4 md:grid-cols-3">
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
