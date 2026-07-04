import { describe, it, expect } from "vitest";
import {
  numerologyFallback,
  astroFallback,
  synthesisFallback,
  cyclesFallback,
} from "../bridge";
import { numerologySchema, astroSchema, synthesisSchema, cyclesSchema } from "../schemas";
import type { NumerologyResult, WesternAstroResult, ChineseAstroResult } from "@/types";

const numerology: NumerologyResult = {
  lifePath: 7,
  expression: 8,
  soulUrge: 3,
  personality: 2,
  birthday: 8,
  maturity: 6,
  attitude: 1,
  cycles: { formative: 7, productive: 14, harvest: 14 },
  pinnacles: [3, 4, 7, 5],
  challenges: [1, 2, 1, 3],
  personalYear: 5,
};
const western: WesternAstroResult = { sunSign: "Scorpio", sunElement: "Water" };
const chinese: ChineseAstroResult = { animal: "Monkey", element: "Water", yinYang: "Yang" };

describe("template fallbacks", () => {
  it("produce schema-valid sections without the AI", () => {
    expect(numerologySchema.safeParse(numerologyFallback(numerology, "Alex")).success).toBe(true);
    expect(astroSchema.safeParse(astroFallback(western, chinese, "Alex")).success).toBe(true);
    expect(
      synthesisSchema.safeParse(synthesisFallback(numerology, western, chinese, "Alex")).success
    ).toBe(true);
    expect(cyclesSchema.safeParse(cyclesFallback(numerology, "Alex")).success).toBe(true);
  });

  it("never leak a literal {{firstName}} placeholder", () => {
    const blob = JSON.stringify([
      numerologyFallback(numerology, "Alex"),
      astroFallback(western, chinese, "Alex"),
      synthesisFallback(numerology, western, chinese, "Alex"),
      cyclesFallback(numerology, "Alex"),
    ]);
    expect(blob).not.toContain("{{firstName}}");
    expect(blob).toContain("Alex");
  });
});
