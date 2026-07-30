import { describe, expect, it } from "vitest";

import {
  filterQuizEligibleQuestions,
  isQuizEligibleQuestion,
} from "@/lib/questions/quiz-eligible";

describe("quiz eligibility", () => {
  it("requires MULTIPLE_CHOICE or TRUE_FALSE with at least two answers", () => {
    expect(
      isQuizEligibleQuestion({
        type: "FLASHCARD",
        answers: [{ id: "a1" }],
      }),
    ).toBe(false);
    expect(
      isQuizEligibleQuestion({
        type: "MULTIPLE_CHOICE",
        answers: [{ id: "a1" }],
      }),
    ).toBe(false);
    expect(
      isQuizEligibleQuestion({
        type: "MULTIPLE_CHOICE",
        answers: [{ id: "a1" }, { id: "a2" }],
      }),
    ).toBe(true);
    expect(
      isQuizEligibleQuestion({
        type: "TRUE_FALSE",
        answers: [{ id: "a1" }, { id: "a2" }],
      }),
    ).toBe(true);
  });

  it("filters eligible questions", () => {
    const questions = [
      {
        id: "q1",
        type: "FLASHCARD",
        answers: [{ id: "a1" }],
      },
      {
        id: "q2",
        type: "MULTIPLE_CHOICE",
        answers: [],
      },
      {
        id: "q3",
        type: "MULTIPLE_CHOICE",
        answers: [{ id: "a2" }, { id: "a3" }],
      },
      {
        id: "q4",
        type: "TRUE_FALSE",
        answers: [{ id: "a4" }, { id: "a5" }],
      },
    ];

    expect(filterQuizEligibleQuestions(questions).map((q) => q.id)).toEqual([
      "q3",
      "q4",
    ]);
  });
});
