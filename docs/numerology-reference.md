# Numerology & Astrology — Calculation Reference

This resolves edge cases the PRD (§11) doesn't spell out. Read before writing anything in `lib/calculations/`.

## 1. Name normalization (do this first, always)

The Pythagorean letter-to-number table only defines A–Z. Real users will submit accented characters (Sophie, François, Zoë, Renée...). Before any letter-based calculation:

1. Unicode-normalize to NFD and strip combining diacritical marks (`é`→`e`, `ñ`→`n`, `ç`→`c`, `ü`→`u`, etc.)
2. Uppercase the result
3. Strip everything that isn't A–Z (spaces, hyphens, apostrophes, numbers) — don't map them, don't error on them
4. If, after stripping, the name is empty (shouldn't happen given form validation, but defend anyway), treat it as a calculation error and surface a friendly message — never silently output a wrong number

```ts
// Reference implementation shape
function normalizeName(raw: string): string {
  return raw
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // strip diacritics
    .toUpperCase()
    .replace(/[^A-Z]/g, ''); // letters only
}
```

## 2. Vowels vs. consonants

For Soul Urge (vowels) and Personality (consonants):
- Vowels = A, E, I, O, U only.
- **Y is always treated as a consonant for MVP.** (Traditional numerology sometimes counts Y as a vowel when it's the only vowel sound in a syllable — that rule is genuinely ambiguous to implement correctly and is deferred; logged in `docs/memory.md` as an open item, not silently "fixed.")

## 3. Missing last name

Last name is optional on the form (PRD §12) but Expression, Soul Urge, Personality, and Maturity are traditionally calculated from the *full birth name*. Default behavior: **calculate all name-based numbers from first name only when last name is absent.** Don't block the user or fake a last name.

## 4. Master number exceptions — read this carefully

Master numbers (11, 22, 33) are preserved (not reduced further) in most of the seven numerology numbers — **except one:**

| Number | Master numbers preserved? |
|---|---|
| Life Path | Yes — 11, 22, 33 |
| Expression | Yes — 11, 22, 33 |
| Soul Urge | Yes — 11, 22, 33 |
| Personality | Yes — 11, 22, 33 |
| Birthday | Yes — 11, 22 only (33 is mathematically impossible — max day is 31) |
| Maturity | Yes — 11, 22, 33 |
| **Attitude** | **No.** Reduces fully to 1–9 per PRD §11.1. This is the one exception in the PRD's own table — don't copy-paste the master-number check into this function. |
| Personal Year | Not specified in PRD. Default applied: reduces fully to 1–9 (standard numerology convention). Flagged as an open decision in `docs/memory.md` — override there if this changes. |

## 5. Reduction algorithm

Standard digit-sum reduction: sum all digits, repeat until the result is a single digit (1–9) **or** you hit 11, 22, or 33 (for numbers where master numbers apply — see table above). Stop immediately at a master number; don't reduce it further even if asked to "simplify."

## 6. Date validation bounds

- `birth_date` cannot be in the future (compare against server date, not client date, to avoid timezone spoofing)
- Suggested lower bound: 1900-01-01 — no realistic user could be older, and it keeps Chinese zodiac and Western sign lookups inside comfortably tested ranges
- If `birth_time` is provided, `birth_location` should be encouraged (not required) — a time without a location can't resolve a timezone for any future Moon/Rising work in V1

## 7. Chinese zodiac table — verified anchors

The PRD's `year % 12` and `last digit → element` tables are correct (cross-checked against 2020 Metal Rat, 2023 Water Rabbit, 2024 Wood Dragon, 2025 Wood Snake). One caveat carried over from the PRD: Chinese New Year falls in Jan/Feb, so a person born in early January or February of a given Gregorian year may technically belong to the *previous* lunar year's animal. MVP intentionally uses the simplified Gregorian-year approximation with the disclaimer already specified in PRD §11.3 — don't silently "fix" this with a lunar calendar library; that's an explicit, documented simplification, not a bug.

## 8. Personal Year — which "current year"?

Use the **year the report is generated**, not the birth year, not a hardcoded value. `personalYear = reduce(birthDay + birthMonth + reportGenerationYear)`. This means the same person's Personal Year changes on Jan 1 for every report generated after that date — that's correct behavior, not a bug.

## 9. Western Sun sign at boundary dates

The PRD's date ranges (§11.2) are the commonly used tropical zodiac boundaries. Boundary dates (e.g., someone born exactly on Mar 21) can shift by about a day depending on the year, due to leap years — MVP uses the PRD's stated ranges as-is; treat this as a known simplification rather than sourcing a precise ephemeris (that's explicitly V1/Moon-Rising territory per PRD §11.2).

## 10. Quick test-case checklist for `qa-agent`

When validating the ~50 known test cases required by PRD §27, make sure the set includes at least:
- 3+ real name/date combinations per numerology number
- 1 accented-name case (e.g., a name containing é, ñ, or ç)
- 1 missing-last-name case
- 1 boundary-date case per Western sign (start and end of each range)
- 1 Chinese New Year edge case (a birth date in early Jan or Feb)
- 1 case producing each master number (11, 22, 33) in Life Path, Expression, Soul Urge, Personality, and Maturity
