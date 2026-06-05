"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { isNavActive, workspaceNav } from "@/lib/nav-config";

function NavTabLinks({ className, listClassName, tabClassName }: {
  className?: string;
  listClassName?: string;
  tabClassName?: string;
}) {
  const pathname = usePathname();

  return (
    <nav className={className} aria-label="Navigation">
      <ul className={listClassName}>
        {workspaceNav.map((item) => {
          const Icon = item.icon;
          const active = isNavActive(pathname, item.href);

          return (
            <li key={item.name} className="shrink-0">
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "nav-tab group relative flex items-center gap-1.5 transition-all",
                  tabClassName,
                  `nav-tab--${item.hue}`,
                  active && "nav-tab--active"
                )}
              >
                <span className="nav-tab__bg" aria-hidden />
                <span className="nav-tab__stripe" aria-hidden />
                <Icon className="nav-tab__icon h-[14px] w-[14px] shrink-0" strokeWidth={1.75} />
                <span className="nav-tab__label min-w-0 text-[10px] font-medium leading-tight">
                  {item.name}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/** Horizontal nav tabs along the bottom edge of the command bar */
export function CommandBarNav() {
  return (
    <NavTabLinks
      className="command-bar__nav"
      listClassName="command-bar__nav-items"
      tabClassName="command-bar__nav-tab"
    />
  );
}

/** @deprecated Nav moved to command bar — kept for compatibility */
export function LeftNavTabs() {
  return <CommandBarNav />;
}

export function LeftNavRail() {
  return null;
}

/** @deprecated Use CommandBarNav */
export function LeftNav() {
  return <CommandBarNav />;
}
