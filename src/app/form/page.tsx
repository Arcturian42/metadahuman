"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
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
  const shouldReduceMotion = useReducedMotion();

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
    <main className="min-h-screen bg-midnight flex flex-col">
      <div className="max-w-md mx-auto w-full px-5 pt-12 pb-8 flex-1 flex flex-col">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={handleBack}
              disabled={step === 1}
              aria-label="Back"
              className="text-lunar-gray hover:text-soft-white disabled:opacity-0 transition-colors focus:outline-none focus:ring-2 focus:ring-celestial-gold/40 rounded-full p-1"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <span className="text-sm text-lunar-gray">
              Step {step} of {steps.length}
            </span>
          </div>
          <div className="h-1.5 bg-cosmic-slate rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-celestial-gold to-aurora-violet"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -20 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
            className="flex-1"
          >
            <h1 className="font-serif text-2xl md:text-3xl text-soft-white mb-2">
              {steps[step - 1].title}
            </h1>

            {step === 1 && (
              <div className="space-y-6 mt-8">
                <div>
                  <label htmlFor="firstName" className="block text-sm text-mist-gray mb-2">
                    First name <span className="text-rose-quartz">*</span>
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    value={formData.firstName || ""}
                    onChange={(e) => updateField("firstName", e.target.value)}
                    aria-invalid={Boolean(errors.firstName)}
                    aria-describedby={errors.firstName ? "firstName-error" : undefined}
                    className="w-full px-4 py-3 bg-cosmic-slate border border-white/10 rounded-input text-soft-white placeholder-lunar-gray focus:border-celestial-gold focus:outline-none focus:ring-2 focus:ring-celestial-gold/40 transition-colors"
                    placeholder="Emma"
                  />
                  {errors.firstName && (
                    <p id="firstName-error" className="text-soft-red text-sm mt-1">{errors.firstName}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm text-mist-gray mb-2">
                    Last name <span className="text-rose-quartz">*</span>
                    <span className="text-lunar-gray ml-1 font-normal">(required for Pythagorean numerology)</span>
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    value={formData.lastName || ""}
                    onChange={(e) => updateField("lastName", e.target.value)}
                    aria-invalid={Boolean(errors.lastName)}
                    aria-describedby={errors.lastName ? "lastName-error lastName-help" : "lastName-help"}
                    className="w-full px-4 py-3 bg-cosmic-slate border border-white/10 rounded-input text-soft-white placeholder-lunar-gray focus:border-celestial-gold focus:outline-none focus:ring-2 focus:ring-celestial-gold/40 transition-colors"
                    placeholder="Johnson"
                  />
                  {errors.lastName && (
                    <p id="lastName-error" className="text-soft-red text-sm mt-1">{errors.lastName}</p>
                  )}
                  <p id="lastName-help" className="text-xs text-lunar-gray mt-2">
                    Your full name is used to calculate your Expression, Soul Urge, and Personality numbers in the Pythagorean system.
                  </p>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 mt-8">
                <div>
                  <label htmlFor="birthDate" className="block text-sm text-mist-gray mb-2">
                    Birth date <span className="text-rose-quartz">*</span>
                  </label>
                  <input
                    id="birthDate"
                    type="date"
                    value={formData.birthDate || ""}
                    onChange={(e) => updateField("birthDate", e.target.value)}
                    aria-invalid={Boolean(errors.birthDate)}
                    aria-describedby={errors.birthDate ? "birthDate-error birthDate-help" : "birthDate-help"}
                    className="w-full px-4 py-3 bg-cosmic-slate border border-white/10 rounded-input text-soft-white focus:border-celestial-gold focus:outline-none focus:ring-2 focus:ring-celestial-gold/40 transition-colors [color-scheme:dark]"
                  />
                  {errors.birthDate && (
                    <p id="birthDate-error" className="text-soft-red text-sm mt-1">{errors.birthDate}</p>
                  )}
                  <p id="birthDate-help" className="text-xs text-lunar-gray mt-2">
                    Used to calculate your Life Path, Birthday Number, and Personal Year in the Pythagorean numerology system.
                  </p>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 mt-8">
                <div>
                  <label htmlFor="birthTime" className="block text-sm text-mist-gray mb-2">
                    Birth time <span className="text-lunar-gray">(optional)</span>
                  </label>
                  <input
                    id="birthTime"
                    type="time"
                    value={formData.birthTime || ""}
                    onChange={(e) => updateField("birthTime", e.target.value)}
                    aria-invalid={Boolean(errors.birthTime)}
                    aria-describedby={errors.birthTime ? "birthTime-error birthTime-help" : "birthTime-help"}
                    className="w-full px-4 py-3 bg-cosmic-slate border border-white/10 rounded-input text-soft-white focus:border-celestial-gold focus:outline-none focus:ring-2 focus:ring-celestial-gold/40 transition-colors [color-scheme:dark]"
                  />
                  {errors.birthTime && (
                    <p id="birthTime-error" className="text-soft-red text-sm mt-1">{errors.birthTime}</p>
                  )}
                  <p id="birthTime-help" className="text-xs text-lunar-gray mt-2">
                    Helps calculate Moon and Rising signs (added in future updates).
                  </p>
                </div>
                <div>
                  <label htmlFor="birthLocation" className="block text-sm text-mist-gray mb-2">
                    Birth location <span className="text-lunar-gray">(optional)</span>
                  </label>
                  <input
                    id="birthLocation"
                    type="text"
                    value={formData.birthLocation || ""}
                    onChange={(e) => updateField("birthLocation", e.target.value)}
                    aria-invalid={Boolean(errors.birthLocation)}
                    aria-describedby={errors.birthLocation ? "birthLocation-error" : undefined}
                    className="w-full px-4 py-3 bg-cosmic-slate border border-white/10 rounded-input text-soft-white placeholder-lunar-gray focus:border-celestial-gold focus:outline-none focus:ring-2 focus:ring-celestial-gold/40 transition-colors"
                    placeholder="City, Country"
                  />
                  {errors.birthLocation && (
                    <p id="birthLocation-error" className="text-soft-red text-sm mt-1">{errors.birthLocation}</p>
                  )}
                </div>
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={handleSkip}
                    className="text-sm text-lunar-gray hover:text-mist-gray underline focus:outline-none focus:ring-2 focus:ring-celestial-gold/40 rounded px-1"
                  >
                    Skip this step
                  </button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6 mt-8">
                <div>
                  <label htmlFor="email" className="block text-sm text-mist-gray mb-2">
                    Email <span className="text-rose-quartz">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email || ""}
                    onChange={(e) => updateField("email", e.target.value)}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "email-error email-help" : "email-help"}
                    className="w-full px-4 py-3 bg-cosmic-slate border border-white/10 rounded-input text-soft-white placeholder-lunar-gray focus:border-celestial-gold focus:outline-none focus:ring-2 focus:ring-celestial-gold/40 transition-colors"
                    placeholder="emma@example.com"
                  />
                  {errors.email && (
                    <p id="email-error" className="text-soft-red text-sm mt-1">{errors.email}</p>
                  )}
                  <p id="email-help" className="text-xs text-lunar-gray mt-2">
                    Your complete 20-40 page Pythagorean numerology report will be sent to this address.
                  </p>
                </div>

                <div className="space-y-4 pt-4">
                  <label htmlFor="consentReflection" className="flex items-start gap-3 cursor-pointer">
                    <input
                      id="consentReflection"
                      type="checkbox"
                      checked={formData.consentReflection === true}
                      onChange={(e) => updateField("consentReflection", e.target.checked)}
                      aria-invalid={Boolean(errors.consentReflection)}
                      aria-describedby={errors.consentReflection ? "consentReflection-error" : undefined}
                      className="mt-1 w-4 h-4 accent-celestial-gold focus:outline-none focus:ring-2 focus:ring-celestial-gold/40 rounded"
                    />
                    <span className="text-sm text-mist-gray leading-relaxed">
                      I understand this is a reflection and entertainment tool, not
                      professional advice. It does not provide scientific, medical,
                      psychological, legal, financial, or professional guidance.
                    </span>
                  </label>
                  {errors.consentReflection && (
                    <p id="consentReflection-error" className="text-soft-red text-sm">{errors.consentReflection}</p>
                  )}

                  <label htmlFor="consentEmail" className="flex items-start gap-3 cursor-pointer">
                    <input
                      id="consentEmail"
                      type="checkbox"
                      checked={formData.consentEmail === true}
                      onChange={(e) => updateField("consentEmail", e.target.checked)}
                      aria-invalid={Boolean(errors.consentEmail)}
                      aria-describedby={errors.consentEmail ? "consentEmail-error" : undefined}
                      className="mt-1 w-4 h-4 accent-celestial-gold focus:outline-none focus:ring-2 focus:ring-celestial-gold/40 rounded"
                    />
                    <span className="text-sm text-mist-gray leading-relaxed">
                      I agree to receive my free report by email.
                    </span>
                  </label>
                  {errors.consentEmail && (
                    <p id="consentEmail-error" className="text-soft-red text-sm">{errors.consentEmail}</p>
                  )}

                  <label htmlFor="marketingConsent" className="flex items-start gap-3 cursor-pointer">
                    <input
                      id="marketingConsent"
                      type="checkbox"
                      checked={formData.marketingConsent === true}
                      onChange={(e) => updateField("marketingConsent", e.target.checked)}
                      className="mt-1 w-4 h-4 accent-celestial-gold focus:outline-none focus:ring-2 focus:ring-celestial-gold/40 rounded"
                    />
                    <span className="text-sm text-lunar-gray leading-relaxed">
                      Send me occasional free insights and new features (optional).
                    </span>
                  </label>
                </div>

                <div className="flex items-center gap-2 text-xs text-lunar-gray pt-4">
                  <Shield className="w-4 h-4" />
                  Your data is never sold. You can request deletion anytime.
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {errors.submit && (
          <p className="text-soft-red text-sm mt-4">{errors.submit}</p>
        )}

        <div className="mt-8">
          {step < steps.length ? (
            <button
              type="button"
              onClick={handleNext}
              className="w-full flex items-center justify-center px-6 py-4 bg-gradient-to-r from-celestial-gold to-warm-amber text-midnight font-bold rounded-btn text-lg hover:scale-[1.02] transition-transform shadow-glow focus:outline-none focus:ring-2 focus:ring-celestial-gold/40"
            >
              Continue
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full flex items-center justify-center px-6 py-4 bg-gradient-to-r from-celestial-gold to-warm-amber text-midnight font-bold rounded-btn text-lg hover:scale-[1.02] transition-transform shadow-glow disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-celestial-gold/40"
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
