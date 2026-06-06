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
      <ChevronRight className="stack-bar__connector-chevron" strokeWidth={2} />
    </span>
  );
}

export function WorkspaceStackBar({ placement = "main" }: { placement?: "main" | "banner" | "strip" }) {
  const healthySources = stackIntegrations.filter((s) => s.status === "connected").length;
  const totalSources = stackIntegrations.length;
  const isStrip = placement === "strip";
  const isBanner = placement === "banner";

  return (
    <section
      className={cn(
        "stack-bar",
        isBanner && "stack-bar--banner",
        isStrip && "stack-bar--strip"
      )}
      aria-label="Connected stack"
    >
      <div className="stack-bar__inner">
        <div className="stack-bar__center">
          {!isBanner && !isStrip ? <span className="stack-bar__label">Stack</span> : null}
          <div className="stack-bar__track">
            {stackIntegrations.map((source, index) => (
              <div key={source.name} className="stack-bar__segment">
                <span
                  className={cn(
                    "stack-bar__node",
                    (isStrip || isBanner) && getStackIntegrationBrandClass(source.name),
                    source.status === "connected" && "stack-bar__node--healthy"
                  )}
                  title={`${source.role} · ${source.latency}`}
                >
                  <span className="stack-bar__node-badge">
                    <StackIntegrationMark
                      name={source.name}
                      className="stack-bar__node-mark"
                      variant={isBanner || isStrip ? "brand" : "neutral"}
                    />
                  </span>
                  <span className="stack-bar__node-body">
                    <span className="stack-bar__node-name">{source.name}</span>
                    <span className="stack-bar__node-meta">{source.latency}</span>
                  </span>
                  {source.status === "connected" ? (
                    <span className="stack-bar__node-status" aria-hidden />
                  ) : null}
                </span>
                {index < stackIntegrations.length - 1 ? (
                  <StackBarConnector index={index} />
                ) : null}
              </div>
            ))}
          </div>
          {!isBanner && !isStrip ? (
            <span className="stack-bar__summary">
              {healthySources}/{totalSources} healthy
            </span>
          ) : null}
        </div>
      </div>
    </section>
  );
}
