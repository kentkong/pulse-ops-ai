import { Database, Layers, MessageSquare, type LucideIcon } from "lucide-react";
import type { NavHue } from "@/lib/nav-hue";

export type StackIntegrationMarkConfig =
  | { kind: "icon"; hue: NavHue; icon: LucideIcon }
  | { kind: "pulse" };

export const stackIntegrationMarks: Record<string, StackIntegrationMarkConfig> = {
  Snowflake: { kind: "icon", hue: "snowflake", icon: Database },
  Hightouch: { kind: "icon", hue: "hightouch", icon: Layers },
  Braze: { kind: "icon", hue: "braze", icon: MessageSquare },
  "Pulse-Ops AI": { kind: "pulse" },
};

export function getStackIntegrationMark(name: string): StackIntegrationMarkConfig | undefined {
  return stackIntegrationMarks[name];
}

export function getStackIntegrationBrandClass(name: string): string {
  const config = stackIntegrationMarks[name];
  if (!config) return "";
  if (config.kind === "pulse") return "stack-bar__node--pulse";
  return `stack-bar__node--${config.hue}`;
}
