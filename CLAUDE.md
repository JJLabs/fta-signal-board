# Feed The AI — AI Funding Signal Board
## Project Brief for Claude Code

---

## What We're Building

An interactive AI funding deals tracker embedded inside the Feed The AI Ghost site. Readers see a filterable, sortable table of recent AI funding rounds. Core data is free and public. Richer signal columns (lead investors, deal notes, signals summary) are blurred until the reader submits their email — which goes directly into Beehiiv.

**Goal:** Drive newsletter subscribers, earn backlinks, grow domain authority.

---

## Tech Stack

| Layer | Tool | Notes |
|---|---|---|
| Frontend | Next.js (App Router) | Deployed to Vercel |
| Database | Supabase (Postgres) | Stores deals + subscriber emails |
| Auth/Gate | Supabase + custom logic | Email gate, no full auth needed |
| Email | Beehiiv API | Subscribers added via API on gate submit |
| Embed | Ghost iframe | One code block in a Ghost page |
| Data | Scraper → Supabase | Apify or Python script, runs on schedule |
| Styling | Tailwind CSS | Dark, editorial aesthetic |

---

## Supabase Schema

### `funding_deals` table
```sql
create table funding_deals (
  id uuid primary key default gen_random_uuid(),
  company_name text not null,
  amount_usd bigint,              -- in dollars, e.g. 50000000
  stage text,                     -- Seed, Series A, Series B, etc.
  sector text,                    -- e.g. AI Infrastructure, LLM, Robotics
  announced_date date,
  country text,
  -- GATED COLUMNS (blurred until email submitted)
  lead_investors text[],          -- array of investor names
  deal_notes text,                -- short editorial note
  signals text,                   -- e.g. "Strategic raise", "Repeat founder"
  source_url text,
  created_at timestamptz default now()
);
```

### `subscribers` table
```sql
create table subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  source text default 'funding-board',
  created_at timestamptz default now()
);
```

---

## Free vs Gated Columns

| Column | Free | Gated |
|---|---|---|
| Company Name | ✅ | |
| Amount | ✅ | |
| Stage | ✅ | |
| Sector | ✅ | |
| Date | ✅ | |
| Country | ✅ | |
| Lead Investors | | ✅ |
| Deal Notes | | ✅ |
| Signals | | ✅ |

Gated columns render as blurred placeholder text with a "Unlock Free Access" CTA overlay.

---

## Email Gate Flow

1. Reader clicks "Unlock Free Access"
2. Modal appears with email input field
3. On submit:
   - POST email to Beehiiv API (add subscriber to main list)
   - INSERT email into Supabase `subscribers` table
   - Set a localStorage flag: `ftain_unlocked = true`
   - Gated columns reveal immediately (no page reload)
4. On return visits: check localStorage, skip gate if already unlocked

### Beehiiv API
- Endpoint: `POST https://api.beehiiv.com/v2/publications/{publication_id}/subscriptions`
- Auth: Bearer token (store in Vercel env var: `BEEHIIV_API_KEY`)
- Publication ID: store in env var: `BEEHIIV_PUBLICATION_ID`

---

## Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
BEEHIIV_API_KEY=
BEEHIIV_PUBLICATION_ID=
```

---

## UI & Design Direction

- **Theme:** Dark, editorial, data-dense — think financial terminal meets tech newsletter
- **Font:** Monospace or editorial display for headers, clean sans for body
- **Colors:** Dark background (#0a0a0a or similar), sharp accent (electric blue or amber), muted table rows
- **Filters:** Stage, Sector, Date Range, Amount Range — all above the table
- **Sorting:** Clickable column headers, default sort = most recent
- **Mobile:** Responsive, horizontally scrollable table on small screens
- **No pagination needed initially** — show latest 100 deals, load more on scroll

---

## Ghost Embed

Once deployed to Vercel, embed in Ghost via an HTML card:

```html
<iframe
  src="https://tools.feedtheainow.com"
  width="100%"
  height="800"
  frameborder="0"
  style="border: none; border-radius: 8px;"
  title="AI Funding Signal Board"
></iframe>
```

Adjust the height or use a JS snippet to auto-resize based on content.

---

## Build Order

1. **Supabase setup** — create project, run schema SQL, seed with 10–15 manual deals
2. **Next.js scaffold** — `npx create-next-app@latest funding-board`
3. **Table component** — fetch deals from Supabase, render free columns
4. **Filters + sorting** — client-side filtering on fetched data
5. **Gate UI** — blur overlay on gated columns, modal on click
6. **Email gate logic** — Beehiiv API call + Supabase insert + localStorage
7. **Vercel deploy** — push to GitHub, connect to Vercel, add env vars
8. **Ghost embed** — add iframe to Ghost page
9. **Data pipeline** — scraper to auto-populate Supabase (Phase 2)

---

## Key Constraints

- No user login system — gate is localStorage only (simple, no friction)
- Supabase anon key is safe to expose client-side for reads only
- All Beehiiv API calls should go through a Next.js API route (not client-side) to protect the API key
- Keep the Vercel free tier in mind — avoid serverless functions that run on every request at scale; prefer static generation where possible

---

## Context: Feed The AI Now

- Newsletter + website covering AI and emerging tech
- CMS: Ghost
- Newsletter: Beehiiv
- Audience: technically engaged readers, founders, investors
- This tool is the first in a planned suite: Funding Board → Job Radar → Policy Tracker
- Every tool should be embeddable and shareable as a standalone URL

---

*Drop this file in the root of your project before starting any Claude Code session.*
