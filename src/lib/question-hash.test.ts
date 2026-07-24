import { describe, expect, it } from "vitest";

import {
  categoryQuestionHref,
  getQuestionIdFromHash,
  questionElementId,
} from "@/lib/question-hash";

describe("question hash helpers", () => {
  it("builds element ids and category deep links", () => {
    expect(questionElementId("abc")).toBe("question-abc");
    expect(categoryQuestionHref("javascript", "abc")).toBe(
      "/categories/javascript#question-abc",
    );
  });

  it("parses question ids from hashes", () => {
    expect(getQuestionIdFromHash("#question-abc")).toBe("abc");
    expect(getQuestionIdFromHash("question-abc")).toBe("abc");
    expect(getQuestionIdFromHash("#other")).toBeNull();
    expect(getQuestionIdFromHash("#question-")).toBeNull();
  });
});
