import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSunSignTemplate, depersonalize, SUN_SIGN_KEYS } from "@/lib/content/loader";
import { SymbolPage, ArticleJsonLd } from "@/components/seo/symbol-page";

export const dynamicParams = false;

export function generateStaticParams() {
  return SUN_SIGN_KEYS.map((sign) => ({ sign }));
}

export async function generateMetadata({ params }: { params: Promise<{ sign: string }> }): Promise<Metadata> {
  const { sign } = await params;
  const t = getSunSignTemplate(sign);
  if (!t) return { title: "Sun Sign — Personal Metadata" };
  const title = `${t.sign} Sun Sign: ${t.theme} — Traits & Element`;
  const description = `${t.sign} (${t.element}): ${t.keyTraits.join(", ")}.`;
  const url = `${process.env.NEXT_PUBLIC_APP_URL || ""}/sun-sign/${sign}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "article" },
  };
}

export default async function SunSignPage({ params }: { params: Promise<{ sign: string }> }) {
  const { sign } = await params;
  const t = getSunSignTemplate(sign);
  if (!t) notFound();
  const url = `${process.env.NEXT_PUBLIC_APP_URL || ""}/sun-sign/${sign}`;
  return (
    <>
      <ArticleJsonLd
        headline={`${t.sign} Sun Sign: ${t.theme}`}
        description={`${t.sign} (${t.element}): ${t.keyTraits.join(", ")}.`}
        url={url}
      />
      <SymbolPage
        kicker={`Western Astrology · ${t.element}`}
        headline={`${t.sign} — ${t.theme}`}
        lead={`Your Sun in ${t.sign} carries ${t.element} energy: ${t.keyTraits.join(", ")}.`}
        body={depersonalize(t.body)}
        keyTraits={t.keyTraits}
      />
    </>
  );
}
