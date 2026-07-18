# CLAUDE.md — Personal Metadata

You are working on **Personal Metadata**, a free web app that converts a person's name + birth data into a personalized symbolic self-reflection report (numerology, Western astrology, Chinese astrology — Human Design deferred to V1).

Read this file first, every session. It is the entry point. Read the linked docs *before* touching the area they cover — do not guess at business logic, copy tone, or schema shape.

## Source of truth

| Doc | Covers | Read before touching |
|---|---|---|
| `docs/PRD.md` | Features, scope, user journey, calculation formulas, tech stack, roadmap | Anything |
| `docs/DESIGN_SYSTEM.md` | Visual direction, colors, copy tone, layout | Any UI work |
| `docs/numerology-reference.md` | Calculation edge cases the PRD doesn't resolve | `lib/calculations/` |
| `docs/memory.md` | Decisions already made, open questions | Start of every session — update at the end of every session |
| `content/templates/` | Pre-written base copy for AI bridging | `lib/ai/` |
| `legal/` | Draft legal text (not final — see warnings in each file) | Legal/consent pages |

## Non-negotiables (do not violate these even if asked to move faster)

1. **No certainty language.** Never write "you will," "this guarantees," "your future is." Always "you might," "this suggests," "this invites you to." See `docs/DESIGN_SYSTEM.md` §6 for the full do/don't word list.
2. **Disclaimer visible everywhere.** Form consent step, every report page footer, every email footer. Not scientific, medical, psychological, legal, or financial advice. See `legal/disclaimer.md`.
3. **English only for v1.** All UI copy, report content, and emails are English. (`docs/DESIGN_SYSTEM.md`'s prose is in French — that's the founder's own working notes, not product copy. Don't translate product copy from it; the English strings already inside that file are the actual copy.)
4. **MVP scope is locked.** No user accounts, no dashboard, no Moon/Rising sign, no Human Design, no payments, no compatibility reports. See PRD §29 before adding anything not explicitly in PRD §6's MVP list. If a request seems to add scope, flag it and point to PRD §29 rather than building it.
5. **Master numbers (11, 22, 33) are preserved** in every numerology calculation except **Attitude**, which reduces fully to 1–9, and by default **Personal Year**, which also reduces fully to 1–9 (this second one is an applied default, not stated in the PRD — see `docs/memory.md`). Full exception list in `docs/numerology-reference.md` §4.
6. **Accented characters in names must be normalized** (é→e, ñ→n, etc.) before Pythagorean letter-mapping, since that system only defines A–Z. See `docs/numerology-reference.md` §1.
7. **Every AI-generated section must trace back to a calculated number, never invent one.** The AI's job is to write about numbers the calculation engine already produced — never to also decide what those numbers are.

## Tech stack

- Next.js 15.5 (App Router) + TypeScript
- Tailwind CSS + shadcn/ui — theme lives in `design/tailwind.config.ts` and `design/globals.css`; copy both into the real project's config on scaffold
- PostgreSQL via Supabase, Prisma ORM — schema in `prisma/schema.prisma`
- OpenAI GPT-4o-mini, JSON mode, for report text generation
- Resend for email delivery
- react-pdf for PDF export (escalate to Puppeteer only if design fidelity turns out insufficient — see PRD §19)
- Vercel hosting, Plausible analytics
- OpenCage API for geocoding (V1, Rising sign)

## Subagents

Four roles, defined in `.claude/agents/`. Use the matching subagent for its domain rather than mixing concerns in one pass:

- **`calculations-agent`** — `lib/calculations/`. Pure, deterministic, no AI, no UI. Numerology, Western sun sign, Chinese astrology.
- **`frontend-agent`** — `app/`, `components/`, API routes. Landing page, multi-step form, report view, PDF/share triggers.
- **`ai-content-agent`** — `lib/ai/`. OpenAI prompt calls, template bridging (`content/templates/`), JSON schema validation of AI output.
- **`qa-agent`** — tests, accessibility, legal-copy sweep, performance budget. Runs after the other three, before anything ships.

## Session checklist

- [ ] Read `docs/memory.md` for what's already decided
- [ ] Read the PRD section relevant to the task
- [ ] If touching calculations: read `docs/numerology-reference.md`
- [ ] If touching copy or UI: read `docs/DESIGN_SYSTEM.md`
- [ ] Update `docs/memory.md` with any new decision before ending the session

## Commands (once scaffolded)

```bash
npm run dev              # local dev server
npx prisma migrate dev   # apply schema changes
npx prisma studio        # inspect DB
npm run test             # calculation unit tests
```

## A note on hooks

This kit deliberately does not include `.claude/settings.json` or a `.claude/hooks/` folder. If you have your existing document-first-enforcement hooks from your other projects' swarm architecture template, bring them over rather than reinventing them here.
