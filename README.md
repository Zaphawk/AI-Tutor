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
4. Run dev server:
   ```bash
   npm run dev
   ```

## Environment Variables
See `.env.example`.
