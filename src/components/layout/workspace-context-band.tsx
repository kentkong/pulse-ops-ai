"use client";

import { usePathname } from "next/navigation";
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
        <div className="context-band__titles-row flex items-center gap-3 sm:gap-4">
          <div className="context-band__page-mark-wrap relative shrink-0">
            <svg
              className="context-band__page-mark-brush"
              viewBox="0 0 48 48"
              preserveAspectRatio="none"
              aria-hidden
            >
              <path
                d="M-4 24 C8 18 16 26 24 22 C32 18 40 26 52 22 L54 28 C42 32 32 26 24 30 C16 34 6 28 -4 26 Z"
                fill="#f1c40f"
                fillOpacity="0.55"
              />
              <path
                d="M2 25 C12 21 20 27 28 24 C36 21 44 27 46 25"
                fill="none"
                stroke="#f1c40f"
                strokeWidth="1.5"
                strokeOpacity="0.35"
                strokeLinecap="round"
              />
            </svg>
            <NavPageMark icon={page.icon} hue={page.hue} className="relative z-[1]" />
          </div>
          <h1 className="context-band__title min-w-0">{page.name}</h1>
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
