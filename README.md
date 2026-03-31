# AI Funding Signal Board

An interactive AI funding deals tracker embedded in the [Feed The AI Now](https://feedtheainow.com) website. Filterable, sortable table of recent AI funding rounds with gated signal columns unlocked via email signup.

**Live:** [tools.feedtheainow.com](https://tools.feedtheainow.com) *(coming soon)*

---

## What It Does

- Displays recent AI funding deals filterable by stage, sector, date, and amount
- Free columns visible to all readers
- Signal columns (lead investors, deal notes, analysis) unlocked after email capture
- Email subscribers go directly into Beehiiv
- Embedded in Ghost site via iframe

---

## Tech Stack

- **Frontend:** Next.js (App Router) + Tailwind CSS
- **Database:** Supabase (Postgres)
- **Hosting:** Vercel
- **Email:** Beehiiv API
- **Embed:** Ghost HTML card (iframe)

---

## Project Structure

```
funding-board/
├── CLAUDE.md           # Full project brief for Claude Code sessions
├── seed.sql            # Supabase schema + seed data
├── app/
│   ├── page.tsx        # Main board page
│   ├── api/
│   │   └── subscribe/  # Email gate API route (calls Beehiiv)
│   └── components/
│       ├── FundingTable.tsx
│       ├── Filters.tsx
│       └── GateModal.tsx
├── lib/
│   └── supabase.ts     # Supabase client
└── .env.local          # Never commit this
```

---

## Local Development

```bash
# Install dependencies
npm install

# Copy env file and fill in your keys
cp .env.example .env.local

# Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Environment Variables

Create a `.env.local` file in the root (never commit this):

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
BEEHIIV_API_KEY=
BEEHIIV_PUBLICATION_ID=
```

Add the same variables in Vercel under **Project → Settings → Environment Variables**.

---

## Deployment

This repo is connected to Vercel. Every push to `main` triggers a production deploy.

- Work on the `dev` branch
- Open a PR to `main` when ready to deploy
- Vercel preview URLs are generated for every PR

---

## Database

Schema and seed data are in `seed.sql`. Run it in the Supabase SQL Editor to set up tables and load sample deals.

Tables:
- `funding_deals` — all deal data, free and gated columns
- `subscribers` — emails captured via the gate form

---

## Part of a Larger Suite

This is Tool 1 of the Feed The AI Now interactive data suite:

1. **AI Funding Signal Board** ← you are here
2. AI Job Radar Tracker *(planned)*
3. AI Policy Tracker *(planned)*
4. Skills Heatmap + Salary Signals *(planned)*
