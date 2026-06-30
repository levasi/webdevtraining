import { unstable_cache } from "next/cache";
import { cache } from "react";

import { db } from "@/lib/db";
import type { Question } from "@/generated/prisma/client";
import type { CategorySummary, QuestionWithAnswers } from "@/types";

const CATEGORY_REVALIDATE_SECONDS = 300;

async function fetchCategories(): Promise<CategorySummary[]> {
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
          articles: { where: { isPublished: true } },
        },
      },
    },
  });
}

async function fetchCategoryBySlug(slug: string) {
  return db.category.findUnique({
    where: { slug },
    include: {
      questions: {
        where: { isPublished: true },
        include: {
          answers: {
            orderBy: { sortOrder: "asc" },
            select: { id: true, sortOrder: true, isCorrect: true },
          },
          category: { select: { id: true, name: true, slug: true } },
        },
        orderBy: [{ difficulty: "asc" }, { title: "asc" }],
      },
      challenges: {
        where: { isPublished: true },
        orderBy: [{ difficulty: "asc" }, { title: "asc" }],
      },
      articles: {
        where: { isPublished: true },
        orderBy: [{ sortOrder: "asc" }, { title: "asc" }],
      },
    },
  });
}

export const getCategories = cache(async (): Promise<CategorySummary[]> =>
  unstable_cache(fetchCategories, ["categories-list"], {
    revalidate: CATEGORY_REVALIDATE_SECONDS,
    tags: ["categories"],
  })(),
);

export const getCategoryBySlug = cache(async (slug: string) =>
  unstable_cache(
    () => fetchCategoryBySlug(slug),
    ["category-by-slug", slug],
    {
      revalidate: CATEGORY_REVALIDATE_SECONDS,
      tags: ["categories", `category-${slug}`],
    },
  )(),
);

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

export async function getPublishedArticles(categorySlug?: string) {
  return db.article.findMany({
    where: {
      isPublished: true,
      ...(categorySlug ? { category: { slug: categorySlug } } : {}),
    },
    include: {
      category: { select: { id: true, name: true, slug: true } },
    },
    orderBy: [{ sortOrder: "asc" }, { title: "asc" }],
  });
}

export async function getArticleById(id: string) {
  return db.article.findUnique({
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

export type CategoryNavQuestion = Pick<Question, "id" | "title" | "difficulty">;

export type CategoryNavData = {
  category: {
    name: string;
    slug: string;
    questionCount: number;
  };
  questions: CategoryNavQuestion[];
};

export async function getCategoryNav(
  slug: string,
): Promise<CategoryNavData | null> {
  const category = await db.category.findUnique({
    where: { slug },
    select: { id: true, name: true, slug: true },
  });

  if (!category) {
    return null;
  }

  const questions = await db.question.findMany({
    where: { isPublished: true, categoryId: category.id },
    select: { id: true, title: true, difficulty: true },
    orderBy: [{ difficulty: "asc" }, { title: "asc" }],
  });

  return {
    category: {
      name: category.name,
      slug: category.slug,
      questionCount: questions.length,
    },
    questions,
  };
}
