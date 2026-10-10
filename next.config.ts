import type { NextConfig } from "next";

const config: NextConfig = {
  trailingSlash: true,
  poweredByHeader: false,
  reactStrictMode: true,
  experimental: { inlineCss: true },
  async redirects() {
    return [
      { source: "/services", destination: "/#services", permanent: true },
      { source: "/index", destination: "/", permanent: true },
      { source: "/blog/page/1", destination: "/blog/", permanent: true },
    ];
  },
  async headers() {
    return [
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
