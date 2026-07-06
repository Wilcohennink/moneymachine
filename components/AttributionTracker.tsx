"use client";

import { useEffect } from "react";
import { captureAttribution } from "@/lib/attribution";

/**
 * Attribution Tracker Component
 *
 * Automatically captures UTM parameters and referral data on page load.
 * Place this in the root layout to track all page visits.
 */
export function AttributionTracker() {
  useEffect(() => {
    // Capture attribution data when component mounts
    captureAttribution();
  }, []);

  return null;
}
