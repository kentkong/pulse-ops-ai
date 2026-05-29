import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { NavHue } from "@/lib/nav-hue";

type NavPageMarkProps = {
  icon: LucideIcon;
  hue: NavHue;
  className?: string;
};

/** Page icon at banner scale — hue only, no background */
export function NavPageMark({ icon: Icon, hue, className }: NavPageMarkProps) {
  return (
    <span
      className={cn(
        "nav-page-mark inline-flex h-8 w-8 shrink-0 items-center justify-center",
        `nav-page-mark--${hue}`,
        className
      )}
      aria-hidden
    >
      <Icon className="nav-page-mark__icon" strokeWidth={2.1} />
    </span>
  );
}
