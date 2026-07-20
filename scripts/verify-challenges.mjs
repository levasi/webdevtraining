import { spawnSync } from "node:child_process";
import { pathToFileURL } from "url";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

if (!process.env.__CHALLENGES_VERIFY_TSX__) {
  const result = spawnSync(
    process.execPath,
    ["--import", "tsx", fileURLToPath(import.meta.url), ...process.argv.slice(2)],
    {
      stdio: "inherit",
      env: { ...process.env, __CHALLENGES_VERIFY_TSX__: "1" },
    },
  );
  process.exit(result.status ?? 1);
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

async function main() {
  const modulePath = pathToFileURL(
    join(root, "prisma/data/challenges/index.ts"),
  ).href;

  const { ALL_CHALLENGES } = await import(modulePath);
  let failed = 0;

  for (const challenge of ALL_CHALLENGES) {
    const metaCase = challenge.testCases.find(
      (testCase) => testCase.description === "__meta__",
    );
    const metaInput = metaCase?.input as { runner?: string } | undefined;
    if (metaInput?.runner === "vue") {
      continue;
    }

    for (const [index, testCase] of challenge.testCases.entries()) {
      try {
        const fn = new Function(
          "input",
          `"use strict";\n${challenge.solutionCode}\nreturn solve(input);`,
        );
        const actual = fn(testCase.input);
        const passed =
          JSON.stringify(actual) === JSON.stringify(testCase.expectedOutput);

        if (!passed) {
          failed += 1;
          console.error(
            `FAIL ${challenge.id} case ${index + 1}`,
            "\n  expected:",
            JSON.stringify(testCase.expectedOutput),
            "\n  actual:",
            JSON.stringify(actual),
          );
        }
      } catch (error) {
        failed += 1;
        console.error(
          `ERROR ${challenge.id} case ${index + 1}:`,
          error instanceof Error ? error.message : error,
        );
      }
    }
  }

  console.log(`Verified ${ALL_CHALLENGES.length} challenges`);
  if (failed > 0) {
    process.exit(1);
  }
  console.log("All challenge solutions passed.");
}

main();
