"use client";

import { StackIntegrationMark } from "@/components/ui/stack-integration-mark";
import { cn } from "@/lib/utils";
import { stackIntegrations } from "@/lib/mock-data";
import { getStackIntegrationBrandClass } from "@/lib/stack-integration-meta";

function StackConnector({ index }: { index: number }) {
  return (
    <div
      className="stack-flow__connector"
      aria-hidden
      style={{ animationDelay: `${index * 120 + 400}ms` }}
    >
      <span className="stack-flow__connector-track" />
      <span className="stack-flow__connector-pulse" />
      <svg className="stack-flow__connector-arrow" viewBox="0 0 12 12" fill="none">
        <path
          d="M2 6h6M6 3l3 3-3 3"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export function StackFlowPanel() {
  const healthyCount = stackIntegrations.filter((s) => s.status === "connected").length;
  const totalCount = stackIntegrations.length;
  const allHealthy = healthyCount === totalCount;

  return (
    <div className="stack-flow" aria-label="Connected technology stack">
      <div className="stack-flow__surface">
        <div className="stack-flow__header">
          <div className="stack-flow__heading">
            <span className="stack-flow__eyebrow">Connected Stack</span>
            <p className="stack-flow__title">Your operational data pipeline</p>
          </div>
          <div className={cn("stack-flow__health", allHealthy && "stack-flow__health--ok")}>
            <span className="stack-flow__health-dot" aria-hidden />
            <span>
              {healthyCount}/{totalCount} healthy
            </span>
          </div>
        </div>

        <ol className="stack-flow__pipeline">
          {stackIntegrations.map((source, index) => (
            <li key={source.name} className="stack-flow__step">
              <article
                className={cn(
                  "stack-flow__node",
                  source.status === "connected" && "stack-flow__node--healthy"
                )}
                style={{ animationDelay: `${index * 90 + 120}ms` }}
                title={`${source.role} · ${source.latency}`}
              >
                <div
                  className={cn(
                    "stack-flow__node-box",
                    getStackIntegrationBrandClass(source.name)
                  )}
                >
                  <span className="stack-flow__node-icon">
                    <StackIntegrationMark name={source.name} />
                  </span>
                  <div className="stack-flow__node-copy">
                    <span className="stack-flow__node-name">{source.name}</span>
                    <span className="stack-flow__node-role">{source.role}</span>
                  </div>
                  <span className="stack-flow__node-latency">{source.latency}</span>
                  {source.status === "connected" && (
                    <span className="stack-flow__node-status" aria-label="Connected">
                      <span className="stack-flow__node-status-dot" />
                    </span>
                  )}
                </div>
              </article>
              {index < stackIntegrations.length - 1 && <StackConnector index={index} />}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
