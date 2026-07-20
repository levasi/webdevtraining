/**
 * Upserts Challenge Lab seed challenges into Neon.
 * Uses DATABASE_URL_UNPOOLED to avoid a stale local DIRECT_DATABASE_URL proxy.
 *
 * Usage: npx tsx scripts/seed-challenge-lab.ts
 */

import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

import { challengeLabChallenges } from "../prisma/data/challenges/challenge-lab";
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

  let upserted = 0;
  for (const challenge of challengeLabChallenges) {
    const categoryId = categoryBySlug.get(challenge.categorySlug);
    if (!categoryId) {
      console.warn(
        `Skipping ${challenge.id}: unknown category ${challenge.categorySlug}`,
      );
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
    upserted += 1;
    console.log(`  ✓ ${challenge.title}`);
  }

  const total = await prisma.challenge.count();
  console.log(
    `Upserted ${upserted} Challenge Lab challenges. Total in DB: ${total}`,
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
