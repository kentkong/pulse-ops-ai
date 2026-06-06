import { CommandBar } from "@/components/layout/command-bar";
import { WorkspaceContextBand } from "@/components/layout/workspace-context-band";
import { WorkspaceContextStrip } from "@/components/layout/workspace-context-strip";
import { WorkspaceHeaderBg } from "@/components/layout/workspace-header-bg";

export function WorkspaceShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="workspace-shell">
      <CommandBar />
      <div className="workspace-grid">
        <WorkspaceHeaderBg />
        <section className="context-band flex shrink-0 flex-col">
          <div className="context-band__inner">
            <WorkspaceContextBand />
          </div>
        </section>
        <WorkspaceContextStrip />
        <main className="workspace-main">{children}</main>
      </div>
    </div>
  );
}
