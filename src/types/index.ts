export interface ReportInput {
  firstName: string;
  lastName: string;
  birthDate: string; // YYYY-MM-DD
  birthTime?: string; // HH:MM
  birthLocation?: string;
  email: string;
  marketingConsent?: boolean;
}

export interface NumerologyResult {
  lifePath: number;
  expression: number;
  soulUrge: number;
  personality: number;
  birthday: number;
  maturity: number;
  attitude: number;
  cycles: {
    formative: number;
    productive: number;
    harvest: number;
  };
  pinnacles: [number, number, number, number];
  challenges: [number, number, number, number];
  personalYear: number;
}

export interface WesternAstroResult {
  sunSign: string;
  sunElement: string;
  moonSign?: string;
  risingSign?: string;
}

export interface ChineseAstroResult {
  animal: string;
  element: string;
  yinYang: string;
}

export interface CalculatedMetadata {
  numerology: NumerologyResult;
  western: WesternAstroResult;
  chinese: ChineseAstroResult;
}

export interface ReportSection {
  id: string;
  title: string;
  subtitle?: string;
  body: string;
  type: "text" | "number" | "chart" | "list" | "prompt";
  data?: Record<string, unknown>;
}

export interface ReportContent {
  sections: ReportSection[];
  summary: string;
  strengths: string[];
  growthAreas: string[];
  practicalTips: string[];
}

export interface ShareCardData {
  firstName: string;
  lifePathNumber: number;
  sunSign: string;
  chineseAnimal: string;
}
