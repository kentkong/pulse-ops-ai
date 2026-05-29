"use client";

import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
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
      <p className="font-bold text-foreground">{label}</p>
      {payload.map((entry) => (
        <p key={entry.name} style={{ color: entry.color }}>
          {entry.name}: {entry.value}
        </p>
      ))}
    </div>
  );
}

export function InflowVsResolved({ data }: { data: ChartDataPoint[] }) {
  const totalInflow = data.reduce((s, d) => s + d.value, 0);
  const totalResolved = data.reduce((s, d) => s + (d.secondary ?? 0), 0);

  return (
    <div id="section-lifecycle-chart">
      <h2 className="heading-display mb-2 text-center">
        Inflow vs. <span>Resolved</span>
      </h2>
      <p className="mb-8 text-center text-sm text-muted-foreground">
        Events created vs. workflows completed — are you getting ahead this week?
      </p>
      <div className="mx-auto mb-8 flex max-w-sm justify-center gap-10 text-center">
        <div>
          <p className="text-2xl font-bold">{totalInflow}</p>
          <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            Events Created
          </p>
        </div>
        <div>
          <p className="text-2xl font-bold text-[#f1c40f]">{totalResolved}</p>
          <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            Workflows Completed
          </p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <ComposedChart data={data}>
          <CartesianGrid stroke="#e0e0e0" strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" stroke="#999" fontSize={11} tickLine={false} axisLine={false} />
          <YAxis stroke="#999" fontSize={11} tickLine={false} axisLine={false} />
          <Tooltip content={<ChartTooltip />} />
          <Legend wrapperStyle={{ fontSize: 11, paddingTop: 16 }} />
          <Bar dataKey="value" name="Events Created" fill="#dddddd" radius={[3, 3, 0, 0]} barSize={24} />
          <Line
            type="monotone"
            dataKey="secondary"
            name="Workflows Completed"
            stroke="#f1c40f"
            strokeWidth={3}
            dot={{ fill: "#f1c40f", r: 4, strokeWidth: 0 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
      <div className="chevron-down" />
    </div>
  );
}
