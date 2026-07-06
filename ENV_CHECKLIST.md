# Environment Variables Checklist

## Current Status

### ✅ Already Configured (in .env.local)
```bash
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxxxxxxxxxxxxxxxxxx
STRIPE_SECRET_KEY=sk_live_xxxxxxxxxxxxxxxxxxxxx
```
Note: Actual keys are already set in .env.local and Vercel - do not commit real keys to git!

### ⚠️ MISSING - Must Add to Vercel

#### 1. Resend API Key (for email automation)
```bash
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx
```

**How to get:**
1. Go to https://resend.com/api-keys
2. Create new API key
3. Copy the key (starts with `re_`)
4. Add to Vercel environment variables

**Used for:**
- Trial nurture email sequence (3 emails)
- Transactional emails
- User onboarding automation

#### 2. Stripe Webhook Secret
```bash
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxxxxx
```

**How to get:**
1. Go to https://dashboard.stripe.com/webhooks
2. Click "Add endpoint"
3. URL: `https://theprofitfactory.ai/api/webhooks/stripe`
4. Select events: `checkout.session.completed`, `invoice.paid`, `invoice.payment_failed`, `customer.subscription.*`, `payment_intent.payment_failed`
5. Copy the signing secret (starts with `whsec_`)

#### 3. Google Ads ID
```bash
NEXT_PUBLIC_GOOGLE_ADS_ID=AW-XXXXXXXXXX
```

**How to get:**
1. Go to https://ads.google.com
2. Tools & Settings → Conversions
3. Click "+" to create conversion action
4. Choose "Website" → "Code yourself"
5. Copy the Conversion ID (format: AW-XXXXXXXXXX)

## Vercel Deployment Steps

### 1. Add Environment Variables

```bash
# In Vercel dashboard → Settings → Environment Variables
STRIPE_SECRET_KEY=[copy from .env.local]
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=[copy from .env.local]
STRIPE_WEBHOOK_SECRET=[get from Stripe dashboard]
RESEND_API_KEY=[get from Resend dashboard]
NEXT_PUBLIC_GOOGLE_ADS_ID=[get from Google Ads]
```

Make sure to set environment to: **Production, Preview, and Development**

### 2. Update Code

Edit `/components/GoogleAdsTracking.tsx` line 14-19:

Replace placeholder labels with real ones from Google Ads:

```typescript
const CONVERSION_LABELS = {
  TEMPLATE_BUNDLE_PURCHASE: "YOUR_ACTUAL_LABEL_HERE",
  SPONSOR_WALL_PURCHASE: "YOUR_ACTUAL_LABEL_HERE",
  WEBINAR_REGISTRATION: "YOUR_ACTUAL_LABEL_HERE",
  SAAS_SIGNUP: "YOUR_ACTUAL_LABEL_HERE",
};
```

### 3. Deploy

```bash
git add .
git commit -m "Add Google Ads tracking and attribution system"
git push origin main
```

Vercel will auto-deploy.

### 4. Verify Deployment

- [ ] Site loads without errors
- [ ] Check browser console for tracking initialization
- [ ] Make test purchase with test card: `4242 4242 4242 4242`
- [ ] Verify conversion shows in Google Ads (may take 24-48h)
- [ ] Check `payments.csv` for webhook entry
- [ ] Verify webhook delivery in Stripe dashboard

## Testing Checklist

### Google Ads Tracking
- [ ] Install Google Tag Assistant extension
- [ ] Visit site and verify gtag fires
- [ ] Complete checkout flow
- [ ] Verify conversion tag fires on /success page
- [ ] Check Google Ads dashboard after 24-48h

### Stripe Webhooks
- [ ] Webhook endpoint added in Stripe dashboard
- [ ] STRIPE_WEBHOOK_SECRET set in Vercel
- [ ] Make test payment
- [ ] Check Vercel function logs
- [ ] Verify payments.csv has new entry
- [ ] Check webhook delivery status in Stripe

### Attribution Tracking
- [ ] Visit with UTM: `?utm_source=test&utm_medium=manual&utm_campaign=verification`
- [ ] Check localStorage for `attribution_data`
- [ ] Complete checkout
- [ ] Check Stripe payment metadata for attribution fields
- [ ] Verify data flows to payments analysis

## Production URLs

- Main site: https://theprofitfactory.ai
- Webhook endpoint: https://theprofitfactory.ai/api/webhooks/stripe
- Success page: https://theprofitfactory.ai/success
- Sponsor success: https://theprofitfactory.ai/sponsor-wall/success
