import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Canonical domain: send the Vercel production URL to the custom domain.
      // Preview deployments (finance-tracker-real-<hash>.vercel.app) won't match
      // this exact host, so they keep working normally.
      {
        source: "/:path*",
        has: [{ type: "host", value: "finance-tracker-real.vercel.app" }],
        destination: "https://xiongdi.my.id/:path*",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
