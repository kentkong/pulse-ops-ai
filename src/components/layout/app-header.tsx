import { PulseOpsMark } from "@/components/ui/pulse-ops-mark";

export function AppHeader() {
  return (
    <header className="hero-banner">
      <div className="hero-banner__bg" aria-hidden="true" />
      <div className="hero-banner__inner">
        <div className="flex items-center gap-4">
          <PulseOpsMark size="lg" />
          <div>
            <h1 className="text-xl font-bold tracking-[0.12em] text-white sm:text-2xl">
              Pulse-Ops AI
            </h1>
            <p className="mt-0.5 text-xs font-medium uppercase tracking-[0.2em] text-white/50">
              Operational Intelligence
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8 lg:gap-10">
          <p className="max-w-md text-sm leading-relaxed text-white/60">
            Real-time operational visibility across the customer lifecycle
          </p>
          <div className="flex shrink-0 items-center gap-5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/45">
              <span className="h-2 w-2 rounded-full bg-[#27ae60] shadow-[0_0_8px_rgba(39,174,96,0.6)]" />
              Live Data
            </div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#f1c40f]">
              <span className="h-2 w-2 rounded-full bg-[#f1c40f] shadow-[0_0_8px_rgba(241,196,15,0.5)]" />
              AI Active
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
