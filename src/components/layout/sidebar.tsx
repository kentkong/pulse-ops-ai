import { WorkspaceShell } from "@/components/layout/workspace-shell";

export function AppShell({ children }: { children: React.ReactNode }) {
  return <WorkspaceShell>{children}</WorkspaceShell>;
}

export { WorkspaceShell } from "@/components/layout/workspace-shell";
