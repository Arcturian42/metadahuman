"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sparkles, Mail, FileText, Clock, ArrowRight, CheckCircle2, Star, Zap } from "lucide-react";

interface FormData {
  firstName: string;
  lastName: string;
  birthDate: string;
  birthTime?: string;
  birthLocation?: string;
  email: string;
  marketingConsent?: boolean;
}

export default function SummaryPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem('pm_form_data');
    if (!stored) {
      router.push('/form');
      return;
    }
    setFormData(JSON.parse(stored));
  }, [router]);

  if (!formData) return null;

  const birthDate = new Date(formData.birthDate);
  const year = birthDate.getFullYear();
  const day = birthDate.getDate();
  const month = birthDate.getMonth() + 1;

  // Quick calc for Life Path (simplified for display)
  const lifePath = ((day + month + year).toString().split('').reduce((a, b) => a + parseInt(b), 0));
  const lifePathReduced = lifePath > 9 && lifePath !== 11 && lifePath !== 22 && lifePath !== 33
    ? lifePath.toString().split('').reduce((a, b) => a + parseInt(b), 0)
    : lifePath;

  const handleGenerate = async () => {
    setError(null);
    setIsGenerating(true);

    // Simulate progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + Math.random() * 15;
      });
    }, 400);

    try {
      const response = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      clearInterval(interval);
      setProgress(100);

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(
          body?.error || "We couldn't generate your report right now. Please try again."
        );
      }

      const data = await response.json();

      // Small delay for UX
      setTimeout(() => {
        router.push(`/report/${data.id}`);
      }, 800);
    } catch (err) {
      console.error(err);
      clearInterval(interval);
      setIsGenerating(false);
      setProgress(0);
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  };

  const reportFeatures = [
    { icon: Star, label: "Pythagorean Numerology Profile", desc: "Life Path, Expression, Soul Urge, Personality, Birthday, Maturity, Attitude numbers" },
    { icon: Zap, label: "Western Astrology", desc: "Sun sign, elemental analysis, and symbolic traits" },
    { icon: Sparkles, label: "Chinese Astrology", desc: "Animal sign, element, and Yin/Yang energy" },
    { icon: FileText, label: "Symbolic Synthesis", desc: "Personalized strengths, growth areas, and practical reflection prompts" },
    { icon: Clock, label: "Current Cycles", desc: "Personal Year energy and life cycle insights" },
  ];

  return (
    <main className="min-h-screen bg-midnight flex flex-col">
      <div className="max-w-lg mx-auto w-full px-5 pt-12 pb-8 flex-1 flex flex-col">

        {!isGenerating ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Personalized greeting */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-mystic-blue rounded-full text-sm text-aurora-violet mb-6">
                <Sparkles className="w-4 h-4" />
                Your symbolic profile is ready to be generated
              </div>

              <h1 className="font-serif text-3xl md:text-4xl text-soft-white mb-3">
                Hi, {formData.firstName}
              </h1>
              <p className="text-mist-gray text-lg">
                Your Personal Metadata report is being prepared
              </p>
            </div>

            {/* What they'll receive */}
            <div className="mb-8">
              <h2 className="text-sm font-semibold text-lunar-gray uppercase tracking-wider mb-4">
                Your free report includes
              </h2>
              <div className="space-y-3">
                {reportFeatures.map((feature, i) => (
                  <motion.div
                    key={feature.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-4 p-4 bg-cosmic-slate rounded-card border border-white/5"
                  >
                    <div className="w-10 h-10 rounded-full bg-mystic-blue flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-5 h-5 text-celestial-gold" />
                    </div>
                    <div>
                      <h3 className="text-soft-white font-semibold text-sm">{feature.label}</h3>
                      <p className="text-lunar-gray text-xs mt-1">{feature.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Report stats */}
            <div className="mb-8 p-6 bg-gradient-to-br from-cosmic-slate to-mystic-blue rounded-card border border-white/5">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-mist-gray">Report length</span>
                <span className="text-celestial-gold font-bold">20-40 pages</span>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-mist-gray">Delivery method</span>
                <span className="text-soft-white font-semibold flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  Email + Web
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-mist-gray">Generation time</span>
                <span className="text-soft-white font-semibold flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  ~10 seconds
                </span>
              </div>
            </div>

            {/* Email confirmation */}
            <div className="mb-8 p-4 bg-mystic-blue/30 rounded-card border border-aurora-violet/20">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-soft-emerald flex-shrink-0" />
                <div>
                  <p className="text-soft-white text-sm font-semibold">
                    Report will be sent to:
                  </p>
                  <p className="text-celestial-gold text-sm">{formData.email}</p>
                </div>
              </div>
            </div>

            {/* Disclaimer reminder */}
            <p className="text-xs text-lunar-gray text-center mb-8 leading-relaxed">
              This is a symbolic reflection and entertainment tool. 
              Not scientific, medical, or professional advice.
            </p>

            {/* Error message */}
            {error && (
              <div className="mb-4 p-4 bg-soft-red/10 border border-soft-red/30 rounded-card">
                <p className="text-soft-red text-sm text-center">{error}</p>
              </div>
            )}

            {/* CTA */}
            <button
              onClick={handleGenerate}
              className="w-full flex items-center justify-center px-6 py-4 bg-gradient-to-r from-celestial-gold to-warm-amber text-midnight font-bold rounded-btn text-lg hover:scale-[1.02] transition-transform shadow-glow"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              {error ? "Try again" : "Generate my 20-40 page report"}
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>

            <p className="text-xs text-lunar-gray text-center mt-4">
              Free · No payment required · Your data stays private
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 flex flex-col items-center justify-center"
          >
            <div className="relative w-32 h-32 mb-8">
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-celestial-gold/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-2 rounded-full border-2 border-aurora-violet/30"
                animate={{ rotate: -360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-celestial-gold" />
              </div>
            </div>

            <h2 className="font-serif text-2xl text-soft-white mb-2">
              Creating your symbolic profile...
            </h2>
            <p className="text-mist-gray text-sm mb-8">
              {formData.firstName}, this usually takes about 10 seconds
            </p>

            <div className="w-full max-w-xs">
              <div className="h-2 bg-cosmic-slate rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-celestial-gold to-aurora-violet"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <p className="text-center text-lunar-gray text-xs mt-2">
                {progress < 30 && "Calculating your Pythagorean numbers..."}
                {progress >= 30 && progress < 60 && "Mapping your astrological patterns..."}
                {progress >= 60 && progress < 90 && "Writing your personalized insights..."}
                {progress >= 90 && "Finalizing your report..."}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
}
