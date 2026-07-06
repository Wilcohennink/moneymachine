import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

const DB_DIR = path.join(process.cwd(), 'data', 'referrals');

// Ensure database directory exists
async function ensureDbDir() {
  try {
    await fs.mkdir(DB_DIR, { recursive: true });
  } catch (error) {
    // Directory already exists
  }
}

// Database types matching the schema from MON-97
export interface Referral {
  id: string;
  referrerCode: string;
  referrerEmail: string;
  referrerDeviceFp: string;
  referredEmail: string | null;
  referredDeviceFp: string | null;
  conversionStatus: 'pending' | 'converted' | 'fraud';
  conversionAction: string | null;
  createdAt: string;
  convertedAt: string | null;
}

export interface ReferrerStats {
  referrerCode: string;
  totalShares: number;
  convertedReferrals: number;
  currentTier: number;
  unlockedRewards: string[];
  lastUpdated: string;
}

// File paths
const REFERRALS_FILE = path.join(DB_DIR, 'referrals.json');
const REFERRER_STATS_FILE = path.join(DB_DIR, 'referrer_stats.json');

// Generate unique referral code
export function generateReferralCode(): string {
  return crypto.randomBytes(8).toString('hex').toUpperCase();
}

// Read all referrals
export async function getAllReferrals(): Promise<Referral[]> {
  await ensureDbDir();
  try {
    const data = await fs.readFile(REFERRALS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// Write all referrals
async function writeReferrals(referrals: Referral[]): Promise<void> {
  await ensureDbDir();
  await fs.writeFile(REFERRALS_FILE, JSON.stringify(referrals, null, 2));
}

// Read all referrer stats
export async function getAllReferrerStats(): Promise<ReferrerStats[]> {
  await ensureDbDir();
  try {
    const data = await fs.readFile(REFERRER_STATS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// Write all referrer stats
async function writeReferrerStats(stats: ReferrerStats[]): Promise<void> {
  await ensureDbDir();
  await fs.writeFile(REFERRER_STATS_FILE, JSON.stringify(stats, null, 2));
}

// Create a new referral entry
export async function createReferral(
  referrerCode: string,
  referrerEmail: string,
  referrerDeviceFp: string
): Promise<Referral> {
  const referrals = await getAllReferrals();

  const newReferral: Referral = {
    id: crypto.randomUUID(),
    referrerCode,
    referrerEmail,
    referrerDeviceFp,
    referredEmail: null,
    referredDeviceFp: null,
    conversionStatus: 'pending',
    conversionAction: null,
    createdAt: new Date().toISOString(),
    convertedAt: null,
  };

  referrals.push(newReferral);
  await writeReferrals(referrals);

  return newReferral;
}

// Get referral by ID
export async function getReferralById(id: string): Promise<Referral | null> {
  const referrals = await getAllReferrals();
  return referrals.find(r => r.id === id) || null;
}

// Get referrals by referrer code
export async function getReferralsByCode(referrerCode: string): Promise<Referral[]> {
  const referrals = await getAllReferrals();
  return referrals.filter(r => r.referrerCode === referrerCode);
}

// Update referral
export async function updateReferral(id: string, updates: Partial<Referral>): Promise<Referral | null> {
  const referrals = await getAllReferrals();
  const index = referrals.findIndex(r => r.id === id);

  if (index === -1) return null;

  referrals[index] = { ...referrals[index], ...updates };
  await writeReferrals(referrals);

  return referrals[index];
}

// Get or create referrer stats
export async function getOrCreateReferrerStats(referrerCode: string): Promise<ReferrerStats> {
  const allStats = await getAllReferrerStats();
  let stats = allStats.find(s => s.referrerCode === referrerCode);

  if (!stats) {
    stats = {
      referrerCode,
      totalShares: 0,
      convertedReferrals: 0,
      currentTier: 0,
      unlockedRewards: [],
      lastUpdated: new Date().toISOString(),
    };
    allStats.push(stats);
    await writeReferrerStats(allStats);
  }

  return stats;
}

// Update referrer stats
export async function updateReferrerStats(
  referrerCode: string,
  updates: Partial<ReferrerStats>
): Promise<ReferrerStats> {
  const allStats = await getAllReferrerStats();
  const index = allStats.findIndex(s => s.referrerCode === referrerCode);

  if (index === -1) {
    // Create new stats if not found
    const newStats: ReferrerStats = {
      referrerCode,
      totalShares: 0,
      convertedReferrals: 0,
      currentTier: 0,
      unlockedRewards: [],
      lastUpdated: new Date().toISOString(),
      ...updates,
    };
    allStats.push(newStats);
    await writeReferrerStats(allStats);
    return newStats;
  }

  allStats[index] = {
    ...allStats[index],
    ...updates,
    lastUpdated: new Date().toISOString(),
  };
  await writeReferrerStats(allStats);

  return allStats[index];
}

// Calculate tier based on conversions (from Blitz spec in MON-97)
export function calculateTier(convertedCount: number): number {
  if (convertedCount >= 10) return 3;
  if (convertedCount >= 5) return 2;
  if (convertedCount >= 3) return 1;
  return 0;
}

// Get rewards for tier
export function getRewardsForTier(tier: number): string[] {
  const rewards: string[] = [];

  if (tier >= 1) {
    rewards.push('5 premium invoice templates');
  }
  if (tier >= 2) {
    rewards.push('BTW filing guide PDF');
    rewards.push('Uurtarief insights');
  }
  if (tier >= 3) {
    rewards.push('1 month free ZZP Admin Suite SaaS');
  }

  return rewards;
}

// Fraud detection helpers
export function isSameDeviceFingerprint(fp1: string, fp2: string): boolean {
  return fp1 === fp2;
}

export function isSameEmailDomain(email1: string, email2: string): boolean {
  const domain1 = email1.split('@')[1];
  const domain2 = email2.split('@')[1];
  return domain1 === domain2;
}

// Rate limiting check (max 50 shares per referrer code per day)
export async function checkRateLimit(referrerCode: string): Promise<boolean> {
  const referrals = await getReferralsByCode(referrerCode);
  const oneDayAgo = new Date();
  oneDayAgo.setDate(oneDayAgo.getDate() - 1);

  const recentReferrals = referrals.filter(
    r => new Date(r.createdAt) > oneDayAgo
  );

  return recentReferrals.length < 50;
}
