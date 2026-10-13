# JST Website — Agent Handoff Document

## What this is
J Supreme Tech marketing + product site at jsupremetech.online.
Handles WiPay payments → triggers Supreme Suite tenant provisioning.

## Tech stack
- Next.js 15 / Tailwind 4
- Neon DB (`@neondatabase/serverless`) — writes to ss_tenants + ss_purchases after payment
- Resend — credential emails
- WiPay — payment gateway (JM)

## Required env vars
| Var | Purpose |
|-----|---------|
| `DATABASE_URL` | Neon postgres connection string (same DB as supreme-suite) |
| `RESEND_API_KEY` | Email delivery |
| `NEXT_PUBLIC_SUPREME_SUITE_URL` | https://supreme-suite.vercel.app |
| `TWILIO_*` | WhatsApp notifications (optional) |

## Key files
| File | Purpose |
|------|---------|
| `src/lib/provision.ts` | Creates ss_tenants + ss_purchases on WiPay success — SERVER ONLY |
| `src/app/api/wipay/route.ts` | WiPay webhook → calls provisionTenant() |
| `src/lib/newsletter.ts` | "In Today's World" newsletter (⚠️ TODO: migrate to Neon) |

## DB tables written
- `ss_tenants` — new tenant record created on successful payment
- `ss_purchases` — payment audit record

Both tables live on Neon (same DATABASE_URL as supreme-suite).

## SOP for this project
1. Basis pre-check: `POST https://reality-encoder.vercel.app/api/encode`
2. Make changes
3. `npx tsc --noEmit` — must be zero errors
4. `vercel deploy --prod`
5. Confirm live

## Known gotchas
- provision.ts is SERVER ONLY — never import in client components
- sbInsert() was removed Oct 2026 — Supabase ciggiwpztuxkmbaccrlp no longer used here
- newsletter.ts still references Supabase ciggiwpztuxkmbaccrlp — TODO migrate to Neon (task #6 on the list)
- DATABASE_URL must be the SAME Neon DB as supreme-suite (shared tables)
