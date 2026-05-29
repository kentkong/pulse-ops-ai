"use client";

import { lifecycleDistribution } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { AlertTriangle, ChevronRight } from "lucide-react";

const stageMeta: Record<string, { status: "healthy" | "watch" | "critical"; note?: string }> = {
  Onboarding: { status: "watch", note: "18% delay increase" },
  Activation: { status: "healthy" },
  Adoption: { status: "healthy" },
  Expansion: { status: "healthy", note: "12 upsell signals" },
  Renewal: { status: "watch", note: "3 due this month" },
  "At Risk": { status: "critical", note: "Needs intervention" },
};

const statusStyles = {
  healthy: "border-[#e0e0e0] bg-white",
  watch: "border-[#f1c40f] bg-[#fffdf5]",
  critical: "border-[#e74c3c] bg-[#fff5f5]",
};

const statusDot = {
  healthy: "bg-[#27ae60]",
  watch: "bg-[#f1c40f]",
  critical: "bg-[#e74c3c]",
};

export function LifecyclePipeline() {
  const total = lifecycleDistribution.reduce((s, d) => s + d.value, 0);
  const atRisk = lifecycleDistribution.find((d) => d.name === "At Risk")?.value ?? 0;

  return (
    <div id="section-lifecycle">
      <div className="mb-6">
        <p className="section-label">Customer Journey</p>
        <h2 className="mt-1 text-lg font-bold uppercase tracking-wide">
          Where your accounts sit today
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Pulse-Ops ingests lifecycle events from your data warehouse and engagement tools, then
          maps every account to a stage so ops knows where friction is building.
        </p>
      </div>

      <div className="mb-6 flex items-center gap-3 rounded-md border border-[#f1c40f]/30 bg-[#fffdf5] px-4 py-3">
        <AlertTriangle className="h-4 w-4 shrink-0 text-[#f1c40f]" />
        <p className="text-sm">
          <strong className="text-foreground">Bottleneck detected:</strong>{" "}
          <span className="text-muted-foreground">
            Onboarding completion slowed 18% — {atRisk} accounts now at risk across{" "}
            {total.toLocaleString()} in portfolio.
          </span>
        </p>
      </div>

      <div className="flex flex-wrap items-stretch gap-2 lg:flex-nowrap lg:gap-0">
        {lifecycleDistribution.map((stage, i) => {
          const meta = stageMeta[stage.name] ?? { status: "healthy" as const };
          const pct = Math.round((stage.value / total) * 100);

          return (
            <div key={stage.name} className="flex min-w-[120px] flex-1 items-stretch">
              <div
                className={cn(
                  "flex flex-1 flex-col rounded-md border-2 px-3 py-4 transition-shadow hover:shadow-md",
                  statusStyles[meta.status]
                )}
              >
                <div className="flex items-center gap-2">
                  <span className={cn("h-2 w-2 rounded-full", statusDot[meta.status])} />
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    {stage.name}
                  </p>
                </div>
                <p className="mt-2 text-2xl font-bold">{stage.value}</p>
                <p className="text-xs text-muted-foreground">{pct}% of portfolio</p>
                {meta.note && (
                  <p
                    className={cn(
                      "mt-2 text-[10px] font-bold uppercase tracking-wide",
                      meta.status === "critical" ? "text-[#e74c3c]" : "text-[#c9a000]"
                    )}
                  >
                    {meta.note}
                  </p>
                )}
              </div>
              {i < lifecycleDistribution.length - 1 && (
                <ChevronRight className="mx-1 hidden h-4 w-4 shrink-0 self-center text-muted-foreground/40 lg:block" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
