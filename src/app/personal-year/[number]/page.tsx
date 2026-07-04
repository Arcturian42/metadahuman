import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCoreNumberMeaning, PERSONAL_YEAR_KEYS } from "@/lib/content/loader";
import { SymbolPage, ArticleJsonLd } from "@/components/seo/symbol-page";

export const dynamicParams = false;

export function generateStaticParams() {
  return PERSONAL_YEAR_KEYS.map((number) => ({ number }));
}

function load(number: string) {
  if (!PERSONAL_YEAR_KEYS.includes(number)) return undefined;
  return getCoreNumberMeaning(Number(number));
}

export function generateMetadata({ params }: { params: { number: string } }): Metadata {
  const m = load(params.number);
  if (!m) return { title: "Personal Year — Personal Metadata" };
  const title = `Personal Year ${params.number}: Meaning & Theme`;
  const description = m.coreMeaning;
  const url = `${process.env.NEXT_PUBLIC_APP_URL || ""}/personal-year/${params.number}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "article" },
  };
}

export default function PersonalYearPage({ params }: { params: { number: string } }) {
  const m = load(params.number);
  if (!m) notFound();
  const url = `${process.env.NEXT_PUBLIC_APP_URL || ""}/personal-year/${params.number}`;
  const body = `A Personal Year ${params.number} tends to carry a recurring theme: ${m.coreMeaning} It's an invitation to explore that energy through the year — a lens for reflection, not a fixed forecast. Your Personal Year shifts each January, so the same number returns in a natural nine-year rhythm.`;
  return (
    <>
      <ArticleJsonLd
        headline={`Personal Year ${params.number}`}
        description={m.coreMeaning}
        url={url}
      />
      <SymbolPage
        kicker="Numerology · Personal Year"
        headline={`Personal Year ${params.number}`}
        lead={m.coreMeaning}
        body={body}
        keyTraits={m.keywords}
      />
    </>
  );
}
