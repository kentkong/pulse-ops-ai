"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { isNavActive, workspaceNav } from "@/lib/nav-config";

/** Horizontal nav tabs along the bottom edge of the command bar */
export function CommandBarNav() {
  const pathname = usePathname();

  return (
    <nav className="command-bar__nav" aria-label="Navigation">
      <ul className="command-bar__nav-items">
        {workspaceNav.map((item) => {
          const Icon = item.icon;
          const active = isNavActive(pathname, item.href);

          return (
            <li
              key={item.name}
              className={cn(
                "command-bar__nav-item shrink-0",
                `command-bar__nav-item--${item.hue}`,
                active && "command-bar__nav-item--active"
              )}
            >
              <Link
                href={item.href}
                title={item.name}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "nav-tab command-bar__nav-tab group relative z-10 flex items-center gap-1.5 transition-all",
                  `nav-tab--${item.hue}`,
                  active && "nav-tab--active"
                )}
              >
                <span className="nav-tab__bg" aria-hidden />
                <Icon className="nav-tab__icon h-[14px] w-[14px] shrink-0" strokeWidth={1.75} />
                <span className="nav-tab__label min-w-0 text-[10px] font-medium leading-tight">
                  {item.name}
                </span>
              </Link>
              <span className="command-bar__nav-underline" aria-hidden />
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
