import { cn, formatCurrency, formatRelativeTime } from "@/lib/utils";
import type { Customer, LifecycleStage } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HealthBar } from "@/components/ui/progress";

const stageLabels: Record<LifecycleStage, string> = {
  onboarding: "Onboarding",
  activation: "Activation",
  adoption: "Adoption",
  expansion: "Expansion",
  renewal: "Renewal",
  at_risk: "At Risk",
};

const stageVariant: Record<LifecycleStage, "default" | "info" | "success" | "warning" | "destructive"> = {
  onboarding: "info",
  activation: "default",
  adoption: "success",
  expansion: "success",
  renewal: "warning",
  at_risk: "destructive",
};

const healthVariant = {
  healthy: "success" as const,
  watch: "warning" as const,
  at_risk: "destructive" as const,
  critical: "destructive" as const,
};

export function CustomerTable({ customers }: { customers: Customer[] }) {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Customer Lifecycle Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs text-muted-foreground">
                <th className="pb-3 pr-4 font-medium">Customer</th>
                <th className="pb-3 pr-4 font-medium">Stage</th>
                <th className="pb-3 pr-4 font-medium">Health</th>
                <th className="pb-3 pr-4 font-medium">Engagement</th>
                <th className="pb-3 pr-4 font-medium">MRR</th>
                <th className="pb-3 pr-4 font-medium">Features</th>
                <th className="pb-3 pr-4 font-medium">Owner</th>
                <th className="pb-3 font-medium">Last Active</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr
                  key={customer.id}
                  className="border-b border-border/50 transition-colors hover:bg-accent/30"
                >
                  <td className="py-3 pr-4">
                    <div>
                      <p className="font-medium">{customer.company}</p>
                      <p className="text-xs text-muted-foreground">{customer.name}</p>
                    </div>
                  </td>
                  <td className="py-3 pr-4">
                    <Badge variant={stageVariant[customer.stage]}>
                      {stageLabels[customer.stage]}
                    </Badge>
                  </td>
                  <td className="py-3 pr-4">
                    <div className="w-24 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium">{customer.healthScore}</span>
                        <Badge variant={healthVariant[customer.healthStatus]} className="text-[9px]">
                          {customer.healthStatus}
                        </Badge>
                      </div>
                      <HealthBar value={customer.healthScore} />
                    </div>
                  </td>
                  <td className="py-3 pr-4">
                    <span className={cn(
                      "font-medium",
                      customer.engagementScore >= 70 ? "text-success" : customer.engagementScore >= 50 ? "text-warning" : "text-destructive"
                    )}>
                      {customer.engagementScore}
                    </span>
                  </td>
                  <td className="py-3 pr-4 font-medium">{formatCurrency(customer.mrr)}</td>
                  <td className="py-3 pr-4 text-muted-foreground">
                    {customer.featuresAdopted}/{customer.totalFeatures}
                  </td>
                  <td className="py-3 pr-4 text-muted-foreground">{customer.owner}</td>
                  <td className="py-3 text-muted-foreground">{formatRelativeTime(customer.lastActive)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

export function LifecycleStageCards({ customers }: { customers: Customer[] }) {
  const stages: LifecycleStage[] = ["onboarding", "activation", "adoption", "expansion", "renewal", "at_risk"];

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
      {stages.map((stage) => {
        const stageCustomers = customers.filter((c) => c.stage === stage);
        const avgHealth =
          stageCustomers.length > 0
            ? Math.round(stageCustomers.reduce((sum, c) => sum + c.healthScore, 0) / stageCustomers.length)
            : 0;

        return (
          <Card key={stage} className="glass-card transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
            <CardContent className="p-4">
              <Badge variant={stageVariant[stage]} className="mb-2">
                {stageLabels[stage]}
              </Badge>
              <p className="text-2xl font-semibold">{stageCustomers.length}</p>
              <p className="mt-1 text-xs text-muted-foreground">Avg health: {avgHealth}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
