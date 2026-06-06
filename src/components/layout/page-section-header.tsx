import { TextureBg } from "@/components/ui/texture-bg";

type PageSectionHeaderProps = {
  title: string;
  description?: string;
  pills?: { label: string; accent?: boolean }[];
  meta?: string;
  trailing?: React.ReactNode;
  children?: React.ReactNode;
};

export function PageSectionHeader({
  title,
  description,
  pills,
  meta,
  trailing,
  children,
}: PageSectionHeaderProps) {
  return (
    <div className="section-band-dark relative shrink-0 overflow-hidden">
      <TextureBg className="section-band-dark__bg" />
      <div className="section-band-dark__inner px-6 py-4 lg:px-8">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
              <h2 className="text-sm font-semibold text-white">{title}</h2>
              {pills?.map((pill) => (
                <span
                  key={pill.label}
                  className={
                    pill.accent ? "section-pill section-pill--accent" : "section-pill"
                  }
                >
                  {pill.label}
                </span>
              ))}
              {meta && (
                <span className="section-meta-inline">{meta}</span>
              )}
            </div>
            {description && (
              <p className="mt-1.5 max-w-2xl text-xs leading-relaxed text-white/60">
                {description}
              </p>
            )}
            {children}
          </div>
          {trailing && (
            <div className="flex shrink-0 flex-col items-end gap-1.5">
              {trailing}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
