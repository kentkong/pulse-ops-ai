import { AppShell } from "@/components/layout/sidebar";
import { PageSectionHeader } from "@/components/layout/page-section-header";
import { LifecycleJourneyMap, HealthHeatmap } from "@/components/lifecycle/journey-map";
import { LifecycleStageCards, CustomerTable } from "@/components/lifecycle/customer-table";
import { FunnelChart, EngagementChart } from "@/components/dashboard/charts";
import { customers, engagementTrend, onboardingFunnel } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

export default function LifecyclePage() {
  const totalMrr = customers.reduce((sum, c) => sum + c.mrr, 0);
  const avgHealth = Math.round(customers.reduce((sum, c) => sum + c.healthScore, 0) / customers.length);
  const atRiskCount = customers.filter((c) => c.healthStatus === "at_risk" || c.healthStatus === "critical").length;

  return (
    <AppShell>
      <PageSectionHeader
        title="Lifecycle Portfolio"
        description="Customer health, stage progression, and portfolio metrics across the full lifecycle pipeline."
        pills={[
          { label: "847 accounts" },
          { label: `${atRiskCount} at risk`, accent: true },
          { label: `${formatCurrency(totalMrr)} MRR` },
          { label: `avg health ${avgHealth}` },
        ]}
      />
      <div className="flex-1 overflow-y-auto space-y-6 p-8">
        <LifecycleJourneyMap customers={customers} />

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <LifecycleStageCards customers={customers} />
            <div className="grid gap-6 md:grid-cols-2">
              <FunnelChart data={onboardingFunnel} />
              <EngagementChart data={engagementTrend} />
            </div>
          </div>
          <HealthHeatmap customers={customers} />
        </div>

        <CustomerTable customers={customers} />
      </div>
    </AppShell>
  );
}
