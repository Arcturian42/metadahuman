/**
 * Template ↔ calculated-number bridge (PRD §18).
 *
 * Two jobs per report section:
 *  - grounding: build the base text the model personalizes and connects
 *    (it must write ABOUT the numbers the engine produced, never invent them)
 *  - fallback: a complete, on-brand section assembled from templates alone,
 *    used verbatim when the AI call fails or its output fails validation.
 */
import type {
  NumerologyResult,
  WesternAstroResult,
  ChineseAstroResult,
} from "@/types";
import {
  fillName,
  getLifePathTemplate,
  getSunSignTemplate,
  getChineseAnimalTemplate,
  getCoreNumberMeaning,
  getCategoryFraming,
  type NumberCategory,
} from "@/lib/content/loader";

function meaningLine(n: number, category: NumberCategory, firstName: string): string {
  const m = getCoreNumberMeaning(n);
  if (!m) return "";
  const framing = getCategoryFraming(category, firstName);
  return `- ${category} (${n}): ${m.coreMeaning} [${m.keywords.join(", ")}]. ${framing}`;
}

// ── Numerology ────────────────────────────────────────────────────────────
export function numerologyGrounding(numerology: NumerologyResult, firstName: string): string {
  const lp = getLifePathTemplate(numerology.lifePath);
  const lpBlock = lp
    ? `LIFE PATH ${numerology.lifePath} — ${lp.theme}\n${fillName(lp.body, firstName)}`
    : `LIFE PATH ${numerology.lifePath}`;
  const others = [
    meaningLine(numerology.expression, "expression", firstName),
    meaningLine(numerology.soulUrge, "soulUrge", firstName),
    meaningLine(numerology.personality, "personality", firstName),
  ]
    .filter(Boolean)
    .join("\n");
  return `${lpBlock}\n\nSUPPORTING NUMBERS:\n${others}`;
}

export function numerologyFallback(numerology: NumerologyResult, firstName: string) {
  const lp = getLifePathTemplate(numerology.lifePath);
  return {
    title: lp ? `Life Path ${numerology.lifePath} — ${lp.theme}` : `Life Path ${numerology.lifePath}`,
    body: lp
      ? fillName(lp.body, firstName)
      : `${firstName}, your Life Path number is ${numerology.lifePath}. It points to a recurring theme in how you move through the world.`,
    practicalPrompt: lp ? fillName(lp.practicalTip, firstName) : "",
    note: "This interpretation is offered as a symbolic mirror for reflection.",
  };
}

// ── Western + Chinese astrology (single section) ────────────────────────────
export function astroGrounding(
  western: WesternAstroResult,
  chinese: ChineseAstroResult,
  firstName: string
): string {
  const sun = getSunSignTemplate(western.sunSign);
  const animal = getChineseAnimalTemplate(chinese.animal);
  const sunBlock = sun
    ? `SUN IN ${western.sunSign.toUpperCase()} (${sun.element}) — ${sun.theme}\n${fillName(sun.body, firstName)}\nKey traits: ${sun.keyTraits.join(", ")}`
    : `SUN IN ${western.sunSign} (${western.sunElement})`;
  const animalBlock = animal
    ? `CHINESE ${chinese.animal.toUpperCase()} (${chinese.element}, ${chinese.yinYang}) — ${animal.theme}\n${fillName(animal.body, firstName)}\nKey traits: ${animal.keyTraits.join(", ")}`
    : `CHINESE ${chinese.animal} of ${chinese.element}, ${chinese.yinYang}`;
  return `${sunBlock}\n\n${animalBlock}`;
}

export function astroFallback(
  western: WesternAstroResult,
  chinese: ChineseAstroResult,
  firstName: string
) {
  const sun = getSunSignTemplate(western.sunSign);
  const body = sun
    ? fillName(sun.body, firstName)
    : `${firstName}, your Sun sign is ${western.sunSign}, carrying ${western.sunElement} energy.`;
  return {
    title: `Sun in ${western.sunSign}`,
    body,
    reflectionQuestion: `How does your ${western.sunSign} nature show up alongside your ${chinese.animal} instincts in everyday moments?`,
  };
}

// ── Synthesis ───────────────────────────────────────────────────────────────
export function synthesisGrounding(
  numerology: NumerologyResult,
  western: WesternAstroResult,
  chinese: ChineseAstroResult,
  firstName: string
): string {
  const lp = getLifePathTemplate(numerology.lifePath);
  const sun = getSunSignTemplate(western.sunSign);
  const animal = getChineseAnimalTemplate(chinese.animal);
  return [
    `Numerology core: Life Path ${numerology.lifePath}${lp ? ` (${lp.theme})` : ""}, Expression ${numerology.expression}, Soul Urge ${numerology.soulUrge}.`,
    `Western: Sun in ${western.sunSign}${sun ? ` (${sun.theme}, ${sun.keyTraits.join("/")})` : ` (${western.sunElement})`}.`,
    `Chinese: ${chinese.animal}${animal ? ` (${animal.theme}, ${animal.keyTraits.join("/")})` : ""}, ${chinese.element}, ${chinese.yinYang}.`,
  ].join("\n");
}

export function synthesisFallback(
  numerology: NumerologyResult,
  western: WesternAstroResult,
  chinese: ChineseAstroResult,
  firstName: string
) {
  const lp = getLifePathTemplate(numerology.lifePath);
  const sun = getSunSignTemplate(western.sunSign);
  const animal = getChineseAnimalTemplate(chinese.animal);
  const traits = [
    ...(sun?.keyTraits ?? []),
    ...(animal?.keyTraits ?? []),
  ].filter(Boolean);
  return {
    essence: `${firstName}, your symbolic profile blends ${western.sunSign} energy, the ${chinese.animal}'s ${animal?.theme ?? "instincts"}, and the pull of Life Path ${numerology.lifePath}${lp ? ` — ${lp.theme}` : ""}. These systems don't always agree, and that tension is part of being human rather than a contradiction to resolve.`,
    strengths: (traits.length ? traits.slice(0, 3) : ["awareness", "adaptability", "depth"]).map(
      (t) => ({ title: t.charAt(0).toUpperCase() + t.slice(1), description: `A quality your chart returns to: ${t}.` })
    ),
    growthAreas: [
      {
        title: "Balance",
        invitation: lp
          ? fillName(lp.reflectionPrompt, firstName)
          : "Notice where one part of you pulls against another, and treat it as information rather than a problem.",
      },
    ],
    practices: [
      {
        title: "Morning reflection",
        description: lp ? fillName(lp.practicalTip, firstName) : "Spend a few minutes noticing what themes keep returning.",
        duration: "5 min",
        frequency: "Daily",
      },
    ],
  };
}

// ── Cycles / Personal Year ──────────────────────────────────────────────────
export function cyclesGrounding(
  numerology: NumerologyResult,
  firstName: string,
  currentYear: number
): string {
  const framing = getCategoryFraming("personalYear", firstName);
  const m = getCoreNumberMeaning(numerology.personalYear);
  return [
    `Personal Year for ${currentYear}: ${numerology.personalYear}.`,
    m ? `Theme: ${m.coreMeaning} [${m.keywords.join(", ")}].` : "",
    framing,
    `Life Path context: ${numerology.lifePath}.`,
  ]
    .filter(Boolean)
    .join("\n");
}

export function cyclesFallback(numerology: NumerologyResult, firstName: string) {
  const m = getCoreNumberMeaning(numerology.personalYear);
  return {
    title: `Personal Year ${numerology.personalYear}`,
    body: m
      ? `${firstName}, the year you're in carries the energy of ${numerology.personalYear}: ${m.coreMeaning} This is an invitation to explore that theme, not a fixed prediction.`
      : `${firstName}, this year invites you to explore the energy of the number ${numerology.personalYear}.`,
    invitation: "Notice what themes keep appearing in your life right now, and stay curious about them.",
  };
}
