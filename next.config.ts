import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  // PostHog reverse proxy: /ingest/* is forwarded to PostHog US cloud so
  // analytics requests are first-party and not dropped by ad blockers.
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://us-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/array/:path*",
        destination: "https://us-assets.i.posthog.com/array/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://us.i.posthog.com/:path*",
      },
    ];
  },
  // Required so PostHog API calls with trailing slashes are not redirected.
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
