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

## Vercel Deploy (Do-this-exactly)
This repo is pre-configured with `vercel.json` to run migrations during build:
- `npx prisma migrate deploy && npm run build`

### 1) Import repo in Vercel
- Vercel dashboard → **Add New Project** → import this repository.
- Framework preset: **Next.js**
- Root directory: `./`

### 2) Add Environment Variables
Use `.env.vercel.example` as the source template.

Required keys:
- `POSTGRES_PRISMA_URL` → **pooled** DB URL from your provider
- `POSTGRES_URL_NON_POOLING` → **direct/non-pooled** DB URL from your provider
- `NEXT_PUBLIC_BOOKING_URL` → your Cal.com/Calendly booking page URL
- `NEXT_PUBLIC_BOOKING_EMBED_URL` → optional embed URL (can be blank)

### Where to find DB URLs
- **Neon**: Project → Dashboard → Connection Details
  - `Pooled connection` => `POSTGRES_PRISMA_URL`
  - `Direct connection` => `POSTGRES_URL_NON_POOLING`
- **Supabase**: Project Settings → Database → Connection string
  - `Connection pooling` => `POSTGRES_PRISMA_URL`
  - `Direct connection` => `POSTGRES_URL_NON_POOLING`
- **Railway**: Postgres service → Variables / Connect
  - `DATABASE_URL` (pooled if offered) => `POSTGRES_PRISMA_URL`
  - direct/private URL => `POSTGRES_URL_NON_POOLING`

### 3) Deploy
Click **Deploy**.

## Production Notes
- In CI/CD, run Prisma deploy migrations before starting the app:
  ```bash
  npx prisma migrate deploy
  ```
- Set a real booking URL in `NEXT_PUBLIC_BOOKING_URL`.
- Optionally set `NEXT_PUBLIC_BOOKING_EMBED_URL` to render an in-app calendar iframe.

## Environment Variables
See `.env.example` for local values and `.env.vercel.example` for Vercel mapping.
