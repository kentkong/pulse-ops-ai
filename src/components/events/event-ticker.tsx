"use client";

import { AlertTriangle, Info } from "lucide-react";
import type { CustomerEvent } from "@/types";
import { formatRelativeTime } from "@/lib/utils";

export function EventStreamTicker({ events }: { events: CustomerEvent[] }) {
  const items = [...events.slice(0, 8), ...events.slice(0, 8)];

  return (
    <footer className="section-dark shrink-0 border-t border-white/10 py-3">
      <div className="flex items-center gap-5 px-6">
        <p className="shrink-0 text-[10px] font-bold uppercase tracking-widest text-[#f1c40f]">
          Event Stream
        </p>
        <div className="relative flex-1 overflow-hidden">
          <div className="flex animate-ticker gap-10 whitespace-nowrap">
            {items.map((event, i) => (
              <div key={`${event.id}-${i}`} className="inline-flex items-center gap-2 text-xs text-white/70">
                {event.severity === "high" ? (
                  <AlertTriangle className="h-3 w-3 text-[#f1c40f]" />
                ) : (
                  <Info className="h-3 w-3 text-white/40" />
                )}
                <span className="text-white">{event.title}</span>
                <span>· {event.company}</span>
                <span>{formatRelativeTime(event.timestamp)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
