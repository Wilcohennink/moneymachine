/**
 * Referral Tracking Utilities
 *
 * Handles referral code capture, storage, and conversion tracking.
 */

const REFERRAL_STORAGE_KEY = "referral_code";
const REFERRAL_EMAIL_KEY = "referral_email";

/**
 * Capture referral code from URL (?ref=XXXXX) and store in localStorage
 */
export function captureReferralCode(): string | null {
  if (typeof window === "undefined") return null;

  try {
    const params = new URLSearchParams(window.location.search);
    const refCode = params.get("ref");

    if (refCode) {
      localStorage.setItem(REFERRAL_STORAGE_KEY, refCode);
      console.log("[Referral] Captured referral code:", refCode);
      return refCode;
    }

    return getReferralCode();
  } catch (error) {
    console.error("[Referral] Error capturing referral code:", error);
    return null;
  }
}

/**
 * Get stored referral code from localStorage
 */
export function getReferralCode(): string | null {
  if (typeof window === "undefined") return null;

  try {
    return localStorage.getItem(REFERRAL_STORAGE_KEY);
  } catch (error) {
    console.error("[Referral] Error reading referral code:", error);
    return null;
  }
}

/**
 * Clear referral code from localStorage
 */
export function clearReferralCode(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(REFERRAL_STORAGE_KEY);
  localStorage.removeItem(REFERRAL_EMAIL_KEY);
}

/**
 * Store user email for referral tracking
 */
export function storeReferralEmail(email: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(REFERRAL_EMAIL_KEY, email);
  } catch (error) {
    console.error("[Referral] Error storing email:", error);
  }
}

/**
 * Get stored referral email
 */
export function getReferralEmail(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(REFERRAL_EMAIL_KEY);
  } catch (error) {
    console.error("[Referral] Error reading email:", error);
    return null;
  }
}

/**
 * Track a referral click (called when user arrives with ref param)
 */
export async function trackReferralClick(
  referralCode: string,
  email: string,
  deviceFingerprint: string
): Promise<boolean> {
  try {
    const response = await fetch("/api/referral/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        referralCode,
        email,
        deviceFingerprint,
      }),
    });

    const data = await response.json();
    console.log("[Referral] Track response:", data);

    return data.success;
  } catch (error) {
    console.error("[Referral] Error tracking click:", error);
    return false;
  }
}

/**
 * Track a referral conversion (called when user completes an action)
 */
export async function trackReferralConversion(
  conversionAction: string,
  email?: string
): Promise<boolean> {
  const referralCode = getReferralCode();
  const userEmail = email || getReferralEmail();

  if (!referralCode || !userEmail) {
    console.log("[Referral] No conversion to track - missing code or email");
    return false;
  }

  try {
    const response = await fetch("/api/referral/convert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        referralCode,
        email: userEmail,
        conversionAction,
      }),
    });

    const data = await response.json();
    console.log("[Referral] Conversion response:", data);

    if (data.success && data.tierIncreased) {
      console.log(`[Referral] 🎉 Tier increased to ${data.currentTier}!`);
    }

    return data.success;
  } catch (error) {
    console.error("[Referral] Error tracking conversion:", error);
    return false;
  }
}

/**
 * Generate a simple device fingerprint (client-side)
 * Note: This is basic. For production, consider using FingerprintJS or similar.
 */
export function getDeviceFingerprint(): string {
  if (typeof window === "undefined") return "unknown";

  const components = [
    navigator.userAgent,
    navigator.language,
    screen.width,
    screen.height,
    screen.colorDepth,
    new Date().getTimezoneOffset(),
  ];

  // Simple hash function
  const str = components.join("|");
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }

  return Math.abs(hash).toString(16);
}
