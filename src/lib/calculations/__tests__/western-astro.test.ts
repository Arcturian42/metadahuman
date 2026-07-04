import { describe, it, expect } from "vitest";
import { calculateWesternAstro } from "../western-astro";

const sign = (d: string) => calculateWesternAstro(d).sunSign;

describe("calculateWesternAstro — sign boundaries (PRD §11.2)", () => {
  it("REGRESSION: late-January dates are Aquarius, not Capricorn", () => {
    // The original bug classified Jan 20–31 as Capricorn.
    expect(sign("1990-01-20")).toBe("Aquarius");
    expect(sign("1990-01-25")).toBe("Aquarius");
    expect(sign("1990-01-31")).toBe("Aquarius");
  });

  it("classifies every boundary date correctly", () => {
    expect(sign("2000-01-01")).toBe("Capricorn");
    expect(sign("2000-01-19")).toBe("Capricorn");
    expect(sign("2000-01-20")).toBe("Aquarius");
    expect(sign("2000-02-18")).toBe("Aquarius");
    expect(sign("2000-02-19")).toBe("Pisces");
    expect(sign("2000-03-20")).toBe("Pisces");
    expect(sign("2000-03-21")).toBe("Aries");
    expect(sign("2000-04-19")).toBe("Aries");
    expect(sign("2000-04-20")).toBe("Taurus");
    expect(sign("2000-05-20")).toBe("Taurus");
    expect(sign("2000-05-21")).toBe("Gemini");
    expect(sign("2000-06-20")).toBe("Gemini");
    expect(sign("2000-06-21")).toBe("Cancer");
    expect(sign("2000-07-22")).toBe("Cancer");
    expect(sign("2000-07-23")).toBe("Leo");
    expect(sign("2000-08-22")).toBe("Leo");
    expect(sign("2000-08-23")).toBe("Virgo");
    expect(sign("2000-09-22")).toBe("Virgo");
    expect(sign("2000-09-23")).toBe("Libra");
    expect(sign("2000-10-22")).toBe("Libra");
    expect(sign("2000-10-23")).toBe("Scorpio");
    expect(sign("2000-11-21")).toBe("Scorpio");
    expect(sign("2000-11-22")).toBe("Sagittarius");
    expect(sign("2000-12-21")).toBe("Sagittarius");
    expect(sign("2000-12-22")).toBe("Capricorn");
    expect(sign("2000-12-31")).toBe("Capricorn");
  });

  it("returns the correct element for the sign", () => {
    expect(calculateWesternAstro("2000-07-23").sunElement).toBe("Fire"); // Leo
    expect(calculateWesternAstro("2000-04-20").sunElement).toBe("Earth"); // Taurus
    expect(calculateWesternAstro("2000-05-21").sunElement).toBe("Air"); // Gemini
    expect(calculateWesternAstro("2000-02-19").sunElement).toBe("Water"); // Pisces
  });
});
