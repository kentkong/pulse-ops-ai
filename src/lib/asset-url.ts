import { basePath } from "@/lib/base-path";

/** Public asset URL — respects GitHub Pages basePath. */
export function assetUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${basePath}${normalized}`;
}

export const textureAssets = {
  pulseOps: assetUrl("/images/pulse-ops-texture.jpg"),
  hero: assetUrl("/images/hero-texture.jpg"),
  command: assetUrl("/images/command-texture.jpg"),
} as const;
