import { describe, expect, it } from "vitest";

import { questionHasAnswerContent } from "@/lib/questions/has-answer-content";

describe("questionHasAnswerContent", () => {
  it("is true when any answer includes a content string", () => {
    expect(
      questionHasAnswerContent({
        answers: [{ id: "1", sortOrder: 0, isCorrect: true, content: "Yes" }],
      } as never),
    ).toBe(true);
  });

  it("is false when answers only have metadata", () => {
    expect(
      questionHasAnswerContent({
        answers: [{ id: "1", sortOrder: 0, isCorrect: true }],
      } as never),
    ).toBe(false);
  });
});
