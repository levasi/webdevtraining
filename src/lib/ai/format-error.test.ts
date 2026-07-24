import { describe, expect, it } from "vitest";

import { formatAiChatError } from "@/lib/ai/format-error";

describe("formatAiChatError", () => {
  it("explains credit card verification for Gateway free unlock", () => {
    expect(
      formatAiChatError(
        new Error(
          "AI Gateway requires a valid credit card on file to service requests.",
        ),
      ),
    ).toMatch(/credit card/i);
  });

  it("explains missing API credentials", () => {
    expect(formatAiChatError(new Error("Unauthorized API key"))).toMatch(
      /GROQ_API_KEY|console\.groq\.com/i,
    );
  });
});
