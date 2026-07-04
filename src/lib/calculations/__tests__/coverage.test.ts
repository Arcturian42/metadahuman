import { describe, it, expect } from "vitest";
import { calculateNumerology } from "../numerology";
import { calculateWesternAstro } from "../western-astro";
import { calculateChineseAstro } from "../chinese-astro";

// Extra coverage to approach the ~50 known cases required by PRD §27.

describe("Western sign — every sign returns its element", () => {
  const cases: Array<[string, string, string]> = [
    ["2001-04-05", "Aries", "Fire"],
    ["2001-05-05", "Taurus", "Earth"],
    ["2001-06-05", "Gemini", "Air"],
    ["2001-07-05", "Cancer", "Water"],
    ["2001-08-05", "Leo", "Fire"],
    ["2001-09-05", "Virgo", "Earth"],
    ["2001-10-05", "Libra", "Air"],
    ["2001-11-05", "Scorpio", "Water"],
    ["2001-12-05", "Sagittarius", "Fire"],
    ["2001-01-05", "Capricorn", "Earth"],
    ["2001-02-05", "Aquarius", "Air"],
    ["2001-03-05", "Pisces", "Water"],
  ];
  it.each(cases)("%s → %s (%s)", (date, sign, element) => {
    const r = calculateWesternAstro(date);
    expect(r.sunSign).toBe(sign);
    expect(r.sunElement).toBe(element);
  });
});

describe("Chinese zodiac — 12-year animal cycle from a Rat year", () => {
  const animals = [
    "Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake",
    "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig",
  ];
  it.each(animals.map((a, i) => [2020 + i, a] as [number, string]))(
    "%i → %s",
    (year, animal) => {
      expect(calculateChineseAstro(`${year}-06-15`).animal).toBe(animal);
    }
  );
});

describe("Numerology — reduction and range sanity", () => {
  it("all seven numbers stay in valid ranges across a spread of inputs", () => {
    const samples: Array<[string, string, string]> = [
      ["Ada", "Lovelace", "1815-12-10"],
      ["Grace", "Hopper", "1906-12-09"],
      ["Alan", "Turing", "1912-06-23"],
      ["Katherine", "Johnson", "1918-08-26"],
      ["Sophie", "Germain", "1776-04-01"],
    ];
    for (const [first, last, date] of samples) {
      const r = calculateNumerology(first, last, date, 2026);
      const single = (n: number) => (n >= 1 && n <= 9) || [11, 22, 33].includes(n);
      expect(single(r.lifePath)).toBe(true);
      expect(single(r.expression)).toBe(true);
      expect(single(r.soulUrge)).toBe(true);
      expect(single(r.personality)).toBe(true);
      expect(r.birthday).toBeGreaterThanOrEqual(1);
      expect(r.attitude).toBeGreaterThanOrEqual(1);
      expect(r.attitude).toBeLessThanOrEqual(9); // Attitude never a master number
      expect(r.personalYear).toBeGreaterThanOrEqual(1);
      expect(r.personalYear).toBeLessThanOrEqual(9); // Personal Year reduces fully
    }
  });

  it("y is treated as a consonant (numerology-reference §2)", () => {
    // MARY: consonants M(4) R(9) Y(7) = 20 → 2; vowel A(1) only → 1
    const r = calculateNumerology("Mary", undefined, "1990-01-01", 2026);
    expect(r.soulUrge).toBe(1);
    expect(r.personality).toBe(2);
  });
});
