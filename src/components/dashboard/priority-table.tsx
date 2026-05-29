import Link from "next/link";
import { cn, formatCurrency } from "@/lib/utils";
import type { PriorityAccount } from "@/types";
import { ArrowUpRight } from "lucide-react";

const riskStyles = {
  critical: "bg-[#e74c3c] text-white",
  high: "bg-[#f1c40f] text-[#1a1a1a]",
  medium: "bg-[#eeeeee] text-[#666]",
};

export function PriorityTable({ accounts }: { accounts: PriorityAccount[] }) {
  return (
    <div id="section-priority">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="heading-display">
          Top Priority <span>Accounts</span>
        </h2>
        <Link
          href="/lifecycle"
          className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-foreground hover:text-[#f1c40f]"
        >
          View All
          <ArrowUpRight className="h-3 w-3" />
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-[#1a1a1a] text-left">
              <th className="pb-3 pr-6 text-[10px] font-bold uppercase tracking-widest">Account</th>
              <th className="pb-3 pr-6 text-[10px] font-bold uppercase tracking-widest">Risk</th>
              <th className="pb-3 pr-6 text-[10px] font-bold uppercase tracking-widest">Issue</th>
              <th className="pb-3 pr-6 text-[10px] font-bold uppercase tracking-widest">Next Action</th>
              <th className="pb-3 text-[10px] font-bold uppercase tracking-widest">Owner</th>
            </tr>
          </thead>
          <tbody>
            {accounts.slice(0, 5).map((account) => (
              <tr key={account.id} className="border-b border-border last:border-0">
                <td className="py-5 pr-6">
                  <p className="font-bold">{account.company}</p>
                  <p className="text-xs text-muted-foreground">{formatCurrency(account.mrr)} MRR</p>
                </td>
                <td className="py-5 pr-6">
                  <span
                    className={cn(
                      "inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wide",
                      riskStyles[account.urgency === "critical" ? "critical" : account.urgency === "high" ? "high" : "medium"]
                    )}
                  >
                    {account.urgency === "critical" || account.urgency === "high" ? "High" : "Medium"}
                  </span>
                </td>
                <td className="py-5 pr-6 text-muted-foreground">{account.reason}</td>
                <td className="py-5 pr-6">
                  <span className="btn-primary !py-1.5 !px-4 !text-[10px]">Review</span>
                </td>
                <td className="py-5">
                  <div className="circle-accent mx-auto h-8 w-8 text-[10px]">
                    {account.owner.split(" ").map((n) => n[0]).join("")}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
