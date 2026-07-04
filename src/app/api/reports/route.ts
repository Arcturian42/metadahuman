import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { calculateNumerology } from "@/lib/calculations/numerology";
import { calculateWesternAstro } from "@/lib/calculations/western-astro";
import { calculateChineseAstro } from "@/lib/calculations/chinese-astro";
import {
  buildNumerologyPrompt,
  buildSynthesisPrompt,
  buildAstroPrompt,
  buildCyclesPrompt,
} from "@/lib/ai/prompts";
import { generateWithFallback } from "@/lib/ai/openai";
import {
  numerologySchema,
  astroSchema,
  synthesisSchema,
  cyclesSchema,
} from "@/lib/ai/schemas";
import {
  numerologyFallback,
  astroFallback,
  synthesisFallback,
  cyclesFallback,
} from "@/lib/ai/bridge";
import { EmptyNameError } from "@/lib/calculations/normalize";
import { sendReportReadyEmail } from "@/lib/email/resend";
import { rateLimit, clientKey } from "@/lib/rate-limit";
import { getChineseAnimalTemplate, fillName } from "@/lib/content/loader";

// Report generation fans out 4 parallel AI calls; give the serverless function
// headroom on Vercel (Node runtime, not edge). See docs/PRD.md §17.
export const runtime = "nodejs";
export const maxDuration = 60;

const createSchema = z.object({
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  birthTime: z.string().regex(/^\d{2}:\d{2}$/).optional().or(z.literal("")),
  birthLocation: z.string().max(100).optional().or(z.literal("")),
  email: z.string().email(),
  marketingConsent: z.boolean().optional(),
});

export async function POST(req: NextRequest) {
  try {
    // Throttle report creation per client (anti-abuse / OpenAI cost, PRD §23).
    const limit = rateLimit(`reports:${clientKey(req)}`, { limit: 5, windowMs: 60_000 });
    if (!limit.allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a moment and try again." },
        { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } }
      );
    }

    const body = await req.json();
    const parsed = createSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const birthTime = data.birthTime || undefined;
    const birthLocation = data.birthLocation || undefined;

    // The report-generation year is resolved once, here, and passed into the
    // pure calculation layer (never read via new Date() inside it).
    const currentYear = new Date().getFullYear();

    // Calculations
    const numerology = calculateNumerology(
      data.firstName,
      data.lastName,
      data.birthDate,
      currentYear
    );
    const western = calculateWesternAstro(data.birthDate, birthTime, birthLocation);
    const chinese = calculateChineseAstro(data.birthDate);
    const chineseTemplate = getChineseAnimalTemplate(chinese.animal);

    const ctx = {
      firstName: data.firstName,
      numerology,
      western,
      chinese,
      currentYear,
    };

    // Generate AI content in parallel. Each call is schema-validated; on failure
    // it falls back to on-brand text assembled from the content templates.
    const [numResult, astroResult, synthResult, cyclesResult] = await Promise.all([
      generateWithFallback(
        buildNumerologyPrompt(ctx),
        numerologySchema,
        numerologyFallback(numerology, data.firstName)
      ),
      generateWithFallback(
        buildAstroPrompt(ctx),
        astroSchema,
        astroFallback(western, chinese, data.firstName)
      ),
      generateWithFallback(
        buildSynthesisPrompt(ctx),
        synthesisSchema,
        synthesisFallback(numerology, western, chinese, data.firstName)
      ),
      generateWithFallback(
        buildCyclesPrompt(ctx),
        cyclesSchema,
        cyclesFallback(numerology, data.firstName)
      ),
    ]);

    // Build report content
    const content = {
      sections: [
        {
          id: "numerology",
          title: "Your Pythagorean Numerology Profile",
          subtitle: `Life Path ${numerology.lifePath}`,
          type: "text",
          body: numResult.body || "",
          data: {
            numbers: {
              lifePath: numerology.lifePath,
              expression: numerology.expression,
              soulUrge: numerology.soulUrge,
              personality: numerology.personality,
              birthday: numerology.birthday,
              maturity: numerology.maturity,
              attitude: numerology.attitude,
            },
            practicalPrompt: numResult.practicalPrompt,
          },
        },
        {
          id: "astrology",
          title: "Your Western Astrology",
          subtitle: `Sun in ${western.sunSign}`,
          type: "text",
          body: astroResult.body || "",
          data: {
            sunSign: western.sunSign,
            sunElement: western.sunElement,
            reflectionQuestion: astroResult.reflectionQuestion,
          },
        },
        {
          id: "chinese",
          title: "Your Chinese Astrology",
          subtitle: `${chinese.animal} of ${chinese.element}`,
          type: "text",
          // Use the rich pre-written animal template (personalized), not a one-liner.
          body: chineseTemplate
            ? `${fillName(chineseTemplate.body, data.firstName)}\n\nYour element is ${chinese.element} and your energy is ${chinese.yinYang}.`
            : `Your Chinese zodiac animal is the ${chinese.animal}, associated with the element of ${chinese.element} and ${chinese.yinYang} energy.`,
          data: {
            animal: chinese.animal,
            element: chinese.element,
            yinYang: chinese.yinYang,
          },
        },
        {
          id: "synthesis",
          title: "Your Symbolic Synthesis",
          subtitle: "A mirror of your patterns",
          type: "text",
          body: synthResult.essence || "",
          data: {
            strengths: synthResult.strengths || [],
            growthAreas: synthResult.growthAreas || [],
            practices: synthResult.practices || [],
          },
        },
        {
          id: "cycles",
          title: "Your Current Cycles",
          subtitle: `Personal Year ${numerology.personalYear}`,
          type: "text",
          body: cyclesResult.body || "",
          data: {
            personalYear: numerology.personalYear,
            invitation: cyclesResult.invitation,
          },
        },
      ],
      summary: synthResult.essence || "",
      strengths: synthResult.strengths.map((s) => s.title),
      growthAreas: synthResult.growthAreas.map((g) => g.title),
      practicalTips: synthResult.practices.map((p) => p.title),
    };

    // Save to DB
    const report = await prisma.report.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        birthDate: new Date(data.birthDate),
        birthTime: birthTime ? new Date(`1970-01-01T${birthTime}`) : null,
        birthLocation: birthLocation,
        email: data.email,
        marketingConsent: data.marketingConsent || false,
        lifePathNumber: numerology.lifePath,
        expressionNumber: numerology.expression,
        soulUrgeNumber: numerology.soulUrge,
        personalityNumber: numerology.personality,
        birthdayNumber: numerology.birthday,
        maturityNumber: numerology.maturity,
        attitudeNumber: numerology.attitude,
        personalYear: numerology.personalYear,
        sunSign: western.sunSign,
        sunElement: western.sunElement,
        chineseAnimal: chinese.animal,
        chineseElement: chinese.element,
        yinYang: chinese.yinYang,
        content,
        status: "COMPLETED",
      },
    });

    // Deliver the report by email. Non-blocking on failure — the web report is
    // already saved, so a mail hiccup must not fail the request (PRD §20).
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "";
    const reportUrl = `${appUrl}/report/${report.id}`;
    await sendReportReadyEmail({
      to: data.email,
      firstName: data.firstName,
      reportUrl,
    });

    return NextResponse.json({
      id: report.id,
      status: "COMPLETED",
      reportUrl: `/report/${report.id}`,
    });
  } catch (error) {
    if (error instanceof EmptyNameError) {
      return NextResponse.json(
        { error: "Please enter a name using standard letters." },
        { status: 400 }
      );
    }
    console.error("Error creating report:", error);
    return NextResponse.json(
      { error: "Failed to generate report. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
