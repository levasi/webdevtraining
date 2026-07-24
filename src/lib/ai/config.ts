import { createGroq } from "@ai-sdk/groq";
import type { LanguageModel } from "ai";

/**
 * Default Groq model — fast free-tier friendly for interview Q&A.
 * Override with AI_CHAT_MODEL (e.g. llama-3.3-70b-versatile).
 */
export const DEFAULT_AI_CHAT_MODEL = "llama-3.1-8b-instant";

function isAsciiByteString(value: string): boolean {
  for (let index = 0; index < value.length; index += 1) {
    if (value.charCodeAt(index) > 255) {
      return false;
    }
  }
  return true;
}

export function getAiChatModelId(): string {
  const configured = process.env.AI_CHAT_MODEL?.trim();
  if (!configured) {
    return DEFAULT_AI_CHAT_MODEL;
  }
  if (!isAsciiByteString(configured)) {
    throw new Error(
      "AI_CHAT_MODEL contains non-ASCII characters. Use a plain Groq model id.",
    );
  }
  return configured;
}

export function getGroqApiKey(): string {
  const key = process.env.GROQ_API_KEY?.trim() ?? "";
  if (!key) {
    throw new Error(
      "GROQ_API_KEY is missing. Set it in Vercel project env (Production) or .env.local.",
    );
  }
  if (!isAsciiByteString(key)) {
    throw new Error(
      "GROQ_API_KEY contains non-ASCII characters (often from a polluted env value). Re-add a clean key from https://console.groq.com/keys.",
    );
  }
  return key;
}

/** Groq language model for Ask AI (uses GROQ_API_KEY). */
export function getAiChatModel(): LanguageModel {
  const groq = createGroq({ apiKey: getGroqApiKey() });
  return groq(getAiChatModelId());
}
