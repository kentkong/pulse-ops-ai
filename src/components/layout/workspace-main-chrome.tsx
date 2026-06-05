"use client";

import { StackFlowPanel } from "@/components/layout/stack-flow-panel";

export function WorkspaceMainChrome({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StackFlowPanel />
      {children}
    </>
  );
}
