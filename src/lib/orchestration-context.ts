import { aiInsights, customers, workflows } from "@/lib/mock-data";

/** Page-aware context line under the global stack thesis. */
export function getOrchestrationContext(pathname: string): string {
  if (pathname === "/" || pathname.endsWith("/pulse-ops-ai") || pathname.endsWith("/pulse-ops-ai/")) {
    const atRisk = customers.filter(
      (c) => c.healthStatus === "at_risk" || c.healthStatus === "critical"
    ).length;
    return `${atRisk} at-risk accounts · ${aiInsights.length} AI signals active today`;
  }

  if (pathname.includes("/lifecycle")) {
    const atRisk = customers.filter(
      (c) => c.healthStatus === "at_risk" || c.healthStatus === "critical"
    ).length;
    return `847 accounts · ${atRisk} at risk · activation bottleneck in week 2`;
  }

  if (pathname.includes("/workflows")) {
    const active = workflows.filter((w) => w.status === "active").length;
    const paused = workflows.filter((w) => w.status === "paused").length;
    const avgCompletion = Math.round(
      workflows.reduce((sum, w) => sum + w.completionRate, 0) / workflows.length
    );
    return `${active} active workflows · ${paused} paused · ${avgCompletion}% avg completion`;
  }

  if (pathname.includes("/insights")) {
    const critical = aiInsights.filter((i) => i.severity === "critical").length;
    return `${aiInsights.length} active signals · ${critical} critical · last analysis 2m ago`;
  }

  if (pathname.includes("/events")) {
    return "Streaming · 4 event sources · real-time orchestration";
  }

  if (pathname.includes("/architecture")) {
    return "4 integrations connected · all systems operational";
  }

  return "Unified stack monitored in real time";
}
