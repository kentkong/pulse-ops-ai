import Link from "next/link";
import { Plus, ArrowUpRight } from "lucide-react";
import type { KanbanColumn } from "@/types";

export function WorkflowBoard({ columns }: { columns: KanbanColumn[] }) {
  const boardColumns = columns.filter((c) =>
    ["onboarding", "activation", "adoption"].includes(c.id)
  );

  return (
    <section className="panel scroll-mt-24 p-6" id="section-kanban">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="section-label">Workflow Board</h2>
        <Link href="/workflows" className="flex items-center gap-1 text-xs text-primary hover:underline">
          View All
          <ArrowUpRight className="h-3 w-3" />
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {boardColumns.map((column) => (
          <div key={column.id} className="rounded-md border border-border bg-secondary/30 p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">{column.title}</p>
              <span className="text-xs text-muted-foreground">{column.items.length} cards</span>
            </div>
            <button
              type="button"
              className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-md border border-dashed border-border py-2 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
            >
              <Plus className="h-3 w-3" />
              Add Workflow
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
