import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/downloads/:path*",
        destination: "http://127.0.0.1:3002/downloads/:path*",
      },
    ];
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
