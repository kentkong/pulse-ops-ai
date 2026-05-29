import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { getStackIntegrationMark } from "@/lib/stack-integration-meta";

type StackIntegrationMarkProps = {
  name: string;
  className?: string;
};

/** Stack-layer icon at banner scale — matches nav/page hue marks. */
export function StackIntegrationMark({ name, className }: StackIntegrationMarkProps) {
  const config = getStackIntegrationMark(name);
  if (!config) return null;

  if (config.kind === "pulse") {
    return (
      <span className={cn("stack-integration-mark stack-integration-mark--pulse", className)} aria-hidden>
        <Sparkles className="stack-integration-mark__icon" strokeWidth={2.1} />
      </span>
    );
  }

  const Icon = config.icon;

  return (
    <span
      className={cn(
        "stack-integration-mark",
        `stack-integration-mark--${config.hue}`,
        className
      )}
      aria-hidden
    >
      <Icon className="stack-integration-mark__icon" strokeWidth={2.1} />
    </span>
  );
}
