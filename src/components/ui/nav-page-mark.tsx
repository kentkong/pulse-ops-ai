import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { NavHue } from "@/lib/nav-hue";

const markSizes = {
  md: "nav-page-mark--md",
  lg: "nav-page-mark--lg",
  banner: "nav-page-mark--banner",
} as const;

type NavPageMarkProps = {
  icon: LucideIcon;
  hue: NavHue;
  size?: keyof typeof markSizes;
  className?: string;
};

/** Page icon at banner scale — hue only, no background (banner adds frosted tile) */
export function NavPageMark({ icon: Icon, hue, size = "md", className }: NavPageMarkProps) {
  return (
    <span
      className={cn(
        "nav-page-mark inline-flex shrink-0 items-center justify-center",
        markSizes[size],
        size === "banner" && "nav-page-mark--banner-tile",
        `nav-page-mark--${hue}`,
        className
      )}
      aria-hidden
    >
      <Icon className="nav-page-mark__icon" strokeWidth={2.1} />
    </span>
  );
}
