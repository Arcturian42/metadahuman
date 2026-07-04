/**
 * Thin Plausible wrapper (PRD §15, §28). No-ops when Plausible isn't loaded
 * (e.g. dev, or NEXT_PUBLIC_PLAUSIBLE_DOMAIN unset), so call sites stay simple
 * and privacy-friendly — no cookies, no PII in event names.
 */
type PlausibleFn = (event: string, options?: { props?: Record<string, string | number> }) => void;

declare global {
  interface Window {
    plausible?: PlausibleFn;
  }
}

export type AnalyticsEvent =
  | "form_start"
  | "form_complete"
  | "report_view"
  | "report_pdf_download"
  | "report_share"
  | "report_delete";

export function track(event: AnalyticsEvent, props?: Record<string, string | number>): void {
  if (typeof window !== "undefined" && typeof window.plausible === "function") {
    window.plausible(event, props ? { props } : undefined);
  }
}
