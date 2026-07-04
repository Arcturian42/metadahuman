import { describe, it, expect } from "vitest";
import { normalizeName } from "../normalize";

describe("normalizeName", () => {
  it("strips diacritics to plain A–Z (numerology-reference §1)", () => {
    expect(normalizeName("François")).toBe("FRANCOIS");
    expect(normalizeName("Zoë")).toBe("ZOE");
    expect(normalizeName("Renée")).toBe("RENEE");
    expect(normalizeName("Núñez")).toBe("NUNEZ");
    expect(normalizeName("Müller")).toBe("MULLER");
  });

  it("uppercases and drops spaces, hyphens, apostrophes and digits", () => {
    expect(normalizeName("mary-jane o'connor")).toBe("MARYJANEOCONNOR");
    expect(normalizeName("Anna 3000")).toBe("ANNA");
  });

  it("returns empty string when no A–Z letters remain", () => {
    expect(normalizeName("李")).toBe("");
    expect(normalizeName("123")).toBe("");
  });
});
