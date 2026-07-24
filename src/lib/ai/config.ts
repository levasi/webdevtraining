import { groq } from "@ai-sdk/groq";
import type { LanguageModel } from "ai";

/**
 * Default Groq model — fast free-tier friendly for interview Q&A.
 * Override with AI_CHAT_MODEL (e.g. llama-3.3-70b-versatile).
 */
export const DEFAULT_AI_CHAT_MODEL = "llama-3.1-8b-instant";

export function getAiChatModelId(): string {
  return process.env.AI_CHAT_MODEL?.trim() || DEFAULT_AI_CHAT_MODEL;
}

/** Groq language model for Ask AI (uses GROQ_API_KEY). */
export function getAiChatModel(): LanguageModel {
  return groq(getAiChatModelId());
}
