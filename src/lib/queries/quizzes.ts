import { cache } from "react";

import { db } from "@/lib/db";
import { isQuizEligibleQuestion } from "@/lib/questions/quiz-eligible";
import type { QuestionWithAnswers } from "@/types";

export type QuizPackSummary = {
  id: string;
  title: string;
  description: string | null;
  difficulty: QuestionWithAnswers["difficulty"] | null;
  timeLimit: number | null;
  questionCount: number;
  category: {
    id: string;
    name: string;
    slug: string;
  } | null;
};

export type QuizPackDetail = {
  id: string;
  title: string;
  description: string | null;
  difficulty: QuestionWithAnswers["difficulty"] | null;
  timeLimit: number | null;
  category: {
    id: string;
    name: string;
    slug: string;
  } | null;
  questions: QuestionWithAnswers[];
};

export const getPublishedQuizzes = cache(
  async (categorySlug?: string): Promise<QuizPackSummary[]> => {
    const quizzes = await db.quiz.findMany({
      where: {
        isPublished: true,
        ...(categorySlug
          ? { category: { slug: categorySlug } }
          : {}),
      },
      select: {
        id: true,
        title: true,
        description: true,
        difficulty: true,
        timeLimit: true,
        category: { select: { id: true, name: true, slug: true } },
        questions: {
          select: {
            question: {
              select: {
                id: true,
                type: true,
                isPublished: true,
                answers: { select: { id: true } },
              },
            },
          },
        },
      },
      orderBy: [{ createdAt: "desc" }, { title: "asc" }],
    });

    return quizzes
      .map((quiz) => {
        const eligibleCount = quiz.questions.filter(
          ({ question }) =>
            question.isPublished &&
            isQuizEligibleQuestion({
              type: question.type,
              answers: question.answers,
            }),
        ).length;

        return {
          id: quiz.id,
          title: quiz.title,
          description: quiz.description,
          difficulty: quiz.difficulty,
          timeLimit: quiz.timeLimit,
          questionCount: eligibleCount,
          category: quiz.category,
        };
      })
      .filter((quiz) => quiz.questionCount > 0);
  },
);

export const getQuizById = cache(
  async (id: string): Promise<QuizPackDetail | null> => {
    const quiz = await db.quiz.findUnique({
      where: { id, isPublished: true },
      select: {
        id: true,
        title: true,
        description: true,
        difficulty: true,
        timeLimit: true,
        category: { select: { id: true, name: true, slug: true } },
        questions: {
          orderBy: { sortOrder: "asc" },
          select: {
            question: {
              include: {
                answers: { orderBy: { sortOrder: "asc" } },
                category: { select: { id: true, name: true, slug: true } },
              },
            },
          },
        },
      },
    });

    if (!quiz) {
      return null;
    }

    const questions = quiz.questions
      .map(({ question }) => question)
      .filter(
        (question) =>
          question.isPublished &&
          isQuizEligibleQuestion({
            type: question.type,
            answers: question.answers,
          }),
      ) as QuestionWithAnswers[];

    if (questions.length === 0) {
      return null;
    }

    return {
      id: quiz.id,
      title: quiz.title,
      description: quiz.description,
      difficulty: quiz.difficulty,
      timeLimit: quiz.timeLimit,
      category: quiz.category,
      questions,
    };
  },
);
