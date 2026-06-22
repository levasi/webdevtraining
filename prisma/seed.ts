import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

import { CATEGORIES } from "../src/lib/constants";
import {
  getDirectDatabaseConnectionString,
  loadProjectEnv,
} from "../src/lib/database-url";
import { ALL_ARTICLES } from "./data/articles";
import { ALL_CHALLENGES } from "./data/challenges";
import { ALL_SEED_QUESTIONS } from "./data";
import { PrismaClient } from "../src/generated/prisma/client";
import type { Prisma } from "../src/generated/prisma/client";

loadProjectEnv();
const connectionString = getDirectDatabaseConnectionString();

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function seedCategories() {
  for (const [index, category] of CATEGORIES.entries()) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {
        name: category.name,
        icon: category.icon,
        sortOrder: index,
      },
      create: {
        name: category.name,
        slug: category.slug,
        description: `Interview questions and challenges for ${category.name}.`,
        icon: category.icon,
        sortOrder: index,
      },
    });
  }
}

async function seedQuestions() {
  const categories = await prisma.category.findMany();
  const categoryBySlug = new Map(categories.map((c) => [c.slug, c.id]));

  for (const question of ALL_SEED_QUESTIONS) {
    const categoryId = categoryBySlug.get(question.categorySlug);
    if (!categoryId) {
      console.warn(`Skipping ${question.id}: unknown category ${question.categorySlug}`);
      continue;
    }

    await prisma.question.upsert({
      where: { id: question.id },
      update: {
        categoryId,
        title: question.title,
        content: question.content,
        explanation: question.explanation,
        difficulty: question.difficulty,
        type: question.type,
        tags: question.tags,
        isPublished: true,
        answers: {
          deleteMany: {},
          create: question.answers.map((answer, index) => ({
            content: answer.content,
            isCorrect: answer.isCorrect,
            sortOrder: index,
          })),
        },
      },
      create: {
        id: question.id,
        categoryId,
        title: question.title,
        content: question.content,
        explanation: question.explanation,
        difficulty: question.difficulty,
        type: question.type,
        tags: question.tags,
        isPublished: true,
        answers: {
          create: question.answers.map((answer, index) => ({
            content: answer.content,
            isCorrect: answer.isCorrect,
            sortOrder: index,
          })),
        },
      },
    });
  }
}

async function seedChallenges() {
  const categories = await prisma.category.findMany();
  const categoryBySlug = new Map(categories.map((c) => [c.slug, c.id]));

  for (const challenge of ALL_CHALLENGES) {
    const categoryId = categoryBySlug.get(challenge.categorySlug);
    if (!categoryId) {
      console.warn(`Skipping ${challenge.id}: unknown category ${challenge.categorySlug}`);
      continue;
    }

    await prisma.challenge.upsert({
      where: { id: challenge.id },
      update: {
        categoryId,
        title: challenge.title,
        description: challenge.description,
        difficulty: challenge.difficulty,
        starterCode: challenge.starterCode,
        solutionCode: challenge.solutionCode,
        testCases: challenge.testCases as Prisma.InputJsonValue,
        hints: challenge.hints,
        isPublished: true,
      },
      create: {
        id: challenge.id,
        categoryId,
        title: challenge.title,
        description: challenge.description,
        difficulty: challenge.difficulty,
        starterCode: challenge.starterCode,
        solutionCode: challenge.solutionCode,
        testCases: challenge.testCases as Prisma.InputJsonValue,
        hints: challenge.hints,
        isPublished: true,
      },
    });
  }
}

async function seedQuizzes() {
  const categories = await prisma.category.findMany();
  const categoryBySlug = new Map(categories.map((c) => [c.slug, c]));

  const quizDefs = [
    {
      id: "seed-quiz-javascript-basics",
      title: "JavaScript Basics Quiz",
      slug: "javascript",
      description: "Core JavaScript concepts for interviews.",
      difficulty: "INTERMEDIATE" as const,
      timeLimit: 600,
      questionIds: ALL_SEED_QUESTIONS.filter((q) => q.categorySlug === "javascript")
        .slice(0, 8)
        .map((q) => q.id),
    },
    {
      id: "seed-quiz-js-types-coercion",
      title: "JavaScript Types & Coercion",
      slug: "javascript",
      description: "typeof quirks, equality, const semantics, and modern operators.",
      difficulty: "BEGINNER" as const,
      timeLimit: 300,
      questionIds: [
        "seed-js-typeof-null",
        "seed-js-equality",
        "seed-js-const-array",
        "seed-js-nullish-coalescing",
        "seed-js-optional-chaining",
      ],
    },
    {
      id: "seed-quiz-js-functions-scope",
      title: "JavaScript Functions & Scope",
      slug: "javascript",
      description: "Closures, hoisting, this binding, and function patterns.",
      difficulty: "INTERMEDIATE" as const,
      timeLimit: 360,
      questionIds: [
        "seed-js-closure",
        "seed-js-hoisting",
        "seed-js-this-arrow",
        "seed-js-debounce",
        "seed-js-spread-shallow",
      ],
    },
    {
      id: "seed-quiz-js-async",
      title: "JavaScript Async Quiz",
      slug: "javascript",
      description: "Event loop, Promises, and async-related runtime behavior.",
      difficulty: "INTERMEDIATE" as const,
      timeLimit: 360,
      questionIds: [
        "seed-js-event-loop",
        "seed-js-promises",
        "seed-js-json-parse",
        "seed-js-debounce",
        "seed-js-closure",
      ],
    },
    {
      id: "seed-quiz-js-data-structures",
      title: "JavaScript Data Structures",
      slug: "javascript",
      description: "Maps, spread copies, JSON, and collection gotchas.",
      difficulty: "INTERMEDIATE" as const,
      timeLimit: 360,
      questionIds: [
        "seed-js-map-vs-object",
        "seed-js-spread-shallow",
        "seed-js-const-array",
        "seed-js-json-parse",
        "seed-js-optional-chaining",
      ],
    },
    {
      id: "seed-quiz-js-dom-events",
      title: "JavaScript DOM & Events",
      slug: "javascript",
      description: "DOM event patterns, delegation, and browser runtime concepts.",
      difficulty: "INTERMEDIATE" as const,
      timeLimit: 360,
      questionIds: [
        "seed-js-event-delegation",
        "seed-js-event-loop",
        "seed-js-this-arrow",
        "seed-js-debounce",
        "seed-js-json-parse",
      ],
    },
    {
      id: "seed-quiz-react-fundamentals",
      title: "React Fundamentals Quiz",
      slug: "react",
      description: "Hooks, rendering, and component patterns.",
      difficulty: "INTERMEDIATE" as const,
      timeLimit: 600,
      questionIds: ALL_SEED_QUESTIONS.filter((q) => q.categorySlug === "react").map(
        (q) => q.id,
      ),
    },
    {
      id: "seed-quiz-fullstack-mix",
      title: "Full-Stack Mix Quiz",
      slug: "rest-apis",
      description: "Mixed questions across frontend, backend, and databases.",
      difficulty: "ADVANCED" as const,
      timeLimit: 900,
      questionIds: [
        "seed-rest-get",
        "seed-rest-put-patch",
        "seed-sql-join",
        "seed-node-single-thread",
        "seed-react-usestate",
        "seed-ts-unknown",
        "seed-git-merge-rebase",
        "seed-sec-sql-injection",
      ],
    },
  ];

  for (const def of quizDefs) {
    const category = categoryBySlug.get(def.slug);
    const quiz = await prisma.quiz.upsert({
      where: { id: def.id },
      update: {
        title: def.title,
        description: def.description,
        difficulty: def.difficulty,
        timeLimit: def.timeLimit,
        categoryId: category?.id,
      },
      create: {
        id: def.id,
        title: def.title,
        description: def.description,
        difficulty: def.difficulty,
        timeLimit: def.timeLimit,
        categoryId: category?.id,
      },
    });

    for (const [sortOrder, questionId] of def.questionIds.entries()) {
      const exists = await prisma.question.findUnique({ where: { id: questionId } });
      if (!exists) continue;

      await prisma.quizQuestion.upsert({
        where: {
          quizId_questionId: { quizId: quiz.id, questionId },
        },
        update: { sortOrder },
        create: { quizId: quiz.id, questionId, sortOrder },
      });
    }
  }
}

async function seedArticles() {
  const categories = await prisma.category.findMany();
  const categoryBySlug = new Map(categories.map((c) => [c.slug, c.id]));

  for (const article of ALL_ARTICLES) {
    const categoryId = categoryBySlug.get(article.categorySlug);
    if (!categoryId) {
      console.warn(`Skipping ${article.id}: unknown category ${article.categorySlug}`);
      continue;
    }

    await prisma.article.upsert({
      where: { id: article.id },
      update: {
        categoryId,
        title: article.title,
        slug: article.slug,
        excerpt: article.excerpt,
        content: article.content,
        difficulty: article.difficulty,
        tags: article.tags,
        sortOrder: article.sortOrder ?? 0,
        isPublished: true,
      },
      create: {
        id: article.id,
        categoryId,
        title: article.title,
        slug: article.slug,
        excerpt: article.excerpt,
        content: article.content,
        difficulty: article.difficulty,
        tags: article.tags,
        sortOrder: article.sortOrder ?? 0,
        isPublished: true,
      },
    });
  }
}

async function seedSiteSettings() {
  await prisma.siteSettings.upsert({
    where: { id: "singleton" },
    update: {},
    create: { id: "singleton", mainFont: "geist" },
  });
}

async function main() {
  console.log("Seeding database...");

  await seedCategories();
  await seedQuestions();
  await seedChallenges();
  await seedQuizzes();
  await seedArticles();
  await seedSiteSettings();

  const counts = await prisma.question.groupBy({
    by: ["categoryId"],
    _count: true,
  });

  console.log(`Seeded ${ALL_SEED_QUESTIONS.length} questions across ${counts.length} categories.`);
  console.log(`Seeded ${ALL_CHALLENGES.length} coding challenges.`);
  console.log(`Seeded ${ALL_ARTICLES.length} articles.`);
  console.log("Seed completed.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
