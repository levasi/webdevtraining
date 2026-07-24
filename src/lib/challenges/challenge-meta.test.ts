import { describe, expect, it } from "vitest";

import {
  getChallengeRunnerMeta,
  visibleTestCases,
} from "@/lib/challenges/challenge-meta";
import type { TestCase } from "@/types";

const cases: TestCase[] = [
  {
    description: "__meta__",
    input: { runner: "vue", suiteId: "vue-basic", filename: "App.vue" },
    expectedOutput: null,
  },
  {
    description: "returns true",
    input: 1,
    expectedOutput: true,
  },
];

describe("challenge meta", () => {
  it("detects vue runner metadata", () => {
    expect(getChallengeRunnerMeta(cases)).toEqual({
      runner: "vue",
      suiteId: "vue-basic",
      filename: "App.vue",
    });
  });

  it("defaults to javascript without meta", () => {
    expect(getChallengeRunnerMeta([{ input: 1, expectedOutput: 1 }])).toEqual({
      runner: "javascript",
    });
  });

  it("hides __meta__ from visible cases", () => {
    expect(visibleTestCases(cases)).toHaveLength(1);
    expect(visibleTestCases(cases)[0]?.description).toBe("returns true");
  });
});
