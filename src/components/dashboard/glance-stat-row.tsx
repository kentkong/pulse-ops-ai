"use client";

import { scrollToWidget } from "@/lib/scroll-to-widget";
import { Sparkline } from "@/components/ui/sparkline";
import { cn, formatPercent } from "@/lib/utils";
import type { GlanceStat } from "@/types";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useRouter } from "next/navigation";

const subtitles: Record<string, string> = {
  at_risk: "Across lifecycle stages",
  sla: "Critical · 4 breaches",
  workflows: "Awaiting ops review",
  actions: "Ranked by impact",
  health: "Portfolio average",
};

const accentValue: Record<string, string> = {
  at_risk: "text-[#f1c40f]",
  sla: "text-[#e74c3c]",
  workflows: "text-[#1a1a1a]",
  actions: "text-[#f1c40f]",
  health: "text-[#1a1a1a]",
};

const sparkColor: Record<string, string> = {
  at_risk: "#f1c40f",
  sla: "#e74c3c",
  workflows: "#1a1a1a",
  actions: "#f1c40f",
};

const signalStats = new Set(["at_risk", "actions"]);

export function GlanceStatRow({ stats }: { stats: GlanceStat[] }) {
  const router = useRouter();
  const row = stats.filter((s) =>
    ["at_risk", "sla", "workflows", "actions"].includes(s.id)
  );

  function handleStatClick(stat: GlanceStat) {
    if (stat.id === "workflows") {
      router.push("/workflows");
      return;
    }

    if (stat.id === "at_risk") {
      scrollToWidget("section-priority", { inline: "center", block: "center" });
      return;
    }

    if (stat.id === "actions") {
      scrollToWidget("section-actions", { block: "start" });
      return;
    }

    scrollToWidget(stat.targetSection, { block: "start" });
  }

  return (
    <section className="glance-stat-row shrink-0 px-6 py-3 lg:px-8">
      <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
        {row.map((stat) => {
          const isUp = (stat.change ?? 0) >= 0;
          const isBad = stat.id === "at_risk" || stat.id === "sla";

          return (
            <button
              key={stat.id}
              type="button"
              className={cn(
                "glance-stat-card group text-left transition-shadow",
                signalStats.has(stat.id) && "glance-stat-card--signal"
              )}
              onClick={() => handleStatClick(stat)}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-[9px] font-semibold uppercase tracking-wider text-[#999]">
                    {stat.label}
                  </p>
                  <p
                    className={cn(
                      "mt-0.5 text-xl font-bold tabular-nums leading-none",
                      accentValue[stat.id] ?? "text-[#1a1a1a]"
                    )}
                  >
                    {stat.value}
                  </p>
                </div>
                {stat.trend && (
                  <Sparkline
                    data={stat.trend}
                    color={sparkColor[stat.id] ?? "#1a1a1a"}
                    height={28}
                    className="shrink-0 opacity-80"
                  />
                )}
              </div>
              <div className="mt-1.5 flex items-center justify-between gap-1">
                <p className="truncate text-[10px] text-[#888]">{subtitles[stat.id]}</p>
                {stat.change !== undefined && stat.change !== 0 && (
                  <span
                    className={cn(
                      "flex shrink-0 items-center text-[10px] font-medium",
                      isBad
                        ? isUp
                          ? "text-[#e74c3c]"
                          : "text-[#27ae60]"
                        : isUp
                          ? "text-[#27ae60]"
                          : "text-[#e74c3c]"
                    )}
                  >
                    {isUp ? (
                      <ArrowUp className="h-2.5 w-2.5" />
                    ) : (
                      <ArrowDown className="h-2.5 w-2.5" />
                    )}
                    {formatPercent(stat.change)}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
