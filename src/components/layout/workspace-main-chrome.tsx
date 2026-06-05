"use client";

import { StackFlowPanel } from "@/components/layout/stack-flow-panel";
import { getActiveNavItem } from "@/lib/nav-config";
import { usePathname } from "next/navigation";

export function WorkspaceMainChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const page = getActiveNavItem(pathname);

  return (
    <>
      <StackFlowPanel hue={page.hue} />
      {children}
    </>
  );
}
