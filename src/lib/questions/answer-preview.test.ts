import { describe, expect, it } from "vitest";

import {
  getQuestionAnswerPreview,
  hasQuestionAnswerPreview,
} from "@/lib/questions/answer-preview";
import type { QuestionWithAnswers } from "@/types";

function question(
  answers: Array<{ content: string; isCorrect: boolean }>,
): QuestionWithAnswers {
  return {
    id: "q1",
    title: "Sample",
    content: "Question body",
    answers: answers.map((answer, index) => ({
      id: `a${index}`,
      questionId: "q1",
      content: answer.content,
      isCorrect: answer.isCorrect,
      sortOrder: index,
      explanation: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    })),
  } as QuestionWithAnswers;
}

describe("answer preview", () => {
  it("returns only correct answer contents", () => {
    const preview = getQuestionAnswerPreview(
      question([
        { content: "Right", isCorrect: true },
        { content: "Wrong", isCorrect: false },
        { content: "Also right", isCorrect: true },
      ]),
    );

    expect(preview.answers).toEqual(["Right", "Also right"]);
  });

  it("detects whether a preview exists", () => {
    expect(
      hasQuestionAnswerPreview(
        question([{ content: "Only wrong", isCorrect: false }]),
      ),
    ).toBe(false);
    expect(
      hasQuestionAnswerPreview(
        question([{ content: "Correct", isCorrect: true }]),
      ),
    ).toBe(true);
  });
});
