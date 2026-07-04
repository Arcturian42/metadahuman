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
- 2026-07-04 — Merged code + kit into one repo (Phase P0/P1). Fixed 2 Tailwind build blockers, the January Sun-sign bug, name normalization, Birthday master numbers, and made Personal Year pure. Added 28 passing calculation tests (Vitest). Build green, Vercel-targeted. **Next:** AI template bridging (P2), email delivery (P3), PDF + share cards, programmatic SEO. Security follow-up: bump Next.js off 14.2.5 (known advisory) once the flow is stable.
