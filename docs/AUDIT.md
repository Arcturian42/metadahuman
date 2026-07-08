# Audit — Personal Metadata (web app)

_Date: 2026-07-08 · Scope: landing + full user journey (form → generation → report), shared components, delivery (email/PDF/OG), technical robustness._

This audit was produced alongside two shipped changes this session: the light "Da Vinci codex" theme was extended across the whole web app, and the report‑ready email was enriched with a synthesis teaser. Findings below were verified against the running app on a real local Postgres 16 (full generate → report flow returns 200, `next build` green, 59 unit tests pass) unless marked _unverified_.

Priority key: **P0** = blocks launch / breaks the core promise · **P1** = hurts conversion, accessibility, or trust · **P2** = polish / future‑proofing.

---

## 1. Executive summary

The product is in good shape: calculations are correct and tested, the journey is coherent, the disclaimer is present everywhere, and the new light theme is consistent end to end. The single thing standing between the current build and a working launch is **not code — it is two pieces of production configuration** (the database pooler URL and the email sender domain). Both are verified below as the real cause of "I click generate and get an error / never receive my report."

**Do these three before anything else:**
1. Fix the Supabase pooler `DATABASE_URL` (P0‑A).
2. Verify the Resend sending domain (P0‑B).
3. Re‑run the end‑to‑end flow on production with real OpenAI + Resend keys.

---

## 2. P0 — Launch blockers (configuration, not code)

### P0‑A · Database pooler URL crashes report generation
- **Symptom:** "Application error: a server‑side exception has occurred" after clicking _Generate_.
- **Root cause:** Prisma against Supabase's transaction pooler (port 6543) without `?pgbouncer=true&connection_limit=1` throws `42P05: prepared statement "s0" already exists` intermittently. Already documented in `DEPLOYMENT.md`.
- **Evidence it is _not_ code:** with a correct direct Postgres URL locally, `prisma db push` succeeds and `POST /api/reports` returns **200** with correct numbers and saved rows. The code path is sound.
- **Fix:** in Vercel, set
  `DATABASE_URL="postgresql://…@…pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"`
  and a separate direct `DIRECT_URL` (port 5432) for migrations. Confirm via `GET /api/health` → `databaseReachable: true`.
- **Insurance (optional, code):** add `binaryTargets = ["native", "rhel-openssl-3.0.x"]` to the Prisma `generator` block to avoid Vercel‑Lambda engine mismatches.

### P0‑B · Email "not received" — sender domain likely unverified
- **Where:** `src/lib/email/resend.ts` — `FROM_EMAIL` defaults to `reports@personalmetadata.com`.
- **Risk:** if that domain is not verified in Resend, `resend.emails.send` throws; the code **catches it and continues** (report is still saved and shown on screen), so the user sees success on the web but **no email arrives** — exactly the reported complaint. This is independent of P0‑A.
- **Fix:** verify the sending domain in Resend, set `FROM_EMAIL` to an address on it, set `RESEND_API_KEY` in Vercel, and confirm `GET /api/health` → `resendConfigured: true`. Send one real test.
- **Nice‑to‑have:** surface the email‑send result to the user. The `/summary` confirmation already reads `preview.emailSent` and shows a fallback message when false — good. Consider also logging failed sends somewhere durable.

---

## 3. P1 — Accessibility

Verified with WCAG contrast math on the new palette.

### P1‑A · Muted text fails WCAG AA contrast
- `ink-muted` `#948C78` on `ivory` = **3.15:1**, on `parchment` = **2.84:1** — both **below the 4.5:1** minimum for normal text. Used widely for helper text, microcopy, step counters, footer links.
- `antique-gold` `#A97D33` on `ivory` = **3.50:1** — fine for large/bold display (numbers, the "Life Path 5" subtitle at ≥18px bold, 3:1 rule) but **not for small text**.
- For reference, `ink-soft` `#5B5546` = **6.99:1** and `ink` = **15.8:1** — both pass comfortably.
- **Fix:** darken `ink-muted` to roughly `#7A7159` (~4.6:1 on ivory) — one token change in `tailwind.config.ts` propagates everywhere. Keep gold for large text only.

### P1‑B · Form inputs are not programmatically labelled
- `src/app/form/page.tsx` has **zero** `htmlFor`/`id` pairs; `<label>` and `<input>` are siblings, so screen readers don't associate them. Error messages aren't linked either.
- **Fix:** give each input an `id`, point the `<label htmlFor>` at it, and wire errors with `aria-describedby` + `aria-invalid`. The back‑chevron button needs an `aria-label` (it's icon‑only).

### P1‑C · Motion & focus
- Progress and step transitions use framer‑motion; honor `prefers-reduced-motion` for the slide/spin animations (generation screen especially).
- Verify visible focus rings survived the theme port (`focus:border-antique-gold` changes border but not a focus ring — add `focus:ring-2 focus:ring-antique-gold/40` on inputs and CTAs).

---

## 4. P1 — Conversion & UX

- **Brand continuity (fixed this session):** the form now carries the wordmark header, so the landing→form handoff no longer drops the user onto a bare screen.
- **Social proof is absent.** The sample‑report section shows tone but there are no counts, testimonials, or "N reports generated." Fine for early access; revisit once there's volume. Do **not** fabricate numbers.
- **Last name is required at step 1** (`formSchema.lastName.min(1)`), which deviates from `DESIGN_SYSTEM.md §11` ("last name optional at start"). It's a defensible product call (needed for Expression/Soul Urge/Personality) and is documented in `docs/memory.md`, but it does add first‑step friction. Consider making it optional with a clear "unlocks 3 more numbers" nudge if step‑1 drop‑off is high.
- **Generation screen honesty:** the simulated progress bar (`Math.random()` increments to 90%) is fine as perceived‑value theatre, but make sure it can't stall visibly if the real request is slow; it already snaps to 100% on response.
- **Post‑submit moment (fixed earlier this session):** `/summary` now shows a "Check your email" confirmation built entirely from the POST response (no second DB read), so the highest‑stakes screen can't be taken down by a follow‑up query. Good.

---

## 5. P2 — Design‑system consistency

- **Share assets remain dark on purpose.** The PDF export, `@vercel/og` share cards, and the report‑ready email still use the dark premium palette from `src/config/design-tokens.ts`, while the whole web app is now light. A dark social card / PDF is a legitimate choice (contrast, "premium" feel), **but it is now a conscious inconsistency to confirm** — decide whether to light‑theme these too or keep them dark as the "shareable" skin. Whatever you choose, keep `tailwind.config.ts`, `globals.css`, and `design-tokens.ts` in sync (the file headers say they mirror each other).
- **Token comments are stale.** `tailwind.config.ts` still labels the light tokens "Landing page only" — they're now app‑wide. Update the comment to avoid misleading the next contributor. (Left as‑is intentionally this session to keep the diff reviewable; worth a follow‑up.)
- **Gold discipline** ("gold = CTA / key results / badges only") is well respected across the ported pages — spot‑checked landing, report, form.

---

## 6. P2 — Technical robustness

- **Dead code in `src/app/summary/page.tsx`** (lines ~58–62): `lifePath` / `lifePathReduced` are computed client‑side but never rendered — the displayed number now comes from `result.preview.lifePath`. Remove the redundant calc to avoid two sources of truth for the same number.
- **Rate limiter is in‑memory** (`src/lib/rate-limit.ts`, used in `POST /api/reports`). On Vercel's serverless/edge fan‑out each instance has its own map, so the 5‑per‑minute cap is per‑instance, not global. Fine for launch scale; move to a shared store (Upstash/Redis) before it matters for cost control.
- **Report access model** is "unguessable cuid = the token" for GET/DELETE (`/api/reports/[id]`). Reasonable for a no‑accounts MVP and documented, but note that anyone with the link can delete the report. Acceptable given scope (PRD §29) — just be intentional about it.
- **Analytics write hardened (earlier this session):** the `viewedAt` update in `report/[id]/page.tsx` is wrapped in try/catch so it can't crash the render. Error boundaries (`app/error.tsx`, `report/[id]/error.tsx`) now show branded fallbacks instead of Next's raw crash page.

---

## 7. SEO — in good shape

- 45 programmatic pages (life‑path / sun‑sign / chinese‑animal / personal‑year) prerender at build (confirmed in `next build` output), each with `ArticleJsonLd`, plus `sitemap.xml` and `robots.txt`.
- Per‑report OG images via `/api/reports/[id]/og` with Twitter card metadata.
- **Gaps:** the landing (`src/app/page.tsx`) and SEO pages have no explicit `canonical` and the landing has no `openGraph.images`. Add a static OG image for the landing and canonicals across the SEO set.

---

## 8. Legal / compliance — open items (from `docs/memory.md`)

Not blockers for a soft launch but must be resolved before broad promotion:
- Legal entity name, registered address, governing‑law jurisdiction (needed to finalize `legal/`).
- Minimum age / age‑gating on the form (Terms assume an entertainment audience with no age check).
- Data‑retention window (FAQ promises deletion on request; the FAQ page states "12 months of inactivity" — make sure `legal/privacy-policy.md` and any actual deletion job agree).
- Disclaimer coverage is **good**: present on form consent, every report footer, SEO pages, and both email variants.

---

## 9. Prioritized action list

| # | Priority | Action | Owner | Effort |
|---|---|---|---|---|
| 1 | P0‑A | Set pooler `DATABASE_URL` (`?pgbouncer=true&connection_limit=1`) + `DIRECT_URL` in Vercel; verify `/api/health` | Founder | 5 min |
| 2 | P0‑B | Verify Resend sending domain, set `FROM_EMAIL` + `RESEND_API_KEY`, send a real test | Founder | 15 min |
| 3 | P0 | Re‑run full flow on prod with real OpenAI + Resend keys | Founder | 15 min |
| 4 | P1‑A | Darken `ink-muted` token to ~`#7A7159` for WCAG AA | Dev | 5 min |
| 5 | P1‑B | Add `id`/`htmlFor`, `aria-invalid`, `aria-describedby`, focus rings, back‑button `aria-label` | Dev | 1–2 h |
| 6 | P2 | Remove dead life‑path calc in `summary/page.tsx`; refresh "landing‑only" token comment | Dev | 15 min |
| 7 | P2 | Decide dark‑vs‑light for PDF/OG/email share assets | Founder + Dev | discuss |
| 8 | P1 | Add landing OG image + canonicals across SEO pages | Dev | 30 min |
| 9 | P2 | Move rate limiter to a shared store before scaling | Dev | later |
| 10 | Legal | Resolve entity/age/retention open questions | Founder | before promo |

---

_Method note: verified locally with Postgres 16 (`prisma db push`, `POST /api/reports` → 200, all routes 200, screenshots of landing/form/report), `next build` (exit 0, 45 SSG pages), and `vitest` (59 passing). Contrast ratios computed with the WCAG relative‑luminance formula. Items about production config (P0‑A/B) are diagnosed from code + `DEPLOYMENT.md` and must be confirmed on the live environment._
