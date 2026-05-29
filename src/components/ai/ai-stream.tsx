"use client";

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FULL_TEXT =
  "PulseOps detected 5 operational signals in the last 24 hours. 1 critical requiring immediate attention — churn risk cluster in mid-market segment. 1 expansion opportunity identified in enterprise tier. Primary concern: onboarding completion rate dropped 2.1% with a bottleneck at the integration step. Recommend activating retention playbook for 8 accounts and accelerated onboarding for stalled integrations.";

export function AIStreamSummary({ className }: { className?: string }) {
  const [text, setText] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= FULL_TEXT.length) {
        setText(FULL_TEXT.slice(0, i));
        i++;
      } else {
        setDone(true);
        clearInterval(interval);
      }
    }, 18);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className={cn("gradient-border overflow-hidden", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Sparkles className="h-4 w-4 text-primary" />
              {!done && (
                <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-primary animate-pulse-glow" />
              )}
            </div>
            <CardTitle>AI Operational Summary</CardTitle>
          </div>
          <span className="text-[10px] font-mono text-muted-foreground">
            {done ? "Analysis complete" : "Analyzing signals..."}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {text}
          {!done && <span className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-primary" />}
        </p>
        {done && (
          <div className="mt-4 flex flex-wrap gap-2">
            {["Churn Risk", "Onboarding", "Expansion", "SLA"].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-primary/20 bg-primary/5 px-2.5 py-0.5 text-[10px] font-medium text-primary"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function SignalProcessor() {
  const steps = [
    { label: "Ingesting Snowflake events", status: "complete" as const },
    { label: "Syncing Hightouch segments", status: "complete" as const },
    { label: "Correlating Braze engagement", status: "complete" as const },
    { label: "Running AI analysis", status: "active" as const },
    { label: "Generating recommendations", status: "pending" as const },
  ];

  return (
    <Card className="glass-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm">AI Signal Processing</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {steps.map((step, i) => (
          <div key={step.label} className="flex items-center gap-3">
            <div
              className={cn(
                "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold",
                step.status === "complete" && "bg-success/20 text-success",
                step.status === "active" && "bg-primary/20 text-primary animate-pulse-glow",
                step.status === "pending" && "bg-secondary text-muted-foreground"
              )}
            >
              {step.status === "complete" ? "✓" : i + 1}
            </div>
            <span
              className={cn(
                "text-xs",
                step.status === "complete" && "text-muted-foreground",
                step.status === "active" && "font-medium text-foreground",
                step.status === "pending" && "text-muted-foreground/50"
              )}
            >
              {step.label}
            </span>
            {step.status === "active" && (
              <span className="ml-auto text-[10px] text-primary">Processing...</span>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
