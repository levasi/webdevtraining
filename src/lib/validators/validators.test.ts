import { describe, expect, it } from "vitest";

import { createQuestionSchema } from "@/lib/validators/content";
import { contentProposalSchema } from "@/lib/validators/proposal";
import { submitQuizSchema } from "@/lib/validators/quiz";

describe("quiz validators", () => {
  it("accepts a valid quiz submission payload", () => {
    const result = submitQuizSchema.safeParse({
      quizId: "quiz-1",
      answers: [
        { questionId: "q-1", answerId: "a-1" },
        { questionId: "q-2", answerId: "a-2" },
      ],
      startedAt: new Date().toISOString(),
    });

    expect(result.success).toBe(true);
  });
});

describe("contentProposalSchema", () => {
  it("accepts a valid content proposal", () => {
    const result = contentProposalSchema.safeParse({
      contentType: "QUESTION",
      categorySlug: "javascript",
      title: "What does optional chaining return?",
      description:
        "A multiple-choice question about optional chaining when a nested property is missing.",
      details: "Correct answer: undefined",
      submitterName: "Alex",
      submitterEmail: "alex@example.com",
    });

    expect(result.success).toBe(true);
  });
});

describe("createQuestionSchema", () => {
  it("allows multiple correct answers for multiple choice", () => {
    const result = createQuestionSchema.safeParse({
      categoryId: "cat-1",
      title: "Sample question title",
      content: "What does this JavaScript feature do?",
      difficulty: "BEGINNER",
      type: "MULTIPLE_CHOICE",
      tags: [],
      isPublished: true,
      answers: [
        { content: "Option A", isCorrect: true },
        { content: "Option B", isCorrect: true },
        { content: "Option C", isCorrect: false },
      ],
    });

    expect(result.success).toBe(true);
  });

  it("requires exactly one correct answer for true or false", () => {
    const result = createQuestionSchema.safeParse({
      categoryId: "cat-1",
      title: "Sample question title",
      content: "What does this JavaScript feature do?",
      difficulty: "BEGINNER",
      type: "TRUE_FALSE",
      tags: [],
      isPublished: true,
      answers: [
        { content: "Option A", isCorrect: true },
        { content: "Option B", isCorrect: true },
      ],
    });

    expect(result.success).toBe(false);
  });

  it("allows a single correct answer for flashcards", () => {
    const result = createQuestionSchema.safeParse({
      categoryId: "cat-1",
      title: "Sample flashcard title",
      content: "Explain event bubbling in the DOM.",
      difficulty: "INTERMEDIATE",
      type: "FLASHCARD",
      tags: ["dom"],
      isPublished: true,
      answers: [{ content: "Events propagate from target to ancestors.", isCorrect: true }],
    });

    expect(result.success).toBe(true);
  });
});
