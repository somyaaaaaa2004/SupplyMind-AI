import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // Image optimization domains
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supplymind.ai",
      },
      {
        protocol: "https",
        hostname: "api.mapbox.com",
      },
    ],
  },

  // API proxy rewrites (development)
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL}/api/:path*`,
      },
    ];
  },

  // Security headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(self)",
          },
        ],
      },
    ];
  },

  // Bundle analyzer (enable via ANALYZE=true npm run build)
  ...(process.env.ANALYZE === "true" && {
    // @ts-expect-error - optional bundle analyzer
    bundleAnalyzer: { enabled: true },
  }),
};

export default nextConfig;
