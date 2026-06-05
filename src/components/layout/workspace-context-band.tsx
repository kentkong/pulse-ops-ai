"use client";

import { usePathname } from "next/navigation";
import { PulseOpsMark } from "@/components/ui/pulse-ops-mark";
import { NavPageMark } from "@/components/ui/nav-page-mark";
import { StackIntegrationMark } from "@/components/ui/stack-integration-mark";
import { cn } from "@/lib/utils";
import { getActiveNavItem } from "@/lib/nav-config";
import { stackIntegrations } from "@/lib/mock-data";
import { getStackIntegrationBrandClass } from "@/lib/stack-integration-meta";

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

  const healthySources = stackIntegrations.filter((s) => s.status === "connected").length;
  const totalSources = stackIntegrations.length;

  return (
    <section className="context-band flex shrink-0 flex-col">
      <div className="context-band__inner">
        <div className="context-band__titles-row flex items-center justify-between gap-4">
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
                fillOpacity="0.07"
              />
              <path
                d="M-32 42 C36 24 108 50 188 36 C268 22 348 48 428 34 C508 20 552 40 568 36 L572 50 C512 58 432 46 352 54 C272 62 192 48 112 56 C32 64 -8 52 -32 46 Z"
                fill="#f1c40f"
                fillOpacity="0.34"
              />
              <path
                d="M-18 40 C62 30 142 44 222 36 C302 28 382 42 462 34 C502 30 538 38 552 36"
                fill="none"
                stroke="#f1c40f"
                strokeWidth="2.5"
                strokeOpacity="0.22"
                strokeLinecap="round"
              />
              <path
                d="M12 48 C92 54 172 46 252 50 C332 54 412 46 492 48"
                fill="none"
                stroke="#f1c40f"
                strokeWidth="1.5"
                strokeOpacity="0.14"
                strokeLinecap="round"
              />
              <ellipse
                cx="88"
                cy="30"
                rx="10"
                ry="3.5"
                fill="#f1c40f"
                fillOpacity="0.18"
                transform="rotate(-12 88 30)"
              />
              <ellipse
                cx="310"
                cy="52"
                rx="14"
                ry="4"
                fill="#f1c40f"
                fillOpacity="0.14"
                transform="rotate(8 310 52)"
              />
              <ellipse
                cx="470"
                cy="38"
                rx="7"
                ry="2.5"
                fill="#f1c40f"
                fillOpacity="0.16"
                transform="rotate(-6 470 38)"
              />
            </svg>
            <div className="relative z-10 flex items-center gap-2 sm:gap-3">
              <PulseOpsMark size="md" className="sm:hidden" />
              <PulseOpsMark size="lg" className="hidden sm:block" />
              <h1 className="ml-0 text-xl font-bold tracking-tighter text-[#1a1a1a] sm:ml-1 sm:text-3xl lg:text-4xl">
                Pulse-Ops <span className="text-[#f1c40f]">AI</span>
              </h1>
            </div>
          </div>

          <div className="context-band__page-heading flex shrink-0 items-center gap-3">
            <h2 className="text-2xl font-bold tracking-tighter text-[#1a1a1a] sm:text-3xl lg:text-4xl">
              {page.name}
            </h2>
            <NavPageMark icon={page.icon} hue={page.hue} size="lg" />
          </div>
        </div>

        <p className="context-band__tagline mt-2 max-w-xl">
          AI Intelligence Layer — Unified Stack Response
        </p>

        <p className="context-band__datetime mt-1.5">
          {pragueDate} · {pragueTime} · Europe/Prague
        </p>

        <div className="context-band__meta">
          <div className="context-band__meta-stack-row">
            <span className="context-band__stack-label">Stack</span>
            <ul className="context-band__stack-list">
              {stackIntegrations.map((source) => (
                <li key={source.name}>
                  <span
                    className={cn(
                      "context-band__stack-item",
                      getStackIntegrationBrandClass(source.name),
                      source.status === "connected" && "context-band__stack-item--healthy"
                    )}
                    title={`${source.role} · ${source.latency}`}
                  >
                    <StackIntegrationMark name={source.name} />
                    {source.name}
                    {source.status === "connected" && (
                      <span className="context-band__stack-dot" aria-hidden />
                    )}
                  </span>
                </li>
              ))}
            </ul>
            <span className="context-band__stack-summary">
              {healthySources}/{totalSources} healthy
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
