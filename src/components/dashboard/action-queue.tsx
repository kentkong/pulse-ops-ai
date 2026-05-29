"use client";

import { cn, formatCurrency } from "@/lib/utils";
import type { NextBestAction, PriorityAccount } from "@/types";
import { Sparkles, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const urgencyStyles = {
  critical: "ring-1 ring-[#e74c3c]/25",
  high: "ring-1 ring-[#f1c40f]/25",
  medium: "",
};

function matchAction(account: PriorityAccount, actions: NextBestAction[]) {
  return actions.find(
    (a) =>
      a.customerName?.toLowerCase() === account.company.toLowerCase() ||
      a.title.toLowerCase().includes(account.company.split(" ")[0].toLowerCase())
  );
}

export function ActionQueue({
  accounts,
  actions,
}: {
  accounts: PriorityAccount[];
  actions: NextBestAction[];
}) {
  const queue = accounts.slice(0, 4).map((account) => ({
    account,
    action: matchAction(account, actions),
  }));

  return (
    <div id="section-priority" className="flex h-full flex-col">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-[#f1c40f]" />
            <p className="section-label">AI Action Queue</p>
          </div>
          <h2 className="mt-1 text-lg font-bold uppercase tracking-wide">
            What ops should do next
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Ranked by revenue impact and urgency — each item includes a recommended playbook.
          </p>
        </div>
        <Link
          href="/lifecycle"
          className="flex shrink-0 items-center gap-1 text-[10px] font-bold uppercase tracking-wider hover:text-[#f1c40f]"
        >
          All accounts
          <ArrowUpRight className="h-3 w-3" />
        </Link>
      </div>

      <ol className="space-y-3">
        {queue.map(({ account, action }, i) => (
          <li
            key={account.id}
            className={cn(
              "rounded-md border border-border bg-white p-4 shadow-sm transition-shadow hover:shadow-md",
              urgencyStyles[account.urgency]
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1a1a1a] text-[10px] font-bold text-white">
                    {i + 1}
                  </span>
                  <p className="truncate font-bold">{account.company}</p>
                </div>
                <p className="mt-1.5 text-xs text-muted-foreground">{account.reason}</p>
                {action && (
                  <div className="mt-3 rounded bg-[#f4f4f4] px-3 py-2">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#c9a000]">
                      AI recommends
                    </p>
                    <p className="mt-0.5 text-sm font-medium leading-snug">{action.title}</p>
                    {action.estimatedImpact && (
                      <p className="mt-1 text-xs text-muted-foreground">{action.estimatedImpact}</p>
                    )}
                  </div>
                )}
              </div>
              <div className="shrink-0 text-right">
                <p className="text-sm font-bold">{formatCurrency(account.mrr)}</p>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">MRR</p>
                <div className="circle-accent mx-auto mt-2 h-7 w-7 text-[9px]">
                  {account.owner
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
