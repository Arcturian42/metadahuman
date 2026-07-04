import { Resend } from "resend";
import { reportReadyEmail } from "./templates";

/**
 * Resend is optional in local/dev. When RESEND_API_KEY is absent we no-op with a
 * warning rather than throwing — report generation must never fail because email
 * isn't configured (PRD §20, frontend-agent DoD).
 */
const apiKey = process.env.RESEND_API_KEY;
const fromEmail = process.env.FROM_EMAIL || "reports@personalmetadata.com";
const resend = apiKey ? new Resend(apiKey) : null;

export interface ReportEmailParams {
  to: string;
  firstName: string;
  reportUrl: string; // absolute URL
}

export async function sendReportReadyEmail(params: ReportEmailParams): Promise<
  { sent: boolean; skipped?: boolean; error?: string }
> {
  if (!resend) {
    console.warn("RESEND_API_KEY not set — skipping report email");
    return { sent: false, skipped: true };
  }
  try {
    const { subject, html, text } = reportReadyEmail(params);
    await resend.emails.send({
      from: `Personal Metadata <${fromEmail}>`,
      to: params.to,
      subject,
      html,
      text,
    });
    return { sent: true };
  } catch (error) {
    console.error("Resend email failed:", error);
    return { sent: false, error: String(error) };
  }
}
