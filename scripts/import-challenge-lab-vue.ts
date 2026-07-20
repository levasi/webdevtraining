/**
 * Import Vue challenges + interview questions from Challenge Lab
 * (sibling ../learning) into prisma seed data.
 *
 * Usage: npx tsx scripts/import-challenge-lab-vue.ts
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { pathToFileURL } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const learningRoot = resolve(__dirname, "../../learning");
const outChallenges = join(
  __dirname,
  "../prisma/data/challenges/challenge-lab-vue.ts",
);
const outQuestions = join(
  __dirname,
  "../prisma/data/vue-challenge-lab.ts",
);

const SOLUTION_ALIASES: Record<string, string> = {
  "src/challenges/vue/02-Cart.vue": "solutions/vue/02-Cart.computed.ts",
  "src/challenges/vue/03-Rating.vue": "solutions/vue/03-Rating.emit.ts",
  "src/challenges/vue/04-SearchBox.vue": "solutions/vue/04-SearchBox.watch.ts",
  "src/challenges/vue/06-TodoApp.vue": "solutions/vue/06-TodoApp.sketch.ts",
  "src/challenges/vue/08-Accordion.vue": "solutions/vue/08-Accordion.sketch.ts",
  "src/challenges/vue/09-StatusBadge.vue": "solutions/vue/09-StatusBadge.sketch.ts",
  "src/challenges/vue/10-AutoFocus.vue": "solutions/vue/10-AutoFocus.sketch.ts",
  "src/challenges/vue/11-ThemeSwitch.vue": "solutions/vue/11-ThemeSwitch.sketch.ts",
  "src/challenges/vue/12-SlotCard.vue": "solutions/vue/12-SlotCard.sketch.vue",
  "src/challenges/vue/13-UserLoader.vue": "solutions/vue/13-UserLoader.sketch.ts",
  "src/challenges/vue/14-DeepWatch.vue": "solutions/vue/14-DeepWatch.sketch.ts",
  "src/challenges/vue/15-ReactiveForm.vue": "solutions/vue/15-ReactiveForm.sketch.ts",
  "src/challenges/vue/17-Modal.vue": "solutions/vue/17-Modal.sketch.vue",
  "src/challenges/vue/18-FadeToggle.vue": "solutions/vue/18-FadeToggle.sketch.vue",
  "src/challenges/vue/20-NotesApp.vue": "solutions/vue/20-NotesApp.sketch.ts",
};

type LabChallenge = {
  id: string;
  track: string;
  order: number;
  title: string;
  difficulty: string;
  summary: string;
  instructions: string;
  concepts: string[];
  starterFile: string;
  hints: string[];
};

function escapeTemplate(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
}

function toSeedDifficulty(d: string): "BEGINNER" | "INTERMEDIATE" | "ADVANCED" {
  if (d === "beginner") return "BEGINNER";
  if (d === "advanced") return "ADVANCED";
  return "INTERMEDIATE";
}

function readSolution(starterFile: string): string {
  if (SOLUTION_ALIASES[starterFile]) {
    const aliased = join(learningRoot, SOLUTION_ALIASES[starterFile]);
    if (existsSync(aliased)) return readFileSync(aliased, "utf8");
  }

  const match = starterFile.match(/^src\/challenges\/(js|ts|vue)\/(.+)$/);
  if (!match) return "// Solution not found\n";
  const [, track, name] = match;
  const base = name.replace(/\.(ts|vue)$/, "");
  const ext = name.endsWith(".vue") ? "vue" : "ts";
  const candidates = [
    `solutions/${track}/${name}`,
    `solutions/${track}/${base}.sketch.${ext}`,
    `solutions/${track}/${base}.sketch.ts`,
    `solutions/${track}/${base}.sketch.vue`,
  ];
  for (const rel of candidates) {
    const full = join(learningRoot, rel);
    if (existsSync(full)) return readFileSync(full, "utf8");
  }
  return "// Solution sketch not available\n";
}

function filenameFromStarter(starterFile: string): string {
  return starterFile.replace(/^src\/challenges\/vue\//, "");
}

async function loadRegistry(): Promise<LabChallenge[]> {
  const registryPath = join(learningRoot, "src/challenges/registry.ts");
  if (!existsSync(registryPath)) {
    throw new Error(`Challenge Lab not found at ${learningRoot}`);
  }

  // Dynamic import via tsx-compiled path — parse with a lightweight eval of the challenges array
  // by importing the module from the learning project.
  const mod = await import(pathToFileURL(registryPath).href);
  const challenges = (mod.challenges ?? mod.default?.challenges) as LabChallenge[];
  if (!Array.isArray(challenges)) {
    throw new Error("Could not load challenges from learning registry");
  }
  return challenges.filter((c) => c.track === "vue");
}

function buildChallengeSource(c: LabChallenge): string {
  const starterPath = join(learningRoot, c.starterFile);
  const starter = existsSync(starterPath)
    ? readFileSync(starterPath, "utf8")
    : `// Missing starter: ${c.starterFile}\n`;
  const solution = readSolution(c.starterFile);
  const filename = filenameFromStarter(c.starterFile);
  const difficulty = toSeedDifficulty(c.difficulty);
  const description = `${c.summary}\n\n${c.instructions}`.trim();
  const hints = c.hints.map((h) => JSON.stringify(h)).join(",\n      ");

  return `  {
    id: "seed-challenge-lab-${c.id}",
    categorySlug: "vue",
    title: ${JSON.stringify(c.title)},
    description: \`${escapeTemplate(description)}\`,
    difficulty: "${difficulty}",
    starterCode: \`${escapeTemplate(starter)}\`,
    solutionCode: \`${escapeTemplate(solution)}\`,
    testCases: [
      {
        description: "__meta__",
        input: {
          runner: "vue",
          suiteId: ${JSON.stringify(c.id)},
          filename: ${JSON.stringify(filename)},
        },
        expectedOutput: true,
      },
    ],
    hints: [
      ${hints}
    ],
  }`;
}

function buildQuestionSource(c: LabChallenge): string {
  const difficulty = toSeedDifficulty(c.difficulty);
  const tags = ["vue", "challenge-lab", ...c.concepts.map((t) => t.toLowerCase())]
    .map((t) => JSON.stringify(t))
    .join(", ");
  const answer = [
    `**Concepts:** ${c.concepts.join(", ")}`,
    "",
    ...c.hints.map((h, i) => `${i + 1}. ${h}`),
  ].join("\n");

  return `  {
    id: "seed-q-lab-${c.id}",
    categorySlug: "vue",
    title: ${JSON.stringify(c.title)},
    content: \`${escapeTemplate(c.instructions.trim())}\`,
    explanation: \`${escapeTemplate(answer)}\`,
    difficulty: "${difficulty}",
    type: "FLASHCARD",
    tags: [${tags}],
    answers: [
      {
        content: \`${escapeTemplate(c.summary)}\`,
        isCorrect: true,
      },
    ],
  }`;
}

async function main() {
  const vueChallenges = await loadRegistry();
  if (vueChallenges.length === 0) {
    throw new Error("No Vue challenges found in Challenge Lab registry");
  }

  mkdirSync(dirname(outChallenges), { recursive: true });

  const challengeFile = `import type { SeedChallenge } from "../challenge-types";

/**
 * Vue challenges imported from Challenge Lab (\`../learning\`).
 * Runner metadata lives in the \`__meta__\` test case.
 * Generated by scripts/import-challenge-lab-vue.ts — do not edit by hand.
 */
export const challengeLabVueChallenges: SeedChallenge[] = [
${vueChallenges.map(buildChallengeSource).join(",\n")}
];
`;

  const questionFile = `import type { SeedQuestion } from "./types";

/**
 * Vue interview flashcards derived from Challenge Lab challenge briefs.
 * Generated by scripts/import-challenge-lab-vue.ts — do not edit by hand.
 */
export const vueChallengeLabQuestions: SeedQuestion[] = [
${vueChallenges.map(buildQuestionSource).join(",\n")}
];
`;

  writeFileSync(outChallenges, challengeFile);
  writeFileSync(outQuestions, questionFile);

  console.log(`Wrote ${vueChallenges.length} Vue challenges → ${outChallenges}`);
  console.log(`Wrote ${vueChallenges.length} Vue questions → ${outQuestions}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
