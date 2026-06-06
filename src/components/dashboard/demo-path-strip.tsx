import Link from "next/link";
import { ArrowRight } from "lucide-react";

const demoSteps = [
  { step: 1, label: "Review AI signal", href: "/insights" },
  { step: 2, label: "Inspect at-risk accounts", href: "/lifecycle" },
  { step: 3, label: "Activate workflow", href: "/workflows" },
];

/** Lightweight guided path for portfolio walkthroughs. */
export function DemoPathStrip() {
  return (
    <div className="demo-path-strip mx-4 md:mx-6 lg:mx-8">
      <p className="demo-path-strip__label">Demo path</p>
      <ol className="demo-path-strip__steps">
        {demoSteps.map((item, index) => (
          <li key={item.href} className="demo-path-strip__step">
            <Link href={item.href} className="demo-path-strip__link group">
              <span className="demo-path-strip__num">{item.step}</span>
              <span className="demo-path-strip__text">{item.label}</span>
              <ArrowRight className="demo-path-strip__arrow h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
            </Link>
            {index < demoSteps.length - 1 ? (
              <span className="demo-path-strip__sep" aria-hidden>
                →
              </span>
            ) : null}
          </li>
        ))}
      </ol>
    </div>
  );
}
