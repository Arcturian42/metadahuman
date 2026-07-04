import { describe, it, expect } from "vitest";
import { calculateChineseAstro } from "../chinese-astro";

describe("calculateChineseAstro (PRD §11.3, verified anchors)", () => {
  it("2020 → Metal Rat, Yang", () => {
    expect(calculateChineseAstro("2020-06-15")).toEqual({
      animal: "Rat",
      element: "Metal",
      yinYang: "Yang",
    });
  });
  it("2023 → Water Rabbit, Yin", () => {
    expect(calculateChineseAstro("2023-06-15")).toEqual({
      animal: "Rabbit",
      element: "Water",
      yinYang: "Yin",
    });
  });
  it("2024 → Wood Dragon, Yang", () => {
    expect(calculateChineseAstro("2024-06-15")).toEqual({
      animal: "Dragon",
      element: "Wood",
      yinYang: "Yang",
    });
  });
  it("2025 → Wood Snake, Yin", () => {
    expect(calculateChineseAstro("2025-06-15")).toEqual({
      animal: "Snake",
      element: "Wood",
      yinYang: "Yin",
    });
  });
  it("1992 → Water Monkey, Yang (PRD §30 example anchor)", () => {
    expect(calculateChineseAstro("1992-11-08")).toEqual({
      animal: "Monkey",
      element: "Water",
      yinYang: "Yang",
    });
  });

  it("uses the Gregorian year for Jan/Feb births (documented MVP simplification, §7)", () => {
    // A Jan 2024 birth maps to the 2024 (Dragon) year under the Gregorian
    // approximation, even though the lunar new year had not yet occurred.
    expect(calculateChineseAstro("2024-01-10").animal).toBe("Dragon");
  });
});
