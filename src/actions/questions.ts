"use server";

import { db } from "@/lib/db";
import { checkQuestionAnswerSchema } from "@/lib/validators/content";
import type { ActionResult } from "@/types";

export type QuestionCheckResult = {
  isCorrect: boolean;
  correctAnswerIds: string[];
  correctAnswerContents: string[];
  explanation: string | null;
};

export async function checkQuestionAnswer(
  input: unknown,
): Promise<ActionResult<QuestionCheckResult>> {
  const parsed = checkQuestionAnswerSchema.safeParse(input);

  if (!parsed.success) {
    return { success: false, error: "Invalid answer submission." };
  }

  const question = await db.question.findUnique({
    where: { id: parsed.data.questionId, isPublished: true },
    include: {
      answers: { orderBy: { sortOrder: "asc" } },
    },
  });

  if (!question) {
    return { success: false, error: "Question not found." };
  }

  const answerIds = new Set(question.answers.map((answer) => answer.id));
  const selectedIds = [...new Set(parsed.data.answerIds)];

  if (selectedIds.some((answerId) => !answerIds.has(answerId))) {
    return { success: false, error: "Answer not found for this question." };
  }

  const correctAnswers = question.answers.filter((answer) => answer.isCorrect);

  if (correctAnswers.length === 0) {
    return { success: false, error: "This question has no correct answer set." };
  }

  const correctAnswerIds = correctAnswers.map((answer) => answer.id);
  const selectedSet = new Set(selectedIds);
  const correctSet = new Set(correctAnswerIds);
  const isCorrect =
    selectedSet.size === correctSet.size &&
    correctAnswerIds.every((answerId) => selectedSet.has(answerId));

  return {
    success: true,
    data: {
      isCorrect,
      correctAnswerIds,
      correctAnswerContents: correctAnswers.map((answer) => answer.content),
      explanation: question.explanation,
    },
  };
}
