import { describe, expect, it } from "vitest";

import {
  buildQuestionDedupeKey,
  normalizeQuestionText,
} from "@/lib/questions/dedup";

describe("question dedup", () => {
  it("normalizes whitespace and casing", () => {
    expect(normalizeQuestionText("  Hello   World  ")).toBe("hello world");
  });

  it("builds stable dedupe keys", () => {
    const a = buildQuestionDedupeKey("What is a closure?", "Explain closures");
    const b = buildQuestionDedupeKey("what is a closure?", "explain   closures");
    expect(a).toBe(b);
  });
});
