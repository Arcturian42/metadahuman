import type { WesternAstroResult } from "@/types";

// Tropical zodiac defined by cumulative upper bounds (PRD §11.2). A date belongs
// to the first sign whose (untilMonth, untilDay) it does not exceed. Capricorn
// appears twice because it wraps the year end (Dec 22 → Jan 19).
const SIGNS = [
  { name: "Capricorn", untilMonth: 1, untilDay: 19, element: "Earth" },
  { name: "Aquarius", untilMonth: 2, untilDay: 18, element: "Air" },
  { name: "Pisces", untilMonth: 3, untilDay: 20, element: "Water" },
  { name: "Aries", untilMonth: 4, untilDay: 19, element: "Fire" },
  { name: "Taurus", untilMonth: 5, untilDay: 20, element: "Earth" },
  { name: "Gemini", untilMonth: 6, untilDay: 20, element: "Air" },
  { name: "Cancer", untilMonth: 7, untilDay: 22, element: "Water" },
  { name: "Leo", untilMonth: 8, untilDay: 22, element: "Fire" },
  { name: "Virgo", untilMonth: 9, untilDay: 22, element: "Earth" },
  { name: "Libra", untilMonth: 10, untilDay: 22, element: "Air" },
  { name: "Scorpio", untilMonth: 11, untilDay: 21, element: "Water" },
  { name: "Sagittarius", untilMonth: 12, untilDay: 21, element: "Fire" },
  { name: "Capricorn", untilMonth: 12, untilDay: 31, element: "Earth" }, // Dec 22–31
];

export function calculateWesternAstro(
  birthDateStr: string,
  _birthTime?: string,
  _birthLocation?: string
): WesternAstroResult {
  const birthDate = new Date(birthDateStr);
  const month = birthDate.getMonth() + 1;
  const day = birthDate.getDate();

  const sign = SIGNS.find(
    (s) => month < s.untilMonth || (month === s.untilMonth && day <= s.untilDay)
  );

  if (!sign) {
    return { sunSign: "Unknown", sunElement: "Unknown" };
  }

  // Moon and Rising require precise ephemeris calculation (V1)
  // For MVP, return sun sign only with a note in the report
  return {
    sunSign: sign.name,
    sunElement: sign.element,
  };
}

export function getSunSignTraits(sign: string): string {
  const traits: Record<string, string> = {
    Aries: "Courageous, direct, energetic, impulsive",
    Taurus: "Patient, reliable, devoted, stubborn",
    Gemini: "Adaptable, curious, communicative, restless",
    Cancer: "Intuitive, protective, emotional, nurturing",
    Leo: "Confident, creative, generous, dramatic",
    Virgo: "Analytical, practical, detail-oriented, critical",
    Libra: "Diplomatic, fair, social, indecisive",
    Scorpio: "Passionate, resourceful, intense, secretive",
    Sagittarius: "Optimistic, adventurous, honest, blunt",
    Capricorn: "Disciplined, responsible, ambitious, rigid",
    Aquarius: "Independent, humanitarian, original, detached",
    Pisces: "Compassionate, artistic, intuitive, escapist",
  };
  return traits[sign] || "";
}
