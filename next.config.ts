import type { NextConfig } from "next";

const config: NextConfig = {
  trailingSlash: true,
  poweredByHeader: false,
  reactStrictMode: true,
  experimental: { inlineCss: true },
  async redirects() {
    return [
      { source: "/index", destination: "/", permanent: true },
      { source: "/work", destination: "/case-studies/", permanent: true },
      { source: "/tools/lead-cost-calculator", destination: "/resources/lead-cost-calculator/", permanent: true },
      { source: "/blog/page/1", destination: "/blog/", permanent: true },
    ];
  },
  async headers() {
    return [
      // Belt and braces for the share-image endpoint (also set in app/og/route.tsx).
      { source: "/og/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] },
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default config;
