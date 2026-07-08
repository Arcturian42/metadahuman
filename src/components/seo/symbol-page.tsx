import Link from "next/link";
import { Sparkles } from "lucide-react";

export interface SymbolPageProps {
  kicker: string; // e.g. "Numerology · Life Path"
  headline: string; // e.g. "Life Path 7 — The Seeker"
  lead: string; // one-sentence summary
  body: string; // generic second-person interpretation
  reflectionPrompt?: string;
  practicalTip?: string;
  keyTraits?: string[];
}

/**
 * Shared premium layout for every programmatic SEO page (PRD §22). Consistent
 * structure keeps 45 pages feeling like one product, with a single gold CTA
 * (design system "gold = CTA/results only" rule) and the disclaimer footer.
 */
export function SymbolPage({
  kicker,
  headline,
  lead,
  body,
  reflectionPrompt,
  practicalTip,
  keyTraits,
}: SymbolPageProps) {
  return (
    <main className="min-h-screen bg-ivory">
      <section className="relative overflow-hidden border-b border-ink/10">
        <div className="absolute inset-0 bg-codex-gradient" />
        <div className="relative max-w-container mx-auto px-5 md:px-8 pt-16 pb-14 md:pt-24 md:pb-20">
          <Link href="/" className="text-sm text-ink-muted hover:text-ink transition-colors">
            ← Personal Metadata
          </Link>
          <p className="mt-8 text-sm uppercase tracking-widest text-sanguine">{kicker}</p>
          <h1 className="mt-3 font-serif text-4xl md:text-6xl text-ink leading-tight">
            {headline}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-ink-soft leading-relaxed">{lead}</p>
        </div>
      </section>

      <div className="max-w-container mx-auto px-5 md:px-8 py-14 md:py-20">
        <div className="max-w-2xl">
          {keyTraits && keyTraits.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {keyTraits.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-btn bg-white border border-ink/10 text-sm text-ink-soft capitalize"
                >
                  {t}
                </span>
              ))}
            </div>
          )}

          <p className="text-ink-soft leading-relaxed text-lg whitespace-pre-line">{body}</p>

          {reflectionPrompt && (
            <div className="mt-8 p-5 bg-parchment rounded-card border border-sanguine/25">
              <p className="text-sm text-sanguine font-semibold mb-1">Reflection prompt</p>
              <p className="text-ink-soft italic">{reflectionPrompt}</p>
            </div>
          )}

          {practicalTip && (
            <div className="mt-4 p-5 bg-white rounded-card border border-ink/10">
              <p className="text-sm text-ink font-semibold mb-1">A small practice</p>
              <p className="text-ink-soft">{practicalTip}</p>
            </div>
          )}

          <div className="mt-12 p-8 bg-parchment rounded-card border border-ink/10 text-center">
            <h2 className="font-serif text-2xl text-ink mb-3">
              See how this fits your full profile
            </h2>
            <p className="text-ink-soft mb-6">
              Your free report combines numerology, Western astrology, and Chinese astrology into one
              personalized reflection.
            </p>
            <Link
              href="/form"
              className="inline-flex items-center justify-center px-8 py-4 bg-gold-cta-gradient text-ink font-bold rounded-btn text-lg hover:scale-[1.02] transition-transform shadow-gold-glow"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Generate my free report
            </Link>
          </div>

          <p className="mt-10 text-xs text-ink-muted leading-relaxed">
            This page is a symbolic reflection and entertainment resource. It is not scientific,
            medical, psychological, legal, or financial advice.
          </p>
        </div>
      </div>
    </main>
  );
}

/** Minimal JSON-LD Article block for a symbol page. */
export function ArticleJsonLd({
  headline,
  description,
  url,
}: {
  headline: string;
  description: string;
  url: string;
}) {
  const json = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    url,
    isAccessibleForFree: true,
    publisher: { "@type": "Organization", name: "Personal Metadata" },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
