import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";

/**
 * GET /api/reports/[id] — fetch a report's status + calculated summary (PRD §17).
 * The report id is an unguessable cuid; possessing it is the access model.
 */
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const report = await prisma.report.findUnique({ where: { id } });
  if (!report) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({
    id: report.id,
    status: report.status,
    firstName: report.firstName,
    calculatedData: {
      lifePathNumber: report.lifePathNumber,
      sunSign: report.sunSign,
      chineseAnimal: report.chineseAnimal,
    },
  });
}

/**
 * DELETE /api/reports/[id] — erase a report and its personal data on request
 * (GDPR right to erasure, PRD §23/§27). The unguessable id acts as the token.
 */
export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    await prisma.report.delete({ where: { id } });
    return NextResponse.json({ deleted: true });
  } catch {
    // Prisma throws if the row doesn't exist — treat as already gone (idempotent).
    return NextResponse.json({ deleted: true });
  }
}
