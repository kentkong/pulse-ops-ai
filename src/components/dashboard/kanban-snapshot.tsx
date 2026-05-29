import type { KanbanColumn } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HealthBar } from "@/components/ui/progress";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const healthVariant = {
  healthy: "success" as const,
  watch: "warning" as const,
  at_risk: "destructive" as const,
  critical: "destructive" as const,
};

export function KanbanSnapshot({ columns }: { columns: KanbanColumn[] }) {
  return (
    <Card className="glass-card scroll-mt-24" id="section-kanban">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Lifecycle Kanban Snapshot</CardTitle>
          <p className="mt-1 text-xs text-muted-foreground">
            Current account distribution across lifecycle stages — your operational next-up lane
          </p>
        </div>
        <Link
          href="/lifecycle"
          className="flex items-center gap-1 text-xs text-primary hover:underline"
        >
          Open full view
          <ArrowUpRight className="h-3 w-3" />
        </Link>
      </CardHeader>
      <CardContent>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {columns.map((column) => (
            <div
              key={column.id}
              className="flex w-52 shrink-0 flex-col rounded-xl border border-border/50 bg-accent/20"
            >
              <div className="flex items-center justify-between border-b border-border/50 px-3 py-2">
                <span className="text-xs font-semibold">{column.title}</span>
                <Badge variant="secondary" className="text-[10px]">
                  {column.items.length}
                </Badge>
              </div>
              <div className="flex flex-1 flex-col gap-2 p-2">
                {column.items.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-lg border border-border/50 bg-card p-2.5 transition-colors hover:border-primary/30"
                  >
                    <p className="text-xs font-medium">{item.company}</p>
                    {item.label && (
                      <p className="mt-0.5 text-[10px] text-muted-foreground">{item.label}</p>
                    )}
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-[10px] text-muted-foreground">{item.owner}</span>
                      <Badge variant={healthVariant[item.healthStatus]} className="text-[9px]">
                        {item.healthScore}
                      </Badge>
                    </div>
                    <HealthBar value={item.healthScore} className="mt-1.5" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
