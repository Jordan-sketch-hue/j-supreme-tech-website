# J Supreme Tech Website

Premium Next.js website for J Supreme Tech, a Creative Technology & Digital Systems Development company serving Jamaica, the Caribbean, and worldwide.

## Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Lucide React icons
- Vercel-ready deployment

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build

```bash
npm run build
npm run start
```

## Deploy To Vercel

1. Push this project to GitHub.
2. Import the repository in Vercel.
3. Use the default Next.js framework preset.
4. Set any production environment variables needed for contact handling, analytics, payments, or integrations.
5. Deploy.

## Integration Setup

### Supabase Intake Storage

1. Create a Supabase project.
2. Run `supabase/project_intake_submissions.sql` in the Supabase SQL editor.
3. Add `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` to Vercel environment variables.
4. Redeploy. The website intake form will store submissions in `project_intake_submissions`.

### Clerk Authentication

Add the Clerk keys from `.env.example` to Vercel when replacing the current custom auth with Clerk-backed login/signup flows.

### Creative Workflow

Adobe and Midjourney do not connect to this codebase automatically without account-specific apps, API access, or shared asset links. Use the intake form reference fields and the `.env.example` placeholders to connect approved project assets.

## Contact Details Used

- Email: `global.jsuprememarketing@gmail.com`
- WhatsApp: `658-218-2282`
- Service area: Jamaica, Caribbean, Worldwide
