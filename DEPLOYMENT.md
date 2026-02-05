# Deployment Guide

## Prerequisites

- GitHub account
- Vercel account (for hosting)
- Stripe account (for payments)
- Custom domain (optional)

## Step 1: Push to GitHub

1. Create a new repository on GitHub
2. Add the remote:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/j-supreme-tech.git
   git branch -M main
   git push -u origin main
   ```

## Step 2: Deploy to Vercel

1. Go to vercel.com and sign up/log in with GitHub
2. Click "New Project"
3. Import your GitHub repository
4. Configure environment variables:
   - `NEXT_PUBLIC_APP_URL`: Your production domain
   - `JWT_SECRET`: Generate a strong random string
   - `STRIPE_PUBLISHABLE_KEY`: From Stripe dashboard
   - `STRIPE_SECRET_KEY`: From Stripe dashboard
   - `STRIPE_WEBHOOK_SECRET`: From Stripe dashboard
5. Click "Deploy"

## Step 3: Setup Stripe Webhook

1. Go to Stripe Dashboard > Developers > Webhooks
2. Add endpoint: `https://your-domain.vercel.app/api/payments/webhook`
3. Select events:
   - customer.subscription.created
   - customer.subscription.updated
   - customer.subscription.deleted
   - charge.succeeded
4. Copy the Signing Secret and add to environment variables as `STRIPE_WEBHOOK_SECRET`

## Step 4: Setup Database (Production)

For demo, the app uses in-memory storage. For production:

### Option A: PostgreSQL (Recommended)

1. Set up PostgreSQL database (Vercel Postgres, AWS RDS, etc.)
2. Install Prisma:
   ```bash
   npm install @prisma/client
   npm install -D prisma
   ```
3. Create `prisma/schema.prisma` with your schema
4. Run migrations:
   ```bash
   npx prisma migrate dev
   ```

### Option B: MongoDB

1. Set up MongoDB (Atlas, etc.)
2. Update `src/lib/db.ts` with MongoDB driver
3. Configure `DATABASE_URL` with connection string

## Step 5: Custom Domain

1. In Vercel Project Settings > Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Update `NEXT_PUBLIC_APP_URL` to your domain

## Monitoring

- Use Vercel Analytics for performance metrics
- Monitor Stripe dashboard for payments
- Check GitHub for code commits

## Cost Estimation

- Vercel: Free tier or $20/month
- Stripe: 2.9% + $0.30 per transaction
- Database: $15-100/month if self-hosted
- Domain: ~$10-15/year

**Total: $50-200/month for production**
