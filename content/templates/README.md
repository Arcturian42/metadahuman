# Content templates — how these are meant to be used

These JSON files are the "cached base text" from PRD §18's caching strategy: instead of asking the AI model to invent an interpretation from scratch for every report (expensive, inconsistent), each file gives it grounding material to personalize and connect instead.

## Files

- `life-path-numbers.json` — full ~150-word base text per Life Path number (1–9, 11, 22, 33), plus a reflection prompt and a practical tip. Used directly in the Numerology Profile section (PRD §10, section 1.1).
- `sun-signs.json` — ~130-word base text per Sun sign, plus element and key traits. Used in the Western Astrology section (§10, section 2.1).
- `chinese-animals.json` — ~130-word base text per Chinese animal, plus key traits. Used in the Chinese Astrology section (§10, section 3.1).
- `core-number-meanings.json` — short, reusable meanings for the numbers 1–9, 11, 22, 33, plus a `categoryFraming` object describing how the *same* number means something different depending on which numerology category it's attached to (Expression vs. Soul Urge vs. Personality, etc.). Used for Expression, Soul Urge, Personality, Birthday, Maturity, Attitude, and Personal Year — the numbers that don't get their own full template, to avoid needing 7 categories × 12 numbers = 84 near-duplicate entries.

## How `ai-content-agent` should combine them

1. Pull the matching template (or the `core-number-meanings` entry + `categoryFraming` for the given category).
2. Pass it to the model as grounding context, not as a fixed final answer — the prompt's job is to **personalize and bridge**, connecting this number to the person's *other* numbers (per PRD §18 Prompt 2's synthesis approach), not to replace the meaning wholesale.
3. Every `{{firstName}}` placeholder gets replaced with the actual first name before or during the prompt — don't leave a literal `{{firstName}}` in anything shown to a user.
4. If the AI call fails or times out, fall back to the template text with `{{firstName}}` substituted, verbatim. It's generic but on-brand and always available — better than a broken report.

This is what takes the PRD's estimate from ~15 raw AI calls per report down to 4–5 (§18): the heavy lifting of "what does this number mean" is already written; the AI's job per report is connecting dots, not generating meaning from nothing.
