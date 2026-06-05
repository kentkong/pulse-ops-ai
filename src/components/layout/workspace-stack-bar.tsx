"use client";

import { StackIntegrationMark } from "@/components/ui/stack-integration-mark";
import { cn } from "@/lib/utils";
import { stackIntegrations } from "@/lib/mock-data";
import { getStackIntegrationBrandClass } from "@/lib/stack-integration-meta";

export function WorkspaceStackBar() {
  const healthySources = stackIntegrations.filter((s) => s.status === "connected").length;
  const totalSources = stackIntegrations.length;

  return (
    <section className="stack-bar" aria-label="Connected stack">
      <div className="stack-bar__inner">
        <span className="context-band__stack-label">Stack</span>
        <ul className="context-band__stack-list">
          {stackIntegrations.map((source) => (
            <li key={source.name}>
              <span
                className={cn(
                  "context-band__stack-item",
                  getStackIntegrationBrandClass(source.name),
                  source.status === "connected" && "context-band__stack-item--healthy"
                )}
                title={`${source.role} · ${source.latency}`}
              >
                <StackIntegrationMark name={source.name} />
                {source.name}
                {source.status === "connected" && (
                  <span className="context-band__stack-dot" aria-hidden />
                )}
              </span>
            </li>
          ))}
        </ul>
        <span className="context-band__stack-summary">
          {healthySources}/{totalSources} healthy
        </span>
      </div>
    </section>
  );
}
