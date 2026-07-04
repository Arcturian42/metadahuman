import OpenAI from "openai";
import { SYSTEM_PROMPT } from "./prompts";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateSection(
  prompt: string,
  retries = 2
): Promise<unknown> {
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

    return JSON.parse(content);
  } catch (error) {
    if (retries > 0) {
      console.warn("OpenAI retry...", error);
      await new Promise((r) => setTimeout(r, 1000));
      return generateSection(prompt, retries - 1);
    }
    console.error("OpenAI failed after retries:", error);
    throw error;
  }
}

export async function generateWithFallback(
  prompt: string,
  fallback: unknown
): Promise<unknown> {
  try {
    return await generateSection(prompt);
  } catch {
    console.warn("Using fallback content");
    return fallback;
  }
}
