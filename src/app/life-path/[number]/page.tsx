import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLifePathTemplate, depersonalize, LIFE_PATH_KEYS } from "@/lib/content/loader";
import { SymbolPage, ArticleJsonLd } from "@/components/seo/symbol-page";

export const dynamicParams = false;

export function generateStaticParams() {
  return LIFE_PATH_KEYS.map((number) => ({ number }));
}

function load(number: string) {
  const n = Number(number);
  if (!Number.isInteger(n)) return undefined;
  return getLifePathTemplate(n);
}

export function generateMetadata({ params }: { params: { number: string } }): Metadata {
  const t = load(params.number);
  if (!t) return { title: "Life Path — Personal Metadata" };
  const title = `Life Path ${t.number}: ${t.theme} — Meaning & Traits`;
  const description = t.summary;
  const url = `${process.env.NEXT_PUBLIC_APP_URL || ""}/life-path/${t.number}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "article" },
  };
}

export default function LifePathPage({ params }: { params: { number: string } }) {
  const t = load(params.number);
  if (!t) notFound();
  const url = `${process.env.NEXT_PUBLIC_APP_URL || ""}/life-path/${t.number}`;
  return (
    <>
      <ArticleJsonLd
        headline={`Life Path ${t.number}: ${t.theme}`}
        description={t.summary}
        url={url}
      />
      <SymbolPage
        kicker="Numerology · Life Path"
        headline={`Life Path ${t.number} — ${t.theme}`}
        lead={t.summary}
        body={depersonalize(t.body)}
        reflectionPrompt={t.reflectionPrompt}
        practicalTip={t.practicalTip}
      />
    </>
  );
}
