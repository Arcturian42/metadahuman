import { colors, fonts } from "@/config/design-tokens";
import type { ReportEmailParams } from "./resend";

/**
 * Escape characters that are meaningful in HTML so user-supplied strings can be
 * safely interpolated into the email HTML body.
 */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * "Report ready" email — minimal, mystical, single CTA (PRD §20, DESIGN_SYSTEM §14).
 * Inline styles only (email clients strip <style>/classes). The disclaimer footer
 * is required on every email (legal/disclaimer.md, CLAUDE.md non-negotiable #2).
 */
export function reportReadyEmail({ firstName, reportUrl }: ReportEmailParams): {
  subject: string;
  html: string;
  text: string;
} {
  const subject = `${firstName}, your Personal Metadata report is ready`;

  const safeFirstName = escapeHtml(firstName);

  const text = [
    `Hi ${firstName},`,
    ``,
    `Your free Personal Metadata report is ready.`,
    `View it here: ${reportUrl}`,
    ``,
    `This is a symbolic reflection and entertainment tool. It is not scientific,`,
    `medical, psychological, legal, or financial advice.`,
    ``,
    `— Personal Metadata`,
  ].join("\n");

  const html = `<!DOCTYPE html>
<html lang="en">
  <body style="margin:0;padding:0;background:${colors.bgPrimary};font-family:${fonts.sans};">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${colors.bgPrimary};padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:${colors.surfaceCard};border-radius:24px;overflow:hidden;">
            <tr>
              <td style="padding:40px 32px 24px;text-align:center;">
                <p style="margin:0 0 8px;color:${colors.accentSecondary};font-size:13px;letter-spacing:0.08em;text-transform:uppercase;">Personal Metadata</p>
                <h1 style="margin:0 0 16px;color:${colors.textPrimary};font-family:${fonts.display};font-size:28px;font-weight:600;">Hi ${safeFirstName}, your report is ready</h1>
                <p style="margin:0 0 28px;color:${colors.textSecondary};font-size:16px;line-height:1.6;">Your free symbolic self-reflection report — numerology, Western astrology, and Chinese astrology — is ready to explore.</p>
                <a href="${reportUrl}" style="display:inline-block;background:${colors.accentPrimary};color:${colors.bgPrimary};font-weight:700;font-size:16px;text-decoration:none;padding:14px 28px;border-radius:999px;">View my report</a>
                <p style="margin:20px 0 0;color:${colors.textMuted};font-size:13px;">Or paste this link into your browser:<br /><span style="color:${colors.textSecondary};word-break:break-all;">${reportUrl}</span></p>
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
