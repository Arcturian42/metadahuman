import { colors, fonts } from "@/config/design-tokens";
import type { ReportEmailParams } from "./resend";

/**
 * "Report ready" email — mystical, premium, single primary CTA (PRD §20,
 * DESIGN_SYSTEM §14). When a `preview` is supplied it shows a synthesis teaser
 * (key results + a short essence excerpt) so the email carries value on its own;
 * without one it degrades to a clean single-CTA email.
 *
 * Inline styles only (email clients strip <style>/classes). The disclaimer footer
 * is required on every email (legal/disclaimer.md, CLAUDE.md non-negotiable #2).
 * Copy uses invitational language only — never certainty (non-negotiable #1).
 */
export function reportReadyEmail({ firstName, reportUrl, preview }: ReportEmailParams): {
  subject: string;
  html: string;
  text: string;
} {
  const subject = `${firstName}, your Personal Metadata report is ready`;

  // Keep the email excerpt a teaser — the full essence lives in the report.
  const essenceExcerpt = preview?.essence ? truncate(preview.essence, 220) : "";

  const badges: Array<{ label: string; value: string }> = [];
  if (preview?.lifePath != null) {
    badges.push({
      label: "Life Path",
      value: preview.lifePathTheme
        ? `${preview.lifePath} · ${preview.lifePathTheme}`
        : String(preview.lifePath),
    });
  }
  if (preview?.sunSign) badges.push({ label: "Sun sign", value: preview.sunSign });
  if (preview?.chineseAnimal) badges.push({ label: "Chinese animal", value: preview.chineseAnimal });

  // ----- Plain-text part -----
  const textLines = [`Hi ${firstName},`, ``, `Your free Personal Metadata report is ready.`];
  if (badges.length) {
    textLines.push(``, ...badges.map((b) => `${b.label}: ${b.value}`));
  }
  if (essenceExcerpt) {
    textLines.push(``, `A glimpse of your synthesis:`, `"${essenceExcerpt}"`);
  }
  textLines.push(
    ``,
    `View your full report: ${reportUrl}`,
    ``,
    `This is a symbolic reflection and entertainment tool. It is not scientific,`,
    `medical, psychological, legal, or financial advice.`,
    ``,
    `— Personal Metadata`
  );
  const text = textLines.join("\n");

  // ----- HTML part -----
  const badgesHtml = badges.length
    ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
                <tr>
                  ${badges
                    .map(
                      (b) => `<td style="padding:4px;" align="center">
                    <div style="background:${colors.bgSecondary};border:1px solid rgba(216,183,106,0.18);border-radius:16px;padding:12px 10px;">
                      <div style="color:${colors.textMuted};font-size:10px;letter-spacing:0.12em;text-transform:uppercase;margin:0 0 4px;">${escapeHtml(
                        b.label
                      )}</div>
                      <div style="color:${colors.accentPrimary};font-family:${fonts.display};font-size:16px;font-weight:600;line-height:1.2;">${escapeHtml(
                        b.value
                      )}</div>
                    </div>
                  </td>`
                    )
                    .join("")}
                </tr>
              </table>`
    : "";

  const essenceHtml = essenceExcerpt
    ? `<div style="text-align:left;background:${colors.bgSecondary};border-left:2px solid ${colors.accentSecondary};border-radius:8px;padding:16px 18px;margin:0 0 28px;">
                  <div style="color:${colors.accentSecondary};font-size:11px;letter-spacing:0.1em;text-transform:uppercase;margin:0 0 8px;">A glimpse of your synthesis</div>
                  <p style="margin:0;color:${colors.textSecondary};font-size:15px;line-height:1.65;font-style:italic;">&ldquo;${escapeHtml(
                    essenceExcerpt
                  )}&rdquo;</p>
                </div>`
    : "";

  const html = `<!DOCTYPE html>
<html lang="en">
  <body style="margin:0;padding:0;background:${colors.bgPrimary};font-family:${fonts.sans};">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${colors.bgPrimary};padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:${colors.surfaceCard};border-radius:24px;overflow:hidden;">
            <tr>
              <td style="padding:40px 32px 8px;text-align:center;">
                <p style="margin:0 0 8px;color:${colors.accentSecondary};font-size:13px;letter-spacing:0.08em;text-transform:uppercase;">Personal Metadata</p>
                <h1 style="margin:0 0 16px;color:${colors.textPrimary};font-family:${fonts.display};font-size:28px;font-weight:600;">Hi ${escapeHtml(
                  firstName
                )}, your report is ready</h1>
                <p style="margin:0 0 28px;color:${colors.textSecondary};font-size:16px;line-height:1.6;">Your free symbolic self-reflection report — numerology, Western astrology, and Chinese astrology — woven into one.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:0 32px;">
                ${badgesHtml}
                ${essenceHtml}
              </td>
            </tr>
            <tr>
              <td style="padding:0 32px 8px;text-align:center;">
                <a href="${reportUrl}" style="display:inline-block;background:${colors.accentPrimary};color:${colors.bgPrimary};font-weight:700;font-size:16px;text-decoration:none;padding:14px 28px;border-radius:999px;">View my full report</a>
                <p style="margin:20px 0 32px;color:${colors.textMuted};font-size:13px;">Or paste this link into your browser:<br /><span style="color:${colors.textSecondary};word-break:break-all;">${reportUrl}</span></p>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 32px 36px;border-top:1px solid rgba(255,255,255,0.06);">
                <p style="margin:0;color:${colors.textMuted};font-size:12px;line-height:1.6;text-align:center;">
                  This is a symbolic reflection and entertainment tool. It is not scientific, medical, psychological, legal, or financial advice.
                  You received this because you requested a free report from Personal Metadata.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  return { subject, html, text };
}

/** Trim to a whole-word boundary under `max` chars, adding an ellipsis. */
function truncate(input: string, max: number): string {
  const s = input.trim();
  if (s.length <= max) return s;
  const cut = s.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`;
}

/** Escape user/AI-derived strings before interpolating into the email HTML. */
function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
