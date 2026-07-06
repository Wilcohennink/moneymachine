import { NextRequest, NextResponse } from 'next/server';
import {
  getReferralsByCode,
  updateReferral,
  updateReferrerStats,
  getOrCreateReferrerStats,
  calculateTier,
  getRewardsForTier,
} from '@/lib/referralDb';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { referralCode, email, conversionAction } = body;

    // Validate required fields
    if (!referralCode || !email || !conversionAction) {
      return NextResponse.json(
        { error: 'Referral code, email, and conversion action are required' },
        { status: 400 }
      );
    }

    // Get all referrals for this code
    const referrals = await getReferralsByCode(referralCode);

    if (referrals.length === 0) {
      return NextResponse.json(
        { error: 'Invalid referral code' },
        { status: 404 }
      );
    }

    // Find the pending referral for this email
    const pendingReferral = referrals.find(
      r => r.referredEmail === email && r.conversionStatus === 'pending'
    );

    if (!pendingReferral) {
      return NextResponse.json(
        { error: 'No pending referral found for this email' },
        { status: 404 }
      );
    }

    // Update referral to converted
    await updateReferral(pendingReferral.id, {
      conversionStatus: 'converted',
      conversionAction,
      convertedAt: new Date().toISOString(),
    });

    // Get current stats
    const stats = await getOrCreateReferrerStats(referralCode);

    // Calculate new conversion count
    const newConvertedCount = stats.convertedReferrals + 1;

    // Calculate new tier
    const newTier = calculateTier(newConvertedCount);
    const previousTier = stats.currentTier;

    // Get unlocked rewards for new tier
    const unlockedRewards = getRewardsForTier(newTier);

    // Update referrer stats
    await updateReferrerStats(referralCode, {
      convertedReferrals: newConvertedCount,
      currentTier: newTier,
      unlockedRewards,
    });

    // Check if tier increased (new rewards unlocked)
    const tierIncreased = newTier > previousTier;

    return NextResponse.json({
      success: true,
      referralCode,
      convertedReferrals: newConvertedCount,
      currentTier: newTier,
      previousTier,
      tierIncreased,
      unlockedRewards,
      message: tierIncreased
        ? `Congratulations! You've unlocked Tier ${newTier}!`
        : `Conversion recorded. ${newConvertedCount} total conversions.`,
    });
  } catch (error) {
    console.error('Error converting referral:', error);
    return NextResponse.json(
      { error: 'Failed to convert referral' },
      { status: 500 }
    );
  }
}
