import { cn } from "@/lib/utils";

const sizes = {
  sm: "h-6 w-6 rounded-md",
  md: "h-8 w-8 rounded-lg",
  lg: "h-12 w-12 rounded-xl",
} as const;

type PulseOpsMarkProps = {
  size?: keyof typeof sizes;
  className?: string;
};

function node(x: number, y: number) {
  return { x: x - 1.5, y: y - 1.5 };
}

/**
 * Modular ops topology mark — grid lanes, workflow nodes, orchestration hub.
 * Reads as system architecture, not a generic lettermark.
 */
export function PulseOpsMark({ size = "md", className }: PulseOpsMarkProps) {
  const n = {
    a: node(8, 8),
    b: node(16, 8),
    c: node(24, 8),
    d: node(8, 16),
    e: node(16, 16),
    f: node(8, 24),
    g: node(20, 24),
  };

  return (
    <span
      className={cn(
        "logo-mark inline-flex shrink-0 items-center justify-center",
        sizes[size],
        className
      )}
      aria-hidden
    >
      <svg viewBox="0 0 32 32" className="logo-mark__glyph h-[68%] w-[68%]" fill="none">
        <g stroke="#ffffff" strokeOpacity="0.12" strokeWidth="0.45">
          <line x1="8" y1="5" x2="8" y2="27" />
          <line x1="16" y1="5" x2="16" y2="27" />
          <line x1="24" y1="5" x2="24" y2="27" />
          <line x1="5" y1="8" x2="27" y2="8" />
          <line x1="5" y1="16" x2="27" y2="16" />
          <line x1="5" y1="24" x2="27" y2="24" />
        </g>

        <g fill="#ffffff" fillOpacity="0.08">
          <rect x="14.5" y="22.5" width="3" height="3" rx="0.5" />
          <rect x="22.5" y="14.5" width="3" height="3" rx="0.5" />
        </g>

        <path
          className="logo-mark__lane-flow"
          d="M8 8 H24"
          stroke="#f1c40f"
          strokeWidth="1.65"
          strokeLinecap="square"
        />

        <g
          stroke="#f1c40f"
          strokeWidth="1.65"
          strokeLinecap="square"
          strokeLinejoin="miter"
        >
          <path d="M8 8 V24" />
          <path d="M8 16 H20" />
          <path d="M20 16 V24" />
          <path d="M20 24 H24" />
          <path d="M24 8 V24" />
        </g>

        <g fill="#f1c40f">
          <rect x={n.a.x} y={n.a.y} width="3" height="3" rx="0.65" />
          <rect x={n.b.x} y={n.b.y} width="3" height="3" rx="0.65" />
          <rect x={n.c.x} y={n.c.y} width="3" height="3" rx="0.65" />
          <rect x={n.d.x} y={n.d.y} width="3" height="3" rx="0.65" />
          <rect x={n.e.x} y={n.e.y} width="3" height="3" rx="0.65" />
          <rect x={n.f.x} y={n.f.y} width="3" height="3" rx="0.65" />
          <rect x={n.g.x} y={n.g.y} width="3" height="3" rx="0.65" />
          <circle className="logo-mark__hub" cx="24" cy="24" r="2" />
        </g>
      </svg>
    </span>
  );
}
