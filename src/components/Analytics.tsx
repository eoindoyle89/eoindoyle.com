"use client";

import posthog from "posthog-js";
import { useEffect } from "react";

// Cookieless analytics: memory persistence means PostHog sets no cookies
// and writes nothing to storage, so there is nothing to ask consent for.
// Visitors are counted per visit, not tracked across them; that trade is
// the point. Inert until NEXT_PUBLIC_POSTHOG_KEY is set (the key is a
// public value by design).
const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
let initialized = false;

export function Analytics() {
  useEffect(() => {
    if (!key || initialized) return;
    initialized = true;
    posthog.init(key, {
      api_host: "https://eu.i.posthog.com",
      defaults: "2025-05-24",
      persistence: "memory",
      // Counting visits is the whole job; recording sessions is not, and
      // would undercut the no-consent-needed claim in the colophon.
      disable_session_recording: true,
    });
  }, []);
  return null;
}
