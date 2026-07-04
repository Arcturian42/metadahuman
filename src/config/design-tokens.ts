/**
 * Personal Metadata — design tokens as plain JS/TS values.
 *
 * Tailwind classes don't apply inside react-pdf's StyleSheet.create() or
 * @vercel/og's inline-styled JSX (PRD §19, DESIGN_SYSTEM §14 share cards).
 * This file is the single source of truth for those two contexts — keep it
 * in sync with design/tailwind.config.ts and design/globals.css.
 */

export const colors = {
  bgPrimary: "#080B1A",
  bgSecondary: "#11152B",
  surfaceCard: "#171B35",
  surfaceElevated: "#20264A",
  textPrimary: "#F8F6F0",
  textSecondary: "#B8B6C9",
  textMuted: "#7E819C",
  accentPrimary: "#D8B76A", // gold — CTAs, key results, badges ONLY
  accentSecondary: "#9B7CFF", // violet
  accentEmotional: "#E7A6C8", // rose quartz
  success: "#7DD9A5",
  warning: "#F6C66A",
  error: "#F87171",
} as const;

export const fonts = {
  display: "Cormorant Garamond, Playfair Display, serif",
  sans: "Inter, sans-serif",
  mono: "IBM Plex Mono, Geist Mono, monospace",
} as const;

export const radius = {
  button: 999,
  card: 24,
  input: 16,
  modal: 28,
  reportCard: 28,
} as const;

export const shadows = {
  card: "0 24px 80px rgba(0, 0, 0, 0.35)",
  glowCta: "0 0 32px rgba(216, 183, 106, 0.28)",
} as const;

export const gradients = {
  hero: "radial-gradient(circle at top left, #9B7CFF 0%, transparent 28%), radial-gradient(circle at bottom right, #D8B76A 0%, transparent 22%), linear-gradient(135deg, #080B1A 0%, #11152B 55%, #171B35 100%)",
  cta: "linear-gradient(135deg, #D8B76A, #F6D98B)",
} as const;

/** 1080×1080 share card dimensions — DESIGN_SYSTEM §14 */
export const shareCard = {
  width: 1080,
  height: 1080,
} as const;

export const designTokens = {
  colors,
  fonts,
  radius,
  shadows,
  gradients,
  shareCard,
} as const;

export default designTokens;
