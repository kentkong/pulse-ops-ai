"use client";

import { useEffect, useState } from "react";
import { AppShell } from "@/components/layout/sidebar";
import { PageSectionHeader } from "@/components/layout/page-section-header";
import { EventFeed } from "@/components/events/event-feed";
import { customerEvents as initialEvents } from "@/lib/mock-data";
import type { CustomerEvent } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap } from "lucide-react";

const simulatedEvents: Omit<CustomerEvent, "id" | "timestamp">[] = [
  {
    customerId: "cust_002",
    customerName: "Marcus Webb",
    company: "CloudScale Inc",
    type: "product_usage",
    title: "Dashboard session started",
    description: "User logged in and accessed analytics dashboard",
    severity: "low",
  },
  {
    customerId: "cust_001",
    customerName: "Sarah Chen",
    company: "NovaTech Solutions",
    type: "feature_engagement",
    title: "Integration wizard opened",
    description: "Customer started API integration setup flow",
    severity: "medium",
  },
  {
    customerId: "cust_004",
    customerName: "James Park",
    company: "FinFlow Systems",
    type: "product_usage",
    title: "Bulk export completed",
    description: "Exported 12,400 records via API",
    severity: "low",
  },
];

export default function EventsPage() {
  const [events, setEvents] = useState(initialEvents);
  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      const template = simulatedEvents[Math.floor(Math.random() * simulatedEvents.length)];
      const newEvent: CustomerEvent = {
        ...template,
        id: `evt_live_${Date.now()}`,
        timestamp: new Date(),
      };
      setEvents((prev) => [newEvent, ...prev.slice(0, 19)]);
    }, 8000);

    return () => clearInterval(interval);
  }, [isLive]);

  const highSeverity = events.filter((e) => e.severity === "high").length;
  const eventTypes = new Set(events.map((e) => e.type)).size;

  return (
    <AppShell>
      <PageSectionHeader
        title="Event Processing"
        description="Events from Snowflake, Braze, and support systems trigger AI analysis and workflow orchestration in real time."
        pills={[
          { label: isLive ? "Streaming" : "Paused", accent: isLive },
          { label: `${eventTypes} event types` },
        ]}
        meta={`${events.length} events in buffer`}
      />
      <div className="space-y-6 p-8">
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="glass-card">
            <CardContent className="flex items-center gap-3 p-5">
              <span
                className={`h-2.5 w-2.5 rounded-full ${isLive ? "animate-live-dot bg-success" : "bg-muted-foreground"}`}
              />
              <div>
                <p className="text-sm font-semibold">{isLive ? "Streaming" : "Paused"}</p>
                <p className="text-xs text-muted-foreground">Event ingestion</p>
              </div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-5">
              <p className="text-2xl font-semibold text-destructive">{highSeverity}</p>
              <p className="text-xs text-muted-foreground">High severity events</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="glass-card lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-primary" />
                <CardTitle>Live Feed</CardTitle>
              </div>
              <button
                onClick={() => setIsLive(!isLive)}
                className="rounded-md border border-border px-2.5 py-1 text-xs text-primary transition-colors hover:bg-primary/10"
              >
                {isLive ? "Pause stream" : "Resume stream"}
              </button>
            </CardHeader>
            <CardContent>
              <EventFeed events={events} />
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-sm">Event Sources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { source: "Snowflake", events: "Product usage, subscriptions", status: "active", latency: "12ms" },
                { source: "Braze", events: "Campaign delivery, canvas steps", status: "active", latency: "89ms" },
                { source: "Zendesk", events: "Support tickets, CSAT", status: "active", latency: "240ms" },
                { source: "Hightouch", events: "Segment updates, score changes", status: "active", latency: "340ms" },
              ].map((source) => (
                <div key={source.source} className="flex items-start justify-between rounded-lg border border-border/50 bg-accent/20 p-3">
                  <div>
                    <p className="text-sm font-medium">{source.source}</p>
                    <p className="text-xs text-muted-foreground">{source.events}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="success" className="text-[10px]">{source.status}</Badge>
                    <p className="mt-1 font-mono text-[10px] text-muted-foreground">{source.latency}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
