/**
 * Attribution Tracking Utilities
 *
 * Captures UTM parameters and referral sources, stores them in localStorage,
 * and passes them to Stripe checkout sessions for attribution analysis.
 */

export interface AttributionData {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  referrer?: string;
  landing_page?: string;
  first_seen?: string;
  last_seen?: string;
}

const STORAGE_KEY = "attribution_data";
const EXPIRY_DAYS = 30;

/**
 * Capture attribution data from current page URL and store in localStorage
 */
export function captureAttribution(): AttributionData | null {
  if (typeof window === "undefined") return null;

  try {
    const params = new URLSearchParams(window.location.search);
    const existingData = getAttribution();

    const newData: AttributionData = {
      ...existingData,
      utm_source: params.get("utm_source") || existingData?.utm_source,
      utm_medium: params.get("utm_medium") || existingData?.utm_medium,
      utm_campaign: params.get("utm_campaign") || existingData?.utm_campaign,
      utm_term: params.get("utm_term") || existingData?.utm_term,
      utm_content: params.get("utm_content") || existingData?.utm_content,
      referrer: existingData?.referrer || document.referrer || undefined,
      landing_page: existingData?.landing_page || window.location.href,
      first_seen: existingData?.first_seen || new Date().toISOString(),
      last_seen: new Date().toISOString(),
    };

    // Only store if we have at least one UTM parameter or referrer
    if (
      newData.utm_source ||
      newData.utm_medium ||
      newData.utm_campaign ||
      newData.referrer
    ) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
      console.log("[Attribution] Captured:", newData);
      return newData;
    }

    return existingData;
  } catch (error) {
    console.error("[Attribution] Error capturing data:", error);
    return null;
  }
}

/**
 * Get stored attribution data from localStorage
 */
export function getAttribution(): AttributionData | null {
  if (typeof window === "undefined") return null;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    const data: AttributionData = JSON.parse(stored);

    // Check if data is expired
    if (data.last_seen) {
      const lastSeen = new Date(data.last_seen);
      const now = new Date();
      const daysSince = (now.getTime() - lastSeen.getTime()) / (1000 * 60 * 60 * 24);

      if (daysSince > EXPIRY_DAYS) {
        localStorage.removeItem(STORAGE_KEY);
        return null;
      }
    }

    return data;
  } catch (error) {
    console.error("[Attribution] Error reading data:", error);
    return null;
  }
}

/**
 * Clear attribution data from localStorage
 */
export function clearAttribution(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * Format attribution data as Stripe metadata object
 * Stripe metadata keys must be strings and values must be strings or numbers
 */
export function formatForStripe(data: AttributionData | null): Record<string, string> {
  if (!data) return {};

  const metadata: Record<string, string> = {};

  if (data.utm_source) metadata.attribution_source = data.utm_source;
  if (data.utm_medium) metadata.attribution_medium = data.utm_medium;
  if (data.utm_campaign) metadata.attribution_campaign = data.utm_campaign;
  if (data.utm_term) metadata.attribution_term = data.utm_term;
  if (data.utm_content) metadata.attribution_content = data.utm_content;
  if (data.referrer) metadata.attribution_referrer = data.referrer;
  if (data.landing_page) metadata.attribution_landing = data.landing_page;
  if (data.first_seen) metadata.attribution_first_seen = data.first_seen;

  return metadata;
}

/**
 * Generate UTM parameters for outbound links
 */
export function addUTMParams(
  url: string,
  source: string,
  medium: string,
  campaign?: string
): string {
  try {
    const urlObj = new URL(url);
    urlObj.searchParams.set("utm_source", source);
    urlObj.searchParams.set("utm_medium", medium);
    if (campaign) urlObj.searchParams.set("utm_campaign", campaign);
    return urlObj.toString();
  } catch {
    // If URL parsing fails, return original
    return url;
  }
}
