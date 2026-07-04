import { Metadata } from "next";
import Link from "next/link";
import { Sparkles, Shield, FileText, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Personal Metadata — Free Symbolic Self-Reflection Report",
  description:
    "Discover your personal metadata. A free symbolic report combining numerology, astrology, and Chinese zodiac insights.",
};

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-midnight">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient opacity-40" />
        <div className="relative max-w-container mx-auto px-5 md:px-8 pt-20 pb-24 md:pt-32 md:pb-40">
          <div className="max-w-2xl">
            <h1 className="font-serif text-4xl md:text-6xl font-semibold text-soft-white leading-tight mb-6">
              Discover your{" "}
              <span className="text-celestial-gold">Personal Metadata</span>
            </h1>
            <p className="text-lg md:text-xl text-mist-gray mb-8 leading-relaxed">
              A free symbolic self-reflection report based on your name and birth
              data. Explore your core number, personal patterns, symbolic
              strengths, and current life cycle — through a modern, reflective
              lens.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link
                href="/form"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-celestial-gold to-warm-amber text-midnight font-bold rounded-btn text-lg hover:scale-[1.02] transition-transform shadow-glow"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Generate my free report
              </Link>
              <Link
                href="#how-it-works"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/5 border border-white/10 text-soft-white rounded-btn text-lg hover:bg-white/10 transition-colors"
              >
                See how it works
              </Link>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-lunar-gray">
              <span className="flex items-center gap-1.5">
                <FileText className="w-4 h-4" /> Free
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" /> Takes 2 minutes
              </span>
              <span className="flex items-center gap-1.5">
                <Shield className="w-4 h-4" /> No payment required
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Curiosity Cards */}
      <section className="py-20 md:py-28 bg-deep-indigo">
        <div className="max-w-container mx-auto px-5 md:px-8">
          <h2 className="font-serif text-3xl md:text-4xl text-center mb-12">
            What your free report explores
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Core Number",
                desc: "Discover the symbolic number associated with your birth date.",
              },
              {
                title: "Personal Patterns",
                desc: "Explore recurring themes connected to your name and date of birth.",
              },
              {
                title: "Strengths & Growth",
                desc: "Receive a balanced reflection on your natural tendencies.",
              },
              {
                title: "Reflection Prompts",
                desc: "Turn your report into practical journaling and self-awareness exercises.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="p-6 rounded-card bg-cosmic-slate border border-white/5 hover:border-celestial-gold/30 transition-colors"
              >
                <h3 className="font-serif text-xl text-soft-white mb-3">
                  {card.title}
                </h3>
                <p className="text-mist-gray text-sm leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 md:py-28">
        <div className="max-w-container mx-auto px-5 md:px-8">
          <h2 className="font-serif text-3xl md:text-4xl text-center mb-12">
            How it works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {[
              { step: "1", text: "Enter your birth details" },
              { step: "2", text: "We calculate your symbolic metadata" },
              { step: "3", text: "You receive your free personalized report" },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-mystic-blue text-celestial-gold font-bold text-xl flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <p className="text-mist-gray">{item.text}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/form"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-celestial-gold to-warm-amber text-midnight font-bold rounded-btn text-lg hover:scale-[1.02] transition-transform shadow-glow"
            >
              Generate my free report
            </Link>
          </div>
        </div>
      </section>

      {/* Sample report — conversion lever (DESIGN_SYSTEM §10.4) */}
      <section className="py-20 md:py-28 bg-deep-indigo">
        <div className="max-w-container mx-auto px-5 md:px-8">
          <h2 className="font-serif text-3xl md:text-4xl text-center mb-4">
            A glimpse of what you&#39;ll read
          </h2>
          <p className="text-mist-gray text-center max-w-xl mx-auto mb-12">
            Every report is written around your specific numbers and signs — here&#39;s the tone.
          </p>
          <div className="max-w-2xl mx-auto p-8 md:p-10 rounded-card bg-cosmic-slate border border-white/5 shadow-card">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-full bg-mystic-blue flex items-center justify-center">
                <span className="text-2xl font-bold text-celestial-gold">7</span>
              </div>
              <div>
                <p className="text-soft-white font-serif text-xl">Life Path 7</p>
                <p className="text-lunar-gray text-sm">The Seeker</p>
              </div>
            </div>
            <p className="text-mist-gray leading-relaxed mb-6">
              &ldquo;Your profile suggests a strong tension between independence and emotional depth.
              This can show up as a desire to create your own path while still seeking meaningful
              connection — a pull toward meaning that surface-level answers can&#39;t satisfy.&rdquo;
            </p>
            <div className="p-4 bg-mystic-blue/40 rounded-card border border-aurora-violet/20">
              <p className="text-sm text-aurora-violet font-semibold mb-1">Reflection prompt</p>
              <p className="text-mist-gray text-sm italic">
                Where in your life are you seeking a deeper answer instead of settling for the
                surface one?
              </p>
            </div>
          </div>
          <div className="text-center mt-10">
            <Link
              href="/form"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-celestial-gold to-warm-amber text-midnight font-bold rounded-btn text-lg hover:scale-[1.02] transition-transform shadow-glow"
            >
              Create my own report
            </Link>
          </div>
        </div>
      </section>

      {/* Ethics / Trust */}
      <section className="py-20 md:py-28">
        <div className="max-w-container mx-auto px-5 md:px-8 max-w-2xl text-center">
          <h2 className="font-serif text-3xl md:text-4xl mb-6">
            A symbolic mirror, not a prediction
          </h2>
          <p className="text-mist-gray leading-relaxed mb-8">
            Personal Metadata is designed for reflection, self-awareness, and
            entertainment. It does not provide scientific, medical,
            psychological, legal, financial, or professional advice. Your data
            stays private and is never sold.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-lunar-gray">
            <span className="flex items-center gap-1.5">
              <Shield className="w-4 h-4" /> Private by default
            </span>
            <span className="flex items-center gap-1.5">
              <FileText className="w-4 h-4" /> No payment required
            </span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> Reflection tool
            </span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5">
        <div className="max-w-container mx-auto px-5 md:px-8 text-center text-lunar-gray text-sm">
          <p>© {new Date().getFullYear()} Personal Metadata. All rights reserved.</p>
          <div className="mt-4 flex justify-center gap-6">
            <Link href="/privacy" className="hover:text-soft-white transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-soft-white transition-colors">
              Terms
            </Link>
            <Link href="/disclaimer" className="hover:text-soft-white transition-colors">
              Disclaimer
            </Link>
            <Link href="/faq" className="hover:text-soft-white transition-colors">
              FAQ
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
