import {
  Activity,
  AlertTriangle,
  Mail,
  Ticket,
  TrendingUp,
  UserCheck,
  UserX,
  Zap,
} from "lucide-react";
import { cn, formatRelativeTime } from "@/lib/utils";
import type { CustomerEvent, EventType } from "@/types";
import { Badge } from "@/components/ui/badge";

const eventConfig: Record<
  EventType,
  { icon: typeof Activity; color: string; label: string }
> = {
  product_usage: { icon: Activity, color: "text-info", label: "Usage" },
  feature_engagement: { icon: Zap, color: "text-primary", label: "Feature" },
  support_ticket: { icon: Ticket, color: "text-warning", label: "Support" },
  inactivity: { icon: UserX, color: "text-destructive", label: "Inactivity" },
  subscription_upgrade: { icon: TrendingUp, color: "text-success", label: "Upgrade" },
  onboarding_complete: { icon: UserCheck, color: "text-success", label: "Onboarding" },
  campaign_sent: { icon: Mail, color: "text-muted-foreground", label: "Campaign" },
  churn_signal: { icon: AlertTriangle, color: "text-destructive", label: "Churn Signal" },
};

const severityVariant = {
  low: "secondary" as const,
  medium: "warning" as const,
  high: "destructive" as const,
};

export function EventFeed({ events, compact = false }: { events: CustomerEvent[]; compact?: boolean }) {
  return (
    <div className="space-y-1">
      {events.map((event, index) => {
        const config = eventConfig[event.type];
        const Icon = config.icon;

        return (
          <div
            key={event.id}
            className={cn(
              "group flex gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-accent/50",
              !compact && "border border-transparent hover:border-border"
            )}
          >
            <div className="relative flex flex-col items-center">
              <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary", config.color)}>
                <Icon className="h-3.5 w-3.5" />
              </div>
              {index < events.length - 1 && (
                <div className="mt-1 w-px flex-1 bg-border" />
              )}
            </div>
            <div className="min-w-0 flex-1 pb-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-medium">{event.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {event.company} · {event.customerName}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <Badge variant={severityVariant[event.severity]} className="text-[10px]">
                    {config.label}
                  </Badge>
                  <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                    {formatRelativeTime(event.timestamp)}
                  </span>
                </div>
              </div>
              {!compact && (
                <p className="mt-1 text-xs text-muted-foreground">{event.description}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
