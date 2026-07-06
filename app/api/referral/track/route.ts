import { NextRequest, NextResponse } from 'next/server';
import {
  getReferralsByCode,
  createReferral,
  updateReferrerStats,
  getOrCreateReferrerStats,
  isSameDeviceFingerprint,
  isSameEmailDomain,
} from '@/lib/referralDb';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { referralCode, email, deviceFingerprint } = body;

    // Validate required fields
    if (!referralCode || !email || !deviceFingerprint) {
      return NextResponse.json(
        { error: 'Referral code, email, and device fingerprint are required' },
        { status: 400 }
      );
    }

    // Get all referrals for this code to check fraud
    const existingReferrals = await getReferralsByCode(referralCode);

    if (existingReferrals.length === 0) {
      return NextResponse.json(
        { error: 'Invalid referral code' },
        { status: 404 }
      );
    }

    // Get the original referrer info from the first referral
    const originalReferrer = existingReferrals[0];

    // Fraud detection: same device fingerprint
    if (isSameDeviceFingerprint(originalReferrer.referrerDeviceFp, deviceFingerprint)) {
      return NextResponse.json(
        {
          success: false,
          status: 'fraud',
          reason: 'Same device fingerprint detected',
        },
        { status: 200 }
      );
    }

    // Fraud detection: same email domain (e.g., both @gmail.com)
    if (isSameEmailDomain(originalReferrer.referrerEmail, email)) {
      return NextResponse.json(
        {
          success: false,
          status: 'fraud',
          reason: 'Same email domain detected',
        },
        { status: 200 }
      );
    }

    // Check if this email has already been referred with this code
    const existingReferral = existingReferrals.find(
      r => r.referredEmail === email
    );

    if (existingReferral) {
      return NextResponse.json(
        {
          success: false,
          status: 'duplicate',
          reason: 'Email already referred with this code',
        },
        { status: 200 }
      );
    }

    // Create new referral entry with referred user info (pending conversion)
    const newReferral = await createReferral(
      referralCode,
      originalReferrer.referrerEmail,
      originalReferrer.referrerDeviceFp
    );

    // Update the referral with referred user info
    await updateReferral(newReferral.id, {
      referredEmail: email,
      referredDeviceFp: deviceFingerprint,
      conversionStatus: 'pending',
    });

    // Increment total shares count
    const stats = await getOrCreateReferrerStats(referralCode);
    await updateReferrerStats(referralCode, {
      totalShares: stats.totalShares + 1,
    });

    return NextResponse.json({
      success: true,
      status: 'pending',
      message: 'Referral tracked. Awaiting conversion.',
      referralId: newReferral.id,
    });
  } catch (error) {
    console.error('Error tracking referral:', error);
    return NextResponse.json(
      { error: 'Failed to track referral' },
      { status: 500 }
    );
  }
}

// Helper function imported at runtime (avoids circular dependency)
async function updateReferral(id: string, updates: any) {
  const { updateReferral: updateRef } = await import('@/lib/referralDb');
  return updateRef(id, updates);
}
