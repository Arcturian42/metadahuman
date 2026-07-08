import { Metadata } from "next";
import Link from "next/link";
import {
  Sparkles,
  Shield,
  Clock,
  ArrowRight,
  Hash,
  Orbit,
  Gem,
  PenLine,
  Check,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Personal Metadata — Free Symbolic Self-Reflection Report",
  description:
    "Discover your personal metadata. A free symbolic report combining numerology, astrology, and Chinese zodiac insights.",
};

const curiosityCards = [
  {
    icon: Hash,
    title: "Your Core Number",
    desc: "The symbolic number woven into your birth date — and what it suggests about how you move through life.",
  },
  {
    icon: Orbit,
    title: "Your Inner Patterns",
    desc: "Recurring themes drawn from your name and date of birth, across numerology and astrology.",
  },
  {
    icon: Gem,
    title: "Strengths & Growth",
    desc: "A balanced, grounded reflection on your natural tendencies — the gifts and the growth edges.",
  },
  {
    icon: PenLine,
    title: "Reflection Prompts",
    desc: "Turn your report into practical journaling and self-awareness exercises you can actually use.",
  },
];

/** Golden-ratio spiral, precomputed (r = a·e^(bθ), b = ln(φ)/(π/2)). Purely decorative. */
const GOLDEN_SPIRAL_PATH =
  "M118.69,182.32 L118.90,183.26 L118.97,184.27 L118.89,185.32 L118.64,186.40 L118.21,187.47 L117.60,188.52 L116.80,189.51 L115.82,190.40 L114.66,191.18 L113.35,191.80 L111.89,192.24 L110.31,192.47 L108.63,192.45 L106.91,192.17 L105.16,191.62 L103.44,190.77 L101.79,189.62 L100.26,188.17 L98.91,186.43 L97.78,184.42 L96.93,182.16 L96.40,179.68 L96.24,177.04 L96.48,174.28 L97.17,171.46 L98.32,168.65 L99.96,165.91 L102.08,163.34 L104.68,161.01 L107.73,159.01 L111.20,157.41 L115.05,156.30 L119.21,155.75 L123.60,155.83 L128.14,156.61 L132.71,158.12 L137.20,160.40 L141.50,163.47 L145.47,167.31 L148.98,171.92 L151.89,177.23 L154.07,183.19 L155.39,189.70 L155.74,196.65 L155.02,203.89 L153.13,211.28 L150.03,218.64 L145.66,225.76 L140.02,232.46 L133.14,238.51 L125.06,243.69 L115.89,247.80 L105.75,250.61 L94.81,251.93 L83.28,251.59 L71.40,249.43 L59.44,245.33 L47.69,239.22 L36.49,231.05 L26.17,220.84 L17.09,208.65 L9.59,194.62 L4.03,178.91 L0.73,161.78 L0.00,143.52 L2.10,124.51 L7.25,105.15 L15.61,85.92 L27.28,67.32 L42.27,49.89 L60.52,34.20 L81.87,20.80 L106.08,10.28 L132.78,3.17 L161.54,0.00 L191.81,1.22 L222.96,7.21 L254.26,18.30 L284.94,34.68 L314.13,56.44 L340.95,83.54 L364.47,115.80 L383.77,152.87 L397.95,194.28 L406.14,239.36 L407.56,287.32 L401.53,337.20 L387.47,387.89 L364.98,438.16 L333.82,486.69";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-ivory text-ink">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-ink/10 bg-ivory/85 backdrop-blur-md">
        <div className="max-w-container mx-auto flex items-center justify-between px-5 md:px-8 py-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-full border border-antique-gold/50 text-antique-gold">
              <Sparkles className="h-4 w-4" />
            </span>
            <span className="font-serif text-lg tracking-wide text-ink">Personal Metadata</span>
          </Link>
          <Link
            href="/form"
            className="hidden sm:inline-flex items-center rounded-btn border border-ink/15 bg-white px-4 py-2 text-sm text-ink transition-colors hover:border-antique-gold/50 hover:text-antique-gold"
          >
            Get my report
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-codex-gradient" />
        <svg
          className="pointer-events-none absolute -left-24 top-0 h-[540px] w-[540px] text-antique-gold opacity-[0.08]"
          viewBox="0 0 407.56 486.69"
          fill="none"
          aria-hidden="true"
        >
          <path d={GOLDEN_SPIRAL_PATH} stroke="currentColor" strokeWidth="1.4" />
        </svg>
        <div className="relative max-w-container mx-auto grid items-center gap-12 px-5 md:px-8 pt-16 pb-20 md:pt-24 md:pb-28 lg:grid-cols-2">
          {/* Copy */}
          <div className="animate-fade-in">
            <span className="inline-flex items-center gap-2 rounded-btn border border-ink/10 bg-white px-3 py-1.5 text-xs uppercase tracking-[0.18em] text-ink-soft">
              <span className="h-1.5 w-1.5 rounded-full bg-sage" />
              Free symbolic self-reflection report
            </span>
            <h1 className="mt-6 font-serif text-4xl md:text-6xl font-semibold leading-[1.05] text-ink">
              Discover your{" "}
              <span className="bg-gradient-to-r from-antique-gold to-sanguine bg-clip-text text-transparent">
                Personal Metadata
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-ink-soft leading-relaxed">
              Your name and birth date already hold patterns. We turn them into a
              beautifully written reflection — numerology, Western astrology, and
              Chinese astrology, woven into one.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="/form"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-btn bg-gold-cta-gradient px-8 py-4 text-lg font-bold text-ink shadow-gold-glow transition-transform hover:scale-[1.02]"
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Generate my free report
              </Link>
              <Link
                href="#how-it-works"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-btn border border-ink/15 bg-white px-8 py-4 text-lg text-ink transition-colors hover:border-antique-gold/50"
              >
                See how it works
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-muted">
              <span className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-sage" /> Free, no account
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" /> Takes 2 minutes
              </span>
              <span className="flex items-center gap-1.5">
                <Shield className="h-4 w-4" /> Private by default
              </span>
            </div>
          </div>

          {/* Vitruvian-inspired geometric visual */}
          <div className="relative mx-auto hidden aspect-square w-full max-w-[440px] animate-slide-up sm:block">
            {/* rotated square — Vitruvian circle-and-square reference */}
            <div className="absolute inset-[13%] rotate-45 rounded-[10%] border border-ink/10" />
            <div className="absolute inset-0 animate-orbit-slow rounded-full border border-ink/10">
              <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sanguine shadow-[0_0_10px_2px_rgba(168,85,46,0.35)]" />
            </div>
            <div
              className="absolute inset-[15%] animate-orbit-slow rounded-full border border-antique-gold/25"
              style={{ animationDuration: "90s", animationDirection: "reverse" }}
            >
              <span className="absolute right-0 top-1/2 h-2 w-2 -translate-y-1/2 translate-x-1/2 rounded-full bg-antique-gold shadow-[0_0_10px_2px_rgba(169,125,51,0.4)]" />
            </div>
            <div className="absolute inset-[30%] rounded-full border border-ink/10" />
            {/* Center result card */}
            <div className="absolute left-1/2 top-1/2 w-[64%] -translate-x-1/2 -translate-y-1/2 rounded-report-card border border-ink/10 bg-white/95 p-6 text-center shadow-parchment backdrop-blur-md">
              <p className="mb-1 text-[11px] uppercase tracking-[0.2em] text-ink-muted">
                Life Path
              </p>
              <p className="font-serif text-7xl font-bold leading-none text-antique-gold">
                7
              </p>
              <p className="mt-2 font-serif text-lg text-ink">The Seeker</p>
              <p className="mt-1 text-xs text-ink-soft">Depth · Intuition · Meaning</p>
            </div>
          </div>
        </div>
      </section>

      {/* Curiosity Cards */}
      <section className="border-t border-ink/10 bg-parchment py-20 md:py-28">
        <div className="max-w-container mx-auto px-5 md:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-ink">
              What your free report explores
            </h2>
            <p className="mt-3 text-ink-soft">
              Four systems, one coherent reflection — not four scattered horoscopes.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {curiosityCards.map((card) => (
              <div
                key={card.title}
                className="group rounded-card border border-ink/10 bg-white p-6 transition-all hover:-translate-y-1 hover:border-antique-gold/40 hover:shadow-parchment"
              >
                <span className="mb-5 inline-grid h-11 w-11 place-items-center rounded-2xl border border-antique-gold/30 text-antique-gold transition-colors group-hover:bg-antique-gold group-hover:text-white">
                  <card.icon className="h-5 w-5" />
                </span>
                <h3 className="font-serif text-xl text-ink">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 md:py-28">
        <div className="max-w-container mx-auto px-5 md:px-8">
          <h2 className="text-center font-serif text-3xl md:text-4xl text-ink">
            How it works
          </h2>
          <div className="relative mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-10 md:grid-cols-3">
            {/* connecting line */}
            <div className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-ink/15 to-transparent md:block" />
            {[
              { step: "1", title: "Enter your birth details", text: "First name, birth date, and your email — that's it." },
              { step: "2", title: "We calculate your metadata", text: "Numerology, Sun sign, and Chinese astrology, computed instantly." },
              { step: "3", title: "Receive your free report", text: "A written, personalized reflection — on the web and in your inbox." },
            ].map((item) => (
              <div key={item.step} className="relative text-center">
                <div className="relative z-10 mx-auto mb-5 grid h-14 w-14 place-items-center rounded-full border border-antique-gold/40 bg-white font-serif text-2xl font-bold text-antique-gold">
                  {item.step}
                </div>
                <h3 className="font-serif text-lg text-ink">{item.title}</h3>
                <p className="mx-auto mt-2 max-w-xs text-sm text-ink-soft">{item.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-14 text-center">
            <Link
              href="/form"
              className="inline-flex items-center justify-center rounded-btn bg-gold-cta-gradient px-8 py-4 text-lg font-bold text-ink shadow-gold-glow transition-transform hover:scale-[1.02]"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Generate my free report
            </Link>
          </div>
        </div>
      </section>

      {/* Sample report — conversion lever (DESIGN_SYSTEM §10.4) */}
      <section className="border-y border-ink/10 bg-parchment py-20 md:py-28">
        <div className="max-w-container mx-auto px-5 md:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-ink">
              A glimpse of what you&#39;ll read
            </h2>
            <p className="mt-3 text-ink-soft">
              Every report is written around your specific numbers and signs — here&#39;s the tone.
            </p>
          </div>
          <div className="mx-auto mt-12 max-w-2xl rounded-report-card border border-ink/10 bg-white p-8 shadow-parchment md:p-10">
            <div className="mb-6 flex items-center gap-4">
              <div className="grid h-16 w-16 place-items-center rounded-full border border-antique-gold/30 bg-ivory">
                <span className="font-serif text-3xl font-bold text-antique-gold">7</span>
              </div>
              <div>
                <p className="font-serif text-xl text-ink">Life Path 7</p>
                <p className="text-sm text-ink-muted">The Seeker</p>
              </div>
            </div>
            <p className="text-lg leading-relaxed text-ink-soft">
              &ldquo;Your profile suggests a strong tension between independence and emotional depth.
              This can show up as a desire to create your own path while still seeking meaningful
              connection — a pull toward meaning that surface-level answers can&#39;t satisfy.&rdquo;
            </p>
            <div className="mt-6 rounded-card border border-sanguine/25 bg-ivory p-4">
              <p className="mb-1 text-sm font-semibold text-sanguine">Reflection prompt</p>
              <p className="text-sm italic text-ink-soft">
                Where in your life are you seeking a deeper answer instead of settling for the
                surface one?
              </p>
            </div>
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/form"
              className="inline-flex items-center justify-center rounded-btn bg-gold-cta-gradient px-8 py-4 text-lg font-bold text-ink shadow-gold-glow transition-transform hover:scale-[1.02]"
            >
              Create my own report
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Ethics / Trust */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-2xl px-5 md:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-ink">
            A symbolic mirror, not a prediction
          </h2>
          <p className="mt-6 leading-relaxed text-ink-soft">
            Personal Metadata is designed for reflection, self-awareness, and entertainment. It does
            not provide scientific, medical, psychological, legal, financial, or professional advice.
            Your data stays private and is never sold.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-ink-muted">
            <span className="flex items-center gap-1.5">
              <Shield className="h-4 w-4" /> Private by default
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="h-4 w-4 text-sage" /> No payment required
            </span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="h-4 w-4" /> Reflection tool
            </span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-ink/10 bg-parchment py-12">
        <div className="max-w-container mx-auto px-5 md:px-8 text-center text-sm text-ink-muted">
          <p>© {new Date().getFullYear()} Personal Metadata. All rights reserved.</p>
          <div className="mt-4 flex flex-wrap justify-center gap-6">
            <Link href="/privacy" className="transition-colors hover:text-ink">
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-ink">
              Terms
            </Link>
            <Link href="/disclaimer" className="transition-colors hover:text-ink">
              Disclaimer
            </Link>
            <Link href="/faq" className="transition-colors hover:text-ink">
              FAQ
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
