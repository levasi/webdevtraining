import type { TestCase, TestResult } from "@/types";

function runUserCode(code: string, input: unknown): unknown {
  const fn = new Function(
    "input",
    `"use strict";\n${code}\nreturn typeof solve === "function" ? solve(input) : undefined;`,
  );
  return fn(input);
}

/** Run challenge test cases in the browser (captures console.log via withConsoleCapture). */
export function runChallengeLocally(
  code: string,
  testCases: TestCase[],
): { passed: boolean; results: TestResult[] } {
  const results: TestResult[] = testCases.map((testCase) => {
    try {
      const actualOutput = runUserCode(code, testCase.input);
      const passed =
        JSON.stringify(actualOutput) === JSON.stringify(testCase.expectedOutput);

      return {
        ...testCase,
        passed,
        actualOutput,
      };
    } catch (error) {
      return {
        ...testCase,
        passed: false,
        error: error instanceof Error ? error.message : "Runtime error",
      };
    }
  });

  return {
    passed: results.every((result) => result.passed),
    results,
  };
}
