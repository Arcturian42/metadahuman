import { renderToBuffer, type DocumentProps } from "@react-pdf/renderer";
import { prisma } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import { ReportPdf } from "@/lib/pdf/report-pdf";
import React from "react";

export const runtime = "nodejs";
export const maxDuration = 30;

/**
 * Generate the report PDF on demand and stream it back. Kept stateless (no
 * storage upload) for the MVP — the DB holds the content; the PDF is a render of
 * it (PRD §19, react-pdf). Also records the download for analytics (PRD §28).
 */
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const report = await prisma.report.findUnique({ where: { id } });

  if (!report || report.status !== "COMPLETED") {
    return new Response("Not found", { status: 404 });
  }

  const content = report.content as { sections?: unknown[] } | null;
  const sections = (content?.sections ?? []) as never[];

  const numbers = {
    lifePath: report.lifePathNumber,
    expression: report.expressionNumber,
    soulUrge: report.soulUrgeNumber,
    personality: report.personalityNumber,
    birthday: report.birthdayNumber,
    maturity: report.maturityNumber,
    attitude: report.attitudeNumber,
    personalYear: report.personalYear,
  };

  // ReportPdf returns a <Document>; react-pdf types the root as DocumentProps.
  const element = React.createElement(ReportPdf, {
    firstName: report.firstName,
    lastName: report.lastName,
    generatedOn: formatDate(report.createdAt),
    sections,
    numbers,
  }) as React.ReactElement<DocumentProps>;

  const buffer = await renderToBuffer(element);

  await prisma.report
    .update({ where: { id: report.id }, data: { pdfDownloadedAt: new Date() } })
    .catch(() => {});

  const safeName = report.firstName.replace(/[^a-zA-Z0-9]/g, "") || "report";
  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="personal-metadata-${safeName}.pdf"`,
      "Cache-Control": "private, max-age=3600",
    },
  });
}
