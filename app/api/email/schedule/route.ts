import { NextRequest, NextResponse } from 'next/server';
import { sendWelcomeEmail, type EmailSchedule, calculateEmailTiming } from '@/lib/emailService';
import { promises as fs } from 'fs';
import path from 'path';

/**
 * POST /api/email/schedule
 * Schedule the 3-email trial nurture sequence for a new user
 *
 * Body:
 * {
 *   "userId": "unique-user-id",
 *   "email": "user@example.com",
 *   "firstName": "John",
 *   "signupDate": "2026-07-06T12:00:00Z"
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, email, firstName, signupDate } = body;

    if (!userId || !email || !firstName || !signupDate) {
      return NextResponse.json(
        { error: 'Missing required fields: userId, email, firstName, signupDate' },
        { status: 400 }
      );
    }

    // Send Email 1 (Welcome) immediately
    try {
      await sendWelcomeEmail({ email, firstName, signupDate });
      console.log(`✅ Welcome email sent to ${email}`);
    } catch (emailError) {
      console.error('Failed to send welcome email:', emailError);
      // Don't fail the whole request if email fails
    }

    // Store schedule for future emails
    const schedule: EmailSchedule = {
      userId,
      email,
      firstName,
      signupDate,
      emailsSent: {
        welcome: true,
        btwFeature: false,
        trialExpiry: false,
      },
    };

    const scheduleDir = path.join(process.cwd(), 'data', 'email-schedules');
    await fs.mkdir(scheduleDir, { recursive: true });

    const scheduleFile = path.join(scheduleDir, `${userId}.json`);
    await fs.writeFile(scheduleFile, JSON.stringify(schedule, null, 2));

    const timing = calculateEmailTiming(signupDate);

    return NextResponse.json({
      success: true,
      userId,
      email,
      emailSchedule: {
        email1_welcome: {
          sent: true,
          sentAt: new Date().toISOString(),
        },
        email2_btwFeature: {
          sent: false,
          scheduledFor: timing.email2.toISOString(),
        },
        email3_trialExpiry: {
          sent: false,
          scheduledFor: timing.email3.toISOString(),
        },
      },
    });
  } catch (error) {
    console.error('Email schedule error:', error);
    return NextResponse.json(
      { error: 'Failed to schedule email sequence' },
      { status: 500 }
    );
  }
}
