# Email Automation Setup - Trial Nurture Sequence

## Overview

This system sends a 3-email nurture sequence to SaaS trial users to convert them to paid subscribers.

**Email Sequence:**
1. **Email 1:** Welcome + Onboarding (sent immediately after signup)
2. **Email 2:** BTW Feature Highlight (sent day 3)
3. **Email 3:** Trial Expiry Urgency (sent day 11, 3 days before trial ends)

## Architecture

### Components

1. **Email Service** (`lib/emailService.ts`)
   - Resend client wrapper
   - 3 email template functions
   - Email scheduling logic

2. **API Endpoints:**
   - `POST /api/email/schedule` - Trigger email sequence for new trial user
   - `GET /api/email/send-scheduled` - Cron job to send scheduled emails

3. **Webhook Integration** (`app/api/webhooks/stripe/route.ts`)
   - Triggers email sequence on `checkout.session.completed` for SaaS subscriptions

4. **Vercel Cron** (`vercel.json`)
   - Runs `/api/email/send-scheduled` daily at 9:00 AM UTC

5. **Data Storage** (`data/email-schedules/`)
   - JSON files tracking email schedules per user
   - Format: `{userId}.json`

## Setup Instructions

### 1. Get Resend API Key

1. Go to https://resend.com/api-keys
2. Sign up or log in
3. Create a new API key
4. Copy the key (starts with `re_`)

### 2. Add Environment Variable

#### Local Development (.env.local)
```bash
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx
```

#### Vercel Production
1. Go to Vercel Dashboard → Project Settings → Environment Variables
2. Add: `RESEND_API_KEY` = `re_xxxxxxxxxxxxxxxxxxxxx`
3. Environment: Production, Preview, Development

### 3. Verify Domain (Optional but Recommended)

For production emails, verify your domain in Resend:

1. Go to https://resend.com/domains
2. Add domain: `theprofitfactory.ai`
3. Add DNS records (SPF, DKIM, DMARC)
4. Wait for verification (~5 minutes)

**Without verification:** Emails will come from `onboarding@resend.dev` (works for testing)
**With verification:** Emails will come from `onboarding@theprofitfactory.ai` (better deliverability)

### 4. Deploy

```bash
cd /home/paperclip/moneymachine
npm run build  # Verify build passes
git add .
git commit -m "Add email automation for trial nurture sequence

- Install Resend for email delivery
- Create 3-email sequence (welcome, BTW feature, trial expiry)
- Add /api/email/schedule endpoint
- Add /api/email/send-scheduled cron endpoint
- Integrate with Stripe webhook on trial signup
- Add Vercel cron config for daily email processing
- Document setup in EMAIL_AUTOMATION_SETUP.md

Co-Authored-By: Paperclip <noreply@paperclip.ing>"
git push origin main
```

Vercel will auto-deploy.

### 5. Verify Deployment

#### Check Environment Variables
```bash
# In Vercel dashboard
Settings → Environment Variables → Verify RESEND_API_KEY is set
```

#### Test Email Sequence (Manual)
```bash
# Test scheduling endpoint
curl -X POST https://theprofitfactory.ai/api/email/schedule \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "test-user-001",
    "email": "your-test-email@example.com",
    "firstName": "Test",
    "signupDate": "2026-07-06T12:00:00Z"
  }'

# Should return:
# { "success": true, "userId": "test-user-001", "email": "...", "emailSchedule": {...} }
```

#### Check Email Was Sent
1. Check your inbox for welcome email
2. Check Resend dashboard: https://resend.com/emails
3. Verify Email 1 shows as delivered

#### Test Cron Job
```bash
# Trigger the cron manually
curl https://theprofitfactory.ai/api/email/send-scheduled

# Should return:
# { "success": true, "emailsSent": 0, "results": [...], "timestamp": "..." }
```

## How It Works

### Flow Diagram

```
Trial Signup (Stripe Checkout)
         ↓
checkout.session.completed webhook
         ↓
POST /api/email/schedule
         ↓
┌─────────────────────────┐
│ Email 1: Welcome        │ → Sent immediately
│ (onboarding, first use) │
└─────────────────────────┘
         ↓
Schedule saved to data/email-schedules/{userId}.json
         ↓
Daily Cron (9:00 AM UTC)
         ↓
GET /api/email/send-scheduled
         ↓
Check all schedules for due emails
         ↓
┌─────────────────────────┐
│ Email 2: BTW Feature    │ → Sent on day 3
│ (education, feature)    │
└─────────────────────────┘
         ↓
┌─────────────────────────┐
│ Email 3: Trial Expiry   │ → Sent on day 11
│ (urgency, conversion)   │
└─────────────────────────┘
```

### Email Content

#### Email 1: Welcome (Immediate)
- **Subject:** Je eerste factuur verstuur je over 5 minuten ✅
- **Goal:** Onboard user, drive first action
- **CTA:** Go to dashboard, create first invoice

#### Email 2: BTW Feature (Day 3)
- **Subject:** Hoe je nooit meer een BTW-deadline mist
- **Goal:** Educate on key feature (BTW tracking)
- **CTA:** Activate BTW tracking

#### Email 3: Trial Expiry (Day 11)
- **Subject:** Je trial eindigt over 3 dagen — dit mis je als je stopt
- **Goal:** Create urgency, drive conversion
- **CTA:** Upgrade to paid plan (€19/month or €190/year)
- **Personalization:** Shows user stats (invoices sent, expenses tracked, BTW calculated)

## Email Tracking & Analytics

### Resend Dashboard
- Email deliverability: https://resend.com/emails
- Open rates, click rates, bounces
- Individual email status tracking

### Custom Analytics (TODO)
To track conversion rates:
1. Add tracking pixels to emails
2. Log email opens/clicks to `data/email-analytics/`
3. Correlate with Stripe subscription conversions
4. Calculate conversion rate per email

## Troubleshooting

### Emails Not Sending

**Check 1: API Key**
```bash
# Verify env var is set in Vercel
vercel env ls
```

**Check 2: Resend Dashboard**
- Check https://resend.com/emails
- Look for error messages
- Verify API key is active

**Check 3: Vercel Logs**
```bash
# Check function logs
vercel logs --follow
```

**Check 4: Email Schedule Files**
```bash
# Check if schedules are being created
ls data/email-schedules/
cat data/email-schedules/{userId}.json
```

### Cron Not Running

**Check 1: Vercel Cron Config**
- Verify `vercel.json` exists
- Check Vercel dashboard → Cron Jobs

**Check 2: Manual Trigger**
```bash
# Test cron endpoint manually
curl https://theprofitfactory.ai/api/email/send-scheduled
```

**Check 3: Cron Logs**
- Go to Vercel dashboard → Cron Jobs
- Click on job → View logs

### Emails Going to Spam

**Solution 1: Verify Domain**
- Add SPF, DKIM, DMARC records
- Use verified domain email address

**Solution 2: Warm Up Email Reputation**
- Start with low volume (10-20 emails/day)
- Gradually increase over 2 weeks
- Monitor bounce/spam rates

**Solution 3: Test Email Content**
- Avoid spam trigger words
- Balance text/HTML ratio
- Include unsubscribe link

## Production Checklist

- [ ] RESEND_API_KEY set in Vercel
- [ ] Domain verified in Resend (optional but recommended)
- [ ] Vercel cron job configured and running
- [ ] Test email sequence end-to-end
- [ ] Monitor Resend dashboard for deliverability
- [ ] Check Stripe webhook is triggering emails
- [ ] Verify emails arrive in inbox (not spam)
- [ ] Test on both monthly and yearly trial signups
- [ ] Set up alerts for failed emails

## Future Enhancements

### Phase 2: Enhanced Personalization
- [ ] Fetch real user stats (invoices, expenses, BTW) from app database
- [ ] Dynamic email content based on user behavior
- [ ] A/B test email subject lines

### Phase 3: Advanced Tracking
- [ ] Track email opens and clicks
- [ ] Calculate conversion rates per email
- [ ] Segment users by engagement level

### Phase 4: Additional Sequences
- [ ] Post-purchase onboarding (after trial converts)
- [ ] Re-engagement for churned users
- [ ] Referral program emails

### Phase 5: Migration to Database
- [ ] Replace JSON files with proper database (Postgres/Firebase)
- [ ] Use job queue (BullMQ/Inngest) instead of cron
- [ ] Better error handling and retry logic

## Support

For issues with:
- **Resend API:** https://resend.com/docs
- **Vercel Cron:** https://vercel.com/docs/cron-jobs
- **Stripe Webhooks:** https://stripe.com/docs/webhooks

## Summary

✅ **What's Done:**
- Resend integration
- 3-email sequence with delays
- Stripe webhook integration
- Vercel cron for scheduled sends
- File-based schedule storage

⚠️ **What's Needed:**
- Set RESEND_API_KEY in Vercel
- Test trial signup flow end-to-end
- Monitor email deliverability

🚀 **Ready to Deploy!**
