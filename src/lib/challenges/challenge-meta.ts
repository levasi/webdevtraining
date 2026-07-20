import type { TestCase } from "@/types";

export type ChallengeRunnerMeta = {
  runner: "javascript" | "vue";
  suiteId?: string;
  filename?: string;
};

export function getChallengeRunnerMeta(
  testCases: TestCase[],
): ChallengeRunnerMeta {
  const meta = testCases.find((testCase) => testCase.description === "__meta__");
  const input = meta?.input as
    | { runner?: string; suiteId?: string; filename?: string }
    | undefined;

  if (input?.runner === "vue") {
    return {
      runner: "vue",
      suiteId: input.suiteId,
      filename: input.filename ?? "Challenge.vue",
    };
  }

  return { runner: "javascript" };
}

export function visibleTestCases(testCases: TestCase[]): TestCase[] {
  return testCases.filter((testCase) => testCase.description !== "__meta__");
}
