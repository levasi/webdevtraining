import { describe, expect, it } from "vitest";

import {
  filterQuizEligibleQuestions,
  isQuizEligibleQuestion,
} from "@/lib/questions/quiz-eligible";

describe("quiz eligibility", () => {
  it("requires at least one answer", () => {
    expect(isQuizEligibleQuestion({ answers: [] })).toBe(false);
    expect(isQuizEligibleQuestion({ answers: [{ id: "a1" }] })).toBe(true);
  });

  it("filters eligible questions", () => {
    const questions = [
      { id: "q1", answers: [{ id: "a1" }] },
      { id: "q2", answers: [] },
      { id: "q3", answers: [{ id: "a2" }, { id: "a3" }] },
    ];

    expect(filterQuizEligibleQuestions(questions).map((q) => q.id)).toEqual([
      "q1",
      "q3",
    ]);
  });
});
