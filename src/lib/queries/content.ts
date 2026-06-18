import { db } from "@/lib/db";
import type { CategorySummary, QuestionWithAnswers } from "@/types";

export async function getCategories(): Promise<CategorySummary[]> {
  return db.category.findMany({
    orderBy: { sortOrder: "asc" },
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      icon: true,
      _count: {
        select: {
          questions: { where: { isPublished: true } },
          challenges: { where: { isPublished: true } },
        },
      },
    },
  });
}

export async function getCategoryBySlug(slug: string) {
  return db.category.findUnique({
    where: { slug },
    include: {
      questions: {
        where: { isPublished: true },
        include: {
          answers: { orderBy: { sortOrder: "asc" } },
          category: { select: { id: true, name: true, slug: true } },
        },
        orderBy: [{ difficulty: "asc" }, { title: "asc" }],
      },
      challenges: {
        where: { isPublished: true },
        orderBy: [{ difficulty: "asc" }, { title: "asc" }],
      },
      quizzes: {
        where: { isPublished: true },
        include: {
          _count: { select: { questions: true } },
        },
        orderBy: [{ title: "asc" }],
      },
    },
  });
}

export async function getPublishedQuestions(filters?: {
  categorySlug?: string;
  difficulty?: string;
  type?: string;
}): Promise<QuestionWithAnswers[]> {
  return db.question.findMany({
    where: {
      isPublished: true,
      ...(filters?.categorySlug
        ? { category: { slug: filters.categorySlug } }
        : {}),
      ...(filters?.difficulty
        ? { difficulty: filters.difficulty as QuestionWithAnswers["difficulty"] }
        : {}),
      ...(filters?.type
        ? { type: filters.type as QuestionWithAnswers["type"] }
        : {}),
    },
    include: {
      answers: { orderBy: { sortOrder: "asc" } },
      category: { select: { id: true, name: true, slug: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getQuestionById(id: string) {
  return db.question.findUnique({
    where: { id, isPublished: true },
    include: {
      answers: { orderBy: { sortOrder: "asc" } },
      category: { select: { id: true, name: true, slug: true } },
    },
  });
}

export async function getPublishedChallenges(categorySlug?: string) {
  return db.challenge.findMany({
    where: {
      isPublished: true,
      ...(categorySlug ? { category: { slug: categorySlug } } : {}),
    },
    include: {
      category: { select: { id: true, name: true, slug: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getChallengeById(id: string) {
  return db.challenge.findUnique({
    where: { id, isPublished: true },
    include: {
      category: { select: { id: true, name: true, slug: true } },
    },
  });
}

export async function getQuizById(id: string) {
  const quiz = await db.quiz.findUnique({
    where: { id, isPublished: true },
    include: {
      category: { select: { id: true, name: true, slug: true } },
      questions: {
        orderBy: { sortOrder: "asc" },
        include: {
          question: {
            include: {
              answers: {
                orderBy: { sortOrder: "asc" },
                select: { id: true, content: true },
              },
            },
          },
        },
      },
    },
  });

  if (!quiz) {
    return null;
  }

  return {
    id: quiz.id,
    title: quiz.title,
    description: quiz.description,
    timeLimit: quiz.timeLimit,
    category: quiz.category,
    questions: quiz.questions
      .filter((entry) => entry.question.isPublished)
      .map((entry) => ({
        id: entry.question.id,
        title: entry.question.title,
        content: entry.question.content,
        type: entry.question.type,
        answers: entry.question.answers,
      })),
  };
}
