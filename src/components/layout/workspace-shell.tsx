import { CommandBar } from "@/components/layout/command-bar";
import { LeftNavRail, LeftNavTabs } from "@/components/layout/left-nav";
import { WorkspaceContextBand } from "@/components/layout/workspace-context-band";
import { WorkspaceHeaderBg } from "@/components/layout/workspace-header-bg";
import { WorkspaceStackBar } from "@/components/layout/workspace-stack-bar";

export function WorkspaceShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="workspace-shell">
      <CommandBar />
      <div className="workspace-grid">
        <WorkspaceHeaderBg />
        <LeftNavTabs />
        <WorkspaceContextBand />
        <LeftNavRail />
        <main className="workspace-main">
          <WorkspaceStackBar />
          {children}
        </main>
      </div>
    </div>
  );
}
