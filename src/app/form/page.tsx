"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Sparkles, Shield } from "lucide-react";
import { track } from "@/lib/analytics";

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(50),
  lastName: z.string().min(1, "Last name is required for Pythagorean numerology calculations").max(50),
  birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
  birthTime: z.string().regex(/^\d{2}:\d{2}$/).optional().or(z.literal("")),
  birthLocation: z.string().max(100).optional().or(z.literal("")),
  email: z.string().email("Valid email required"),
  consentReflection: z.literal(true, {
    errorMap: () => ({ message: "You must acknowledge this is a reflection tool" }),
  }),
  consentEmail: z.literal(true, {
    errorMap: () => ({ message: "Required to receive your report" }),
  }),
  marketingConsent: z.boolean().optional(),
});

type FormData = z.infer<typeof formSchema>;

const steps = [
  { id: 1, title: "What's your name?", fields: ["firstName", "lastName"] },
  { id: 2, title: "When were you born?", fields: ["birthDate"] },
  { id: 3, title: "Want more detail? (Optional)", fields: ["birthTime", "birthLocation"] },
  { id: 4, title: "Where should we send your report?", fields: ["email", "consentReflection", "consentEmail", "marketingConsent"] },
];

export default function FormPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<FormData>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    track("form_start");
  }, []);

  const updateField = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const validateStep = (): boolean => {
    const stepFields = steps[step - 1].fields as (keyof FormData)[];
    const stepSchema = formSchema.pick(
      Object.fromEntries(stepFields.map(f => [f, true])) as any
    );
    const result = stepSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[String(err.path[0])] = err.message;
      });
      setErrors(fieldErrors);
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      if (step < steps.length) setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSkip = () => {
    setStep(step + 1);
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;
    setIsSubmitting(true);

    try {
      track("form_complete");
      sessionStorage.setItem('pm_form_data', JSON.stringify(formData));
      router.push(`/summary`);
    } catch (error) {
      console.error(error);
      setErrors({ submit: "Something went wrong. Please try again." });
      setIsSubmitting(false);
    }
  };

  const progress = (step / steps.length) * 100;

  return (
    <main className="min-h-screen bg-ivory text-ink flex flex-col">
      <header className="border-b border-ink/10 bg-ivory/85 backdrop-blur-md">
        <div className="max-w-md mx-auto w-full px-5 py-4 flex justify-center">
          <Link href="/" className="flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-full border border-antique-gold/50 text-antique-gold">
              <Sparkles className="h-3.5 w-3.5" />
            </span>
            <span className="font-serif text-base tracking-wide text-ink">Personal Metadata</span>
          </Link>
        </div>
      </header>
      <div className="max-w-md mx-auto w-full px-5 pt-10 pb-8 flex-1 flex flex-col">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={handleBack}
              disabled={step === 1}
              className="text-ink-muted hover:text-ink disabled:opacity-0 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <span className="text-sm text-ink-muted">
              Step {step} of {steps.length}
            </span>
          </div>
          <div className="h-1.5 bg-parchment rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-antique-gold to-sanguine"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="flex-1"
          >
            <h1 className="font-serif text-2xl md:text-3xl text-ink mb-2">
              {steps[step - 1].title}
            </h1>

            {step === 1 && (
              <div className="space-y-6 mt-8">
                <div>
                  <label className="block text-sm text-ink-soft mb-2">
                    First name <span className="text-sanguine">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.firstName || ""}
                    onChange={(e) => updateField("firstName", e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-ink/15 rounded-input text-ink placeholder-ink-muted focus:border-antique-gold focus:outline-none transition-colors"
                    placeholder="Emma"
                  />
                  {errors.firstName && (
                    <p className="text-red-700 text-sm mt-1">{errors.firstName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm text-ink-soft mb-2">
                    Last name <span className="text-sanguine">*</span>
                    <span className="text-ink-muted ml-1 font-normal">(required for Pythagorean numerology)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.lastName || ""}
                    onChange={(e) => updateField("lastName", e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-ink/15 rounded-input text-ink placeholder-ink-muted focus:border-antique-gold focus:outline-none transition-colors"
                    placeholder="Johnson"
                  />
                  {errors.lastName && (
                    <p className="text-red-700 text-sm mt-1">{errors.lastName}</p>
                  )}
                  <p className="text-xs text-ink-muted mt-2">
                    Your full name is used to calculate your Expression, Soul Urge, and Personality numbers in the Pythagorean system.
                  </p>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 mt-8">
                <div>
                  <label className="block text-sm text-ink-soft mb-2">
                    Birth date <span className="text-sanguine">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.birthDate || ""}
                    onChange={(e) => updateField("birthDate", e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-ink/15 rounded-input text-ink focus:border-antique-gold focus:outline-none transition-colors [color-scheme:light]"
                  />
                  {errors.birthDate && (
                    <p className="text-red-700 text-sm mt-1">{errors.birthDate}</p>
                  )}
                  <p className="text-xs text-ink-muted mt-2">
                    Used to calculate your Life Path, Birthday Number, and Personal Year in the Pythagorean numerology system.
                  </p>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 mt-8">
                <div>
                  <label className="block text-sm text-ink-soft mb-2">
                    Birth time <span className="text-ink-muted">(optional)</span>
                  </label>
                  <input
                    type="time"
                    value={formData.birthTime || ""}
                    onChange={(e) => updateField("birthTime", e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-ink/15 rounded-input text-ink focus:border-antique-gold focus:outline-none transition-colors [color-scheme:light]"
                  />
                  <p className="text-xs text-ink-muted mt-2">
                    Helps calculate Moon and Rising signs (added in future updates).
                  </p>
                </div>
                <div>
                  <label className="block text-sm text-ink-soft mb-2">
                    Birth location <span className="text-ink-muted">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.birthLocation || ""}
                    onChange={(e) => updateField("birthLocation", e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-ink/15 rounded-input text-ink placeholder-ink-muted focus:border-antique-gold focus:outline-none transition-colors"
                    placeholder="City, Country"
                  />
                </div>
                <div className="pt-4">
                  <button
                    onClick={handleSkip}
                    className="text-sm text-ink-muted hover:text-ink-soft underline"
                  >
                    Skip this step
                  </button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6 mt-8">
                <div>
                  <label className="block text-sm text-ink-soft mb-2">
                    Email <span className="text-sanguine">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email || ""}
                    onChange={(e) => updateField("email", e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-ink/15 rounded-input text-ink placeholder-ink-muted focus:border-antique-gold focus:outline-none transition-colors"
                    placeholder="emma@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-700 text-sm mt-1">{errors.email}</p>
                  )}
                  <p className="text-xs text-ink-muted mt-2">
                    Your complete 20-40 page Pythagorean numerology report will be sent to this address.
                  </p>
                </div>

                <div className="space-y-4 pt-4">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.consentReflection === true}
                      onChange={(e) => updateField("consentReflection", e.target.checked)}
                      className="mt-1 w-4 h-4 accent-antique-gold"
                    />
                    <span className="text-sm text-ink-soft leading-relaxed">
                      I understand this is a reflection and entertainment tool, not
                      professional advice. It does not provide scientific, medical,
                      psychological, legal, financial, or professional guidance.
                    </span>
                  </label>
                  {errors.consentReflection && (
                    <p className="text-red-700 text-sm">{errors.consentReflection}</p>
                  )}

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.consentEmail === true}
                      onChange={(e) => updateField("consentEmail", e.target.checked)}
                      className="mt-1 w-4 h-4 accent-antique-gold"
                    />
                    <span className="text-sm text-ink-soft leading-relaxed">
                      I agree to receive my free report by email.
                    </span>
                  </label>
                  {errors.consentEmail && (
                    <p className="text-red-700 text-sm">{errors.consentEmail}</p>
                  )}

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.marketingConsent === true}
                      onChange={(e) => updateField("marketingConsent", e.target.checked)}
                      className="mt-1 w-4 h-4 accent-antique-gold"
                    />
                    <span className="text-sm text-ink-muted leading-relaxed">
                      Send me occasional free insights and new features (optional).
                    </span>
                  </label>
                </div>

                <div className="flex items-center gap-2 text-xs text-ink-muted pt-4">
                  <Shield className="w-4 h-4" />
                  Your data is never sold. You can request deletion anytime.
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {errors.submit && (
          <p className="text-red-700 text-sm mt-4">{errors.submit}</p>
        )}

        <div className="mt-8">
          {step < steps.length ? (
            <button
              onClick={handleNext}
              className="w-full flex items-center justify-center px-6 py-4 bg-gold-cta-gradient text-ink font-bold rounded-btn text-lg hover:scale-[1.02] transition-transform shadow-gold-glow"
            >
              Continue
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full flex items-center justify-center px-6 py-4 bg-gold-cta-gradient text-ink font-bold rounded-btn text-lg hover:scale-[1.02] transition-transform shadow-gold-glow disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                  Preparing your report...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Generate my free report
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
