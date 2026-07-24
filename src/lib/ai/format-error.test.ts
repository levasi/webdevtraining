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

  it("explains ByteString header corruption", () => {
    expect(
      formatAiChatError(
        new Error(
          "Cannot convert argument to a ByteString because the character at index 7 has a value of 9671 which is greater than 255.",
        ),
      ),
    ).toMatch(/GROQ_API_KEY|non-ASCII|corrupted/i);
  });
});
