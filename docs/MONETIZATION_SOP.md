# J Supreme Tech — Website Monetization SOP

**Site:** jsupremetech.online
**Owner account:** jordanrmorris01@icloud.com (preferred) — **AdSense + affiliate signups under `jordanmorrisr@gmail.com`** (the Google account)
**Streams:** (1) Google AdSense display, (2) curated affiliate links
**Publisher ID:** `ca-pub-3631660360243366` (existing AdSense account on jordanmorrisr@gmail.com)

### Current state (executed 2026-06-18)
- ✅ Full monetization architecture shipped in code (see §1) — verified rendering.
- ✅ AdSense account confirmed under **jordanmorrisr@gmail.com**, publisher `ca-pub-3631660360243366`.
- ✅ **jsupremetech.online added, ownership VERIFIED, and REVIEW REQUESTED** — status now *Getting ready*
  (in Google's review queue). (Account also has `j-supreme-marketing-web.vercel.app` — separate property.)
- ✅ `NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-3631660360243366` in **Vercel Production**; **deployed to prod**.
- ✅ Live verified: `/ads.txt` seller line, AdSense `<script>` in `<head>`, `/disclosure` 200.
- ✅ "Tell us about you" customer info **Submitted** (pre-filled from Google payments profile; no tax/bank at this stage).
- ⚠️ **Verify gotcha (fixed):** `next/script afterInteractive` only emits a preload link, which the AdSense
  crawler can't read → first verify failed. Loader changed to a **literal `<script>`** in `<head>` (see `layout.tsx`).
  Do not revert.
- ⏳ **Now:** wait for Google approval (days–~2 wk).
- ⏳ Post-approval: create 3 ad units → set `NEXT_PUBLIC_ADSENSE_SLOT_*` → redeploy.
- ⏳ Optional: GDPR consent message (CMP) for EU/UK traffic — flagged by AdSense, not blocking.
- ⏳ Affiliate programs: none signed up yet (see §4).

---

## 0. The one rule (brand policy)

> Ads and affiliate links appear **only on editorial / free surfaces** — the blog (`/blog`), the
> Library (`/library`), and `/newsletter`. They **never** appear on the sales funnel
> (`/products`, `/pricing`, `/market`, `/services`, `/free-trial`, `/start`, `/contact`),
> the app (`/account`, `/dashboard`, `/admin`, `/trials`), checkout (`/pay`), auth, or legal pages.

A display-ad click is worth cents. A dev/SaaS lead is worth thousands. We protect the conversion
path and let the *content* layer carry the passive income. This rule is enforced in code by
`adsAllowedOnPath()` in `src/lib/ads.ts` and by only placing ad/affiliate components inside blog
templates.

---

## 1. What's already built (architecture)

| Piece | File | What it does |
|---|---|---|
| Config + policy | `src/lib/ads.ts` | Publisher id, slot ids, `adsAllowedOnPath()`, disclosure copy. Single source of truth. |
| AdSense loader | `src/app/layout.tsx` | Loads `adsbygoogle.js` **only** when `NEXT_PUBLIC_ADSENSE_CLIENT` is set. |
| Display unit | `src/components/ads/ad-slot.tsx` | `<AdSlot slot="…">` — consent-aware, double-push-safe, labelled, collapses if unfilled. Dev placeholder when inactive. |
| In-article ad | `src/components/blog/blocks.tsx` | Auto-injects one unit at a mid-article break on posts ≥ 8 blocks. |
| Foot ad + tools | `src/app/(marketing)/blog/[slug]/page.tsx` | Foot-of-article `<AdSlot>` + `<AffiliateTools>`. |
| Affiliate registry | `src/lib/affiliates.ts` | Typed partner list; only `live:true` + real link renders. |
| Affiliate UI | `src/components/ads/affiliate.tsx` | `<AffiliateTools>` block + inline `<AffiliateLink id>`. `rel="sponsored nofollow noopener"`. |
| ads.txt | `src/app/ads.txt/route.ts` | Serves `/ads.txt` from the publisher id. |
| Disclosure page | `src/app/(marketing)/disclosure/page.tsx` | FTC + AdSense disclosure, linked in footer. |
| Privacy update | `src/app/(marketing)/privacy/page.tsx` | §4 AdSense + affiliate paragraph. |

Everything degrades safely: **with no env var set, no script loads, `/ads.txt` is a comment, and
ad slots render nothing in production.** The site is safe to deploy today.

---

## 2. AdSense — application runbook

**Prereqs Google checks (all met):** original content (The Signal blog), clear nav, privacy policy,
ads/affiliate disclosure, contact page, sufficient content volume. Keep publishing — thin sites get
rejected.

1. Go to **https://www.google.com/adsense** → sign in with **jordanmorrisr@gmail.com**.
2. Add site **jsupremetech.online**, country **Jamaica**, accept terms.
3. AdSense gives you a publisher id `ca-pub-XXXXXXXXXXXXXXXX` and a verification snippet.
   - **You do not need to paste the snippet by hand.** Set the env var instead (step 4); our
     `layout.tsx` injects the exact same `adsbygoogle.js?client=…` tag Google expects, and
     `/ads.txt` auto-publishes. That satisfies verification.
4. In **Vercel → project `j-supreme-tech` → Settings → Environment Variables** (Production), add:
   ```
   NEXT_PUBLIC_ADSENSE_CLIENT = ca-pub-XXXXXXXXXXXXXXXX
   ```
   Redeploy (`vercel --prod` from the real path).
5. Confirm `https://jsupremetech.online/ads.txt` shows:
   `google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0`
6. Back in AdSense, click **Verify / Request review**. Review takes **a few days to ~2 weeks**.
7. **After approval:** AdSense → Ads → By ad unit → create 3 **Display** units:
   *In-article*, *Article foot*, *Feed*. Copy each `data-ad-slot` number into Vercel env:
   ```
   NEXT_PUBLIC_ADSENSE_SLOT_INARTICLE   = 1234567890
   NEXT_PUBLIC_ADSENSE_SLOT_ARTICLEFOOT = 2345678901
   NEXT_PUBLIC_ADSENSE_SLOT_FEED        = 3456789012
   ```
   Redeploy. Ads now serve. (You can also enable **Auto Ads** in AdSense for fill on top of these.)

**Compliance:** never click your own ads or ask others to. Don't put ads on error/thank-you pages.
Keep disclosure live. Invalid traffic = account ban.

---

## 3. Consent / GDPR

The existing cookie banner (`src/components/CookieConsent.tsx`) writes `cookieConsent` to
localStorage. `AdSlot` reads it: **declined → `requestNonPersonalizedAds = 1`** (contextual ads,
still earns) rather than blocking. For heavy EU/UK traffic, Google requires a certified **CMP**
(Consent Management Platform) — AdSense → Privacy & messaging → GDPR message is the quickest path.
Add that before scaling EU traffic.

---

## 4. Affiliate programs — shortlist & runbook

Curate ruthlessly: only tools JST actually uses. Credibility is the entire value of this channel.

| Partner | Fit | Apply | Commission |
|---|---|---|---|
| **Namecheap** | Domains we already buy here | namecheap.com/affiliates | up to ~35%/sale |
| **Hostinger** | Budget hosting referrals | hostinger.com/affiliates | 60%+/sale (~$100 avg) |
| **Cloudways** | Managed cloud / WP | cloudways.com/en/affiliate-program.php | up to $125 or recurring |
| **Vercel** | Our deploy platform | vercel.com/partners | partner / revenue share |
| **Framer** | No-code marketing sites | framer.com/partners | ~50% first-year recurring |
| **Shopify** | Storefront builds | shopify.com/affiliates | bounty per merchant |
| **Notion** | Docs / client wikis | notion.so/affiliates | up to 50% for 12 mo |
| **Kit (ConvertKit)** | Newsletter setups | kit.com/affiliate | 30% recurring |

**To activate one:**
1. Apply under `jordanmorrisr@gmail.com` (tax form: as a Jamaica resident you'll file **W-8BEN**).
2. In `src/lib/affiliates.ts`, replace that partner's `href` `REPLACE_ME` with your real tracked link.
3. Set `live: true`.
4. Deploy. It now appears in the "stack we actually use" block on articles, with disclosure.

Start with **Namecheap, Hostinger, Notion** — easy approval, you genuinely use them, good payout.

---

## 5. Realistic expectations

A premium B2B blog is **low-traffic, high-intent** — AdSense alone will be small ($X–$XX/mo until
traffic grows). The real upside here is **affiliate** (a single Hostinger/Cloudways referral can beat
a month of AdSense) and, indirectly, **content driving leads** to the real services. Treat AdSense as
the passive floor, affiliate as the lever, and never let either dent the brand.

**Growth = traffic.** More Signal articles targeting real search intent ("best hosting for a Jamaican
small business", "Shopify vs custom build") compound both ad impressions and affiliate clicks.

---

## 6. Go-live checklist

- [ ] `npm run build` green (architecture)
- [ ] Deploy to prod — site safe with no env vars
- [ ] AdSense account created (jordanmorrisr@gmail.com), site added
- [ ] `NEXT_PUBLIC_ADSENSE_CLIENT` set in Vercel, redeployed
- [ ] `/ads.txt` shows the seller line
- [ ] AdSense review requested
- [ ] (post-approval) 3 ad units created, slot ids set, redeployed
- [ ] (optional) Auto Ads + GDPR CMP enabled
- [ ] ≥ 1 affiliate program approved, link set, `live:true`
- [ ] Disclosure page live + linked in footer ✓

---

## 6a. The deploy blocker (read before `vercel --prod`)

The working tree currently has many uncommitted changes that are **not** part of monetization —
including deletions of routes/components (`(marketing)/page.tsx`, auth API routes, several `*Card`
components, `FAQ.tsx`, etc.). `vercel --prod` deploys the working tree as-is, so it would ship that
half-finished refactor to the live site alongside the (safe) monetization code.

**Options:**
1. **If the refactor is ready:** review it, `npm run build` locally, then `vercel --prod`. Monetization
   activates automatically (env var already set).
2. **If the refactor is NOT ready:** isolate just the monetization files onto a clean branch and deploy
   that, e.g.
   ```bash
   git stash push -m wip-refactor    # park the unrelated changes
   # then re-apply ONLY the monetization files, or cherry-pick them, build, and deploy
   ```
   The monetization files are: `src/lib/ads.ts`, `src/lib/affiliates.ts`, `src/components/ads/*`,
   `src/app/ads.txt/route.ts`, `src/app/(marketing)/disclosure/page.tsx`, and the edits to
   `src/app/layout.tsx`, `src/components/blog/blocks.tsx`, `src/app/(marketing)/blog/[slug]/page.tsx`,
   `src/app/(marketing)/privacy/page.tsx`, `src/components/Footer.tsx`, `.env.example`.

Do **not** request AdSense review until the deploy is live and `https://jsupremetech.online/ads.txt`
returns the seller line — premature review requests carry a rejection cooldown.

## 7. Reuse across the fleet

This pattern (config + `AdSlot` + affiliate registry + `/ads.txt` route + disclosure + path policy) is
portable. To monetize another J Supreme property, copy `src/lib/ads.ts`, the `ads/` components, the
`ads.txt` route, and the disclosure page; adjust `adsAllowedOnPath()` allow/deny lists to that site's
routes. One AdSense account covers all owned domains (add each site in the AdSense dashboard).
