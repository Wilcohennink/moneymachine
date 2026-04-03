import fs from "fs";
import path from "path";

export type Tier = "bronze" | "silver" | "gold";

export interface Spot {
  spotId: number;
  tier: Tier;
  status: "sold" | "pending";
  name?: string;
  url?: string;
  purchasedAt?: string;
  sessionId?: string;
}

export interface SponsorsData {
  spots: Record<string, Spot>;
  updatedAt: string;
}

const DATA_PATH = path.join(process.cwd(), "data", "sponsors.json");

export function getTier(spotId: number): Tier {
  if (spotId <= 800) return "bronze";
  if (spotId <= 950) return "silver";
  return "gold";
}

export function getTierPrice(tier: Tier): number {
  if (tier === "bronze") return 50000; // €500 in cents
  if (tier === "silver") return 75000; // €750 in cents
  return 100000; // €1000 in cents
}

export function getTierLabel(tier: Tier): string {
  if (tier === "bronze") return "Bronze";
  if (tier === "silver") return "Silver";
  return "Gold";
}

export function readSponsors(): SponsorsData {
  try {
    const content = fs.readFileSync(DATA_PATH, "utf-8");
    return JSON.parse(content);
  } catch {
    return { spots: {}, updatedAt: new Date().toISOString() };
  }
}

export function writeSponsors(data: SponsorsData): void {
  const dir = path.dirname(DATA_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  data.updatedAt = new Date().toISOString();
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
}

export function getSoldCount(data: SponsorsData): number {
  return Object.values(data.spots).filter((s) => s.status === "sold").length;
}

export function isSpotAvailable(data: SponsorsData, spotId: number): boolean {
  const spot = data.spots[String(spotId)];
  return !spot || (spot.status !== "sold" && spot.status !== "pending");
}

export function markSpotPending(data: SponsorsData, spotId: number, sessionId: string): SponsorsData {
  return {
    ...data,
    spots: {
      ...data.spots,
      [String(spotId)]: {
        spotId,
        tier: getTier(spotId),
        status: "pending",
        sessionId,
      },
    },
  };
}

export function markSpotSold(
  data: SponsorsData,
  spotId: number,
  details: { name?: string; url?: string; sessionId?: string }
): SponsorsData {
  return {
    ...data,
    spots: {
      ...data.spots,
      [String(spotId)]: {
        spotId,
        tier: getTier(spotId),
        status: "sold",
        name: details.name,
        url: details.url,
        sessionId: details.sessionId,
        purchasedAt: new Date().toISOString(),
      },
    },
  };
}

export function releaseExpiredPending(data: SponsorsData): SponsorsData {
  // Called during cleanup — in production use a cron to expire pending spots
  return data;
}
