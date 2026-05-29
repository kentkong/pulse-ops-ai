"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Brain,
  GitBranch,
  LayoutDashboard,
  Layers,
  Radio,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { TextureBg } from "@/components/ui/texture-bg";
import { stackIntegrations } from "@/lib/mock-data";

const navigation = [
  { name: "Operations", href: "/", icon: LayoutDashboard },
  { name: "Lifecycle", href: "/lifecycle", icon: Users },
  { name: "Accounts", href: "/lifecycle", icon: Users },
  { name: "Workflows", href: "/workflows", icon: GitBranch },
  { name: "AI Signals", href: "/insights", icon: Brain },
  { name: "Event Stream", href: "/events", icon: Radio },
  { name: "Reports", href: "/insights", icon: BarChart3 },
  { name: "Architecture", href: "/architecture", icon: Layers },
];

function isActive(pathname: string, item: { name: string; href: string }) {
  if (item.href === "/") return pathname === "/";
  if (item.name === "Accounts" || item.name === "Reports") return false;
  return pathname === item.href;
}

export function TopNav() {
  const pathname = usePathname();

  return (
    <nav className="block w-full max-w-none border-b border-border bg-[#f4f4f4]">
      {/* Page title row — Executive Operations Command Center */}
      <div className="command-banner flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <TextureBg texture="command" className="command-banner__bg" />
        <h2 className="heading-display relative z-[1] !text-base sm:!text-lg">
          Executive Operations <span>Command Center</span>
        </h2>
        <div className="relative z-[1] hidden items-center gap-4 md:flex">
          {stackIntegrations.slice(0, 3).map((s) => (
            <span key={s.name} className="stack-badge text-[10px] font-medium uppercase tracking-wider">
              {s.name}{" "}
              <em className="font-mono">{s.latency}</em>
            </span>
          ))}
        </div>
      </div>

      {/* Nav links row */}
      <div className="px-4 py-3 lg:px-8">
        <ul className="flex flex-wrap items-center gap-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = isActive(pathname, item);
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    "relative flex items-center gap-2 rounded-md px-3 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors",
                    active
                      ? "bg-[#f1c40f] text-[#1a1a1a]"
                      : "text-muted-foreground hover:bg-white hover:text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
