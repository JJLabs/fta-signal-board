# Feed The AI — Funding Signal Board MVP

A production-ready Next.js + Tailwind MVP that tracks funding momentum for AI startups.

## Features

- Homepage (`/`) with:
  - KPI strip (7D total funding, round count, median round, most active sector)
  - Auto-generated signals
  - 3 simple charts (funding over time, sector mix, stage mix)
- Sector drilldown (`/sectors/[sector]`)
- Investor drilldown (`/investors/[investor]`)
- Local seeded dataset with 60 realistic AI funding rows (`data/deals.json`)

## Signal Rules Implemented

- **Spike**: sector 7D total > 2x sector 90D weekly average
- **Repeat investor**: investor appears 3+ times in last 14 days
- **Mega round**: amount >= $100M (highlighting recent mega rounds)
- **Stage shift**: stage activity acceleration in last 30 days vs prior 30 days

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production Build

```bash
npm run build
npm run start
```

## Deploy to Vercel

### Option A: Git-based deploy (recommended)
1. Push this repo to GitHub.
2. In Vercel, click **Add New Project**.
3. Import the repository.
4. Keep default Next.js settings.
5. Click **Deploy**.

### Option B: CLI
```bash
npm i -g vercel
vercel
```

Then for production:
```bash
vercel --prod
```

No environment variables are required for this MVP.
