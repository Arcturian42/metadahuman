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
import { EmptyNameError } from "@/lib/calculations/normalize";

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

    const ctx = {
      firstName: data.firstName,
      numerology,
      western,
      chinese,
      currentYear,
    };

    // Generate AI content in parallel with fallbacks
    const [numResult, astroResult, synthResult, cyclesResult] = await Promise.all([
      generateWithFallback(buildNumerologyPrompt(ctx), {
        title: `Life Path ${numerology.lifePath}`,
        body: "Your numerology profile reveals unique patterns in your name and birth date.",
        practicalPrompt: "Reflect on how your core number shows up in your daily decisions.",
        note: "This is a symbolic reflection tool.",
      }),
      generateWithFallback(buildAstroPrompt(ctx), {
        title: `Sun in ${western.sunSign}`,
        body: `Your Sun sign in ${western.sunSign} suggests a core identity shaped by ${western.sunElement} energy.`,
        reflectionQuestion: "How does your Sun sign express itself in your closest relationships?",
      }),
      generateWithFallback(buildSynthesisPrompt(ctx), {
        essence: `You carry a unique blend of ${western.sunSign} energy and ${chinese.animal} spirit.`,
        strengths: [
          { title: "Intuitive Awareness", description: "You sense patterns others miss." },
          { title: "Creative Expression", description: "You find unique ways to communicate." },
          { title: "Resilient Spirit", description: "You adapt and grow through challenges." },
        ],
        growthAreas: [
          { title: "Balance", invitation: "Explore how you balance independence with connection." },
        ],
        practices: [
          { title: "Morning Reflection", description: "Spend 5 minutes journaling your intentions.", duration: "5 min", frequency: "Daily" },
        ],
      }),
      generateWithFallback(buildCyclesPrompt(ctx), {
        title: `Personal Year ${numerology.personalYear}`,
        body: `This year invites you to explore the energy of ${numerology.personalYear}.`,
        invitation: "Notice what themes keep appearing in your life right now.",
      }),
    ]);

    // Build report content
    const content = {
      sections: [
        {
          id: "numerology",
          title: "Your Pythagorean Numerology Profile",
          subtitle: `Life Path ${numerology.lifePath}`,
          type: "text",
          body: (numResult as any).body || "",
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
            practicalPrompt: (numResult as any).practicalPrompt,
          },
        },
        {
          id: "astrology",
          title: "Your Western Astrology",
          subtitle: `Sun in ${western.sunSign}`,
          type: "text",
          body: (astroResult as any).body || "",
          data: {
            sunSign: western.sunSign,
            sunElement: western.sunElement,
            reflectionQuestion: (astroResult as any).reflectionQuestion,
          },
        },
        {
          id: "chinese",
          title: "Your Chinese Astrology",
          subtitle: `${chinese.animal} of ${chinese.element}`,
          type: "text",
          body: `Your Chinese zodiac animal is the ${chinese.animal}, associated with the element of ${chinese.element} and ${chinese.yinYang} energy.`,
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
          body: (synthResult as any).essence || "",
          data: {
            strengths: (synthResult as any).strengths || [],
            growthAreas: (synthResult as any).growthAreas || [],
            practices: (synthResult as any).practices || [],
          },
        },
        {
          id: "cycles",
          title: "Your Current Cycles",
          subtitle: `Personal Year ${numerology.personalYear}`,
          type: "text",
          body: (cyclesResult as any).body || "",
          data: {
            personalYear: numerology.personalYear,
            invitation: (cyclesResult as any).invitation,
          },
        },
      ],
      summary: (synthResult as any).essence || "",
      strengths: ((synthResult as any).strengths || []).map((s: any) => s.title),
      growthAreas: ((synthResult as any).growthAreas || []).map((g: any) => g.title),
      practicalTips: ((synthResult as any).practices || []).map((p: any) => p.title),
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

    // TODO: Send email via Resend (V1)
    // await sendReportEmail(report.id, data.email, content);

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
