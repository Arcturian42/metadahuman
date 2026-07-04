/**
 * Typed access to the pre-written content templates (content/templates/*.json).
 *
 * These are the "cached base text" from PRD §18: instead of asking the model to
 * invent a meaning per report, we hand it grounding text to personalize and
 * connect. If the AI call fails, the same template text (with {{firstName}}
 * substituted) is the fallback — generic but on-brand and always available.
 * See content/templates/README.md.
 */
import lifePathData from "../../../content/templates/life-path-numbers.json";
import sunSignData from "../../../content/templates/sun-signs.json";
import chineseAnimalData from "../../../content/templates/chinese-animals.json";
import coreNumberData from "../../../content/templates/core-number-meanings.json";

export interface LifePathTemplate {
  number: number;
  theme: string;
  summary: string;
  body: string;
  reflectionPrompt: string;
  practicalTip: string;
}

export interface SunSignTemplate {
  sign: string;
  element: string;
  theme: string;
  body: string;
  keyTraits: string[];
}

export interface ChineseAnimalTemplate {
  animal: string;
  theme: string;
  body: string;
  keyTraits: string[];
}

export interface CoreNumberMeaning {
  keywords: string[];
  coreMeaning: string;
}

export type NumberCategory =
  | "expression"
  | "soulUrge"
  | "personality"
  | "birthday"
  | "maturity"
  | "attitude"
  | "personalYear";

const lifePaths = lifePathData as Record<string, LifePathTemplate>;
const sunSigns = sunSignData as Record<string, SunSignTemplate>;
const chineseAnimals = chineseAnimalData as Record<string, ChineseAnimalTemplate>;
const coreNumbers = coreNumberData as {
  categoryFraming: Record<NumberCategory, string>;
  numbers: Record<string, CoreNumberMeaning>;
};

/** Replace every {{firstName}} placeholder — never leave a literal one in output. */
export function fillName(text: string, firstName: string): string {
  return text.split("{{firstName}}").join(firstName);
}

/**
 * Turn personalized template body ("{{firstName}}, your Life Path…") into generic
 * second-person copy for the public SEO pages (no user context there).
 */
export function depersonalize(text: string): string {
  const stripped = text
    .split("{{firstName}}, ")
    .join("")
    .split("{{firstName}}")
    .join("you");
  return stripped.charAt(0).toUpperCase() + stripped.slice(1);
}

export const LIFE_PATH_KEYS = Object.keys(lifePathData as Record<string, unknown>);
export const SUN_SIGN_KEYS = Object.keys(sunSignData as Record<string, unknown>);
export const CHINESE_ANIMAL_KEYS = Object.keys(chineseAnimalData as Record<string, unknown>);
export const PERSONAL_YEAR_KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

export function getLifePathTemplate(n: number): LifePathTemplate | undefined {
  return lifePaths[String(n)];
}

export function getSunSignTemplate(sign: string): SunSignTemplate | undefined {
  return sunSigns[sign.toLowerCase()];
}

export function getChineseAnimalTemplate(animal: string): ChineseAnimalTemplate | undefined {
  return chineseAnimals[animal.toLowerCase()];
}

export function getCoreNumberMeaning(n: number): CoreNumberMeaning | undefined {
  return coreNumbers.numbers[String(n)];
}

export function getCategoryFraming(category: NumberCategory, firstName: string): string {
  const framing = coreNumbers.categoryFraming[category];
  return framing ? fillName(framing, firstName) : "";
}
