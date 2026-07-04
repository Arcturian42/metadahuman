"use client";

import { useEffect } from "react";
import { track, type AnalyticsEvent } from "@/lib/analytics";

/** Fires a single analytics event once on mount (funnel view events). */
export function TrackView({ event }: { event: AnalyticsEvent }) {
  useEffect(() => {
    track(event);
  }, [event]);
  return null;
}
