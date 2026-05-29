"use client";

import { cn } from "@/lib/utils";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { ChartDataPoint } from "@/types";

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number; name: string; color: string }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-md border border-border bg-white px-3 py-2 text-xs shadow-md">
      <p className="font-bold">{label}</p>
      {payload.map((entry) => (
        <p key={entry.name} style={{ color: entry.color }}>
          {entry.name}: {entry.value}
        </p>
      ))}
    </div>
  );
}

export function WorkloadChart({ data }: { data: ChartDataPoint[] }) {
  const inflow = data.reduce((s, d) => s + d.value, 0);
  const resolved = data.reduce((s, d) => s + (d.secondary ?? 0), 0);
  const gap = inflow - resolved;
  const behind = gap > 0;

  return (
    <div id="section-lifecycle-chart">
      <div className="mb-4">
        <p className="section-label">Ops Throughput</p>
        <h2 className="mt-1 text-lg font-bold uppercase tracking-wide">
          Is your team keeping up?
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          New lifecycle events vs. workflows your team closed this week.
        </p>
      </div>

      <div className="mb-4 flex flex-wrap gap-6">
        <div>
          <p className="text-xl font-bold">{inflow}</p>
          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            Events in
          </p>
        </div>
        <div>
          <p className="text-xl font-bold text-[#f1c40f]">{resolved}</p>
          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            Resolved
          </p>
        </div>
        <div
          className={
            behind
              ? "rounded-md border border-[#e74c3c]/30 bg-[#fff5f5] px-3 py-1"
              : "rounded-md border border-[#27ae60]/30 bg-[#f5fff8] px-3 py-1"
          }
        >
          <p className={cn("text-sm font-bold", behind ? "text-[#e74c3c]" : "text-[#27ae60]")}>
            {behind ? `${gap} behind pace` : "Ahead of pace"}
          </p>
          <p className="text-[10px] text-muted-foreground">vs. last week</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={180}>
        <ComposedChart data={data}>
          <CartesianGrid stroke="#e0e0e0" strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" stroke="#999" fontSize={10} tickLine={false} axisLine={false} />
          <YAxis stroke="#999" fontSize={10} tickLine={false} axisLine={false} width={28} />
          <Tooltip content={<ChartTooltip />} />
          <Bar dataKey="value" name="Events In" fill="#dddddd" radius={[2, 2, 0, 0]} barSize={20} />
          <Line
            type="monotone"
            dataKey="secondary"
            name="Resolved"
            stroke="#f1c40f"
            strokeWidth={2.5}
            dot={{ fill: "#f1c40f", r: 3, strokeWidth: 0 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
