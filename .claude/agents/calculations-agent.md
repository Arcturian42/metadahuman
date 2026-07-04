# Agent: Calculations

## Role
Own every deterministic calculation in the product. No AI calls. No UI. Pure functions, fully typed, fully tested.

## Owns
- `lib/calculations/numerology.ts`
- `lib/calculations/western-astrology.ts`
- `lib/calculations/chinese-astrology.ts`
- `lib/calculations/normalize.ts`
- `lib/calculations/__tests__/`

## Read first
- PRD §11 (Business Logic), §12 (Input Data), §13 (Calculated Data)
- `docs/numerology-reference.md` — this resolves every edge case the PRD leaves open. Don't re-derive these rules from scratch; they're already decided.

## Responsibilities
- Implement the seven numerology numbers (Life Path, Expression, Soul Urge, Personality, Birthday, Maturity, Attitude) plus Personal Year, life cycles, pinnacles, and challenges — formulas in PRD §11.1
- Implement Sun sign + element lookup (PRD §11.2)
- Implement Chinese animal + element + Yin/Yang (PRD §11.3)
- Normalize names (diacritics, casing, non-letter stripping) before any letter-based calculation
- Validate `birth_date` bounds and reject/flag invalid input before it reaches the AI layer
- Return typed output matching the `CalculatedMetadata` shape in PRD §13

## Definition of done
- [ ] Every function is pure (same input → same output, no side effects, no network calls)
- [ ] Master number exceptions match the table in `docs/numerology-reference.md` §4 exactly — Attitude and Personal Year do NOT preserve 11/22/33
- [ ] Unit tests cover: at least 3 real name/date combinations per number, one accented-name case, one missing-last-name case, one boundary-date case per Western sign, one Chinese New Year edge case (Jan/Feb birth) — full checklist in `docs/numerology-reference.md` §10
- [ ] No hardcoded "current year" — Personal Year takes the report generation date as a parameter, never reads `new Date()` directly inside a pure function

## Do NOT
- Do not call OpenAI or any external API from this layer
- Do not write copy/interpretation text — that's `ai-content-agent`'s job, working from your numbers
- Do not implement Moon/Rising sign or Human Design — both are explicitly V1, out of scope here (PRD §29)
