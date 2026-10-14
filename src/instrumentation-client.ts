import posthog from "posthog-js";
import { APP_SLUG, POSTHOG_KEY } from "@/lib/analytics";

const isLocalhost = ["localhost", "127.0.0.1", "[::1]"].includes(
  window.location.hostname
);
const explicitlyEnabled = Boolean(process.env.NEXT_PUBLIC_POSTHOG_KEY);
const isDevBuild = process.env.NODE_ENV !== "production";

if (explicitlyEnabled || (!isDevBuild && !isLocalhost)) {
  try {
    posthog.init(POSTHOG_KEY, {
      // Proxied through next.config.ts rewrites so ad blockers don't drop events.
      api_host: "/ingest",
      ui_host: "https://us.posthog.com",
      defaults: "2026-08-30",
      capture_pageview: "history_change",
      capture_pageleave: true,
      autocapture: true,
      enable_heatmaps: true,
      capture_dead_clicks: true,
      capture_exceptions: true,
      capture_performance: { web_vitals: true },
      session_recording: { maskAllInputs: true },
    });
    posthog.register({ app: APP_SLUG });
  } catch {
    // Analytics must never break the app.
  }
}
