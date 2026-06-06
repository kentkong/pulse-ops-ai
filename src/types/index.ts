export type LifecycleStage =
  | "onboarding"
  | "activation"
  | "adoption"
  | "expansion"
  | "renewal"
  | "at_risk";

export type HealthStatus = "healthy" | "watch" | "at_risk" | "critical";

export type EventType =
  | "product_usage"
  | "feature_engagement"
  | "support_ticket"
  | "inactivity"
  | "subscription_upgrade"
  | "onboarding_complete"
  | "campaign_sent"
  | "churn_signal";

export type InsightSeverity = "info" | "warning" | "critical" | "opportunity";

export type WorkflowStatus = "active" | "paused" | "completed" | "pending";

export interface Customer {
  id: string;
  name: string;
  company: string;
  email: string;
  stage: LifecycleStage;
  healthScore: number;
  healthStatus: HealthStatus;
  engagementScore: number;
  mrr: number;
  daysInStage: number;
  lastActive: Date;
  owner: string;
  renewalDate: Date;
  featuresAdopted: number;
  totalFeatures: number;
}

export interface CustomerEvent {
  id: string;
  customerId: string;
  customerName: string;
  company: string;
  type: EventType;
  title: string;
  description: string;
  timestamp: Date;
  severity: "low" | "medium" | "high";
  metadata?: Record<string, string | number>;
}

export interface AIInsight {
  id: string;
  title: string;
  summary: string;
  category: "churn" | "onboarding" | "engagement" | "workload" | "renewal" | "expansion";
  severity: InsightSeverity;
  confidence: number;
  affectedCustomers: number;
  recommendedAction: string;
  source: "Snowflake" | "Hightouch" | "Braze" | "PulseOps AI";
  createdAt: Date;
}

export interface NextBestAction {
  id: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  type: "escalate" | "nurture" | "outreach" | "upsell" | "support";
  customerId?: string;
  customerName?: string;
  estimatedImpact: string;
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  status: WorkflowStatus;
  stage: LifecycleStage;
  triggerCount: number;
  completionRate: number;
  avgDuration: string;
  lastTriggered: Date;
  dependencies: string[];
  aiRecommendation?: string;
  pauseReason?: string;
}

export interface OperationalMetric {
  label: string;
  value: string | number;
  change: number;
  trend: "up" | "down" | "neutral";
  status?: HealthStatus;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  secondary?: number;
}

export interface SLARisk {
  id: string;
  label: string;
  current: number;
  threshold: number;
  unit: string;
  status: HealthStatus;
}

export interface GlanceStat {
  id: string;
  label: string;
  value: string | number;
  sublabel?: string;
  status?: HealthStatus;
  targetSection: string;
  change?: number;
  trend?: number[];
}

export interface KanbanItem {
  id: string;
  company: string;
  healthScore: number;
  healthStatus: HealthStatus;
  owner: string;
  label?: string;
}

export interface KanbanColumn {
  id: string;
  title: string;
  items: KanbanItem[];
}

export interface OpsCoverageMember {
  id: string;
  name: string;
  role: string;
  accountsOwned: number;
  atRiskCount: number;
  actionsToday: number;
  status: "available" | "focused" | "at_capacity";
  note?: string;
}

export interface PriorityAccount {
  id: string;
  company: string;
  reason: string;
  healthScore: number;
  healthStatus: HealthStatus;
  owner: string;
  mrr: number;
  urgency: "critical" | "high" | "medium";
}

export interface ThroughputEntry {
  id: string;
  name: string;
  role: string;
  lastWeek: number;
  trend: number[];
}
