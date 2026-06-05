"use client";

import { Search, Sparkles } from "lucide-react";
import { StackIntegrationMark } from "@/components/ui/stack-integration-mark";
import { stackIntegrations } from "@/lib/mock-data";

export function CommandBar() {
  const pragueTime = new Date().toLocaleTimeString("en-GB", {
    timeZone: "Europe/Prague",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const pragueDate = new Date().toLocaleDateString("en-GB", {
    timeZone: "Europe/Prague",
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <header className="command-bar">
      <div className="command-bar__main">
        <div className="command-bar__context min-w-0">
          <p className="command-bar__tagline">
            AI Intelligence Layer — Unified Stack Response
          </p>
          <p className="command-bar__datetime">
            {pragueDate} · {pragueTime} · Europe/Prague
          </p>
        </div>

        <div className="hidden min-w-0 items-center gap-4 text-[11px] text-[#666] lg:flex">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 animate-live-dot rounded-full bg-[#27ae60]" />
            Live
          </span>
          <span>
            <strong className="font-semibold text-[#1a1a1a]">10</strong> workflows active
          </span>
          <span className="flex items-center gap-1.5 text-[#1a1a1a]">
            <Sparkles className="h-3 w-3 text-[#f1c40f]" />
            AI operational
          </span>
        </div>

        <div className="search-field hidden max-w-xs flex-1 items-center gap-2 rounded-lg px-3 py-1.5 xl:flex">
          <Search className="h-3.5 w-3.5 text-[#999]" />
          <span className="text-xs text-[#999]">Search accounts, workflows, signals…</span>
        </div>

        <div className="flex shrink-0 items-center gap-4">
          <div className="hidden items-center gap-3 xl:flex">
            {stackIntegrations.slice(0, 3).map((s) => (
              <span key={s.name} className="flex items-center gap-1.5 text-[10px] text-[#999]">
                <StackIntegrationMark name={s.name} />
                <span>
                  {s.name}{" "}
                  <span className="font-mono text-[#1a1a1a]">{s.latency}</span>
                </span>
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2 border-l border-[#e8e8e8] pl-4">
            <div className="text-right hidden sm:block">
              <p className="text-[11px] font-medium text-[#1a1a1a]">Ops Leadership</p>
              <p className="text-[10px] text-[#999]">Lifecycle team</p>
            </div>
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1a1a1a] text-[10px] font-bold text-white">
              KL
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
