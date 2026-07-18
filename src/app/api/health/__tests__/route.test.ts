import { describe, it, expect, vi, beforeEach } from "vitest";
import { GET } from "../route";

const mockTransaction = vi.fn();
const mockReportCreate = vi.fn();

vi.mock("@/lib/db", () => ({
  prisma: {
    $transaction: (...args: unknown[]) => mockTransaction(...args),
  },
}));

describe("GET /api/health", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    mockReportCreate.mockResolvedValue({ id: "health-test-id" });
    mockTransaction.mockImplementation(async (callback: (tx: unknown) => Promise<unknown>) => {
      const tx = { report: { create: mockReportCreate } };
      return callback(tx);
    });

    vi.stubEnv("DATABASE_URL", "postgres://localhost:5432/test");
    vi.stubEnv("OPENAI_API_KEY", "sk-test");
    vi.stubEnv("RESEND_API_KEY", "re_test");
    vi.stubEnv("NEXT_PUBLIC_APP_URL", "https://example.com");
  });

  it("returns 200 when the rolled-back report.create succeeds", async () => {
    const response = await GET();
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.ok).toBe(true);
    expect(body.checks.databaseReachable).toBe(true);
    expect(body.checks.databaseError).toBeNull();
    expect(body.checks.openaiConfigured).toBe(true);
    expect(body.checks.resendConfigured).toBe(true);
    expect(body.checks.appUrlConfigured).toBe(true);
    expect(mockReportCreate).toHaveBeenCalledTimes(1);
  });

  it("returns 503 and surfaces the error when report.create fails", async () => {
    mockReportCreate.mockRejectedValue(new Error("prepared statement s0 already exists"));

    const response = await GET();
    const body = await response.json();

    expect(response.status).toBe(503);
    expect(body.ok).toBe(false);
    expect(body.checks.databaseReachable).toBe(false);
    expect(body.checks.databaseError).toContain("prepared statement s0 already exists");
  });

  it("returns 200 even when OpenAI and Resend are missing", async () => {
    vi.stubEnv("OPENAI_API_KEY", "");
    vi.stubEnv("RESEND_API_KEY", "");

    const response = await GET();
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.ok).toBe(true);
    expect(body.checks.openaiConfigured).toBe(false);
    expect(body.checks.resendConfigured).toBe(false);
  });

  it("returns 503 when the app URL is not configured", async () => {
    vi.stubEnv("NEXT_PUBLIC_APP_URL", "");

    const response = await GET();
    const body = await response.json();

    expect(response.status).toBe(503);
    expect(body.ok).toBe(false);
  });

  it("returns 503 and skips the DB check when DATABASE_URL is missing", async () => {
    vi.stubEnv("DATABASE_URL", "");

    const response = await GET();
    const body = await response.json();

    expect(response.status).toBe(503);
    expect(body.ok).toBe(false);
    expect(body.checks.databaseConfigured).toBe(false);
    expect(body.checks.databaseReachable).toBe(false);
    expect(mockTransaction).not.toHaveBeenCalled();
  });
});
