# Tracking & Attribution Setup Guide

This guide documents the conversion tracking and attribution infrastructure for Money Machine.

## Overview

The tracking system consists of three main components:

1. **Google Ads Conversion Tracking** - Tracks purchases and conversions for paid advertising ROI
2. **Stripe Webhook Logging** - Records all payment events to `payments.csv` for analysis
3. **Attribution Tracking** - Captures UTM parameters and referral sources to measure channel effectiveness

## 1. Google Ads Conversion Tracking

### Setup Steps

1. **Create Google Ads Account** (if not exists)
   - Go to https://ads.google.com
   - Create a new account or use existing

2. **Set up Conversion Actions**
   - Navigate to Tools & Settings → Conversions
   - Create conversion actions for each event:
     - **Template Bundle Purchase** (value: varies €47-€197)
     - **Sponsor Wall Purchase** (value: €500+)
     - **Webinar Registration** (value: €0, lead generation)
     - **Future SaaS Signup** (value: €19/month)

3. **Get Conversion IDs and Labels**
   - After creating each conversion action, Google Ads will provide:
     - Conversion ID (format: `AW-XXXXXXXXXX`)
     - Conversion Label (unique per action)

4. **Configure Environment Variables**

Add to `.env.local` and Vercel:

```bash
NEXT_PUBLIC_GOOGLE_ADS_ID=AW-XXXXXXXXXX
```

5. **Update Conversion Labels**

Edit `/components/GoogleAdsTracking.tsx` and replace placeholders:

```typescript
const CONVERSION_LABELS = {
  TEMPLATE_BUNDLE_PURCHASE: "abc123xyz", // Replace with actual label
  SPONSOR_WALL_PURCHASE: "def456uvw",    // Replace with actual label
  WEBINAR_REGISTRATION: "ghi789rst",     // Replace with actual label
  SAAS_SIGNUP: "jkl012mno",              // Replace with actual label
};
```

### Verification

1. Install [Google Tag Assistant](https://chrome.google.com/webstore/detail/tag-assistant-legacy-by-g/kejbdjndbnbjgmefkgdddjlbokphdefk)
2. Visit your site and complete a test purchase
3. Check that:
   - Global site tag fires on all pages
   - Conversion tag fires on success pages with correct value
4. Verify conversions in Google Ads dashboard (Tools → Conversions → View details)

### Files Modified

- `/components/GoogleAdsTracking.tsx` - Main tracking component
- `/app/layout.tsx` - Global tag initialization
- `/app/success/page.tsx` - Template bundle conversion tracking
- `/app/sponsor-wall/success/page.tsx` - Sponsor wall conversion tracking

## 2. Stripe Webhook Logging

### Setup (Already Complete!)

The Stripe webhook endpoint is **already implemented** at `/api/webhooks/stripe/route.ts`.

### Current Features

- Logs all payment events to `payments.csv` in project root
- Tracks these events:
  - `checkout.session.completed`
  - `invoice.paid`
  - `invoice.payment_failed`
  - `customer.subscription.created`
  - `customer.subscription.deleted`
  - `payment_intent.payment_failed`

### CSV Format

```csv
timestamp,event,customerId,customerEmail,amount,currency,product,subscriptionId,status
2026-07-06T12:00:00Z,checkout.session.completed,cus_abc123,buyer@example.com,47,EUR,starter,,paid
```

### Configure Stripe Webhook

1. **Get Webhook Secret from Stripe**
   - Go to https://dashboard.stripe.com/webhooks
   - Click "Add endpoint"
   - URL: `https://yourdomain.com/api/webhooks/stripe`
   - Select events:
     - `checkout.session.completed`
     - `invoice.paid`
     - `invoice.payment_failed`
     - `customer.subscription.created`
     - `customer.subscription.deleted`
     - `payment_intent.payment_failed`
   - Copy the webhook signing secret (starts with `whsec_`)

2. **Add to Environment Variables**

⚠️ **CRITICAL**: Add webhook secret to Vercel (NOT in `.env.local` for production):

```bash
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxxxxx
```

### Vercel Configuration

Required environment variables in Vercel dashboard:

```
STRIPE_SECRET_KEY=sk_live_xxxxx (already set)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx (already set)
STRIPE_WEBHOOK_SECRET=whsec_xxxxx (ADD THIS!)
```

### Testing Webhooks

1. **Local Testing with Stripe CLI**

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login
stripe login

# Forward webhooks to local dev
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Trigger test events
stripe trigger checkout.session.completed
```

2. **Production Testing**
   - Make a real test purchase (use Stripe test cards: `4242 4242 4242 4242`)
   - Check `payments.csv` for new entry
   - Verify webhook logs in Stripe dashboard

## 3. Attribution Tracking

### How It Works

1. **Capture** - When a user visits with UTM parameters, they're stored in localStorage
2. **Persist** - Attribution data persists for 30 days
3. **Pass** - When user checks out, attribution is sent to Stripe metadata
4. **Analyze** - Revenue is attributed to acquisition channel via `payments.csv` + Stripe metadata

### UTM Parameters

Add these to all marketing links:

```
utm_source   - Where traffic comes from (google, facebook, twitter, email)
utm_medium   - Type of marketing (cpc, social, email, referral)
utm_campaign - Specific campaign name (summer_sale, launch_week)
utm_term     - Paid keyword (optional)
utm_content  - Ad variant (optional)
```

### Example Links

```
https://theprofitfactory.ai/?utm_source=google&utm_medium=cpc&utm_campaign=ai_templates
https://theprofitfactory.ai/?utm_source=twitter&utm_medium=social&utm_campaign=launch
https://theprofitfactory.ai/?utm_source=newsletter&utm_medium=email&utm_campaign=weekly
```

### Stripe Metadata Fields

Attribution data is automatically added to Stripe checkout sessions:

```
attribution_source    - utm_source value
attribution_medium    - utm_medium value
attribution_campaign  - utm_campaign value
attribution_term      - utm_term value (if present)
attribution_content   - utm_content value (if present)
attribution_referrer  - HTTP referrer
attribution_landing   - First page visited
attribution_first_seen - First visit timestamp
```

### Analyzing Attribution

1. **Via Stripe Dashboard**
   - Go to Payments → Click any payment
   - Scroll to "Metadata" section
   - See attribution fields

2. **Via payments.csv Analysis**
   - Export Stripe data with metadata
   - Join with `payments.csv` by session ID or customer email
   - Analyze revenue by source/medium/campaign

3. **Example SQL Query** (if using a database)

```sql
SELECT
  metadata->>'attribution_source' as source,
  metadata->>'attribution_campaign' as campaign,
  COUNT(*) as purchases,
  SUM(amount_total/100.0) as revenue_eur
FROM stripe_checkout_sessions
WHERE status = 'complete'
  AND created > NOW() - INTERVAL '30 days'
GROUP BY source, campaign
ORDER BY revenue_eur DESC;
```

### Files Modified

- `/lib/attribution.ts` - Attribution tracking utilities
- `/components/AttributionTracker.tsx` - Client-side capture component
- `/app/layout.tsx` - Initialize attribution tracking
- `/app/api/checkout/route.ts` - Pass attribution to Stripe
- `/app/api/sponsor-checkout/route.ts` - Pass attribution to Stripe

## Deployment Checklist

Before deploying to production:

- [ ] Set `NEXT_PUBLIC_GOOGLE_ADS_ID` in Vercel environment variables
- [ ] Update conversion labels in `GoogleAdsTracking.tsx` with real values
- [ ] Set `STRIPE_WEBHOOK_SECRET` in Vercel environment variables
- [ ] Configure Stripe webhook endpoint in Stripe dashboard
- [ ] Test webhook with Stripe CLI locally
- [ ] Run `npm run build` to verify no TypeScript errors
- [ ] Deploy to Vercel
- [ ] Verify Google Tag with Tag Assistant
- [ ] Make test purchase and check `payments.csv`
- [ ] Verify conversion shows in Google Ads dashboard
- [ ] Check Stripe dashboard for webhook delivery success

## Monitoring & Maintenance

### Daily
- Monitor `payments.csv` for new entries
- Check Stripe webhook logs for failures

### Weekly
- Review Google Ads conversion data
- Analyze top performing UTM sources
- Check for any webhook delivery failures

### Monthly
- Export and analyze full attribution data
- Calculate ROI per channel
- Adjust ad spend based on conversion data

## Troubleshooting

### Google Ads conversions not tracking
1. Check browser console for errors
2. Verify `NEXT_PUBLIC_GOOGLE_ADS_ID` is set
3. Confirm conversion labels are correct
4. Use Google Tag Assistant to debug

### Stripe webhooks not working
1. Check `STRIPE_WEBHOOK_SECRET` is set in Vercel
2. Verify webhook endpoint URL in Stripe dashboard
3. Check Vercel function logs for errors
4. Test with Stripe CLI locally

### Attribution data not captured
1. Check browser localStorage for `attribution_data`
2. Verify UTM parameters are in URL
3. Check browser console for errors
4. Confirm `AttributionTracker` is in layout

## Support

For issues or questions:
- Google Ads: https://support.google.com/google-ads
- Stripe Webhooks: https://stripe.com/docs/webhooks
- Money Machine team: Create an issue in the project repository
