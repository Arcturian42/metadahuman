import type { NumerologyResult } from "@/types";
import { normalizeName, EmptyNameError } from "./normalize";

// Pythagorean letter-to-number map (uppercase; inputs are normalized first).
const LETTER_MAP: Record<string, number> = {
  A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
  J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
  S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8,
};

// Vowels = A E I O U only. Y is always a consonant for MVP
// (docs/numerology-reference.md §2 — documented simplification, not a bug).
const VOWELS = new Set(["A", "E", "I", "O", "U"]);

const MASTER_NUMBERS = new Set([11, 22, 33]);

/**
 * Digit-sum reduction. Stops at a master number (11/22/33) when allowMaster is
 * true, otherwise reduces fully to 1–9. Master-number policy per number is set
 * by the caller — see docs/numerology-reference.md §4.
 */
function reduceNumber(n: number, allowMaster = true): number {
  if (n <= 0) return 0;
  if (allowMaster && MASTER_NUMBERS.has(n)) return n;
  if (n < 10) return n;
  const sum = String(n)
    .split("")
    .reduce((acc, d) => acc + parseInt(d, 10), 0);
  return reduceNumber(sum, allowMaster);
}

// The sum helpers receive an already-normalized uppercase A–Z string.
function sumLetters(normalized: string): number {
  return normalized.split("").reduce((acc, ch) => acc + (LETTER_MAP[ch] || 0), 0);
}

function sumVowels(normalized: string): number {
  return normalized.split("").reduce((acc, ch) => {
    return VOWELS.has(ch) ? acc + (LETTER_MAP[ch] || 0) : acc;
  }, 0);
}

function sumConsonants(normalized: string): number {
  return normalized.split("").reduce((acc, ch) => {
    return !VOWELS.has(ch) && LETTER_MAP[ch] ? acc + LETTER_MAP[ch] : acc;
  }, 0);
}

/**
 * Compute the full Pythagorean numerology profile.
 *
 * Pure function: `reportYear` is passed in (never read from `new Date()` inside)
 * so Personal Year is deterministic and testable — calculations-agent DoD.
 * When `lastName` is absent, name-based numbers use the first name only
 * (numerology-reference.md §3).
 *
 * @throws EmptyNameError if the name has no A–Z letters after normalization.
 */
export function calculateNumerology(
  firstName: string,
  lastName: string | undefined,
  birthDateStr: string,
  reportYear: number
): NumerologyResult {
  const normalizedName = normalizeName(lastName ? `${firstName} ${lastName}` : firstName);
  if (normalizedName.length === 0) {
    throw new EmptyNameError("firstName");
  }

  const birthDate = new Date(birthDateStr);
  const day = birthDate.getDate();
  const month = birthDate.getMonth() + 1;
  const year = birthDate.getFullYear();

  const lifePath = reduceNumber(day + month + year); // master preserved
  const expression = reduceNumber(sumLetters(normalizedName)); // master preserved
  const soulUrge = reduceNumber(sumVowels(normalizedName)); // master preserved
  const personality = reduceNumber(sumConsonants(normalizedName)); // master preserved
  const birthday = reduceNumber(day); // preserves 11/22 (33 impossible, max day 31)
  const maturity = reduceNumber(lifePath + expression); // master preserved
  const attitude = reduceNumber(day + month, false); // reduces fully to 1–9 (PRD §11.1)

  // Personal Year uses the report-generation year, reduced fully to 1–9
  // (numerology-reference.md §4, §8).
  const personalYear = reduceNumber(day + month + reportYear, false);

  const p1 = reduceNumber(month + day, false);
  const p2 = reduceNumber(year + day, false);
  const p3 = reduceNumber(p1 + p2, false);
  const p4 = reduceNumber(month + year, false);

  const c1 = Math.abs(month - day);
  const c2 = Math.abs(year - day);
  const c3 = Math.abs(c1 - c2);
  const c4 = Math.abs(month - year);

  return {
    lifePath,
    expression,
    soulUrge,
    personality,
    birthday,
    maturity,
    attitude,
    cycles: {
      formative: lifePath,
      productive: lifePath * 2,
      harvest: lifePath * 2,
    },
    pinnacles: [p1, p2, p3, p4],
    challenges: [c1, c2, c3, c4],
    personalYear,
  };
}

export function getLifePathMeaning(n: number): string {
  const meanings: Record<number, string> = {
    1: "The Leader — independence, initiative, originality",
    2: "The Diplomat — cooperation, sensitivity, harmony",
    3: "The Communicator — creativity, expression, joy",
    4: "The Builder — stability, discipline, practicality",
    5: "The Freedom Seeker — change, adventure, versatility",
    6: "The Nurturer — responsibility, love, service",
    7: "The Seeker — analysis, spirituality, depth",
    8: "The Powerhouse — ambition, authority, material mastery",
    9: "The Humanitarian — compassion, completion, wisdom",
    11: "The Intuitive — inspiration, illumination, spiritual insight",
    22: "The Master Builder — vision, practical idealism, legacy",
    33: "The Master Teacher — compassion, blessing, spiritual guidance",
  };
  return meanings[n] || "Unknown";
}
