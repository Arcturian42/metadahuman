-- Reference only. This documents what `npx prisma migrate dev --name init`
-- will generate from prisma/schema.prisma — run that command for the
-- authoritative migration. Don't run this file directly against a database
-- that Prisma is also managing; the two will fall out of sync.

CREATE TYPE "ReportStatus" AS ENUM ('PENDING', 'GENERATING', 'COMPLETED', 'FAILED');

CREATE TABLE "reports" (
    -- Prisma generates this ID application-side (cuid), not as a DB default.
    -- If you ever insert rows outside Prisma Client, generate a cuid in your
    -- own code, or swap this for `DEFAULT gen_random_uuid()::text` and adjust
    -- the Prisma model to match.
    "id" TEXT PRIMARY KEY,

    -- Input
    "firstName" TEXT NOT NULL,
    "lastName" TEXT,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "birthTime" TIMESTAMP(3),
    "birthLocation" TEXT,
    "birthLat" DOUBLE PRECISION,
    "birthLng" DOUBLE PRECISION,
    "email" TEXT NOT NULL,
    "marketingConsent" BOOLEAN NOT NULL DEFAULT false,

    -- Calculated: Numerology
    "lifePathNumber" INTEGER NOT NULL,
    "expressionNumber" INTEGER NOT NULL,
    "soulUrgeNumber" INTEGER NOT NULL,
    "personalityNumber" INTEGER NOT NULL,
    "birthdayNumber" INTEGER NOT NULL,
    "maturityNumber" INTEGER NOT NULL,
    "attitudeNumber" INTEGER NOT NULL,
    "personalYear" INTEGER NOT NULL,

    -- Calculated: Western Astrology
    "sunSign" TEXT NOT NULL,
    "sunElement" TEXT NOT NULL,
    "moonSign" TEXT,
    "risingSign" TEXT,

    -- Calculated: Chinese Astrology
    "chineseAnimal" TEXT NOT NULL,
    "chineseElement" TEXT NOT NULL,
    "yinYang" TEXT NOT NULL,

    -- Human Design (V1)
    "hdType" TEXT,
    "hdProfile" TEXT,
    "hdAuthority" TEXT,

    -- Generated content
    "content" JSONB NOT NULL,
    "pdfUrl" TEXT,

    -- Status
    "status" "ReportStatus" NOT NULL DEFAULT 'PENDING',

    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    -- Analytics
    "viewedAt" TIMESTAMP(3),
    "pdfDownloadedAt" TIMESTAMP(3),
    "sharedAt" TIMESTAMP(3)
);

CREATE INDEX "reports_email_idx" ON "reports"("email");
CREATE INDEX "reports_createdAt_idx" ON "reports"("createdAt");
CREATE INDEX "reports_status_idx" ON "reports"("status");
