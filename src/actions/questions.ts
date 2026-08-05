"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

import { auth } from "@/lib/auth";
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

/** Marks a quiz question completed (QUIZ mode). No-op when signed out. */
export async function markQuizQuestionCompleted(
  questionId: string,
): Promise<ActionResult<{ completed: boolean }>> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return { success: true, data: { completed: false } };
  }

  const question = await db.question.findUnique({
    where: { id: questionId, isPublished: true },
    select: { id: true },
  });

  if (!question) {
    return { success: false, error: "Question not found." };
  }

  await db.progress.upsert({
    where: {
      userId_questionId_mode: {
        userId: session.user.id,
        questionId,
        mode: "QUIZ",
      },
    },
    create: {
      userId: session.user.id,
      questionId,
      mode: "QUIZ",
      status: "COMPLETED",
      attempts: 1,
      lastStudiedAt: new Date(),
    },
    update: {
      status: "COMPLETED",
      lastStudiedAt: new Date(),
      attempts: { increment: 1 },
    },
  });

  // Avoid revalidating /categories here — soft refresh remounts practice
  // quiz pickers mid-answer. Progress pages still update on next visit.
  revalidatePath("/quiz");
  revalidatePath("/completed");

  return { success: true, data: { completed: true } };
}
