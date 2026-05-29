"use client";

import { cn, formatPercent } from "@/lib/utils";
import type { GlanceStat } from "@/types";
import { Sparkline } from "@/components/ui/sparkline";
import { ArrowDown, ArrowUp } from "lucide-react";

export function TodayAtAGlance({ stats }: { stats: GlanceStat[] }) {
  const scrollTo = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="flex h-full flex-col px-6 py-8 lg:px-10 lg:py-10">
      <h2 className="heading-display mb-8">
        Today at a <span>Glance</span>
      </h2>
      <div className="grid flex-1 grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
        {stats.map((stat) => {
          const isUp = (stat.change ?? 0) >= 0;
          const isBadMetric = stat.id === "at_risk" || stat.id === "sla";
          const changeColor =
            stat.change === 0
              ? "text-muted-foreground"
              : isBadMetric
                ? isUp
                  ? "text-destructive"
                  : "text-success"
                : isUp
                  ? "text-success"
                  : "text-destructive";

          return (
            <button
              key={stat.id}
              type="button"
              onClick={() => scrollTo(stat.targetSection)}
              className="group flex flex-col items-center justify-center rounded-md bg-white p-5 text-center shadow-sm transition-shadow hover:shadow-md"
            >
              {stat.trend && (
                <Sparkline
                  data={stat.trend}
                  color={stat.status === "at_risk" ? "#e74c3c" : "#f1c40f"}
                  height={28}
                  className="mb-3 opacity-80"
                />
              )}
              <p className="text-3xl font-bold text-foreground">{stat.value}</p>
              <p className="mt-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                {stat.label}
              </p>
              {stat.change !== undefined && (
                <div className={cn("mt-2 flex items-center gap-1 text-xs font-medium", changeColor)}>
                  {isUp ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                  {formatPercent(stat.change)}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
