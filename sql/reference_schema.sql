-- Authoritative schema for a fresh database (generated from prisma/schema.prisma).
-- Prefer `npx prisma db push` (or run this once in the Supabase SQL Editor).
-- Idempotent: safe to re-run. The table is "Report" (Prisma has no @@map).

-- Enum
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'ReportStatus') THEN
    CREATE TYPE "ReportStatus" AS ENUM ('PENDING', 'GENERATING', 'COMPLETED', 'FAILED');
  END IF;
END$$;

-- Table
CREATE TABLE IF NOT EXISTS "Report" (
    "id"                TEXT NOT NULL,
    -- Input
    "firstName"         TEXT NOT NULL,
    "lastName"          TEXT,
    "birthDate"         TIMESTAMP(3) NOT NULL,
    "birthTime"         TIMESTAMP(3),
    "birthLocation"     TEXT,
    "birthLat"          DOUBLE PRECISION,
    "birthLng"          DOUBLE PRECISION,
    "email"             TEXT NOT NULL,
    "marketingConsent"  BOOLEAN NOT NULL DEFAULT false,
    -- Numerology
    "lifePathNumber"    INTEGER NOT NULL,
    "expressionNumber"  INTEGER NOT NULL,
    "soulUrgeNumber"    INTEGER NOT NULL,
    "personalityNumber" INTEGER NOT NULL,
    "birthdayNumber"    INTEGER NOT NULL,
    "maturityNumber"    INTEGER NOT NULL,
    "attitudeNumber"    INTEGER NOT NULL,
    "personalYear"      INTEGER NOT NULL,
    -- Western astrology
    "sunSign"           TEXT NOT NULL,
    "sunElement"        TEXT NOT NULL,
    "moonSign"          TEXT,
    "risingSign"        TEXT,
    -- Chinese astrology
    "chineseAnimal"     TEXT NOT NULL,
    "chineseElement"    TEXT NOT NULL,
    "yinYang"           TEXT NOT NULL,
    -- Human Design (V1, nullable)
    "hdType"            TEXT,
    "hdProfile"         TEXT,
    "hdAuthority"       TEXT,
    -- Generated content
    "content"           JSONB NOT NULL,
    "pdfUrl"            TEXT,
    -- Status
    "status"            "ReportStatus" NOT NULL DEFAULT 'PENDING',
    -- Analytics
    "viewedAt"          TIMESTAMP(3),
    "pdfDownloadedAt"   TIMESTAMP(3),
    "sharedAt"          TIMESTAMP(3),
    -- Timestamps (updatedAt is maintained by Prisma, not a DB trigger)
    "createdAt"         TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt"         TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- Indexes
CREATE INDEX IF NOT EXISTS "Report_email_idx"  ON "Report"("email");
CREATE INDEX IF NOT EXISTS "Report_status_idx" ON "Report"("status");
