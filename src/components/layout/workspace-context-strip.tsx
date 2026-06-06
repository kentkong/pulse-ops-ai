"use client";

import { usePathname } from "next/navigation";
import { TextureBg } from "@/components/ui/texture-bg";
import { StackFlowHorizontal } from "@/components/architecture/stack-diagram";
import { getOrchestrationContext } from "@/lib/orchestration-context";

/** Operational orchestration strip — under hero on every page. */
export function WorkspaceContextStrip() {
  const pathname = usePathname();
  const contextLine = getOrchestrationContext(pathname);

  return (
    <section className="orchestration-strip workspace-context-strip" aria-label="Lifecycle stack">
      <TextureBg className="section-band-dark__bg" />
      <div className="orchestration-strip__inner">
        <div className="orchestration-strip__headline">
          <div className="orchestration-strip__title-row">
            <h2 className="orchestration-strip__title">Pulse-Ops AI · Lifecycle Stack</h2>
            <span className="orchestration-strip__status-pill">All systems operational</span>
          </div>
          <p className="orchestration-strip__thesis">
            Monitors your full lifecycle stack and turns live data into health scores, AI signals,
            and prioritized actions.
          </p>
          <p className="orchestration-strip__context">{contextLine}</p>
        </div>
        <StackFlowHorizontal variant="strip" />
      </div>
    </section>
  );
}
