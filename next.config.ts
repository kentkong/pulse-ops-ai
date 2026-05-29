import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/pulse-ops-ai",
  assetPrefix: "/pulse-ops-ai/",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
