/**
 * Zod schemas for the four AI section outputs. Every model response is validated
 * before it can reach the DB; on failure the caller retries once, then falls back
 * to template text (ai-content-agent DoD).
 */
import { z } from "zod";

export const numerologySchema = z.object({
  title: z.string().min(1),
  body: z.string().min(1),
  practicalPrompt: z.string().min(1),
  note: z.string().optional().default(""),
});

export const astroSchema = z.object({
  title: z.string().min(1),
  body: z.string().min(1),
  reflectionQuestion: z.string().min(1),
});

export const synthesisSchema = z.object({
  essence: z.string().min(1),
  strengths: z
    .array(z.object({ title: z.string().min(1), description: z.string().min(1) }))
    .min(1),
  growthAreas: z
    .array(z.object({ title: z.string().min(1), invitation: z.string().min(1) }))
    .min(1),
  practices: z
    .array(
      z.object({
        title: z.string().min(1),
        description: z.string().min(1),
        duration: z.string().min(1),
        frequency: z.string().min(1),
      })
    )
    .min(1),
});

export const cyclesSchema = z.object({
  title: z.string().min(1),
  body: z.string().min(1),
  invitation: z.string().min(1),
});

export type NumerologySection = z.infer<typeof numerologySchema>;
export type AstroSection = z.infer<typeof astroSchema>;
export type SynthesisSection = z.infer<typeof synthesisSchema>;
export type CyclesSection = z.infer<typeof cyclesSchema>;
