# ⚡ Product Hunt Launch — Ready to Execute

**Status:** Ready to launch. All copy, playbook, and tracking are prepared.

**Action required:** Board must execute 3 manual steps (see below).

---

## ✅ What's Already Done

1. **Complete Product Hunt listing copy** — title, tagline, description, first comment
2. **Launch playbook** — timing, engagement strategy, response templates
3. **UTM tracking** — already integrated in checkout flow
4. **Twitter thread** — ready to copy/paste
5. **Engagement templates** — responses for every comment scenario

**All documentation:** `/home/paperclip/moneymachine/PRODUCT_HUNT_LAUNCH.md`

---

## 🚨 3 Manual Steps Required (Board Only)

### **Step 1: Create Stripe Discount Code** ⚠️ BLOCKER

Product Hunt users get 50% off for 3 months. You must create this coupon in Stripe.

**Stripe Dashboard → Coupons → Create Coupon:**

```
Coupon ID:           PRODUCTHUNT50
Discount:            50% off
Duration:            Repeating
Duration (months):   3
Name:                Product Hunt Launch 50% Off
Applies to:          All products (or ZZP Admin Suite only)
Expiration:          7 days from launch date
```

**Or via Stripe CLI:**
```bash
stripe coupons create \
  --id PRODUCTHUNT50 \
  --percent_off 50 \
  --duration repeating \
  --duration_in_months 3 \
  --name "Product Hunt Launch 50% Off"
```

**Test it works:**
- Go to `https://moneymachine-domain/saas`
- Click "Start trial"
- In Stripe checkout, enter code `PRODUCTHUNT50`
- Confirm it shows: "€9.50/month for 3 months, then €19/month"

---

### **Step 2: Submit Product Hunt Listing** ⚠️ BLOCKER

Only humans with a Product Hunt account can submit. Go to:

**https://www.producthunt.com/posts/new**

**Fill in form:**

| Field | Value |
|-------|-------|
| **Product name** | ZZP Admin Suite |
| **Tagline** | Invoice generation, VAT tracking & contracts for Dutch freelancers |
| **Description** | [Copy from PRODUCT_HUNT_LAUNCH.md → "Description (Complete PH post body)"] |
| **Website** | https://moneymachine-domain/saas?utm_source=producthunt&utm_campaign=launch |
| **Twitter** | @moneymachine_io (if exists) |
| **Screenshots** | Upload 5-8 images (see Step 3 below) |
| **Category** | Productivity, SaaS, Finance |
| **Topics** | Freelance, Invoicing, Tax, Admin, Automation |
| **Launch date** | [Today or scheduled for 00:01 PST tomorrow] |

**After submission:**
- Get Product Hunt URL (e.g., `https://www.producthunt.com/posts/zzp-admin-suite`)
- Post **first comment** immediately (copy from PRODUCT_HUNT_LAUNCH.md → "First Comment")

---

### **Step 3: Prepare Screenshots** ⚠️ BLOCKER

Product Hunt requires 5-8 screenshots (16:9 ratio, min 1280×720px).

**Option A: Generate with browser screenshots**
1. Go to `https://moneymachine-domain/saas`
2. Take screenshots of:
   - Hero/Dashboard
   - Invoice generator
   - BTW calculator
   - Contract templates
   - Expense tracker
   - Hourly rate calculator
3. Resize to 1280×720px (use Figma/Canva/Screenshot tools)

**Option B: Use existing mockups**
- If you have Figma/design files, export screens as PNG (1280×720px)

**Option C: Skip this for now**
- Launch with 1-2 screenshots of the landing page
- PH allows editing after submission

**Upload screenshots in Product Hunt form (Step 2).**

---

## 🚀 Launch Execution (After Steps 1-3 Done)

### **00:01 PST (09:01 CET) — Go Live**

1. **Submit on Product Hunt** (or schedule for 00:01 PST)
2. **Post first comment** (founder story from PRODUCT_HUNT_LAUNCH.md)
3. **Tweet launch thread:**
   ```
   🚀 We just launched on @ProductHunt!

   ZZP Admin Suite = automate your freelance admin in 5 minutes.

   ✅ Invoices: 30 seconds
   ✅ VAT tracking: automatic
   ✅ Contracts: 20+ templates
   ✅ Hourly rate calc: market data

   Product Hunt users get 50% off 🎉

   👉 [PH link] #ProductHunt
   ```

4. **Monitor PH comments** — reply to ALL comments within 15 min (use response templates from PRODUCT_HUNT_LAUNCH.md)

### **First 6 Hours — Critical Window**

- **Reply to EVERY comment in <15 min**
- **Do NOT ask for upvotes** (PH will penalize you)
- **Do NOT spam mentions** (max 3 tags)
- **Do share in relevant communities:** Reddit (r/freelance, r/entrepreneur), Twitter, newsletters

### **Hour 6-24 — Sustain**

- Keep replying to comments
- Post progress update: "100 upvotes! 🚀 Thank you!"
- Share testimonials from new signups

---

## 📊 Success Metrics (Track These)

| Metric | Target | How to Track |
|--------|--------|--------------|
| **Upvotes** | 200+ | Product Hunt listing page |
| **Trial signups** | 50+ | Stripe dashboard → Subscriptions |
| **Comments** | Reply to ALL | Product Hunt listing |
| **Traffic** | 500+ visitors | Google Analytics (if installed) |

**Day 7 report:**
- Trial-to-paid conversion: 20%+ (10+ paying customers)
- MRR: €190-€950

---

## ⚠️ What Blitz (CMO) CANNOT Do

1. **Create Stripe coupon** — requires Stripe dashboard access (board only)
2. **Submit Product Hunt listing** — requires human account + browser
3. **Generate screenshots** — requires live app access or design files

**These 3 blockers prevent me from launching independently.**

---

## ✅ What Blitz HAS Done

1. **Complete listing copy** — ready to paste into PH form
2. **Launch playbook** — exact timing, engagement strategy, response templates
3. **UTM tracking** — already working in checkout flow
4. **Twitter thread** — ready to post
5. **Discount strategy** — 50% off for 3 months (just needs Stripe setup)

**All documentation in:** `PRODUCT_HUNT_LAUNCH.md`

---

## 🎯 Next Steps for Board

1. **Create Stripe coupon** `PRODUCTHUNT50` (5 min)
2. **Upload screenshots** (10-20 min)
3. **Submit PH listing** (10 min)
4. **Monitor + engage** (ongoing for 24h)

**Total time: 30-45 min to go live.**

---

## 📞 Support

If you hit issues:
- Check PRODUCT_HUNT_LAUNCH.md for full details
- Test Stripe coupon before launch
- DM Blitz (CMO) for copywriting tweaks

**LET'S HIT FRONT PAGE. 🚀**
