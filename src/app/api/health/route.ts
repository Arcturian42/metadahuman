import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

class HealthCheckRollbackError extends Error {
  constructor() {
    super("Health check rollback");
    this.name = "HealthCheckRollbackError";
  }
}

const TEST_REPORT = {
  firstName: "__health_test__",
  lastName: "__health_test__",
  birthDate: new Date("2000-01-01T00:00:00.000Z"),
  email: "health@example.com",
  lifePathNumber: 1,
  expressionNumber: 1,
  soulUrgeNumber: 1,
  personalityNumber: 1,
  birthdayNumber: 1,
  maturityNumber: 1,
  attitudeNumber: 1,
  personalYear: 1,
  sunSign: "Capricorn",
  sunElement: "Earth",
  chineseAnimal: "Dragon",
  chineseElement: "Wood",
  yinYang: "Yang",
  content: {},
};

/**
 * GET /api/health — deployment diagnostics.
 *
 * Reports whether the critical env vars are present (booleans only — never their
 * values) and whether the database can actually persist a report (the real
 * write path used by the app). A bare `SELECT 1` is not enough: without
 * `?pgbouncer=true` on the Supabase pooler URL, `prisma.report.create` fails with
 * Postgres `42P05: prepared statement "s0" already exists`, so the health check
 * now exercises that exact write path and rolls the row back.
 *
 * OpenAI and Resend are advisory: the app falls back to template copy when
 * OpenAI is absent and email is optional. Returns 200 when the app can generate
 * + persist reports, 503 otherwise. Safe to hit from a browser.
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
      await prisma.$transaction(async (tx) => {
        await tx.report.create({ data: TEST_REPORT });
        // Force a rollback so the health-check row is never committed.
        throw new HealthCheckRollbackError();
      });
    } catch (error) {
      if (error instanceof HealthCheckRollbackError) {
        checks.databaseReachable = true;
      } else {
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
  }

  const ok =
    checks.databaseConfigured && checks.databaseReachable && checks.appUrlConfigured;

  return NextResponse.json(
    { ok, checks, timestamp: new Date().toISOString() },
    { status: ok ? 200 : 503 }
  );
}
