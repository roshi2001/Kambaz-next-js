import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true, 
  },
  turbopack: {
    root: "C:/Users/roshi/2025/winter/webdev/kambaz-next-js",
  },
};
export default nextConfig;
