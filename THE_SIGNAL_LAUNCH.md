# The Signal — Blog, Newsletter, Library & Accounts

A production-grade content + communications system for jsupremetech.online, built in the
house black-and-white style. Apple-communications editorial feel, SEO-maxed, Supabase-backed.

## What shipped

| System | Routes |
| --- | --- |
| **The Signal** (blog) | `/blog` · `/blog/[slug]` · `/blog/category/[tech\|marketing\|trading\|automation\|studio\|dispatch]` · `/blog/wire` |
| **The Library** (paid e-books) | `/library` · `/library/[slug]` (priced from $29.99; bank-transfer order → secure download) |
| **Communications Debrief** (newsletter) | `/newsletter` · `/newsletter/confirmed` · `/newsletter/unsubscribed` · one-time popup + footer/inline CTAs |
| **Customer accounts** (Supabase) | `/login` · `/signup` · `/forgot-password` · `/account` (gated) |
| **SEO** | `sitemap.xml` · `robots.txt` · `/blog/rss.xml` · per-article JSON-LD (Article + Breadcrumb + FAQ) · dynamic OG images |

- **18 launch articles** + **3 e-books** authored by the studio, grounded in real work.
- Content is **file-based JSON** in `src/content/` — version-controlled, SSG, no CMS needed.

## Content authoring

- **New article:** drop a JSON file in `src/content/blog/<slug>.json` matching the shape in
  `src/lib/blog-taxonomy.ts` (`Article` type). It auto-appears in the index, category, sitemap and RSS.
- **New e-book:** add `src/content/ebooks/<slug>.json` (`Ebook` type in `src/lib/ebooks.ts`), then run:
  ```
  node _build/gen-ebooks.mjs
  ```
  This renders a premium B&W PDF to `public/library/<slug>.pdf` via headless Chrome/Edge.
- **The Wire** (external news, legal): `src/content/wire.json` — links + our own commentary only.

## Database (Supabase project `ciggiwpztuxkmbaccrlp`)

Already migrated (additive, `jst_`-namespaced, RLS on):
- `jst_subscribers` — newsletter list (locked to service role; consent + IP/UA logged for CAN-SPAM/CASL/GDPR)
- `jst_profiles` — customer profiles (owner-scoped RLS)
- `jst_post_views` — per-article view counter + `jst_increment_view(slug)` RPC

## Environment variables (set in Vercel)

```
NEXT_PUBLIC_SUPABASE_URL=https://ciggiwpztuxkmbaccrlp.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_0sSnAQO6NYHxcGY4tQv8aw_5Uj1GeqT   # required for customer auth
SUPABASE_SERVICE_ROLE_KEY=...            # already set (intake uses it) — newsletter writes need it
RESEND_API_KEY=...                       # already set — newsletter emails use it
NEWSLETTER_FROM_EMAIL=J Supreme Tech <hello@jsupremetech.online>
NEWSLETTER_REPLY_TO=global.jsuprememarketing@gmail.com

# Paid e-books (bank transfer). All optional — without them the buy flow still
# works and shows a "get bank details on WhatsApp" fallback.
LIBRARY_ADMIN_EMAIL=global.jsuprememarketing@gmail.com   # where new-order + "mark paid" emails go
LIBRARY_TOKEN_SECRET=<long-random-string>                # signs download + deliver links
LIBRARY_BANK_NAME=
LIBRARY_BANK_ACCOUNT_NAME=
LIBRARY_BANK_ACCOUNT_NUMBER=        # set this to show real bank details to buyers
LIBRARY_BANK_ACCOUNT_TYPE=
LIBRARY_BANK_BRANCH=
LIBRARY_BANK_SWIFT=
LIBRARY_BANK_EXTRA=
```

## Paid e-books — how it works
1. Buyer clicks **Buy** on `/library/[slug]`, enters name + email → an order is created in `jst_ebook_orders` (pending) and they see bank-transfer instructions + a reference (also emailed).
2. You get an email with a one-click **"Mark paid & send download"** link. Click it once the transfer clears.
3. That marks the order paid/delivered and emails the buyer a **secure, signed, 30-day download link**.
4. PDFs live in `private/library/` (NOT public) and are streamed only via `/api/library/download` for a valid token + paid order — they can't be downloaded for free.

Prices live in `src/lib/ebooks.ts` (`EBOOK_PRICES`): $29.99 / $49.99 / $79.99. To switch to card payments later, wire Stripe (`createOneTimeCheckout` in `src/lib/stripe.ts`, USD) or WiPay (`src/lib/wipay.ts`, JMD) into the order route.

### ⚠️ One deliverability step
Newsletter emails send from `hello@jsupremetech.online`. **Verify `jsupremetech.online` in Resend**
(add the DNS records Resend gives you). Until then, either point `NEWSLETTER_FROM_EMAIL` at an
already-verified J Supreme domain (e.g. `signal@jsupremeconglomerate.online`), or the subscribe
endpoint auto-confirms without sending (the list still grows; emails just won't deliver).

## Legal

- `/disclaimer` — added **Trading/markets "not financial advice"** + **editorial/third-party (The Wire)** clauses.
  Every Trading article also carries an inline "Not financial advice" callout.
- `/privacy` — added **Email Marketing** section (double opt-in, unsubscribe, CAN-SPAM/CASL/GDPR, processors).
- Newsletter is **double opt-in** with one-click unsubscribe in every email.
