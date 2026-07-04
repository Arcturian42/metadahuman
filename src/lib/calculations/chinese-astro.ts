import type { ChineseAstroResult } from "@/types";

const ANIMALS = [
  "Monkey", "Rooster", "Dog", "Pig",
  "Rat", "Ox", "Tiger", "Rabbit",
  "Dragon", "Snake", "Horse", "Goat",
];

const ELEMENTS: Record<string, string> = {
  "0": "Metal", "1": "Metal",
  "2": "Water", "3": "Water",
  "4": "Wood", "5": "Wood",
  "6": "Fire", "7": "Fire",
  "8": "Earth", "9": "Earth",
};

export function calculateChineseAstro(birthDateStr: string): ChineseAstroResult {
  const birthDate = new Date(birthDateStr);
  const year = birthDate.getFullYear();
  const lastDigit = String(year).slice(-1);

  const animalIndex = year % 12;
  const animal = ANIMALS[animalIndex];
  const element = ELEMENTS[lastDigit] || "Unknown";
  const yinYang = year % 2 === 0 ? "Yang" : "Yin";

  return { animal, element, yinYang };
}

export function getAnimalTraits(animal: string): string {
  const traits: Record<string, string> = {
    Rat: "Intelligent, adaptable, quick-witted, charming",
    Ox: "Diligent, dependable, strong, determined",
    Tiger: "Brave, confident, competitive, unpredictable",
    Rabbit: "Gentle, elegant, alert, lucky",
    Dragon: "Confident, enthusiastic, ambitious, charismatic",
    Snake: "Enigmatic, wise, intuitive, strategic",
    Horse: "Energetic, independent, impatient, warm-hearted",
    Goat: "Calm, creative, sympathetic, moody",
    Monkey: "Sharp, curious, mischievous, versatile",
    Rooster: "Observant, hardworking, courageous, eccentric",
    Dog: "Loyal, honest, cautious, kind",
    Pig: "Compassionate, generous, diligent, naive",
  };
  return traits[animal] || "";
}
