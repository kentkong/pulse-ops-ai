import type { LucideIcon } from "lucide-react";
import {
  Brain,
  GitBranch,
  LayoutDashboard,
  Layers,
  Radio,
  Users,
} from "lucide-react";
import { navItemHues, type NavHue } from "@/lib/nav-hue";

export type NavItem = {
  name: string;
  href: string;
  icon: LucideIcon;
  hue: NavHue;
};

export const workspaceNav: NavItem[] = [
  { name: "Operations", href: "/", icon: LayoutDashboard, hue: navItemHues["/"] },
  { name: "Lifecycle", href: "/lifecycle", icon: Users, hue: navItemHues["/lifecycle"] },
  { name: "Workflows", href: "/workflows", icon: GitBranch, hue: navItemHues["/workflows"] },
  { name: "AI Signals", href: "/insights", icon: Brain, hue: navItemHues["/insights"] },
  { name: "Events", href: "/events", icon: Radio, hue: navItemHues["/events"] },
  { name: "Architecture", href: "/architecture", icon: Layers, hue: navItemHues["/architecture"] },
];

export function getActiveNavItem(pathname: string): NavItem {
  if (pathname === "/") {
    return workspaceNav[0];
  }
  return (
    workspaceNav.find(
      (item) => item.href !== "/" && pathname.startsWith(item.href)
    ) ?? workspaceNav[0]
  );
}

export function isNavActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}
