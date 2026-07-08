import type { Config } from "tailwindcss";

// Personal Metadata — canonical design-system config.
// Keep in sync with src/app/globals.css and src/config/design-tokens.ts
// (all three describe the same palette — see docs/DESIGN_SYSTEM.md).

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: "#080B1A", // background primary
        "deep-indigo": "#11152B", // background secondary
        "cosmic-slate": "#171B35", // surface card
        "mystic-blue": "#20264A", // surface elevated
        "soft-white": "#F8F6F0", // text primary
        "mist-gray": "#B8B6C9", // text secondary
        "lunar-gray": "#7E819C", // text muted
        "celestial-gold": "#D8B76A", // accent primary — CTAs / key results / badges ONLY
        "aurora-violet": "#9B7CFF", // accent secondary
        "rose-quartz": "#E7A6C8", // accent emotional
        "soft-emerald": "#7DD9A5", // success
        "warm-amber": "#F6C66A", // warning
        "soft-red": "#F87171", // error

        // --- Landing page only (src/app/page.tsx) ---
        // Light "Da Vinci codex" palette: ivory paper, ink, antique gold, sanguine.
        // Rest of the app (form, report, emails, PDF/OG) keeps the dark palette above —
        // see docs/memory.md for the scope decision.
        ivory: "#FBF8F2", // background primary
        parchment: "#F3ECDC", // background secondary / alternating sections
        ink: "#211D16", // text primary
        "ink-soft": "#5B5546", // text secondary
        "ink-muted": "#948C78", // text muted
        "antique-gold": "#A97D33", // accent primary — CTAs / key results / badges ONLY
        sanguine: "#A8552E", // accent secondary (red-chalk sketch tone)
        sage: "#6B8F71", // success
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Cormorant Garamond", "Playfair Display", "serif"],
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        mono: ["IBM Plex Mono", "Geist Mono", "monospace"],
      },
      borderRadius: {
        btn: "999px",
        card: "24px",
        input: "16px",
        modal: "28px",
        "report-card": "28px",
      },
      boxShadow: {
        card: "0 24px 80px rgba(0, 0, 0, 0.35)",
        glow: "0 0 32px rgba(216, 183, 106, 0.28)",
        // Landing page only — soft ink-tinted shadows instead of the dark-theme glow.
        parchment: "0 16px 50px rgba(33, 29, 22, 0.08)",
        "gold-glow": "0 0 28px rgba(169, 125, 51, 0.22)",
      },
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(circle at top left, #9B7CFF 0%, transparent 28%), radial-gradient(circle at bottom right, #D8B76A 0%, transparent 22%), linear-gradient(135deg, #080B1A 0%, #11152B 55%, #171B35 100%)",
        "cta-gradient": "linear-gradient(135deg, #D8B76A, #F6D98B)",
        // Landing page only
        "codex-gradient":
          "radial-gradient(circle at 12% 8%, rgba(169,125,51,0.08) 0%, transparent 32%), radial-gradient(circle at 88% 92%, rgba(168,85,46,0.06) 0%, transparent 28%), linear-gradient(180deg, #FBF8F2 0%, #F8F3E8 100%)",
        "gold-cta-gradient": "linear-gradient(135deg, #A97D33, #D8B76A)",
      },
      spacing: {
        "section-desktop": "96px",
        "section-mobile": "56px",
      },
      maxWidth: {
        container: "1120px",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "orbit-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-out",
        "slide-up": "slide-up 0.5s ease-out",
        "orbit-slow": "orbit-slow 60s linear infinite",
        "glow-pulse": "glow-pulse 4s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};

export default config;
