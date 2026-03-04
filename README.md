# AI-Tutor Booking Liaison

A gamified lead funnel built with Next.js App Router. It captures survey answers, saves them with Prisma to PostgreSQL, and hands users off directly to booking.

## Stack
- Next.js 14 (App Router)
- React
- Prisma + PostgreSQL

## Setup (Local)
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create an `.env.local` from `.env.example`.
3. Generate Prisma client:
   ```bash
   npm run prisma:generate
   ```
4. Create and apply your database migration:
   ```bash
   npx prisma migrate dev --name init
   ```
5. Run dev server:
   ```bash
   npm run dev
   ```

## Vercel Deploy (Reliable)
This repo is pre-configured with `vercel.json` to run a plain app build:
- `npm run build`

> Why: running `prisma migrate deploy` inside Vercel build can fail if DB/direct URL env vars are missing or not reachable during build. Keep deploy builds simple, and run migrations separately.

### 1) Import repo in Vercel
- Vercel dashboard → **Add New Project** → import this repository.
- Framework preset: **Next.js**
- Root directory: `./`

### 2) Add Environment Variables
Use `.env.vercel.example` as the source template.

Required keys:
- `POSTGRES_PRISMA_URL` → pooled DB URL from your provider
- `NEXT_PUBLIC_BOOKING_URL` → your Cal.com/Calendly booking page URL
- `NEXT_PUBLIC_BOOKING_EMBED_URL` → optional embed URL (can be blank)

Only needed if you run migrations in Vercel/CI:
- `POSTGRES_URL_NON_POOLING` → direct/non-pooled DB URL

### Where to find DB URLs
- **Neon**: Project → Dashboard → Connection Details
  - `Pooled connection` => `POSTGRES_PRISMA_URL`
  - `Direct connection` => `POSTGRES_URL_NON_POOLING`
- **Supabase**: Project Settings → Database → Connection string
  - `Connection pooling` => `POSTGRES_PRISMA_URL`
  - `Direct connection` => `POSTGRES_URL_NON_POOLING`
- **Railway**: Postgres service → Variables / Connect
  - pooled/public URL => `POSTGRES_PRISMA_URL`
  - direct/private URL => `POSTGRES_URL_NON_POOLING`

### 3) Deploy
Click **Deploy**.

## Migration Commands
Run these from local machine or CI (recommended):
```bash
npx prisma migrate deploy
```

## Environment Variables
See `.env.example` for local values and `.env.vercel.example` for Vercel mapping.
