import posthog from "posthog-js";

// Public PostHog project key (phc_ client key, safe to ship in the bundle).
// NEXT_PUBLIC_POSTHOG_KEY overrides it, and setting it also enables analytics
// on localhost / dev builds.
export const POSTHOG_KEY =
  process.env.NEXT_PUBLIC_POSTHOG_KEY || "phc_oLm8fb7L4CXDqGdJcc7a6boCtR8rVjf6dNx7G995eGdy";

export const APP_SLUG = "system-design-simulator";

/** Capture a product event. No-op until PostHog has been initialised. */
export function track(event: string, properties?: Record<string, unknown>) {
  if (typeof window === "undefined" || !posthog.__loaded) return;
  posthog.capture(event, properties);
}
