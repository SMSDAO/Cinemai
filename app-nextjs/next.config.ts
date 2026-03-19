import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep TypeScript strict — fail builds on type errors
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
