"use client";

import { CommandBarNav } from "@/components/layout/left-nav";

export function CommandBar() {
  return (
    <header className="command-bar">
      <div className="command-bar__toolbar">
        <CommandBarNav />
      </div>
    </header>
  );
}
