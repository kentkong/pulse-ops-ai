import { AppShell } from "@/components/layout/sidebar";
import { CriticalSignalBanner } from "@/components/dashboard/critical-signal-banner";
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
      <CriticalSignalBanner />
      <GlanceStatRow stats={todayAtAGlance} />
      <AIIntelligenceBand
        accounts={priorityAccounts}
        actions={nextBestActions}
        insights={aiInsights}
      />
      <div className="flex flex-col">
        <LifecycleOpsBoard columns={kanbanSnapshot} />
        <OpsSupportLayer
          inflowData={inflowResolvedWeekly}
          events={customerEvents}
        />
      </div>
    </AppShell>
  );
}
