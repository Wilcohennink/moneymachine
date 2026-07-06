"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

/**
 * Google Ads Tracking Component
 *
 * Replace GOOGLE_ADS_ID with your actual Google Ads Conversion ID (AW-XXXXXXXXXX)
 * Replace conversion labels with your actual conversion action labels from Google Ads
 */

const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "AW-XXXXXXXXXX";

// Conversion labels from Google Ads (update these with real values)
const CONVERSION_LABELS = {
  TEMPLATE_BUNDLE_PURCHASE: "TEMPLATE_BUNDLE_PURCHASE_LABEL", // Replace with actual label
  SPONSOR_WALL_PURCHASE: "SPONSOR_WALL_PURCHASE_LABEL",       // Replace with actual label
  WEBINAR_REGISTRATION: "WEBINAR_REGISTRATION_LABEL",         // Replace with actual label
  SAAS_SIGNUP: "SAAS_SIGNUP_LABEL",                           // Replace with actual label
};

declare global {
  interface Window {
    gtag?: (
      command: string,
      target: string,
      config?: Record<string, any>
    ) => void;
  }
}

export function GoogleAdsTracking() {
  return (
    <>
      {/* Google Ads Global Site Tag */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-ads-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GOOGLE_ADS_ID}');
        `}
      </Script>
    </>
  );
}

/**
 * Track conversion events
 * Call this function when a conversion happens (purchase, signup, etc.)
 */
export function trackConversion(
  conversionLabel: string,
  value?: number,
  currency: string = "EUR"
) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "conversion", {
      send_to: `${GOOGLE_ADS_ID}/${conversionLabel}`,
      value: value,
      currency: currency,
    });
    console.log(`[Google Ads] Conversion tracked: ${conversionLabel}`, { value, currency });
  }
}

/**
 * Component to track conversions on specific pages
 * Place this on success/thank you pages
 */
interface ConversionTrackerProps {
  conversionType: keyof typeof CONVERSION_LABELS;
  value?: number;
  currency?: string;
}

export function ConversionTracker({
  conversionType,
  value,
  currency = "EUR",
}: ConversionTrackerProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Track conversion once when component mounts
    const conversionLabel = CONVERSION_LABELS[conversionType];
    if (conversionLabel) {
      trackConversion(conversionLabel, value, currency);
    }
  }, [conversionType, value, currency]);

  return null;
}
