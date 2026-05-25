/**
 * Analytics stub — swap in Segment, PostHog, or Plausible when ready.
 * Every event call goes through here for a single integration point.
 */

type EventProps = Record<string, string | number | boolean | undefined>;

export function track(event: string, props?: EventProps) {
  // TODO(shroom-vroom): Wire up a real analytics SDK
  if (process.env.NODE_ENV === "development") {
    console.log(`[analytics] ${event}`, props);
  }
}
