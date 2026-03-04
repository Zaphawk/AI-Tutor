# AI-Tutor Booking Liaison

A gamified lead funnel built with Next.js App Router. It captures survey answers, saves them with Prisma to PostgreSQL, and hands users off directly to booking.

## Stack
- Next.js 14 (App Router)
- React
- Prisma + PostgreSQL

## Setup
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

## Production Notes
- In CI/CD, run Prisma deploy migrations before starting the app:
  ```bash
  npx prisma migrate deploy
  ```
- Set a real booking URL in `NEXT_PUBLIC_BOOKING_URL`.
- Optionally set `NEXT_PUBLIC_BOOKING_EMBED_URL` to render an in-app calendar iframe.

## Environment Variables
See `.env.example`.
