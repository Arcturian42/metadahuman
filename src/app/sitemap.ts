import type { MetadataRoute } from "next";
import {
  LIFE_PATH_KEYS,
  SUN_SIGN_KEYS,
  CHINESE_ANIMAL_KEYS,
  PERSONAL_YEAR_KEYS,
} from "@/lib/content/loader";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const staticRoutes = ["", "/form", "/faq", "/privacy", "/terms"].map((path) => ({
    url: `${base}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.6,
  }));

  const programmatic = [
    ...LIFE_PATH_KEYS.map((n) => `/life-path/${n}`),
    ...SUN_SIGN_KEYS.map((s) => `/sun-sign/${s}`),
    ...CHINESE_ANIMAL_KEYS.map((a) => `/chinese-animal/${a}`),
    ...PERSONAL_YEAR_KEYS.map((n) => `/personal-year/${n}`),
  ].map((path) => ({
    url: `${base}${path}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...programmatic];
}
