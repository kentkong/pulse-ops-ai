import { AppShell } from "@/components/layout/sidebar";
import { GlanceStatRow } from "@/components/dashboard/glance-stat-row";
import { LifecycleOpsBoard } from "@/components/dashboard/lifecycle-ops-board";
import { AIIntelligenceBand } from "@/components/dashboard/ai-intelligence-rail";
import { OpsSupportLayer } from "@/components/dashboard/ops-support-layer";
import {
  aiInsights,
  customerEvents,
  inflowResolvedWeekly,
  kanbanSnapshot,
  nextBestActions,
  priorityAccounts,
  todayAtAGlance,
} from "@/lib/mock-data";

export default function OperationsDashboard() {
  return (
    <AppShell>
      <GlanceStatRow stats={todayAtAGlance} />
      <AIIntelligenceBand
        accounts={priorityAccounts}
        actions={nextBestActions}
        insights={aiInsights}
      />
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <LifecycleOpsBoard columns={kanbanSnapshot} />
        <OpsSupportLayer
          inflowData={inflowResolvedWeekly}
          events={customerEvents}
        />
      </div>
    </AppShell>
  );
}
