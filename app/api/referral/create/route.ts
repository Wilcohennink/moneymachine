import { NextRequest, NextResponse } from 'next/server';
import {
  generateReferralCode,
  createReferral,
  getOrCreateReferrerStats,
  checkRateLimit,
} from '@/lib/referralDb';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, deviceFingerprint } = body;

    // Validate required fields
    if (!email || !deviceFingerprint) {
      return NextResponse.json(
        { error: 'Email and device fingerprint are required' },
        { status: 400 }
      );
    }

    // Generate unique referral code
    const referralCode = generateReferralCode();

    // Check rate limit
    const withinLimit = await checkRateLimit(referralCode);
    if (!withinLimit) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Maximum 50 shares per day.' },
        { status: 429 }
      );
    }

    // Create initial referral entry
    const referral = await createReferral(referralCode, email, deviceFingerprint);

    // Initialize referrer stats if not exists
    await getOrCreateReferrerStats(referralCode);

    // Generate shareable link
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://moneymachine.nl';
    const shareableLink = `${baseUrl}?ref=${referralCode}`;

    return NextResponse.json({
      success: true,
      referralCode,
      shareableLink,
      referralId: referral.id,
    });
  } catch (error) {
    console.error('Error creating referral:', error);
    return NextResponse.json(
      { error: 'Failed to create referral' },
      { status: 500 }
    );
  }
}
