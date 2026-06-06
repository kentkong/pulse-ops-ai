"use client";

import { usePathname } from "next/navigation";
import { PulseOpsMark } from "@/components/ui/pulse-ops-mark";
import { NavPageMark } from "@/components/ui/nav-page-mark";
import { HeroBrushStroke } from "@/components/ui/hero-brush-stroke";
import { getActiveNavItem } from "@/lib/nav-config";

export function WorkspaceContextBand() {
  const pathname = usePathname();
  const page = getActiveNavItem(pathname);

  return (
    <div className="context-band__titles-row flex items-center justify-between gap-4">
      <div className="context-band__title-wrap relative min-w-0 w-fit max-w-full">
        <div className="context-band__brand-lockup relative">
          <HeroBrushStroke className="context-band__brush" />
          <div className="relative z-10 flex items-center gap-2 sm:gap-3">
            <PulseOpsMark size="md" className="sm:hidden" />
            <PulseOpsMark size="lg" className="hidden sm:block" />
            <h1 className="ml-0 text-xl font-bold tracking-tighter text-[#1a1a1a] sm:ml-1 sm:text-3xl lg:text-4xl">
              Pulse-Ops <span className="text-[#f1c40f]">AI</span>
            </h1>
          </div>
        </div>
      </div>

      <div className="context-band__page-lockup relative shrink-0">
        <div className="context-band__page-heading relative z-10 flex items-center gap-3">
          <h2 className="text-2xl font-bold tracking-tighter text-[#1a1a1a] sm:text-3xl lg:text-4xl">
            {page.name}
          </h2>
          <NavPageMark icon={page.icon} hue={page.hue} size="banner" />
        </div>
      </div>
    </div>
  );
}
