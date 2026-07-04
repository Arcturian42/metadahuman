# Personal Metadata

A free micro-SaaS for symbolic self-reflection. It turns a person's name and birth
data into a personalized report combining **Pythagorean numerology, Western astrology,
and Chinese astrology** — a premium-feeling, mobile-first "mirror made of symbols,"
not a prediction engine.

> This repository is the **merge** of two source packages: a partial Next.js
> implementation (the code skeleton) and a planning/starter kit (the source of
> truth — PRD, design system, content templates, calculation reference, legal
> drafts). The code lives in `src/`; the governance that code must obey lives in
> `CLAUDE.md`, `docs/`, `content/`, and `legal/`. Read `CLAUDE.md` first.

## Tech stack

- **Framework:** Next.js 14 (App Router) + TypeScript
- **Styling:** Tailwind CSS (dark-only theme, `tailwindcss-animate`)
- **Database:** PostgreSQL (Supabase) via Prisma
- **AI:** OpenAI `gpt-4o-mini` (JSON mode) with template grounding + fallbacks
- **Email:** Resend · **Share cards:** `@vercel/og` · **PDF:** react-pdf (planned)
- **Hosting:** Vercel (primary target). Node-server fallbacks (Hostinger Cloud
  Startup / VPS) are documented but not the default.

## Quick start

```bash
npm install
cp .env.example .env.local     # fill in your keys
npm run db:push                # push Prisma schema to your Supabase Postgres
npm run dev                    # http://localhost:3000
```

## Scripts

| Script | Purpose |
|---|---|
| `npm run dev` | Local dev server |
| `npm run build` | `prisma generate` + production build |
| `npm run start` | Start the built app |
| `npm run lint` | ESLint (next) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run test` | Calculation unit tests (Vitest) |
| `npm run db:push` / `db:deploy` | Prisma schema push (dev) / migrate deploy (prod) |
| `npm run db:studio` | Prisma Studio |

## Project structure

```
src/
  app/              # App Router pages + API routes
    api/reports/    # report creation + AI orchestration
    form/ summary/ report/[id]/   # the core user flow
  lib/
    calculations/   # pure, tested: numerology, western-astro, chinese-astro, normalize
    ai/             # OpenAI client + prompts (+ template bridging — in progress)
    db.ts utils.ts
  config/           # design-tokens.ts (single source for PDF/OG/SVG contexts)
  types/
content/            # faq.json + templates/ (pre-written base copy for AI grounding)
docs/               # PRD, DESIGN_SYSTEM, numerology-reference, memory (source of truth)
legal/              # Privacy, Terms, Disclaimer drafts (need lawyer review)
prisma/schema.prisma
.claude/agents/     # calculations / frontend / ai-content / qa subagent roles
```

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | Yes | Supabase PostgreSQL connection string |
| `OPENAI_API_KEY` | Yes | OpenAI API key |
| `NEXT_PUBLIC_APP_URL` | Yes | Public app URL (links, OG images) |
| `APP_SECRET` | Yes | Secret for signing URLs |
| `RESEND_API_KEY` / `FROM_EMAIL` | For email | Report delivery (Resend) |
| `OPENCAGE_API_KEY` | No | Geocoding (V1, Rising sign) |

## Deployment (Vercel)

1. Import the repo in Vercel, set the environment variables above.
2. Point `DATABASE_URL` at a Supabase Postgres instance; run `npm run db:deploy`
   (or `db:push` for the first sync).
3. Vercel builds with `npm run build` and serves automatically. The report API
   route sets `maxDuration = 60` for the parallel AI generation step.

For a non-Vercel Node host (Hostinger Cloud Startup via Passenger, or a VPS with
PM2 + Nginx), see the deployment notes in the merge report / `docs/`.

## Status

MVP in progress. **Done:** unified build, corrected & tested calculation engine,
core flow (landing → form → summary → report), security headers. **Next:** AI
template bridging, email delivery, PDF + share cards, programmatic SEO pages.
See `docs/memory.md` and the merge report for the full roadmap.

## License

MIT
