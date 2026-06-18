"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import {
  submitQuizSchema,
  type QuizAnswerResult,
  type QuizSubmitResult,
} from "@/lib/validators/quiz";
import type { ActionResult } from "@/types";

async function gradeQuiz(quizId: string, answers: { questionId: string; answerId: string }[]) {
  const quiz = await db.quiz.findUnique({
    where: { id: quizId, isPublished: true },
    include: {
      questions: {
        orderBy: { sortOrder: "asc" },
        include: {
          question: {
            include: {
              answers: { orderBy: { sortOrder: "asc" } },
            },
          },
        },
      },
    },
  });

  if (!quiz || quiz.questions.length === 0) {
    return null;
  }

  const questionIds = new Set(
    quiz.questions.map((entry) => entry.questionId),
  );

  for (const answer of answers) {
    if (!questionIds.has(answer.questionId)) {
      return null;
    }
  }

  const results: QuizAnswerResult[] = quiz.questions.map((entry) => {
    const question = entry.question;
    const submission = answers.find(
      (answer) => answer.questionId === question.id,
    );
    const correctAnswer = question.answers.find((answer) => answer.isCorrect);

    const isCorrect =
      !!submission &&
      !!correctAnswer &&
      submission.answerId === correctAnswer.id;

    return {
      questionId: question.id,
      answerId: submission?.answerId ?? "",
      isCorrect,
      correctAnswerId: correctAnswer?.id ?? "",
      explanation: question.explanation,
    };
  });

  const totalQuestions = results.length;
  const correctCount = results.filter((result) => result.isCorrect).length;
  const score =
    totalQuestions > 0
      ? Math.round((correctCount / totalQuestions) * 100)
      : 0;

  return {
    quiz,
    results,
    score,
    totalQuestions,
    correctCount,
  };
}

export async function submitQuizAttempt(
  input: unknown,
): Promise<ActionResult<QuizSubmitResult>> {
  const parsed = submitQuizSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: "Invalid quiz submission." };
  }

  const graded = await gradeQuiz(parsed.data.quizId, parsed.data.answers);

  if (!graded) {
    return { success: false, error: "Quiz not found." };
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return {
      success: true,
      data: {
        attemptId: null,
        saved: false,
        score: graded.score,
        totalQuestions: graded.totalQuestions,
        correctCount: graded.correctCount,
        results: graded.results,
      },
    };
  }

  const attempt = await db.quizAttempt.create({
    data: {
      userId: session.user.id,
      quizId: graded.quiz.id,
      score: graded.score,
      totalQuestions: graded.totalQuestions,
      answers: graded.results.map((result) => ({
        questionId: result.questionId,
        answerId: result.answerId,
        isCorrect: result.isCorrect,
      })),
      startedAt: parsed.data.startedAt
        ? new Date(parsed.data.startedAt)
        : new Date(),
      completedAt: new Date(),
    },
  });

  for (const result of graded.results) {
    await db.progress.upsert({
      where: {
        userId_questionId_mode: {
          userId: session.user.id,
          questionId: result.questionId,
          mode: "QUIZ",
        },
      },
      create: {
        userId: session.user.id,
        questionId: result.questionId,
        categoryId: graded.quiz.categoryId ?? undefined,
        mode: "QUIZ",
        status: result.isCorrect ? "COMPLETED" : "IN_PROGRESS",
        score: result.isCorrect ? 100 : 0,
        attempts: 1,
        lastStudiedAt: new Date(),
      },
      update: {
        attempts: { increment: 1 },
        status: result.isCorrect ? "COMPLETED" : "IN_PROGRESS",
        score: result.isCorrect ? 100 : undefined,
        lastStudiedAt: new Date(),
      },
    });
  }

  await db.studyHistory.create({
    data: {
      userId: session.user.id,
      mode: "QUIZ",
      duration: parsed.data.startedAt
        ? Math.round(
            (Date.now() - new Date(parsed.data.startedAt).getTime()) / 1000,
          )
        : undefined,
      metadata: {
        quizId: graded.quiz.id,
        score: graded.score,
        correctCount: graded.correctCount,
        totalQuestions: graded.totalQuestions,
      },
    },
  });

  // Backwards compat: /progress redirects to /completed
  revalidatePath("/completed");
  revalidatePath("/progress");
  revalidatePath("/quiz");

  return {
    success: true,
    data: {
      attemptId: attempt.id,
      saved: true,
      score: graded.score,
      totalQuestions: graded.totalQuestions,
      correctCount: graded.correctCount,
      results: graded.results,
    },
  };
}
