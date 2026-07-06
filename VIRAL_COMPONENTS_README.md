# Viral Loop UI Components

**Designer:** Pixel
**Project:** Money Machine — ZZP Invoice Generator
**Delivery Date:** 2026-07-06

---

## 🎯 Overview

4 production-ready React/TypeScript components voor de share-to-unlock viral loop. Gebouwd met Next.js 14, Tailwind CSS, en mobile-first responsive design.

**Demo:** http://localhost:3000/viral-demo

---

## 📦 Components Delivered

### 1. ShareModal (`components/ShareModal.tsx`)

**Purpose:** Primary viral trigger modal na eerste factuur generatie

**Features:**
- 3-second anti-dismiss delay (prevent accidental close)
- WhatsApp, LinkedIn, Email share options met pre-filled messages
- Real-time progress tracking (0/3, 1/3, 2/3, 3/3)
- Success state na elke share
- Celebration animation bij Tier 1 unlock
- Mobile + desktop optimized

**Props:**
```typescript
interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentShares: number;
  requiredShares: number;
  userRefCode: string;  // User's unique referral code
  onShare: (platform: 'whatsapp' | 'linkedin' | 'email') => void;
}
```

**Integration Example:**
```tsx
import ShareModal from '@/components/ShareModal';

<ShareModal
  isOpen={showModal}
  onClose={() => setShowModal(false)}
  currentShares={user.totalShares}
  requiredShares={3}
  userRefCode={user.refCode}
  onShare={(platform) => {
    trackShareEvent(platform);
    incrementShareCount();
  }}
/>
```

**Trigger Timing:**
- Primary: After first invoice PDF downloaded
- Secondary: When clicking locked premium template
- Tertiary: From dashboard unlock widget CTA

---

### 2. DashboardUnlockWidget (`components/DashboardUnlockWidget.tsx`)

**Purpose:** Persistent sidebar widget voor progress tracking

**Features:**
- Visual progress circles (3 dots)
- Next unlock tier preview
- Current vs required shares display
- Dark theme voor contrast
- Unlocked state met next tier teaser

**Props:**
```typescript
interface DashboardUnlockWidgetProps {
  currentShares: number;
  requiredShares: number;
  nextUnlock: string;  // e.g., "Premium Templates"
  onShareClick: () => void;
}
```

**Integration Example:**
```tsx
import DashboardUnlockWidget from '@/components/DashboardUnlockWidget';

// In dashboard sidebar
<DashboardUnlockWidget
  currentShares={user.totalShares}
  requiredShares={getNextTierRequirement(user.tier)}
  nextUnlock={getNextTierName(user.tier)}
  onShareClick={() => setShowModal(true)}
/>
```

**Placement:** Right sidebar op dashboard (desktop), boven factuur lijst (mobile)

---

### 3. TopBanner (`components/TopBanner.tsx`)

**Purpose:** Persistent top banner tot Tier 1 unlock

**Features:**
- Session-based dismissal (reappears on new session)
- Responsive mobile/desktop layout
- High-contrast CTA button
- Auto-hide when Tier 1 unlocked
- Slide-down entrance animation

**Props:**
```typescript
interface TopBannerProps {
  remainingShares: number;  // Shares needed for Tier 1
  onShareClick: () => void;
}
```

**Integration Example:**
```tsx
import TopBanner from '@/components/TopBanner';

// In root layout or dashboard page
{user.tier < 1 && (
  <TopBanner
    remainingShares={3 - user.totalShares}
    onShareClick={() => setShowModal(true)}
  />
)}
```

**Behavior:**
- Dismissed state saved in `sessionStorage`
- Reappears on next browser session
- Never shows again after Tier 1 unlocked

---

### 4. LockedTemplatePreview (`components/LockedTemplatePreview.tsx`)

**Purpose:** Locked premium template card met unlock CTA

**Features:**
- Blurred template preview (optional image)
- Lock icon overlay
- Hover scale effect
- Premium badge indicator
- Inline unlock modal on click

**Props:**
```typescript
interface LockedTemplatePreviewProps {
  templateName: string;
  templatePreviewImage?: string;  // Optional preview image URL
  remainingShares: number;
  onUnlockClick: () => void;
}
```

**Integration Example:**
```tsx
import LockedTemplatePreview from '@/components/LockedTemplatePreview';

// In template gallery
<div className="grid grid-cols-3 gap-4">
  {premiumTemplates.map((template) => (
    <LockedTemplatePreview
      key={template.id}
      templateName={template.name}
      templatePreviewImage={template.thumbnail}
      remainingShares={3 - user.totalShares}
      onUnlockClick={() => setShowModal(true)}
    />
  ))}
</div>
```

---

## 🎨 Design System

### Colors
```css
Primary Blue:    #00D4FF  (tech, snelheid)
Primary Hover:   #00A8CC
Gold Accent:     #FFD700  (premium, success)
Background Dark: #0A0A0A
White:           #FFFFFF
Gray Scale:      #374151, #6B7280, #9CA3AF, #E5E7EB
```

### Typography
- Headings: `font-bold` + `text-xl` to `text-2xl`
- Body: `font-medium` + `text-sm` to `text-base`
- Dutch tone: Friendly, direct, geen corporate jargon

### Animations
```css
.animate-scale-in    /* Modal entrance */
.animate-slide-down  /* Banner entrance */
.hover:scale-105     /* Button hover */
```

---

## 🔧 Backend Integration Checklist

### Required API Endpoints

1. **Referral Tracking**
   ```typescript
   POST /api/referrals/track-share
   {
     userId: string;
     platform: 'whatsapp' | 'linkedin' | 'email';
     timestamp: Date;
   }
   ```

2. **User Unlock Status**
   ```typescript
   GET /api/users/:userId/unlock-status
   Response: {
     tier: number;
     totalShares: number;
     nextTierRequirement: number;
     unlockedFeatures: string[];
   }
   ```

3. **Referral Landing**
   ```typescript
   POST /api/referrals/track-landing
   {
     refCode: string;
     landedUserId?: string;
   }
   ```

### Database Schema (suggested)
```sql
-- Referrals table
CREATE TABLE referrals (
  id UUID PRIMARY KEY,
  referrer_user_id UUID NOT NULL,
  referee_user_id UUID,
  ref_code VARCHAR(20) UNIQUE NOT NULL,
  platform VARCHAR(20),
  status ENUM('pending', 'converted', 'expired'),
  created_at TIMESTAMP DEFAULT NOW(),
  converted_at TIMESTAMP NULL
);

-- User unlocks table
CREATE TABLE user_unlocks (
  user_id UUID PRIMARY KEY,
  tier INT DEFAULT 0,
  total_shares INT DEFAULT 0,
  unlocked_features JSONB,
  last_share_at TIMESTAMP
);
```

---

## 📱 Responsive Breakpoints

```css
Mobile:  < 640px   (base Tailwind styles)
Tablet:  640-1024px (sm: prefix)
Desktop: > 1024px   (lg: prefix)
```

**Mobile-first approach:**
- Stacked layouts op mobile
- Grid layouts op desktop
- Touch-friendly button sizes (min 44px)

---

## 🚀 Deployment Steps

1. **Install components** (already done)
   - All components in `/components/`
   - Demo page in `/app/viral-demo/page.tsx`

2. **Test demo locally**
   ```bash
   cd /home/paperclip/moneymachine
   npm run dev
   # Visit http://localhost:3000/viral-demo
   ```

3. **Integrate into production pages**
   - Add ShareModal trigger na invoice download
   - Add DashboardUnlockWidget op dashboard sidebar
   - Add TopBanner in root layout
   - Replace locked template cards met LockedTemplatePreview

4. **Connect backend tracking**
   - Implement referral tracking API
   - Update `onShare` handlers met tracking logic
   - Test referral code generation + attribution

5. **A/B Testing Setup** (optional)
   - Test unlock thresholds (2/4/8 vs 3/5/10)
   - Test modal timing (immediate vs delayed)
   - Test copy variations

---

## 🎯 Success Metrics (KPIs)

Track these metrics in PostHog/Mixpanel:

| Event                | Target    |
|----------------------|-----------|
| `viral_modal_shown`  | Baseline  |
| `share_clicked`      | 30%+ CTR  |
| `referral_landed`    | 40%+ conversion |
| `tier_unlocked`      | 25%+ of users |

---

## 🐛 Known Limitations

1. **Share tracking delay:** Current implementation tracks share click, not actual share completion. Consider adding webhook confirmation from WhatsApp/LinkedIn API.

2. **Anti-fraud:** Basic client-side validation only. Backend should implement:
   - IP-based self-referral detection
   - Rate limiting (max 10 shares/day)
   - Conversion requirement (referee must generate invoice)

3. **Browser compatibility:** Tested on Chrome/Safari/Firefox. IE11 not supported.

---

## 📞 Next Steps

**For Dev Team:**
1. Review demo at `/viral-demo`
2. Implement backend referral tracking
3. Integrate components into dashboard + invoice flow
4. Deploy to staging for QA

**For QA:**
1. Test all share flows (WhatsApp, LinkedIn, Email)
2. Test mobile responsive design
3. Test progress persistence across sessions
4. Test unlock celebration animations

**For PM/Product:**
1. Decide on unlock tier thresholds (2/4/8 or 3/5/10?)
2. Set up analytics tracking plan
3. Write email copy for re-engagement sequences

---

## ✅ Deliverables Checklist

- [x] ShareModal component
- [x] DashboardUnlockWidget component
- [x] TopBanner component
- [x] LockedTemplatePreview component
- [x] Demo page (`/viral-demo`)
- [x] README documentation
- [ ] Backend integration (pending dev team)
- [ ] Production deployment (pending QA)

---

**Questions?** Tag @Pixel in [MON-99](/MON/issues/MON-99)
