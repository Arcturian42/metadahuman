import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getChineseAnimalTemplate, depersonalize, CHINESE_ANIMAL_KEYS } from "@/lib/content/loader";
import { SymbolPage, ArticleJsonLd } from "@/components/seo/symbol-page";

export const dynamicParams = false;

export function generateStaticParams() {
  return CHINESE_ANIMAL_KEYS.map((animal) => ({ animal }));
}

export function generateMetadata({ params }: { params: { animal: string } }): Metadata {
  const t = getChineseAnimalTemplate(params.animal);
  if (!t) return { title: "Chinese Zodiac — Personal Metadata" };
  const title = `${t.animal} — Chinese Zodiac Sign: ${t.theme} & Traits`;
  const description = `The ${t.animal}: ${t.keyTraits.join(", ")}.`;
  const url = `${process.env.NEXT_PUBLIC_APP_URL || ""}/chinese-animal/${params.animal}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "article" },
  };
}

export default function ChineseAnimalPage({ params }: { params: { animal: string } }) {
  const t = getChineseAnimalTemplate(params.animal);
  if (!t) notFound();
  const url = `${process.env.NEXT_PUBLIC_APP_URL || ""}/chinese-animal/${params.animal}`;
  return (
    <>
      <ArticleJsonLd
        headline={`${t.animal} — Chinese Zodiac: ${t.theme}`}
        description={`The ${t.animal}: ${t.keyTraits.join(", ")}.`}
        url={url}
      />
      <SymbolPage
        kicker="Chinese Astrology · Animal Sign"
        headline={`The ${t.animal} — ${t.theme}`}
        lead={`In Chinese astrology, the ${t.animal} is associated with: ${t.keyTraits.join(", ")}.`}
        body={depersonalize(t.body)}
        keyTraits={t.keyTraits}
      />
    </>
  );
}
