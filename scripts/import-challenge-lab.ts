/**
 * Challenge Lab import helper.
 *
 * Seed data lives in: prisma/data/challenges/challenge-lab.ts
 * (JS + TS tracks from ../learning, adapted to solve(input); Vue SFCs skipped)
 *
 * Push to Neon:
 *   npx tsx scripts/seed-challenge-lab.ts
 *
 * Or full seed:
 *   npm run db:seed
 */

import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const learningRoot = resolve(__dirname, "../../learning");
const registryPath = join(learningRoot, "src/challenges/registry.ts");
const outputPath = join(
  __dirname,
  "../prisma/data/challenges/challenge-lab.ts",
);

function main() {
  if (!existsSync(registryPath)) {
    console.error(
      `Challenge Lab not found at ${learningRoot}.\nExpected sibling folder: Documents/GitHub/learning`,
    );
    process.exit(1);
  }

  console.log("Challenge Lab source:", learningRoot);
  console.log("Seed data file:     ", outputPath);
  console.log("");
  console.log("Next: npx tsx scripts/seed-challenge-lab.ts");
}

main();
