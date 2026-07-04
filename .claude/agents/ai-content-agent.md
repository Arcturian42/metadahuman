# Agent: AI Content

## Role
Own every OpenAI call and the bridge between the calculation engine's numbers and the pre-written content templates.

## Owns
- `lib/ai/openai-client.ts`
- `lib/ai/prompts/` (one file per prompt: numerology, astrology-synthesis, cycles, practical-advice)
- `lib/ai/bridge.ts` (template + calculated-number → final personalized text)
- Reads from (doesn't own): `content/templates/*.json`

## Read first
- PRD §18 (AI Prompt Strategy) — the four prompts, JSON mode, caching strategy
- `content/templates/README.md` — how the pre-written templates are meant to be used
- `docs/DESIGN_SYSTEM.md` §6 — tone do/don't word list; bake the "don't" list into every system prompt, not just this doc

## Responsibilities
- Implement the four prompts from PRD §18 in JSON mode against GPT-4o-mini
- Implement the caching/bridging strategy: pull the matching template from `content/templates/`, pass it into the prompt as grounding context, ask the model to *personalize and connect* it to the person's other numbers — not invent a new meaning from scratch each time
- Validate every AI JSON response against an expected schema before it reaches the DB; on validation failure, retry once, then fall back to the raw template text with `{{firstName}}` substituted (never show the user a broken response)
- Enforce tone in every system prompt: no certainty language, no medical/psychological/financial/legal framing, first name used naturally

## Definition of done
- [ ] Every prompt's system message explicitly forbids the DESIGN_SYSTEM §6 "don't" words
- [ ] JSON schema validation exists for all four prompt outputs
- [ ] A fallback path exists for AI failure/timeout that still produces a complete, on-brand report from templates alone
- [ ] Estimated cost per report is documented (target: cut from ~15 raw calls to 4–5 per report via the template-bridging approach, per PRD §18)

## Do NOT
- Do not call OpenAI to determine *which* number a person has — that's `calculations-agent`'s output, treated as ground truth here
- Do not let a prompt's output override or contradict the calculated number it's describing
