import { AppShell } from "@/components/layout/sidebar";
import { PageSectionHeader } from "@/components/layout/page-section-header";
import { InsightCard } from "@/components/insights/insight-card";
import { AIStreamSummary, SignalProcessor } from "@/components/ai/ai-stream";
import { NextBestActionPanel } from "@/components/actions/next-best-action";
import { StackDiagram } from "@/components/architecture/stack-diagram";
import { aiInsights, nextBestActions } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

const categories = [
  { name: "Churn Risk", count: aiInsights.filter((i) => i.category === "churn").length, color: "destructive" },
  { name: "Onboarding", count: aiInsights.filter((i) => i.category === "onboarding").length, color: "info" },
  { name: "Engagement", count: aiInsights.filter((i) => i.category === "engagement").length, color: "default" },
  { name: "Workload", count: aiInsights.filter((i) => i.category === "workload").length, color: "warning" },
  { name: "Renewal", count: aiInsights.filter((i) => i.category === "renewal").length, color: "warning" },
  { name: "Expansion", count: aiInsights.filter((i) => i.category === "expansion").length, color: "success" },
];

export default function InsightsPage() {
  return (
    <AppShell>
      <PageSectionHeader
        title="AI Intelligence Layer"
        description="Synthesizing signals from Snowflake, Hightouch, and Braze to generate actionable operational insights and recommendations."
        pills={[
          { label: "GPT-4o" },
          { label: "5 active signals", accent: true },
          { label: "847 accounts monitored" },
        ]}
        meta="Last analysis: 2m ago"
      />
      <div className="flex-1 overflow-y-auto space-y-6 p-8">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <AIStreamSummary />
          </div>
          <SignalProcessor />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="glass-card lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-sm">Insight Categories</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {categories.map((cat) => (
                <div key={cat.name} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{cat.name}</span>
                  <Badge variant={cat.color as "destructive" | "info" | "default" | "warning" | "success"}>
                    {cat.count}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
          <div className="lg:col-span-2">
            <StackDiagram compact />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <h2 className="text-sm font-semibold">Active Insights</h2>
            </div>
            {aiInsights.map((insight) => (
              <InsightCard key={insight.id} insight={insight} />
            ))}
          </div>
          <NextBestActionPanel actions={nextBestActions} />
        </div>
      </div>
    </AppShell>
  );
}
