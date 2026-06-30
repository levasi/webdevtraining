import { z } from "zod";

export const difficultySchema = z.enum([
  "BEGINNER",
  "INTERMEDIATE",
  "ADVANCED",
]);

export const questionTypeSchema = z.enum([
  "EXPLANATION",
  "MULTIPLE_CHOICE",
  "TRUE_FALSE",
  "SHORT_ANSWER",
  "FLASHCARD",
]);

export const createQuestionSchema = z
  .object({
    categoryId: z.string().min(1),
    title: z.string().min(3).max(200),
    content: z.string().min(10),
    explanation: z.string().optional(),
    difficulty: difficultySchema,
    type: questionTypeSchema.default("EXPLANATION"),
    tags: z.array(z.string()).default([]),
    isPublished: z.boolean().default(true),
    answers: z
      .array(
        z.object({
          content: z.string().min(1),
          isCorrect: z.boolean(),
        }),
      )
      .min(1),
  })
  .superRefine((data, ctx) => {
    const correctCount = data.answers.filter((answer) => answer.isCorrect).length;

    if (
      data.type === "EXPLANATION" ||
      data.type === "FLASHCARD" ||
      data.type === "SHORT_ANSWER"
    ) {
      if (correctCount < 1) {
        ctx.addIssue({
          code: "custom",
          message: "Add at least one correct answer.",
          path: ["answers"],
        });
      }
      return;
    }

    if (data.answers.length < 2) {
      ctx.addIssue({
        code: "custom",
        message: "Multiple choice questions need at least two answers.",
        path: ["answers"],
      });
    }

    if (data.type === "TRUE_FALSE") {
      if (correctCount !== 1) {
        ctx.addIssue({
          code: "custom",
          message: "Select exactly one correct answer.",
          path: ["answers"],
        });
      }
      return;
    }

    if (data.type === "MULTIPLE_CHOICE" && correctCount < 1) {
      ctx.addIssue({
        code: "custom",
        message: "Select at least one correct answer.",
        path: ["answers"],
      });
    }
  });

export const updateQuestionSchema = z.object({
  questionId: z.string().min(1),
  categoryId: z.string().min(1),
  title: z.string().min(3).max(200),
  content: z.string().min(1),
  answers: z
    .array(
      z.object({
        id: z.string().min(1),
        content: z.string().min(1),
      }),
    )
    .min(1),
});

export const deleteQuestionSchema = z.object({
  questionId: z.string().min(1),
});

export const createChallengeSchema = z.object({
  categoryId: z.string().min(1),
  title: z.string().min(3).max(200),
  description: z.string().min(10),
  difficulty: difficultySchema,
  starterCode: z.string().min(1),
  solutionCode: z.string().min(1),
  testCases: z.array(
    z.object({
      input: z.unknown(),
      expectedOutput: z.unknown(),
      description: z.string().optional(),
    }),
  ),
  hints: z.array(z.string()).default([]),
});

export const runChallengeSchema = z.object({
  challengeId: z.string().min(1),
  code: z.string().min(1),
});

export const checkQuestionAnswerSchema = z.object({
  questionId: z.string().min(1),
  answerIds: z.array(z.string().min(1)).min(1),
});

export const noteSchema = z.object({
  questionId: z.string().optional(),
  content: z.string().min(1).max(5000),
});

export type CreateQuestionInput = z.infer<typeof createQuestionSchema>;
export type UpdateQuestionInput = z.infer<typeof updateQuestionSchema>;
export type CreateChallengeInput = z.infer<typeof createChallengeSchema>;
