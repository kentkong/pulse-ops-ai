"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { getNavHue, navHueClass } from "@/lib/nav-hue";

/** Full-width hue + texture behind tabs and banner (single continuous header surface). */
export function WorkspaceHeaderBg() {
  const hue = getNavHue(usePathname());

  return (
    <div className={cn("workspace-header-bg", navHueClass[hue])} aria-hidden>
      <div className="workspace-header-bg__texture" />
      <div className="workspace-header-bg__tint" />
    </div>
  );
}
