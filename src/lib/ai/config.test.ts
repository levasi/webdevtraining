import { describe, expect, it } from "vitest";

import {
  DEFAULT_AI_CHAT_MODEL,
  getAiChatModelId,
} from "@/lib/ai/config";

describe("ai chat config", () => {
  it("defaults to a Groq free-tier friendly model", () => {
    const previous = process.env.AI_CHAT_MODEL;
    delete process.env.AI_CHAT_MODEL;
    expect(getAiChatModelId()).toBe(DEFAULT_AI_CHAT_MODEL);
    expect(DEFAULT_AI_CHAT_MODEL).toBe("llama-3.1-8b-instant");
    if (previous != null) {
      process.env.AI_CHAT_MODEL = previous;
    }
  });
});
