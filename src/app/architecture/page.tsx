import { AppShell } from "@/components/layout/sidebar";
import { PageSectionHeader } from "@/components/layout/page-section-header";
import { StackDiagram } from "@/components/architecture/stack-diagram";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { stackIntegrations } from "@/lib/mock-data";
import {
  Database,
  Layers,
  MessageSquare,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const dataFlows = [
  { from: "Snowflake", to: "Hightouch", data: "Customer profiles, usage events, subscription data" },
  { from: "Hightouch", to: "Braze", data: "Audience segments, churn scores, engagement attributes" },
  { from: "Braze", to: "Pulse-Ops AI", data: "Campaign delivery, journey events, engagement metrics" },
  { from: "Snowflake", to: "Pulse-Ops AI", data: "Raw event stream, health indicators, SLA data" },
];

const responsibilities = [
  {
    tool: "Snowflake",
    icon: Database,
    layer: "Data Layer",
    items: ["Customer profiles & firmographics", "Product usage & feature events", "Subscription & billing activity", "Support interaction history"],
  },
  {
    tool: "Hightouch",
    icon: Layers,
    layer: "Orchestration Layer",
    items: ["Reverse ETL to engagement tools", "Lifecycle segmentation", "Churn-risk score syncing", "Engagement attribute activation"],
  },
  {
    tool: "Braze",
    icon: MessageSquare,
    layer: "Engagement Layer",
    items: ["Onboarding journey canvases", "Feature adoption messaging", "Retention & win-back campaigns", "Renewal communication flows"],
  },
  {
    tool: "Pulse-Ops AI",
    icon: Sparkles,
    layer: "Intelligence Layer",
    items: ["Operational visibility dashboard", "AI-generated lifecycle insights", "Workflow prioritization", "Next-best-action recommendations"],
  },
];

export default function ArchitecturePage() {
  return (
    <AppShell>
      <PageSectionHeader
        title="Stack Architecture"
        description="Pulse-Ops AI sits above the stack — unifying warehouse data, reverse ETL activation, and lifecycle engagement into one operational intelligence layer."
        pills={[{ label: "4 integrations" }, { label: "All operational", accent: true }]}
      />
      <div className="space-y-6 p-8">
        <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Warehouse-native lifecycle ops unify customer data in Snowflake, activate segments through
          Hightouch, orchestrate engagement in Braze, and layer Pulse-Ops AI intelligence on top —
          one operational model instead of disconnected tools.
        </p>

        <div className="grid gap-6 lg:grid-cols-2">
          <StackDiagram />
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Data Flow Map</CardTitle>
              <p className="text-xs text-muted-foreground">How intelligence moves through the stack</p>
            </CardHeader>
            <CardContent className="space-y-3">
              {dataFlows.map((flow) => (
                <div
                  key={`${flow.from}-${flow.to}`}
                  className="rounded-lg border border-border/50 bg-accent/20 p-4"
                >
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <span className="text-primary">{flow.from}</span>
                    <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-primary">{flow.to}</span>
                  </div>
                  <p className="mt-1.5 text-xs text-muted-foreground">{flow.data}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {responsibilities.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.tool} className="glass-card">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-primary" />
                    <CardTitle className="text-sm">{item.tool}</CardTitle>
                  </div>
                  <Badge variant="outline" className="w-fit text-[10px]">{item.layer}</Badge>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {item.items.map((resp) => (
                      <li key={resp} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                        {resp}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Integration Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-4">
              {stackIntegrations.map((integration) => (
                <div
                  key={integration.name}
                  className="flex items-center justify-between rounded-lg border border-border/50 bg-accent/20 px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-medium">{integration.name}</p>
                    <p className="text-[10px] text-muted-foreground">{integration.role}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="success" className="text-[10px]">{integration.status}</Badge>
                    <p className="mt-1 font-mono text-[10px] text-muted-foreground">{integration.latency}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
