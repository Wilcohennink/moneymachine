import { NextRequest, NextResponse } from 'next/server';
import {
  getOrCreateReferrerStats,
  getReferralsByCode,
} from '@/lib/referralDb';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    const { code } = await params;

    if (!code) {
      return NextResponse.json(
        { error: 'Referral code is required' },
        { status: 400 }
      );
    }

    // Get referrer stats
    const stats = await getOrCreateReferrerStats(code);

    // Get all referrals for detailed breakdown
    const referrals = await getReferralsByCode(code);

    // Count by status
    const statusBreakdown = {
      pending: referrals.filter(r => r.conversionStatus === 'pending').length,
      converted: referrals.filter(r => r.conversionStatus === 'converted').length,
      fraud: referrals.filter(r => r.conversionStatus === 'fraud').length,
    };

    // Calculate progress to next tier
    let nextTierAt = 0;
    let progressToNextTier = 0;
    if (stats.currentTier === 0) {
      nextTierAt = 3;
      progressToNextTier = (stats.convertedReferrals / 3) * 100;
    } else if (stats.currentTier === 1) {
      nextTierAt = 5;
      progressToNextTier = (stats.convertedReferrals / 5) * 100;
    } else if (stats.currentTier === 2) {
      nextTierAt = 10;
      progressToNextTier = (stats.convertedReferrals / 10) * 100;
    } else {
      // Max tier reached
      nextTierAt = 10;
      progressToNextTier = 100;
    }

    return NextResponse.json({
      success: true,
      referralCode: code,
      stats: {
        totalShares: stats.totalShares,
        convertedReferrals: stats.convertedReferrals,
        currentTier: stats.currentTier,
        unlockedRewards: stats.unlockedRewards,
        lastUpdated: stats.lastUpdated,
      },
      statusBreakdown,
      progress: {
        nextTierAt,
        progressToNextTier: Math.min(progressToNextTier, 100),
        conversionsNeeded: Math.max(0, nextTierAt - stats.convertedReferrals),
      },
    });
  } catch (error) {
    console.error('Error fetching referral status:', error);
    return NextResponse.json(
      { error: 'Failed to fetch referral status' },
      { status: 500 }
    );
  }
}
