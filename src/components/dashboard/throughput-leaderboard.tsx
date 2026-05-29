"use client";

import { Sparkline } from "@/components/ui/sparkline";
import type { ThroughputEntry } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function ThroughputLeaderboard({ entries }: { entries: ThroughputEntry[] }) {
  const sorted = [...entries].sort((a, b) => b.lastWeek - a.lastWeek);

  return (
    <Card className="glass-card scroll-mt-24" id="section-throughput">
      <CardHeader>
        <CardTitle>Ops Throughput Leaderboard</CardTitle>
        <p className="text-xs text-muted-foreground">
          Actions resolved last week — with each owner&apos;s 8-week trend, sorted by last-week total
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        {sorted.map((entry, index) => {
          const prevWeek = entry.trend[entry.trend.length - 2] ?? entry.lastWeek;
          const delta = entry.lastWeek - prevWeek;
          const isUp = delta >= 0;

          return (
            <div
              key={entry.id}
              className="flex items-center gap-4 rounded-xl border border-border/50 bg-accent/20 p-3 transition-colors hover:border-primary/30"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
                {index + 1}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium">{entry.name}</p>
                  <Badge variant="outline" className="text-[10px]">{entry.role}</Badge>
                </div>
                <p className="text-[10px] text-muted-foreground">Last 8 weeks</p>
              </div>
              <Sparkline
                data={entry.trend}
                color={isUp ? "#22c55e" : "#f59e0b"}
                height={32}
                className="hidden sm:block"
              />
              <div className="text-right">
                <p className="text-lg font-semibold">{entry.lastWeek}</p>
                <p className={`text-[10px] font-medium ${isUp ? "text-success" : "text-warning"}`}>
                  {isUp ? "+" : ""}{delta} vs prior
                </p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
