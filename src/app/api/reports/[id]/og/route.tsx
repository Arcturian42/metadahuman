import { ImageResponse } from "@vercel/og";
import { prisma } from "@/lib/db";
import { colors } from "@/config/design-tokens";
import { getLifePathTemplate } from "@/lib/content/loader";

// Prisma runs on Node, not edge — so does this route.
export const runtime = "nodejs";

const SIZE = 1080; // 1080×1080 square share card (DESIGN_SYSTEM §14)

/**
 * Shareable result card. No sensitive data — first name + headline symbols only
 * (DESIGN_SYSTEM §14: share cards are the one surface exempt from the disclaimer
 * precisely because nothing personal beyond a first name and a number appears).
 */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const report = await prisma.report.findUnique({ where: { id } });

  if (!report) {
    return new Response("Not found", { status: 404 });
  }

  const lp = getLifePathTemplate(report.lifePathNumber);
  const theme = lp?.theme ?? "";
  const traits = (lp?.summary ?? "")
    .split(/[,.]/)[0]
    .trim();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 96,
          background: `radial-gradient(circle at 25% 20%, ${colors.accentSecondary}55 0%, transparent 40%), radial-gradient(circle at 80% 85%, ${colors.accentPrimary}44 0%, transparent 38%), linear-gradient(135deg, ${colors.bgPrimary} 0%, ${colors.bgSecondary} 55%, ${colors.surfaceCard} 100%)`,
          color: colors.textPrimary,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 30,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: colors.accentSecondary,
            marginBottom: 48,
          }}
        >
          Personal Metadata
        </div>
        <div style={{ fontSize: 52, color: colors.textSecondary, marginBottom: 24 }}>
          {report.firstName}&#39;s Life Path
        </div>
        <div
          style={{
            fontSize: 320,
            fontWeight: 700,
            lineHeight: 1,
            color: colors.accentPrimary,
            marginBottom: 16,
          }}
        >
          {report.lifePathNumber}
        </div>
        {theme ? (
          <div style={{ fontSize: 64, fontWeight: 600, marginBottom: 28 }}>{theme}</div>
        ) : null}
        {traits ? (
          <div
            style={{
              fontSize: 32,
              color: colors.textSecondary,
              textAlign: "center",
              maxWidth: 760,
              lineHeight: 1.4,
            }}
          >
            {traits}
          </div>
        ) : null}
        <div style={{ marginTop: 72, fontSize: 30, color: colors.textMuted }}>
          personalmetadata.com
        </div>
      </div>
    ),
    { width: SIZE, height: SIZE }
  );
}
