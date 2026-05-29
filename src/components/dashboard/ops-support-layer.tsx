"use client";

import type { ChartDataPoint, CustomerEvent } from "@/types";
import { cn, formatRelativeTime } from "@/lib/utils";
import { Activity, Radio } from "lucide-react";

export function OpsSupportLayer({
  inflowData,
  events,
}: {
  inflowData: ChartDataPoint[];
  events: CustomerEvent[];
}) {
  const inflow = inflowData.reduce((s, d) => s + d.value, 0);
  const resolved = inflowData.reduce((s, d) => s + (d.secondary ?? 0), 0);
  const gap = inflow - resolved;

  return (
    <footer className="ops-support-footer shrink-0">
      <div className="grid grid-cols-1 divide-y divide-[#eeeeee] lg:grid-cols-2 lg:divide-x lg:divide-y-0">
        <div id="section-sla" className="flex items-center gap-3 px-6 py-3">
          <Activity className="h-3.5 w-3.5 text-[#999]" />
          <span className="text-[10px] font-medium uppercase tracking-wide text-[#999]">
            Throughput
          </span>
          <span className="text-sm font-semibold text-[#1a1a1a]">{resolved}</span>
          <span className="text-[10px] text-[#999]">/ {inflow} events</span>
          <span
            className={cn(
              "text-[10px] font-medium",
              gap > 0 ? "text-[#e74c3c]" : "text-[#27ae60]"
            )}
          >
            {gap > 0 ? `${gap} behind SLA pace` : "On SLA pace"}
          </span>
        </div>

        <div className="flex min-w-0 items-center gap-3 overflow-hidden px-6 py-3">
          <Radio className="h-3.5 w-3.5 shrink-0 text-[#999]" />
          <div className="flex min-w-0 gap-6 overflow-hidden">
            {events.slice(0, 4).map((event) => (
              <span key={event.id} className="shrink-0 truncate text-[11px] text-[#666]">
                <span className="font-medium text-[#1a1a1a]">{event.company}</span> · {event.title}{" "}
                <span className="text-[#aaa]">{formatRelativeTime(event.timestamp)}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
