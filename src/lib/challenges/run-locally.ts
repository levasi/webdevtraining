import type { TestCase, TestResult } from "@/types";

function runUserCode(code: string, input: unknown): unknown {
  const fn = new Function(
    "input",
    `"use strict";\n${code}\nreturn typeof solve === "function" ? solve(input) : undefined;`,
  );
  return fn(input);
}

export type ExecuteChallengeResult = {
  output: unknown;
  error?: string;
  /** True when `solve` was defined and invoked. */
  invokedSolve: boolean;
};

/**
 * Run challenge code once (for console / return-value inspection).
 * Calls `solve(input)` when defined; otherwise still evaluates the script body.
 */
export function executeChallengeCode(
  code: string,
  input: unknown = undefined,
): ExecuteChallengeResult {
  try {
    const fn = new Function(
      "input",
      `"use strict";\n${code}\nreturn {
        invokedSolve: typeof solve === "function",
        output: typeof solve === "function" ? solve(input) : undefined,
      };`,
    );
    const result = fn(input) as { invokedSolve: boolean; output: unknown };
    return {
      output: result.output,
      invokedSolve: result.invokedSolve,
    };
  } catch (error) {
    return {
      output: undefined,
      invokedSolve: false,
      error: error instanceof Error ? error.message : "Runtime error",
    };
  }
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
        JSON.stringify(actualOutput) ===
        JSON.stringify(testCase.expectedOutput);

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
