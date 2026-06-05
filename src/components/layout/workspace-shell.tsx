import { CommandBar } from "@/components/layout/command-bar";
import { WorkspaceContextBand } from "@/components/layout/workspace-context-band";
import { WorkspaceHeaderBg } from "@/components/layout/workspace-header-bg";
import { WorkspaceMainChrome } from "@/components/layout/workspace-main-chrome";

export function WorkspaceShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="workspace-shell">
      <CommandBar />
      <div className="workspace-grid">
        <WorkspaceHeaderBg />
        <WorkspaceContextBand />
        <main className="workspace-main">
          <WorkspaceMainChrome>{children}</WorkspaceMainChrome>
        </main>
      </div>
    </div>
  );
}
