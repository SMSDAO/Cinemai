import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ignore ESLint errors during production builds to prevent deployment failures
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Keep TypeScript strict — fail builds on type errors
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
