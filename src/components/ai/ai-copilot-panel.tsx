"use client";

import type { NextBestAction } from "@/types";
import { Sparkline } from "@/components/ui/sparkline";

const impactLabel = {
  high: "High Impact",
  medium: "Medium Impact",
  low: "Low Impact",
};

const aiSignals = [
  { label: "Support tickets", trend: [2, 3, 4, 5, 7, 9, 12] },
  { label: "Onboarding delays", trend: [8, 9, 10, 11, 12, 14, 18] },
  { label: "Expansion signals", trend: [3, 4, 4, 5, 6, 7, 8] },
];

export function AICopilotPanel({ actions }: { actions: NextBestAction[] }) {
  return (
    <aside
      className="flex min-h-[420px] w-full flex-col border-t border-border bg-[#f4f4f4] lg:min-h-0 lg:w-[340px] lg:shrink-0 lg:border-l lg:border-t-0"
      id="section-actions"
    >
      <div className="border-b border-border bg-white px-6 py-5">
        <h2 className="heading-display !text-base">
          AI <span>Copilot</span>
        </h2>
      </div>

      <div className="flex flex-1 flex-col justify-between gap-8 overflow-y-auto px-6 py-6">
        <div>
          <p className="section-label mb-3">Summary</p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Onboarding delays increased <strong className="text-foreground">18%</strong> this week.
            Two accounts need immediate intervention. Expansion signals in 12 accounts.
          </p>
        </div>

        <div>
          <p className="section-label mb-4">Recommendations</p>
          <ol className="space-y-5">
            {actions.slice(0, 3).map((action, i) => (
              <li key={action.id}>
                <div className="flex items-start gap-3">
                  <span className="circle-accent h-6 w-6 shrink-0 text-[10px]">{i + 1}</span>
                  <div>
                    <p className="text-sm font-medium leading-snug">{action.title}</p>
                    <span className="mt-2 inline-block rounded-full bg-[#f1c40f] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#1a1a1a]">
                      {impactLabel[action.priority === "high" ? "high" : action.priority === "medium" ? "medium" : "low"]}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div>
          <p className="section-label mb-4">Signals</p>
          <div className="space-y-4">
            {aiSignals.map((signal) => (
              <div key={signal.label} className="flex items-center justify-between gap-3">
                <p className="text-xs text-muted-foreground">{signal.label}</p>
                <Sparkline data={signal.trend} color="#f1c40f" height={22} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
