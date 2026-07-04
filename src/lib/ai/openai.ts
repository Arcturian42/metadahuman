import OpenAI from "openai";
import type { ZodSchema } from "zod";
import { SYSTEM_PROMPT } from "./prompts";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Generate one report section as validated JSON.
 *
 * The model must return JSON matching `schema`. If the call errors OR the output
 * fails schema validation, we retry (down to `retries`), then throw — the caller
 * (`generateWithFallback`) turns that into the template-based fallback so the
 * user never sees a broken section.
 */
export async function generateSection<T>(
  prompt: string,
  schema: ZodSchema<T>,
  retries = 2
): Promise<T> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: prompt },
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
      max_tokens: 1500,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) throw new Error("Empty response from OpenAI");

    const parsed = schema.safeParse(JSON.parse(content));
    if (!parsed.success) {
      throw new Error(`AI output failed schema validation: ${parsed.error.message}`);
    }
    return parsed.data;
  } catch (error) {
    if (retries > 0) {
      console.warn("OpenAI retry...", error);
      await new Promise((r) => setTimeout(r, 1000));
      return generateSection(prompt, schema, retries - 1);
    }
    console.error("OpenAI failed after retries:", error);
    throw error;
  }
}

/**
 * Run `generateSection` and return `fallback` (template-derived, on-brand) if it
 * throws for any reason. The fallback is always a complete, valid section.
 */
export async function generateWithFallback<T>(
  prompt: string,
  schema: ZodSchema<T>,
  fallback: T
): Promise<T> {
  try {
    return await generateSection(prompt, schema);
  } catch {
    console.warn("Using template fallback content");
    return fallback;
  }
}
