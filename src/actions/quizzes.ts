"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import {
  createGeneratedQuizId,
  pickRandomQuestionIds,
} from "@/lib/quiz/generate";
import { isQuizEligibleQuestion } from "@/lib/questions/quiz-eligible";
import type { ActionResult } from "@/types";

const saveQuizAttemptSchema = z.object({
  quizId: z.string().min(1),
  score: z.number().min(0).max(1),
  totalQuestions: z.number().int().positive(),
  answers: z.array(
    z.object({
      questionId: z.string().min(1),
      isCorrect: z.boolean(),
    }),
  ),
});

const generateQuizSchema = z.object({
  count: z.union([z.literal(5), z.literal(10), z.literal(15)]),
  categorySlug: z.string().min(1).optional(),
  difficulty: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]).optional(),
});

export async function saveQuizAttempt(
  input: unknown,
): Promise<ActionResult<{ attemptId: string | null }>> {
  const parsed = saveQuizAttemptSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: "Invalid quiz attempt." };
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return { success: true, data: { attemptId: null } };
  }

  const quiz = await db.quiz.findUnique({
    where: { id: parsed.data.quizId, isPublished: true },
    select: { id: true },
  });

  if (!quiz) {
    return { success: false, error: "Quiz not found." };
  }

  const attempt = await db.quizAttempt.create({
    data: {
      userId: session.user.id,
      quizId: quiz.id,
      score: parsed.data.score,
      totalQuestions: parsed.data.totalQuestions,
      answers: parsed.data.answers,
      completedAt: new Date(),
    },
    select: { id: true },
  });

  revalidatePath("/quiz");
  revalidatePath(`/quiz/${quiz.id}`);

  return { success: true, data: { attemptId: attempt.id } };
}

export async function generateQuiz(
  input: unknown,
): Promise<ActionResult<{ quizId: string }>> {
  const parsed = generateQuizSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: "Invalid quiz options." };
  }

  const { count, categorySlug, difficulty } = parsed.data;

  const category = categorySlug
    ? await db.category.findUnique({
        where: { slug: categorySlug },
        select: { id: true, name: true, slug: true },
      })
    : null;

  if (categorySlug && !category) {
    return { success: false, error: "Category not found." };
  }

  const candidates = await db.question.findMany({
    where: {
      isPublished: true,
      type: { in: ["MULTIPLE_CHOICE", "TRUE_FALSE"] },
      ...(category ? { categoryId: category.id } : {}),
      ...(difficulty ? { difficulty } : {}),
    },
    select: {
      id: true,
      type: true,
      difficulty: true,
      answers: { select: { id: true } },
    },
  });

  const eligibleIds = candidates
    .filter((question) =>
      isQuizEligibleQuestion({
        type: question.type,
        answers: question.answers,
      }),
    )
    .map((question) => question.id);

  if (eligibleIds.length === 0) {
    return {
      success: false,
      error: "No quiz-eligible questions match those filters.",
    };
  }

  const selectedIds = pickRandomQuestionIds(eligibleIds, count);
  const selectedSet = new Set(selectedIds);
  const selectedQuestions = candidates.filter((question) =>
    selectedSet.has(question.id),
  );

  const difficultyCounts = {
    BEGINNER: 0,
    INTERMEDIATE: 0,
    ADVANCED: 0,
  };
  for (const question of selectedQuestions) {
    difficultyCounts[question.difficulty] += 1;
  }

  const packDifficulty =
    difficulty ??
    (difficultyCounts.ADVANCED >= selectedIds.length / 2
      ? "ADVANCED"
      : difficultyCounts.BEGINNER >= selectedIds.length / 2
        ? "BEGINNER"
        : "INTERMEDIATE");

  const scopeLabel = category?.name ?? "all topics";
  const quizId = createGeneratedQuizId();

  await db.quiz.create({
    data: {
      id: quizId,
      title: `Generated quiz · ${selectedIds.length} questions`,
      description: `Random mix from ${scopeLabel}${
        difficulty ? ` (${difficulty.toLowerCase()})` : ""
      }.`,
      difficulty: packDifficulty,
      categoryId: category?.id ?? null,
      isPublished: true,
      questions: {
        create: selectedIds.map((questionId, sortOrder) => ({
          questionId,
          sortOrder,
        })),
      },
    },
  });

  revalidatePath("/quiz");
  if (category) {
    revalidatePath(`/categories/${category.slug}`);
  }

  return { success: true, data: { quizId } };
}
