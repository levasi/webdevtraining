/**
 * Upserts Challenge Lab Vue challenges + flashcard questions into Neon.
 *
 * Usage: npx tsx scripts/seed-challenge-lab-vue.ts
 */

import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

import { challengeLabVueChallenges } from "../prisma/data/challenges/challenge-lab-vue";
import { vueChallengeLabQuestions } from "../prisma/data/vue-challenge-lab";
import { PrismaClient } from "../src/generated/prisma/client";
import type { Prisma } from "../src/generated/prisma/client";
import {
  loadProjectEnv,
  normalizePostgresConnectionString,
} from "../src/lib/database-url";

loadProjectEnv();

const connectionString = normalizePostgresConnectionString(
  process.env.DATABASE_URL_UNPOOLED ||
    process.env.DATABASE_URL ||
    process.env.DIRECT_DATABASE_URL ||
    "",
);

if (!connectionString) {
  throw new Error("Set DATABASE_URL_UNPOOLED or DATABASE_URL before seeding.");
}

const host = connectionString.split("@")[1]?.split("/")[0]?.split("?")[0];
console.log(`Connecting to ${host}…`);

const pool = new Pool({
  connectionString,
  connectionTimeoutMillis: 15_000,
});
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

async function main() {
  const categories = await prisma.category.findMany();
  const categoryBySlug = new Map(categories.map((c) => [c.slug, c.id]));
  const vueCategoryId = categoryBySlug.get("vue");
  if (!vueCategoryId) {
    throw new Error('Missing "vue" category — run full seed first.');
  }

  let challenges = 0;
  for (const challenge of challengeLabVueChallenges) {
    await prisma.challenge.upsert({
      where: { id: challenge.id },
      update: {
        categoryId: vueCategoryId,
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
        categoryId: vueCategoryId,
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
    challenges += 1;
    console.log(`  ✓ challenge ${challenge.title}`);
  }

  let questions = 0;
  for (const question of vueChallengeLabQuestions) {
    const categoryId = categoryBySlug.get(question.categorySlug);
    if (!categoryId) continue;

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
    questions += 1;
    console.log(`  ✓ question ${question.title}`);
  }

  const [challengeCount, questionCount] = await Promise.all([
    prisma.challenge.count({ where: { categoryId: vueCategoryId } }),
    prisma.question.count({ where: { categoryId: vueCategoryId } }),
  ]);

  console.log(
    `Upserted ${challenges} Vue challenges and ${questions} Vue questions.`,
  );
  console.log(
    `Vue category totals — challenges: ${challengeCount}, questions: ${questionCount}`,
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
