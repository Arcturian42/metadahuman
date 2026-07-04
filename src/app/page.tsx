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

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-midnight">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-midnight/70 backdrop-blur-md">
        <div className="max-w-container mx-auto flex items-center justify-between px-5 md:px-8 py-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-full border border-celestial-gold/40 text-celestial-gold">
              <Sparkles className="h-4 w-4" />
            </span>
            <span className="font-serif text-lg text-soft-white">Personal Metadata</span>
          </Link>
          <Link
            href="/form"
            className="hidden sm:inline-flex items-center rounded-btn bg-white/5 border border-white/10 px-4 py-2 text-sm text-soft-white transition-colors hover:bg-white/10"
          >
            Get my report
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient opacity-50" />
        <div className="absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-aurora-violet/10 blur-[120px]" />
        <div className="relative max-w-container mx-auto grid items-center gap-12 px-5 md:px-8 pt-16 pb-20 md:pt-24 md:pb-28 lg:grid-cols-2">
          {/* Copy */}
          <div className="animate-fade-in">
            <span className="inline-flex items-center gap-2 rounded-btn border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-mist-gray">
              <span className="h-1.5 w-1.5 rounded-full bg-soft-emerald" />
              Free symbolic self-reflection report
            </span>
            <h1 className="mt-6 font-serif text-4xl md:text-6xl font-semibold leading-[1.05] text-soft-white">
              Discover your{" "}
              <span className="bg-gradient-to-r from-celestial-gold to-warm-amber bg-clip-text text-transparent">
                Personal Metadata
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-mist-gray leading-relaxed">
              Your name and birth date already hold patterns. We turn them into a
              beautifully written reflection — numerology, Western astrology, and
              Chinese astrology, woven into one.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="/form"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-btn bg-gradient-to-r from-celestial-gold to-warm-amber px-8 py-4 text-lg font-bold text-midnight shadow-glow transition-transform hover:scale-[1.02]"
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Generate my free report
              </Link>
              <Link
                href="#how-it-works"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-btn border border-white/10 bg-white/5 px-8 py-4 text-lg text-soft-white transition-colors hover:bg-white/10"
              >
                See how it works
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-lunar-gray">
              <span className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-soft-emerald" /> Free, no account
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" /> Takes 2 minutes
              </span>
              <span className="flex items-center gap-1.5">
                <Shield className="h-4 w-4" /> Private by default
              </span>
            </div>
          </div>

          {/* Orbital visual */}
          <div className="relative mx-auto hidden aspect-square w-full max-w-[440px] animate-slide-up sm:block">
            <div className="absolute inset-[12%] rounded-full bg-aurora-violet/20 blur-3xl" />
            <div className="absolute inset-0 animate-orbit-slow rounded-full border border-white/[0.07]">
              <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-aurora-violet shadow-[0_0_12px_2px_rgba(155,124,255,0.6)]" />
            </div>
            <div
              className="absolute inset-[15%] animate-orbit-slow rounded-full border border-celestial-gold/15"
              style={{ animationDuration: "90s", animationDirection: "reverse" }}
            >
              <span className="absolute right-0 top-1/2 h-2 w-2 -translate-y-1/2 translate-x-1/2 rounded-full bg-celestial-gold shadow-[0_0_12px_2px_rgba(216,183,106,0.6)]" />
            </div>
            <div className="absolute inset-[30%] rounded-full border border-white/5" />
            {/* Center result card */}
            <div className="absolute left-1/2 top-1/2 w-[64%] -translate-x-1/2 -translate-y-1/2 rounded-report-card border border-white/15 bg-cosmic-slate/95 p-6 text-center shadow-glow backdrop-blur-md">
              <p className="mb-1 text-[11px] uppercase tracking-[0.2em] text-lunar-gray">
                Life Path
              </p>
              <p className="font-serif text-7xl font-bold leading-none text-celestial-gold drop-shadow-[0_0_20px_rgba(216,183,106,0.35)]">
                7
              </p>
              <p className="mt-2 font-serif text-lg text-soft-white">The Seeker</p>
              <p className="mt-1 text-xs text-mist-gray">Depth · Intuition · Meaning</p>
            </div>
          </div>
        </div>
      </section>

      {/* Curiosity Cards */}
      <section className="border-t border-white/5 bg-deep-indigo py-20 md:py-28">
        <div className="max-w-container mx-auto px-5 md:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-soft-white">
              What your free report explores
            </h2>
            <p className="mt-3 text-mist-gray">
              Four systems, one coherent reflection — not four scattered horoscopes.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {curiosityCards.map((card) => (
              <div
                key={card.title}
                className="group rounded-card border border-white/5 bg-cosmic-slate p-6 transition-all hover:-translate-y-1 hover:border-celestial-gold/30 hover:shadow-card"
              >
                <span className="mb-5 inline-grid h-11 w-11 place-items-center rounded-2xl bg-mystic-blue text-aurora-violet transition-colors group-hover:text-celestial-gold">
                  <card.icon className="h-5 w-5" />
                </span>
                <h3 className="font-serif text-xl text-soft-white">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mist-gray">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 md:py-28">
        <div className="max-w-container mx-auto px-5 md:px-8">
          <h2 className="text-center font-serif text-3xl md:text-4xl text-soft-white">
            How it works
          </h2>
          <div className="relative mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-10 md:grid-cols-3">
            {/* connecting line */}
            <div className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-white/10 to-transparent md:block" />
            {[
              { step: "1", title: "Enter your birth details", text: "First name, birth date, and your email — that's it." },
              { step: "2", title: "We calculate your metadata", text: "Numerology, Sun sign, and Chinese astrology, computed instantly." },
              { step: "3", title: "Receive your free report", text: "A written, personalized reflection — on the web and in your inbox." },
            ].map((item) => (
              <div key={item.step} className="relative text-center">
                <div className="relative z-10 mx-auto mb-5 grid h-14 w-14 place-items-center rounded-full border border-celestial-gold/30 bg-mystic-blue font-serif text-2xl font-bold text-celestial-gold">
                  {item.step}
                </div>
                <h3 className="font-serif text-lg text-soft-white">{item.title}</h3>
                <p className="mx-auto mt-2 max-w-xs text-sm text-mist-gray">{item.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-14 text-center">
            <Link
              href="/form"
              className="inline-flex items-center justify-center rounded-btn bg-gradient-to-r from-celestial-gold to-warm-amber px-8 py-4 text-lg font-bold text-midnight shadow-glow transition-transform hover:scale-[1.02]"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Generate my free report
            </Link>
          </div>
        </div>
      </section>

      {/* Sample report — conversion lever (DESIGN_SYSTEM §10.4) */}
      <section className="border-y border-white/5 bg-deep-indigo py-20 md:py-28">
        <div className="max-w-container mx-auto px-5 md:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-soft-white">
              A glimpse of what you&#39;ll read
            </h2>
            <p className="mt-3 text-mist-gray">
              Every report is written around your specific numbers and signs — here&#39;s the tone.
            </p>
          </div>
          <div className="mx-auto mt-12 max-w-2xl rounded-report-card border border-white/10 bg-cosmic-slate p-8 shadow-card md:p-10">
            <div className="mb-6 flex items-center gap-4">
              <div className="grid h-16 w-16 place-items-center rounded-full border border-celestial-gold/20 bg-mystic-blue">
                <span className="font-serif text-3xl font-bold text-celestial-gold">7</span>
              </div>
              <div>
                <p className="font-serif text-xl text-soft-white">Life Path 7</p>
                <p className="text-sm text-lunar-gray">The Seeker</p>
              </div>
            </div>
            <p className="text-lg leading-relaxed text-mist-gray">
              &ldquo;Your profile suggests a strong tension between independence and emotional depth.
              This can show up as a desire to create your own path while still seeking meaningful
              connection — a pull toward meaning that surface-level answers can&#39;t satisfy.&rdquo;
            </p>
            <div className="mt-6 rounded-card border border-aurora-violet/20 bg-mystic-blue/40 p-4">
              <p className="mb-1 text-sm font-semibold text-aurora-violet">Reflection prompt</p>
              <p className="text-sm italic text-mist-gray">
                Where in your life are you seeking a deeper answer instead of settling for the
                surface one?
              </p>
            </div>
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/form"
              className="inline-flex items-center justify-center rounded-btn bg-gradient-to-r from-celestial-gold to-warm-amber px-8 py-4 text-lg font-bold text-midnight shadow-glow transition-transform hover:scale-[1.02]"
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
          <h2 className="font-serif text-3xl md:text-4xl text-soft-white">
            A symbolic mirror, not a prediction
          </h2>
          <p className="mt-6 leading-relaxed text-mist-gray">
            Personal Metadata is designed for reflection, self-awareness, and entertainment. It does
            not provide scientific, medical, psychological, legal, financial, or professional advice.
            Your data stays private and is never sold.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-lunar-gray">
            <span className="flex items-center gap-1.5">
              <Shield className="h-4 w-4" /> Private by default
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="h-4 w-4 text-soft-emerald" /> No payment required
            </span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="h-4 w-4" /> Reflection tool
            </span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12">
        <div className="max-w-container mx-auto px-5 md:px-8 text-center text-sm text-lunar-gray">
          <p>© {new Date().getFullYear()} Personal Metadata. All rights reserved.</p>
          <div className="mt-4 flex flex-wrap justify-center gap-6">
            <Link href="/privacy" className="transition-colors hover:text-soft-white">
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-soft-white">
              Terms
            </Link>
            <Link href="/disclaimer" className="transition-colors hover:text-soft-white">
              Disclaimer
            </Link>
            <Link href="/faq" className="transition-colors hover:text-soft-white">
              FAQ
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
