import { cn } from "@/lib/utils";
import type { OpsCoverageMember } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const statusConfig = {
  available: { label: "Available", variant: "success" as const },
  focused: { label: "Focused", variant: "info" as const },
  at_capacity: { label: "At capacity", variant: "warning" as const },
};

export function OpsCoveragePanel({ members }: { members: OpsCoverageMember[] }) {
  const available = members.filter((m) => m.status === "available").length;
  const focused = members.filter((m) => m.status === "focused").length;
  const atCapacity = members.filter((m) => m.status === "at_capacity").length;

  return (
    <Card className="glass-card scroll-mt-24" id="section-coverage">
      <CardHeader>
        <CardTitle>Account Coverage</CardTitle>
        <p className="text-xs text-muted-foreground">
          Operational ownership and capacity across the lifecycle team
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-lg bg-success/10 p-3 text-center">
            <p className="text-xl font-semibold text-success">{available}</p>
            <p className="text-[10px] text-muted-foreground">Available</p>
          </div>
          <div className="rounded-lg bg-info/10 p-3 text-center">
            <p className="text-xl font-semibold text-info">{focused}</p>
            <p className="text-[10px] text-muted-foreground">Focused</p>
          </div>
          <div className="rounded-lg bg-warning/10 p-3 text-center">
            <p className="text-xl font-semibold text-warning">{atCapacity}</p>
            <p className="text-[10px] text-muted-foreground">At capacity</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs text-muted-foreground">
                <th className="pb-2 pr-4 font-medium">Owner</th>
                <th className="pb-2 pr-4 font-medium">Status</th>
                <th className="pb-2 pr-4 font-medium">Accounts</th>
                <th className="pb-2 pr-4 font-medium">At-risk</th>
                <th className="pb-2 pr-4 font-medium">Today</th>
                <th className="pb-2 font-medium">Note</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => {
                const config = statusConfig[member.status];
                return (
                  <tr
                    key={member.id}
                    className="border-b border-border/50 transition-colors hover:bg-accent/30"
                  >
                    <td className="py-2.5 pr-4">
                      <p className="font-medium">{member.name}</p>
                      <p className="text-[10px] text-muted-foreground">{member.role}</p>
                    </td>
                    <td className="py-2.5 pr-4">
                      <Badge variant={config.variant} className="text-[10px]">
                        {config.label}
                      </Badge>
                    </td>
                    <td className="py-2.5 pr-4">{member.accountsOwned}</td>
                    <td className={cn("py-2.5 pr-4", member.atRiskCount > 5 && "text-destructive font-medium")}>
                      {member.atRiskCount}
                    </td>
                    <td className="py-2.5 pr-4">{member.actionsToday}</td>
                    <td className="py-2.5 text-xs text-muted-foreground">{member.note ?? "—"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
