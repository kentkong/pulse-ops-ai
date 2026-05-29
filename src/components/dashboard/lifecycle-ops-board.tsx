"use client";

import type { KanbanColumn } from "@/types";
import { cn } from "@/lib/utils";

const healthTone = {
  healthy: "text-[#27ae60]",
  watch: "text-[#c9a000]",
  at_risk: "text-[#e74c3c]",
  critical: "text-[#e74c3c]",
};

const healthBarTone = {
  healthy: "bg-[#27ae60]",
  watch: "bg-[#c9a000]",
  at_risk: "bg-[#e74c3c]",
  critical: "bg-[#c0392b]",
};

function columnNeedsAttention(column: KanbanColumn) {
  return column.items.some(
    (item) => item.healthStatus === "at_risk" || item.healthStatus === "critical"
  );
}

export function LifecycleOpsBoard({ columns }: { columns: KanbanColumn[] }) {
  const totalAccounts = columns.reduce((s, c) => s + c.items.length, 0);
  const atRisk = columns.find((c) => c.id === "at_risk")?.items.length ?? 0;

  return (
    <section className="flex min-h-0 flex-1 flex-col" id="section-kanban">
      <div className="section-band-dark relative shrink-0 overflow-hidden">
        <div className="section-band-dark__bg" aria-hidden />
        <div className="section-band-dark__inner flex flex-wrap items-center justify-between gap-2 px-6 py-2 lg:px-8">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-[13px] font-semibold text-white">Lifecycle Operations Board</h2>
            <span className="section-pill">Live lanes</span>
          </div>
          <p className="text-[10px] text-white/60">
            {totalAccounts} accounts · {atRisk} need intervention
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto overflow-y-hidden px-6 py-4 lg:px-8">
        <div className="flex h-full min-w-max gap-3">
          {columns.map((column) => {
            const isActive = column.id === "onboarding";
            const needsAttention = columnNeedsAttention(column);

            return (
              <div
                key={column.id}
                id={column.id === "at_risk" ? "section-priority" : undefined}
                className={cn(
                  "surface-lane flex w-[188px] shrink-0 flex-col",
                  isActive && "surface-lane--active",
                  !isActive && column.id === "at_risk" && "surface-lane--alert"
                )}
              >
                <div className="flex items-center justify-between border-b border-[#eeeeee] px-2.5 py-2">
                  <span className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-[#1a1a1a]">
                    {needsAttention && (
                      <span className="lane-alert-dot animate-live-dot" aria-hidden />
                    )}
                    {column.title}
                  </span>
                  <span className="rounded bg-white px-1.5 py-0.5 text-[9px] font-medium text-[#666]">
                    {column.items.length}
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-1.5 overflow-y-auto p-1.5">
                  {column.items.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      className="kanban-card surface-card w-full p-2 text-left"
                    >
                      <div className="flex items-start justify-between gap-1">
                        <p className="truncate text-[11px] font-semibold text-[#1a1a1a]">
                          {item.company}
                        </p>
                        <span
                          className={cn(
                            "shrink-0 text-[10px] font-bold tabular-nums",
                            healthTone[item.healthStatus]
                          )}
                        >
                          {item.healthScore}
                        </span>
                      </div>
                      {item.label && (
                        <p className="mt-0.5 truncate text-[9px] text-[#888]">{item.label}</p>
                      )}
                      <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-[#ececec]">
                        <div
                          className={cn(
                            "h-full rounded-full",
                            healthBarTone[item.healthStatus]
                          )}
                          style={{ width: `${item.healthScore}%` }}
                        />
                      </div>
                      <p className="mt-1 truncate text-[9px] text-[#aaa]">{item.owner}</p>
                    </button>
                  ))}
                  {column.items.length === 0 && (
                    <p className="px-2 py-4 text-center text-[10px] text-[#bbb]">No accounts</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
