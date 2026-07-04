import { describe, it, expect } from "vitest";
import { calculateNumerology } from "../numerology";
import { EmptyNameError } from "../normalize";

// Expected values are hand-derived from the PRD §11.1 formulas (sum-then-reduce),
// not from the illustrative prose example in PRD §30 (which is not internally
// consistent and is not a computation reference).

describe("calculateNumerology — core profile (Alex Chen, 1992-11-08)", () => {
  const r = calculateNumerology("Alex", "Chen", "1992-11-08", 2026);

  it("Life Path = 4 (8 + 11 + 1992 = 2011 → 4)", () => {
    expect(r.lifePath).toBe(4);
  });
  it("Expression = 9 (ALEXCHEN letters sum 36 → 9)", () => {
    expect(r.expression).toBe(9);
  });
  it("Soul Urge = 11, master preserved (vowels A+E+E = 11)", () => {
    expect(r.soulUrge).toBe(11);
  });
  it("Personality = 7 (consonants sum 25 → 7)", () => {
    expect(r.personality).toBe(7);
  });
  it("Birthday = 8 (day of month)", () => {
    expect(r.birthday).toBe(8);
  });
  it("Maturity = 4 (LifePath 4 + Expression 9 = 13 → 4)", () => {
    expect(r.maturity).toBe(4);
  });
  it("Attitude = 1, reduces fully, no master (8 + 11 = 19 → 1)", () => {
    expect(r.attitude).toBe(1);
  });
  it("Personal Year (2026) = 2, reduces fully (8 + 11 + 2026 = 2045 → 11 → 2)", () => {
    expect(r.personalYear).toBe(2);
  });
});

describe("master numbers", () => {
  it("Life Path preserves 22 (07 + 11 + 1975 = 1993 → 22)", () => {
    expect(calculateNumerology("Test", "Case", "1975-11-07", 2026).lifePath).toBe(22);
  });
  it("Life Path preserves 11 (09 + 11 + 1998 = 2018 → 11)", () => {
    expect(calculateNumerology("Test", "Case", "1998-11-09", 2026).lifePath).toBe(11);
  });
  it("Expression preserves 33 (VICTOR letters sum 33)", () => {
    expect(calculateNumerology("Victor", undefined, "1990-01-01", 2026).expression).toBe(33);
  });
  it("Birthday preserves 11 and 22 (days 11 and 22)", () => {
    expect(calculateNumerology("A", undefined, "1990-01-11", 2026).birthday).toBe(11);
    expect(calculateNumerology("A", undefined, "1990-01-22", 2026).birthday).toBe(22);
  });
});

describe("name handling", () => {
  it("uses first name only when last name is absent (numerology-reference §3)", () => {
    // EMMA letters = 5+4+4+1 = 14 → 5
    expect(calculateNumerology("Emma", undefined, "1990-06-15", 2026).expression).toBe(5);
  });
  it("normalizes accented names before mapping (identical numbers with/without accents)", () => {
    const accented = calculateNumerology("Renée", "Núñez", "1988-03-12", 2026);
    const plain = calculateNumerology("Renee", "Nunez", "1988-03-12", 2026);
    expect(accented.expression).toBe(plain.expression);
    expect(accented.soulUrge).toBe(plain.soulUrge);
  });
  it("throws EmptyNameError when a name has no A–Z letters", () => {
    expect(() => calculateNumerology("李", undefined, "1990-01-01", 2026)).toThrow(EmptyNameError);
  });
});

describe("determinism", () => {
  it("Personal Year depends only on the passed reportYear, not the wall clock", () => {
    const a = calculateNumerology("Sam", "Lee", "1990-05-20", 2025).personalYear;
    const b = calculateNumerology("Sam", "Lee", "1990-05-20", 2026).personalYear;
    const a2 = calculateNumerology("Sam", "Lee", "1990-05-20", 2025).personalYear;
    expect(a).toBe(a2);
    expect(a).not.toBe(b); // 2025 vs 2026 differ by 1 before reduction
  });
});
