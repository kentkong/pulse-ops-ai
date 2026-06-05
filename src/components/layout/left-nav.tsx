"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { isNavActive, workspaceNav } from "@/lib/nav-config";

export function LeftNavTabs() {
  const pathname = usePathname();

  return (
    <nav
      className="left-nav left-nav--banner relative z-[1] flex h-full w-full flex-col justify-start"
      aria-label="Navigation"
    >
      <ul className="left-nav__items flex h-full flex-col justify-start gap-1">
        {workspaceNav.map((item) => {
          const Icon = item.icon;
          const active = isNavActive(pathname, item.href);

          return (
            <li key={item.name} className="shrink-0">
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "nav-tab group relative flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 transition-all duration-200",
                  `nav-tab--${item.hue}`,
                  active && "nav-tab--active"
                )}
              >
                <span className="nav-tab__bg" aria-hidden />
                <span className="nav-tab__stripe" aria-hidden />
                <span className="nav-tab__icon-wrap">
                  <Icon className="nav-tab__icon h-[15px] w-[15px] shrink-0" strokeWidth={1.85} />
                </span>
                <span className="nav-tab__label min-w-0">{item.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function LeftNavRail() {
  return <div className="left-nav-rail relative z-[1] min-h-0" aria-hidden />;
}

/** @deprecated Use LeftNavTabs + LeftNavRail */
export function LeftNav() {
  return <LeftNavTabs />;
}
