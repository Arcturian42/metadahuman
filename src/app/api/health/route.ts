import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/health — deployment diagnostics.
 *
 * Reports whether the critical env vars are present (booleans only — never their
 * values) and whether the database is actually reachable (a lightweight SELECT 1,
 * which catches a direct-vs-pooler URL mistake). Returns 200 when the app can
 * generate + persist reports, 503 otherwise. Safe to hit from a browser.
 */
export async function GET() {
  const checks: {
    databaseConfigured: boolean;
    databaseReachable: boolean;
    databaseError: string | null;
    openaiConfigured: boolean;
    resendConfigured: boolean;
    appUrlConfigured: boolean;
  } = {
    databaseConfigured: Boolean(process.env.DATABASE_URL),
    databaseReachable: false,
    databaseError: null,
    openaiConfigured: Boolean(process.env.OPENAI_API_KEY),
    resendConfigured: Boolean(process.env.RESEND_API_KEY),
    appUrlConfigured: Boolean(process.env.NEXT_PUBLIC_APP_URL),
  };

  if (checks.databaseConfigured) {
    try {
      await prisma.$queryRaw`SELECT 1`;
      checks.databaseReachable = true;
    } catch (error) {
      // Collapse the whole Prisma message onto one line (its real "error: ..."
      // cause sits a few lines below the generic "Invalid invocation" header).
      // Passwords never appear in these messages.
      const raw = String((error as Error)?.message ?? error);
      const collapsed = raw
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean)
        .join(" ");
      checks.databaseError = (collapsed || "Unknown database error").slice(0, 500);
    }
  }

  const ok = checks.databaseConfigured && checks.databaseReachable && checks.openaiConfigured;

  return NextResponse.json(
    { ok, checks, timestamp: new Date().toISOString() },
    { status: ok ? 200 : 503 }
  );
}
