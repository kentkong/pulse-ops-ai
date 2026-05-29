import { basePath } from "@/lib/base-path";

/** Injects basePath-aware texture URLs for static export (GitHub Pages). */
export function AssetPathVars() {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `:root {
  --texture-pulse-ops: url("${basePath}/images/pulse-ops-texture.png");
  --texture-hero: url("${basePath}/images/hero-texture.png");
  --texture-command: url("${basePath}/images/command-texture.png");
}`,
      }}
    />
  );
}
