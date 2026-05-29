import { textureAssets } from "@/lib/asset-url";

/** Bakes basePath-aware texture URLs into :root for CSS pseudo-elements. */
export function AssetPathStyles() {
  const css = `:root {
  --texture-pulse-ops: url("${textureAssets.pulseOps}");
  --texture-hero: url("${textureAssets.hero}");
  --texture-command: url("${textureAssets.command}");
}`;

  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}
