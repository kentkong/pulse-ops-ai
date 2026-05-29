import { cn } from "@/lib/utils";

type SectionVariant = "white" | "muted" | "yellow" | "dark";

const variants: Record<SectionVariant, string> = {
  white: "section-white",
  muted: "section-muted",
  yellow: "section-yellow",
  dark: "section-dark",
};

export function Section({
  variant = "white",
  className,
  children,
  id,
}: {
  variant?: SectionVariant;
  className?: string;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className={cn(variants[variant], "scroll-mt-4", className)}>
      {children}
    </section>
  );
}

export function SectionHeading({
  title,
  subtitle,
  light,
}: {
  title: string;
  subtitle?: string;
  light?: boolean;
}) {
  return (
    <div className="mb-8 text-center">
      <h2
        className={cn(
          "heading-display",
          light ? "text-white" : "text-foreground"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mx-auto mt-3 max-w-xl text-sm leading-relaxed",
            light ? "text-white/70" : "text-muted-foreground"
          )}
        >
          {subtitle}
        </p>
      )}
      <div className={cn("chevron-down", light && "border-t-white/40")} />
    </div>
  );
}
