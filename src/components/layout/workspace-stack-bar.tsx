"use client";

import { ChevronRight } from "lucide-react";
import { StackIntegrationMark } from "@/components/ui/stack-integration-mark";
import { cn } from "@/lib/utils";
import { stackIntegrations } from "@/lib/mock-data";
import { getStackIntegrationBrandClass } from "@/lib/stack-integration-meta";

function StackBarConnector({ index }: { index: number }) {
  return (
    <span
      className="stack-bar__connector"
      aria-hidden
      style={{ ["--connector-delay" as string]: `${index * 0.45}s` }}
    >
      <span className="stack-bar__connector-rail">
        <span className="stack-bar__connector-beam" />
      </span>
      <ChevronRight className="stack-bar__connector-chevron" strokeWidth={2.5} />
    </span>
  );
}

export function WorkspaceStackBar() {
  const healthySources = stackIntegrations.filter((s) => s.status === "connected").length;
  const totalSources = stackIntegrations.length;

  return (
    <section className="stack-bar" aria-label="Connected stack">
      <div className="stack-bar__inner">
        <div className="stack-bar__center">
          <span className="stack-bar__label">Stack</span>
          <div className="stack-bar__track">
            {stackIntegrations.map((source, index) => (
              <div key={source.name} className="stack-bar__segment">
                <span
                  className={cn(
                    "stack-bar__node",
                    getStackIntegrationBrandClass(source.name),
                    source.status === "connected" && "stack-bar__node--healthy"
                  )}
                  style={{ ["--node-pulse-delay" as string]: `${index * 0.35}s` }}
                  title={`${source.role} · ${source.latency}`}
                >
                  <StackIntegrationMark name={source.name} />
                  {source.name}
                  {source.status === "connected" && (
                    <span className="stack-bar__dot" aria-hidden />
                  )}
                </span>
                {index < stackIntegrations.length - 1 ? (
                  <StackBarConnector index={index} />
                ) : null}
              </div>
            ))}
          </div>
          <span className="stack-bar__summary">
            {healthySources}/{totalSources} healthy
          </span>
        </div>
      </div>
    </section>
  );
}
