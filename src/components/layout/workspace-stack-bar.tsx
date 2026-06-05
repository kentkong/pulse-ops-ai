"use client";

import { StackIntegrationMark } from "@/components/ui/stack-integration-mark";
import { cn } from "@/lib/utils";
import { stackIntegrations } from "@/lib/mock-data";
import { getStackIntegrationBrandClass } from "@/lib/stack-integration-meta";

function StackBarConnector({ index }: { index: number }) {
  return (
    <span
      className="stack-bar__connector"
      aria-hidden
      style={{ ["--connector-delay" as string]: `${index * 0.35}s` }}
    >
      <svg className="stack-bar__connector-svg" width="28" height="10" viewBox="0 0 28 10">
        <line
          className="stack-bar__connector-line"
          x1="0"
          y1="5"
          x2="22"
          y2="5"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeDasharray="4 4"
        />
        <polygon className="stack-bar__connector-head" points="22,2 28,5 22,8" fill="currentColor" />
      </svg>
    </span>
  );
}

export function WorkspaceStackBar() {
  const healthySources = stackIntegrations.filter((s) => s.status === "connected").length;
  const totalSources = stackIntegrations.length;

  return (
    <section className="stack-bar" aria-label="Connected stack">
      <div className="stack-bar__inner">
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
    </section>
  );
}
