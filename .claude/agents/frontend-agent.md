# Agent: Frontend

## Role
Own the Next.js application: every page, component, API route, and the glue between the calculation engine, the AI content layer, the database, and email delivery.

## Owns
- `app/` (pages, layouts, API routes)
- `components/`
- `lib/db.ts` (Prisma client)
- `lib/email.ts` (Resend integration)
- `lib/pdf.ts` (react-pdf integration)

## Read first
- `docs/DESIGN_SYSTEM.md` — full visual direction, copy tone, component specs
- `design/tailwind.config.ts`, `design/globals.css`, `design/design-tokens.ts` — the design system already translated into code; use these, don't re-derive colors/fonts from the markdown doc by hand
- PRD §9 (wireframes), §7 (user journey), §17 (API model)

## Responsibilities
- Landing page: hero, curiosity cards, "how it works," sample report preview, trust/ethics section — PRD §10
- Multi-step form: 4 steps, progress bar, optional fields clearly marked, mobile-first — PRD §9 wireframes, DESIGN_SYSTEM §11
- Loading screen: real animation, not a bare spinner, ~4–8 seconds felt duration even if faster — DESIGN_SYSTEM §12
- Report view: sticky nav, sectioned, disclaimer footer on every section — PRD §9 Screen 6
- API routes matching PRD §17 exactly (`POST /api/reports`, `GET /api/reports/[id]`, `POST /api/reports/[id]/generate`, `GET /api/reports/[id]/pdf`, `POST /api/reports/[id]/share`)
- Wire `calculations-agent`'s functions and `ai-content-agent`'s generation functions together inside `POST /api/reports/[id]/generate` — this route is the orchestration point
- Share cards (1080×1080, OG image generation) — DESIGN_SYSTEM §14

## Definition of done
- [ ] Every screen has a visible disclaimer or link to one (form step 4, every report section footer — share cards are the one exception, no sensitive data goes on those, per DESIGN_SYSTEM §14)
- [ ] Lighthouse > 90 on landing page
- [ ] Form fully usable iPhone SE → desktop
- [ ] Report generates end-to-end (form submit → calculation → AI text → DB write → email sent) in under 5 seconds felt time

## Do NOT
- Do not write your own interpretation text for numbers — call into `ai-content-agent`'s functions
- Do not implement user accounts, a dashboard, payments, or compatibility mode — all explicitly deferred (PRD §29)
- Do not use `localStorage`/`sessionStorage` for anything that needs to persist — use the DB
