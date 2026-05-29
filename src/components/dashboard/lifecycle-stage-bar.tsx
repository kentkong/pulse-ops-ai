import { lifecycleDistribution } from "@/lib/mock-data";
import { Users, Zap, TrendingUp, Rocket, RefreshCw, AlertTriangle } from "lucide-react";

const stages = [
  { icon: Users },
  { icon: Zap },
  { icon: TrendingUp },
  { icon: Rocket },
  { icon: RefreshCw },
  { icon: AlertTriangle },
];

export function LifecycleStageBar() {
  return (
    <>
      <h2 className="heading-display mb-10 text-center">
        Lifecycle <span>Overview</span>
      </h2>
      <div className="mx-auto grid max-w-4xl grid-cols-3 gap-8 sm:grid-cols-6" id="section-lifecycle">
        {lifecycleDistribution.map((stage, i) => {
          const Icon = stages[i]?.icon ?? Users;
          return (
            <div key={stage.name} className="flex flex-col items-center text-center">
              <div className="circle-icon">
                <Icon className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <p className="mt-4 text-2xl font-bold">{stage.value}</p>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                {stage.name}
              </p>
            </div>
          );
        })}
      </div>
      <div className="chevron-down" />
    </>
  );
}
