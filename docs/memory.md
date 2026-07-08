# Memory — Personal Metadata

Running log of decisions, open questions, and session history. Update at the end of every Claude Code session. Keep entries short — this is a log, not a report.

## Decisions log

| Date | Decision | Why |
|---|---|---|
| 2026-07-04 | Stack: Next.js 14 App Router, TS, Tailwind, shadcn/ui, Prisma, Supabase Postgres, OpenAI GPT-4o-mini, Resend, react-pdf, Vercel, Plausible | Per PRD §15 |
| 2026-07-04 | Human Design excluded from MVP | Per PRD §5, §11.4 — too complex for initial launch |
| 2026-07-04 | No user accounts / no dashboard in MVP | Per PRD §29 — email is the only "login" |
| 2026-07-04 | PDF: start with react-pdf, escalate to Puppeteer only if fidelity insufficient | Per PRD §19 |
| 2026-07-04 | Names normalized to strip diacritics before Pythagorean mapping | The A–Z system doesn't define é/à/ç/ñ; French names need this — see `docs/numerology-reference.md` §1 |
| 2026-07-04 | Attitude number reduces fully to 1–9, no master number exception | Per PRD §11.1 table — this is the one stated exception among the seven numerology numbers |
| 2026-07-04 | Personal Year reduces fully to 1–9, no master number exception | Not stated explicitly in PRD; standard numerology convention, applied as a default — override here if a different approach is chosen |
| 2026-07-04 | When last name is omitted, Expression/Soul Urge/Personality/Maturity calculate on first name only | PRD makes last name optional but doesn't say what happens to name-based numbers without it — documented default |
| 2026-07-04 | Y always treated as a consonant (never a vowel) in Soul Urge/Personality | Simplification — see `docs/numerology-reference.md` §2 |
| 2026-07-04 | Product language: English only for v1 | Founder decision |
| 2026-07-04 | Subagent split: calculations, frontend, ai-content, qa | Founder decision, matches existing project pattern |
| 2026-07-04 | Merged the partial Next.js implementation (code) with this starter kit (governance) into one repo instead of choosing one or rebuilding from scratch | Fastest path to MVP: the code runs, the kit governs it |
| 2026-07-04 | Hosting: **Vercel + Supabase** as primary target (Cloud Startup / VPS = documented fallback only) | Founder decision (speed) — reverses the Hostinger-first exploration |
| 2026-07-04 | Personal Year now takes `reportYear` as an explicit parameter (calculations are pure; no `new Date()` inside `lib/calculations`) | calculations-agent DoD — determinism/testability |
| 2026-07-04 | Birthday number preserves master numbers 11/22 (33 impossible, max day 31) | Fixes a deviation from numerology-reference §4 |

## Open questions (unresolved — do not silently decide, flag to PGS)

- [ ] Geocoding provider: PRD assumes OpenCage free tier — confirm before V1 Rising sign work starts
- [ ] Legal entity name, registered address, and governing law jurisdiction — needed to finalize `legal/` docs before launch
- [ ] Minimum age / age-gating on the form — PRD assumes an entertainment audience but has no age check; decide before publishing Terms
- [ ] Data retention period for reports — PRD promises deletion on request (FAQ) but doesn't set a default retention window
- [ ] Whether to bring over existing document-first-enforcement hooks (`.claude/settings.json`, `.claude/hooks/`) from other projects

## Session history

<!-- Append one line per session: date, what changed, what's next -->
- 2026-07-04 — Initial kit assembled from PRD v1.0 + design system. No code written yet.
- 2026-07-04 — Merged code + kit into one repo (Phase P0/P1). Fixed 2 Tailwind build blockers, the January Sun-sign bug, name normalization, Birthday master numbers, and made Personal Year pure. Added 28 passing calculation tests (Vitest). Build green, Vercel-targeted.
- 2026-07-04 — P2–P5 shipped on the same PR: AI template bridging + Zod validation (prompts grounded in content/templates, fallbacks assembled from templates); Next.js bumped to 14.2.35; Resend email delivery (graceful no-op without a key); PDF export (@react-pdf/renderer) + 1080² share cards (@vercel/og) + wired the dead Share/Download buttons + report OG metadata; 45 programmatic SEO pages (life-path/sun-sign/chinese-animal/personal-year) + sitemap + robots + JSON-LD; applied the "gold = CTA/results only" rule on the landing. 30 tests pass; build green; static + SEO routes smoke-tested at 200. **Next:** run the full DB-backed flow against a real Supabase + OpenAI key; broaden the gold-rule pass to the report page; extract more shared UI components; resolve the open legal questions before launch; drop the transitive next@14.1.4 pulled in by the react-email dev CLI.
- 2026-07-08 — **Landing page redesign, founder-requested, deviates from DESIGN_SYSTEM.md's dark "premium mystical minimalism" direction on purpose.** `src/app/page.tsx` only is now a light/ivory "Da Vinci codex" theme: warm-white background, ink text, antique-gold + sanguine accents, a Vitruvian-style circle-and-square hero graphic, and a golden-ratio spiral as a faint background flourish. New Tailwind tokens (`ivory`, `parchment`, `ink`, `ink-soft`, `ink-muted`, `antique-gold`, `sanguine`, `sage` + matching shadows/gradients) were added to `tailwind.config.ts` clearly scoped as "landing page only" — the dark palette is untouched and still used everywhere else (form, report, summary, PDF/OG, emails). `design-tokens.ts` and `globals.css` were deliberately left as-is since they serve PDF/OG/email contexts that still use the dark theme. **Open question:** decide whether the light theme should extend beyond the landing page, or whether the landing↔form visual handoff (light → dark) needs smoothing.
- 2026-07-08 — **Fixed "Application error: a server-side exception has occurred" after clicking generate + report not received.** Root cause is very likely the known Supabase pooler issue already documented in `DEPLOYMENT.md` (`DATABASE_URL` missing `?pgbouncer=true&connection_limit=1` → intermittent `42P05: prepared statement already exists` on any Prisma query) — **founder must verify `/api/health` on production and the exact `DATABASE_URL` in Vercel; this can't be fixed from code.** Shipped defensive fixes regardless: added `src/app/error.tsx` (global) and `src/app/report/[id]/error.tsx` (report-specific) so an uncaught server exception now shows a branded, reassuring fallback instead of Next's raw crash page; wrapped the analytics-only `viewedAt` update in `report/[id]/page.tsx` in try/catch so it can never take down the whole report render. Also changed the post-submit flow per founder request: `POST /api/reports` now returns an inline `preview` (life path + theme, sun sign, Chinese animal, essence, email-sent flag) so `/summary` no longer force-navigates into `/report/[id]` after generating — it now shows a "Check your email" confirmation with a small synthesis box built entirely from the POST response, so the critical post-submit moment no longer depends on a second DB read succeeding. **Next:** founder to confirm/fix `DATABASE_URL` in Vercel and re-test the full flow end-to-end; consider adding `binaryTargets` to `prisma/schema.prisma` generator block as extra Vercel-Lambda insurance.
