import { describe, expect, it } from "vitest";

import {
  createGeneratedQuizId,
  isGeneratedQuizId,
  pickRandomQuestionIds,
} from "@/lib/quiz/generate";

describe("quiz generate helpers", () => {
  it("detects generated quiz ids", () => {
    expect(isGeneratedQuizId(createGeneratedQuizId())).toBe(true);
    expect(isGeneratedQuizId("seed-quiz-javascript-basics")).toBe(false);
  });

  it("picks up to the requested count without duplicates", () => {
    const ids = ["a", "b", "c", "d", "e"];
    const picked = pickRandomQuestionIds(ids, 3);
    expect(picked).toHaveLength(3);
    expect(new Set(picked).size).toBe(3);
    expect(picked.every((id) => ids.includes(id))).toBe(true);
  });

  it("caps at available question count", () => {
    expect(pickRandomQuestionIds(["a", "b"], 10)).toHaveLength(2);
    expect(pickRandomQuestionIds([], 5)).toEqual([]);
  });
});
