"use client";

import { cn, formatCurrency } from "@/lib/utils";
import type { AIInsight, NextBestAction, PriorityAccount } from "@/types";

function matchAction(account: PriorityAccount, actions: NextBestAction[]) {
  return actions.find(
    (a) =>
      a.customerName?.toLowerCase() === account.company.toLowerCase() ||
      a.title.toLowerCase().includes(account.company.split(" ")[0].toLowerCase())
  );
}

const urgencyTone: Record<string, string> = {
  critical: "bg-[#fde8ea] text-[#c0392b]",
  high: "bg-[#fff8e6] text-[#b8860b]",
  medium: "bg-[#eef2f7] text-[#5a6a7a]",
};

const healthBarTone: Record<string, string> = {
  healthy: "bg-[#27ae60]",
  watch: "bg-[#c9a000]",
  at_risk: "bg-[#e74c3c]",
  critical: "bg-[#c0392b]",
};

export function AIIntelligenceBand({
  accounts,
  actions,
  insights,
}: {
  accounts: PriorityAccount[];
  actions: NextBestAction[];
  insights: AIInsight[];
}) {
  const topAccount = accounts[0];
  const topAction = topAccount ? matchAction(topAccount, actions) : actions[0];
  const criticalInsight = insights.find((i) => i.severity === "critical") ?? insights[0];

  return (
    <section id="section-actions" className="ai-intelligence-band shrink-0">
      <div className="ai-intelligence-band__grid grid grid-cols-1 divide-y divide-[#e8e8e8] border-b border-[#e8e8e8] bg-white lg:grid-cols-12 lg:divide-x lg:divide-y-0">
        {criticalInsight && (
          <div className="ai-intelligence-band__panel px-5 py-4 lg:col-span-3">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-[#f1c40f]">
              Anomaly · {criticalInsight.confidence}% confidence
            </p>
            <p className="mt-1.5 text-sm font-semibold leading-snug text-[#1a1a1a]">
              {criticalInsight.title}
            </p>
            <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-[#666]">
              {criticalInsight.summary}
            </p>
            <p className="mt-2 text-[10px] font-medium text-[#888]">
              {criticalInsight.affectedCustomers} accounts affected
            </p>
          </div>
        )}

        <div className="ai-intelligence-band__panel px-5 py-4 lg:col-span-5">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-[#f1c40f]">
            Next best action
          </p>
          {topAccount && (
            <>
              <div className="mt-2 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-base font-bold text-[#1a1a1a]">{topAccount.company}</p>
                  <p className="mt-0.5 text-[11px] text-[#666]">{topAccount.reason}</p>
                </div>
                <span
                  className={cn(
                    "rounded px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
                    urgencyTone[topAccount.urgency] ?? urgencyTone.medium
                  )}
                >
                  {topAccount.urgency}
                </span>
              </div>
              {topAction && (
                <p className="mt-3 text-sm font-medium leading-snug text-[#1a1a1a]">
                  → {topAction.title}
                </p>
              )}
              <div className="mt-3 flex flex-wrap items-center gap-3 text-[10px] text-[#888]">
                <span>{formatCurrency(topAccount.mrr)} MRR</span>
                <span>·</span>
                <span>{topAccount.owner}</span>
                <span>·</span>
                <span className="font-semibold tabular-nums text-[#e74c3c]">
                  Health {topAccount.healthScore}
                </span>
              </div>
            </>
          )}
        </div>

        <div className="ai-intelligence-band__panel px-5 py-4 lg:col-span-4">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-[#999]">
            Priority queue
          </p>
          <ul className="mt-2 space-y-2">
            {accounts.slice(0, 3).map((account, i) => (
              <li
                key={account.id}
                className="rounded-md border border-[#eeeeee] px-2.5 py-2"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-[11px] font-semibold text-[#1a1a1a]">
                    {account.company}
                  </p>
                  <span className="shrink-0 text-[10px] font-semibold tabular-nums text-[#666]">
                    {account.healthScore}
                  </span>
                </div>
                <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-[#ececec]">
                  <div
                    className={cn(
                      "h-full rounded-full",
                      healthBarTone[account.healthStatus] ?? "bg-[#aaa]"
                    )}
                    style={{ width: `${account.healthScore}%` }}
                  />
                </div>
                <p className="mt-1 truncate text-[10px] text-[#888]">{account.reason}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/** @deprecated Use AIIntelligenceBand */
export const AIIntelligenceRail = AIIntelligenceBand;
