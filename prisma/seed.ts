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
      questionIds: [
        "seed-js-equality",
        "seed-js-typeof-null",
        "seed-js-const-array",
        "seed-js-hoisting",
        "seed-js-optional-chaining",
        "seed-js-nullish-coalescing",
        "seed-js-map-vs-foreach",
        "seed-js-set-uniqueness",
        "seed-js-code-string-concatenation",
        "seed-js-code-return-newline",
        "seed-js-code-null-property-access",
        "seed-js-code-event-loop-order",
        "seed-js-code-closure-counter",
        "seed-js-code-var-hoist-let-block",
      ],
    },
    {
      id: "seed-quiz-js-types-coercion",
      title: "JavaScript Types & Coercion",
      slug: "javascript",
      description: "typeof quirks, equality, const semantics, and modern operators.",
      difficulty: "BEGINNER" as const,
      timeLimit: 420,
      questionIds: [
        "seed-js-typeof-null",
        "seed-js-equality",
        "seed-js-const-array",
        "seed-js-nullish-coalescing",
        "seed-js-optional-chaining",
        "seed-js-code-string-concatenation",
        "seed-js-code-null-property-access",
        "seed-js-code-null-undefined-equality",
        "seed-js-code-string-zero-equals-false",
        "seed-js-code-string-minus-vs-plus",
        "seed-js-code-nan-equality",
        "seed-js-code-empty-array-equals-false",
      ],
    },
    {
      id: "seed-quiz-js-equality-coercion",
      title: "JavaScript Type Coercion & Equality",
      slug: "javascript",
      description:
        "Code-reading drills on == vs ===, ToNumber/ToPrimitive quirks, and NaN.",
      difficulty: "INTERMEDIATE" as const,
      timeLimit: 360,
      questionIds: [
        "seed-js-equality",
        "seed-js-typeof-null",
        "seed-js-code-string-concatenation",
        "seed-js-code-null-undefined-equality",
        "seed-js-code-string-zero-equals-false",
        "seed-js-code-string-minus-vs-plus",
        "seed-js-code-nan-equality",
        "seed-js-code-empty-array-equals-false",
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
        "seed-js-call-apply-bind",
        "seed-js-tdz-let",
        "seed-js-debounce",
        "seed-js-code-return-newline",
        "seed-js-code-closure-counter",
        "seed-js-code-var-hoist-let-block",
        "seed-js-code-function-decl-vs-expr-hoist",
        "seed-js-code-tdz-let-before-init",
        "seed-js-code-var-loop-settimeout",
        "seed-js-code-let-block-shadowing",
        "seed-js-code-call-decl-vs-expr",
        "seed-js-code-let-loop-settimeout",
        "seed-js-code-var-loop-function-array",
        "seed-js-code-let-loop-function-array",
        "seed-js-code-var-loop-iife-capture",
        "seed-js-code-closure-shared-let-vs-var",
      ],
    },
    {
      id: "seed-quiz-js-hoisting-scope",
      title: "JavaScript Hoisting & Scope",
      slug: "javascript",
      description:
        "Code-reading drills on var/let/const hoisting, TDZ, and lexical scope.",
      difficulty: "INTERMEDIATE" as const,
      timeLimit: 420,
      questionIds: [
        "seed-js-hoisting",
        "seed-js-tdz-let",
        "seed-js-code-var-hoist-let-block",
        "seed-js-code-function-decl-vs-expr-hoist",
        "seed-js-code-tdz-let-before-init",
        "seed-js-code-var-loop-settimeout",
        "seed-js-code-let-block-shadowing",
        "seed-js-code-call-decl-vs-expr",
      ],
    },
    {
      id: "seed-quiz-js-closures-var-let",
      title: "JavaScript Closures with var & let",
      slug: "javascript",
      description:
        "How closures capture loop variables and shared bindings with var vs let.",
      difficulty: "INTERMEDIATE" as const,
      timeLimit: 420,
      questionIds: [
        "seed-js-closure",
        "seed-js-code-closure-counter",
        "seed-js-code-var-loop-settimeout",
        "seed-js-code-let-loop-settimeout",
        "seed-js-code-var-loop-function-array",
        "seed-js-code-let-loop-function-array",
        "seed-js-code-var-loop-iife-capture",
        "seed-js-code-closure-shared-let-vs-var",
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
        "seed-js-async-await-errors",
        "seed-js-promise-all-settled",
        "seed-js-debounce",
        "seed-js-code-event-loop-order",
        "seed-js-code-queue-microtask-vs-timer",
        "seed-js-code-microtask-after-timer",
        "seed-js-code-await-vs-settimeout",
        "seed-js-code-chained-then-before-timer",
        "seed-js-code-nested-microtask-starvation",
      ],
    },
    {
      id: "seed-quiz-js-event-loop",
      title: "JavaScript Event Loop: Microtasks & Timers",
      slug: "javascript",
      description:
        "Code-reading drills on microtasks, macrotasks, await, and setTimeout ordering.",
      difficulty: "INTERMEDIATE" as const,
      timeLimit: 420,
      questionIds: [
        "seed-js-event-loop",
        "seed-js-code-event-loop-order",
        "seed-js-code-queue-microtask-vs-timer",
        "seed-js-code-microtask-after-timer",
        "seed-js-code-await-vs-settimeout",
        "seed-js-code-chained-then-before-timer",
        "seed-js-code-nested-microtask-starvation",
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
        "seed-js-set-uniqueness",
        "seed-js-json-parse",
        "seed-js-structured-clone",
        "seed-js-instanceof",
        "seed-js-code-object-assignment-alias",
        "seed-js-code-object-identity-equality",
        "seed-js-code-shallow-spread-nested-mutation",
        "seed-js-code-mutate-vs-rebind-parameter",
        "seed-js-code-spread-top-level-vs-nested-ref",
      ],
    },
    {
      id: "seed-quiz-js-objects-references",
      title: "JavaScript Objects & References",
      slug: "javascript",
      description:
        "Code-reading drills on shared references, identity, and shallow copies.",
      difficulty: "INTERMEDIATE" as const,
      timeLimit: 360,
      questionIds: [
        "seed-js-const-array",
        "seed-js-spread-shallow",
        "seed-js-structured-clone",
        "seed-js-code-object-assignment-alias",
        "seed-js-code-object-identity-equality",
        "seed-js-code-shallow-spread-nested-mutation",
        "seed-js-code-mutate-vs-rebind-parameter",
        "seed-js-code-spread-top-level-vs-nested-ref",
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
        "seed-js-event-phases",
        "seed-js-event-loop",
        "seed-js-this-arrow",
        "seed-js-debounce",
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

    await prisma.quizQuestion.deleteMany({
      where: {
        quizId: quiz.id,
        questionId: { notIn: def.questionIds },
      },
    });
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
    create: { id: "singleton", mainFont: "ibm-plex-sans" },
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
