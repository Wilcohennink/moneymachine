import { NextRequest, NextResponse } from 'next/server';
import { sendBTWFeatureEmail, sendTrialExpiryEmail, calculateEmailTiming, type EmailSchedule } from '@/lib/emailService';
import { promises as fs } from 'fs';
import path from 'path';

/**
 * GET /api/email/send-scheduled
 * Cron job endpoint to send scheduled emails (Email 2 and Email 3)
 *
 * This should be called daily via Vercel Cron or external cron service
 * Vercel Cron config: https://vercel.com/docs/cron-jobs
 *
 * Add to vercel.json:
 * {
 *   "crons": [{
 *     "path": "/api/email/send-scheduled",
 *     "schedule": "0 9 * * *"
 *   }]
 * }
 */
export async function GET(request: NextRequest) {
  try {
    const scheduleDir = path.join(process.cwd(), 'data', 'email-schedules');

    // Check if directory exists
    try {
      await fs.access(scheduleDir);
    } catch {
      return NextResponse.json({
        success: true,
        message: 'No schedules directory found',
        emailsSent: 0,
      });
    }

    const files = await fs.readdir(scheduleDir);
    const now = new Date();
    let emailsSent = 0;
    const results = [];

    for (const file of files) {
      if (!file.endsWith('.json')) continue;

      const filePath = path.join(scheduleDir, file);
      const content = await fs.readFile(filePath, 'utf-8');
      const schedule: EmailSchedule = JSON.parse(content);

      const timing = calculateEmailTiming(schedule.signupDate);

      // Check if Email 2 (BTW Feature) should be sent
      if (!schedule.emailsSent.btwFeature && now >= timing.email2) {
        try {
          await sendBTWFeatureEmail({
            email: schedule.email,
            firstName: schedule.firstName,
            signupDate: schedule.signupDate,
          });

          schedule.emailsSent.btwFeature = true;
          await fs.writeFile(filePath, JSON.stringify(schedule, null, 2));

          emailsSent++;
          results.push({
            userId: schedule.userId,
            email: 'Email 2 (BTW Feature)',
            status: 'sent',
          });

          console.log(`✅ Email 2 sent to ${schedule.email}`);
        } catch (error) {
          console.error(`Failed to send Email 2 to ${schedule.email}:`, error);
          results.push({
            userId: schedule.userId,
            email: 'Email 2 (BTW Feature)',
            status: 'failed',
            error: String(error),
          });
        }
      }

      // Check if Email 3 (Trial Expiry) should be sent
      if (!schedule.emailsSent.trialExpiry && now >= timing.email3) {
        try {
          // Mock stats for now - in production, fetch real user stats
          const stats = {
            invoiceCount: 3,
            expensesAmount: 450,
            btwCalculated: 94.50,
          };

          await sendTrialExpiryEmail(
            {
              email: schedule.email,
              firstName: schedule.firstName,
              signupDate: schedule.signupDate,
            },
            stats
          );

          schedule.emailsSent.trialExpiry = true;
          await fs.writeFile(filePath, JSON.stringify(schedule, null, 2));

          emailsSent++;
          results.push({
            userId: schedule.userId,
            email: 'Email 3 (Trial Expiry)',
            status: 'sent',
          });

          console.log(`✅ Email 3 sent to ${schedule.email}`);
        } catch (error) {
          console.error(`Failed to send Email 3 to ${schedule.email}:`, error);
          results.push({
            userId: schedule.userId,
            email: 'Email 3 (Trial Expiry)',
            status: 'failed',
            error: String(error),
          });
        }
      }
    }

    return NextResponse.json({
      success: true,
      emailsSent,
      results,
      timestamp: now.toISOString(),
    });
  } catch (error) {
    console.error('Send scheduled emails error:', error);
    return NextResponse.json(
      { error: 'Failed to send scheduled emails' },
      { status: 500 }
    );
  }
}
