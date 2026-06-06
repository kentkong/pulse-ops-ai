import Link from "next/link";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { aiInsights } from "@/lib/mock-data";

export function CriticalSignalBanner() {
  const critical = aiInsights.find((insight) => insight.severity === "critical");
  if (!critical) return null;

  return (
    <div className="critical-signal-banner mx-4 mt-4 flex flex-wrap items-center justify-between gap-3 rounded-none border border-[#e74c3c]/20 bg-[#e74c3c]/5 px-4 py-3 md:mx-6 lg:mx-8">
      <div className="flex min-w-0 items-start gap-3">
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-[#e74c3c]" aria-hidden />
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#e74c3c]">
            Critical signal
          </p>
          <p className="mt-0.5 text-sm font-medium text-[#1a1a1a]">{critical.title}</p>
          <p className="mt-0.5 text-xs text-[#666666]">
            {critical.affectedCustomers} accounts need action today
          </p>
        </div>
      </div>
      <Link
        href="/lifecycle"
        className="inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold text-[#1a1a1a] transition-colors hover:text-[#e74c3c]"
      >
        View at-risk accounts
        <ArrowRight className="h-3.5 w-3.5" aria-hidden />
      </Link>
    </div>
  );
}
