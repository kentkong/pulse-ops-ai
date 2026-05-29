"use client";

import { cn, formatPercent } from "@/lib/utils";
import type { GlanceStat } from "@/types";
import { ArrowDown, ArrowUp, Activity } from "lucide-react";

const context: Record<string, string> = {
  at_risk: "Accounts showing churn signals across lifecycle stages",
  sla: "Response-time breaches from support & onboarding queues",
  workflows: "Automated playbooks waiting for ops review",
  actions: "AI-generated recommendations awaiting ops action",
  health: "Portfolio-wide engagement score from Snowflake + Braze",
};

export function OpsPulse({ stats }: { stats: GlanceStat[] }) {
  const focus = stats.filter((s) =>
    ["at_risk", "sla", "workflows", "actions"].includes(s.id)
  );

  return (
    <div className="border-b border-border bg-[#1a1a1a] px-6 py-5 lg:px-10">
      <div className="mb-4 flex items-center gap-2">
        <Activity className="h-4 w-4 text-[#f1c40f]" strokeWidth={2} />
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
          Lifecycle Ops Pulse
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {focus.map((stat) => {
          const isUp = (stat.change ?? 0) >= 0;
          const isBad = stat.id === "at_risk" || stat.id === "sla";
          const changeColor =
            stat.change === 0
              ? "text-white/40"
              : isBad
                ? isUp
                  ? "text-[#e74c3c]"
                  : "text-[#27ae60]"
                : isUp
                  ? "text-[#27ae60]"
                  : "text-[#e74c3c]";

          return (
            <div
              key={stat.id}
              className="rounded-md border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm"
            >
              <div className="flex items-baseline justify-between gap-2">
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                {stat.change !== undefined && (
                  <span className={cn("flex items-center gap-0.5 text-xs font-medium", changeColor)}>
                    {isUp ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                    {formatPercent(stat.change)}
                  </span>
                )}
              </div>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-[#f1c40f]">
                {stat.label}
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-white/45">
                {context[stat.id] ?? stat.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
