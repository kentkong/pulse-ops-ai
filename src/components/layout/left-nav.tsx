"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { isNavActive, workspaceNav } from "@/lib/nav-config";

export function BannerNavTabs() {
  const pathname = usePathname();

  return (
    <nav className="banner-nav relative z-[1] w-full shrink-0" aria-label="Navigation">
      <ul className="banner-nav__items">
        {workspaceNav.map((item) => {
          const Icon = item.icon;
          const active = isNavActive(pathname, item.href);

          return (
            <li key={item.name} className="banner-nav__item">
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn("banner-nav-btn", active && "banner-nav-btn--active")}
              >
                <Icon className="banner-nav-btn__icon" strokeWidth={1.85} />
                <span className="banner-nav-btn__label">{item.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/** @deprecated Use BannerNavTabs */
export function LeftNavTabs() {
  return <BannerNavTabs />;
}

export function LeftNavRail() {
  return <div className="left-nav-rail relative z-[1] min-h-0" aria-hidden />;
}

/** @deprecated Use LeftNavTabs + LeftNavRail */
export function LeftNav() {
  return <LeftNavTabs />;
}
