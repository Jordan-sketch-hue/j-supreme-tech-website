# Security CRM Implementation

This build adds a J Supreme Tech security CRM layer to the main website dashboard.

## Included

- `/dashboard` now shows:
  - Actual Vercel projects from the authenticated account inventory.
  - Production URL health checks.
  - Visitor view counts.
  - Security alert counts.
  - Encrypted incident records.
  - Recent visitors with hashed identifiers.
- `/api/security/events` records page views and creates alerts for suspicious patterns.
- `src/proxy.ts` applies security headers to every route.
- Security event payloads are encrypted with AES-256-GCM.
- IP identifiers are hashed before storage.
- `supabase/security_events.sql` creates the production tables.

## Production Setup

Add these environment variables in Vercel:

```env
SECURITY_ENCRYPTION_KEY=long-random-production-secret
SECURITY_HASH_SALT=another-long-random-secret
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

Run `supabase/security_events.sql` in Supabase to create:

- `security_events`
- `visitor_events`

## Important Scope Note

This protects and tracks the J Supreme Tech website immediately. To protect every separate Vercel project, each project must either:

- include the same proxy/security event tracker, or
- send security and visitor events into this site's `/api/security/events` endpoint.

The dashboard can monitor health for all listed Vercel URLs from one place, but per-site breach detection requires each site to report events.

## Add Tracking To Other Sites

Add this script before `</body>` on each site:

```html
<script
  src="https://j-supreme-tech-website-jordan-sketch-hues-projects.vercel.app/security-tracker.js"
  data-project="project-name"
  defer
></script>
```

Replace `project-name` with the Vercel project name, such as `aboo-tours` or `islandbridge-freight`.
