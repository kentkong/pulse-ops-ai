"use client";

import { usePathname } from "next/navigation";
import { PulseOpsMark } from "@/components/ui/pulse-ops-mark";
import { NavPageMark } from "@/components/ui/nav-page-mark";
import { cn } from "@/lib/utils";
import { getActiveNavItem } from "@/lib/nav-config";
import { navHueClass } from "@/lib/nav-hue";
import { BannerNavTabs } from "@/components/layout/left-nav";

export function WorkspaceContextBand() {
  const pathname = usePathname();
  const page = getActiveNavItem(pathname);

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
    <section className={cn("context-band flex shrink-0 flex-col", navHueClass[page.hue])}>
      <div className="context-band__inner">
        <div className="context-band__titles-row flex items-start justify-between gap-4 sm:items-center">
          <div className="context-band__title-wrap relative min-w-0 w-fit max-w-full">
            <svg
              className="context-band__brush"
              viewBox="0 0 520 72"
              preserveAspectRatio="none"
              aria-hidden
            >
              <path
                d="M-24 38 C48 22 118 46 196 34 C274 22 352 44 430 30 C508 16 548 36 560 32 L564 46 C520 54 448 42 372 50 C296 58 220 44 144 52 C68 60 8 48 -24 42 Z"
                fill="#1a1a1a"
                fillOpacity="0.05"
              />
              <path
                d="M-32 42 C36 24 108 50 188 36 C268 22 348 48 428 34 C508 20 552 40 568 36 L572 50 C512 58 432 46 352 54 C272 62 192 48 112 56 C32 64 -8 52 -32 46 Z"
                fill="#f1c40f"
                fillOpacity="0.42"
              />
              <path
                d="M-18 40 C62 30 142 44 222 36 C302 28 382 42 462 34 C502 30 538 38 552 36"
                fill="none"
                stroke="#f1c40f"
                strokeWidth="2"
                strokeOpacity="0.28"
                strokeLinecap="round"
              />
            </svg>
            <div className="relative z-10 flex items-center gap-2 sm:gap-3">
              <PulseOpsMark size="md" className="context-band__mark sm:hidden" />
              <PulseOpsMark size="lg" className="context-band__mark hidden sm:block" />
              <div className="min-w-0">
                <p className="context-band__eyebrow">Executive Intelligence Platform</p>
                <h1 className="context-band__title">
                  Pulse-Ops <span className="context-band__title-accent">AI</span>
                </h1>
              </div>
            </div>
          </div>

          <div className={cn("context-band__page-chip", `context-band__page-chip--${page.hue}`)}>
            <NavPageMark icon={page.icon} hue={page.hue} />
            <h2 className="context-band__page-name">{page.name}</h2>
          </div>
        </div>

        <div className="context-band__subhead mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1.5">
          <p className="context-band__tagline">AI Intelligence Layer — Unified Stack Response</p>
          <span className="context-band__live-pill">
            <span className="context-band__live-dot" aria-hidden />
            Live
          </span>
        </div>

        <p className="context-band__datetime mt-2">
          {pragueDate} · {pragueTime} · Europe/Prague
        </p>
      </div>

      <BannerNavTabs />
    </section>
  );
}
