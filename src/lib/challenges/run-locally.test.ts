import { describe, expect, it } from "vitest";

import {
  executeChallengeCode,
  runChallengeLocally,
} from "@/lib/challenges/run-locally";

describe("runChallengeLocally", () => {
  it("passes when solve returns the expected output", () => {
    const result = runChallengeLocally(
      "function solve(input) { return input * 2; }",
      [{ input: 2, expectedOutput: 4, description: "doubles" }],
    );

    expect(result.passed).toBe(true);
    expect(result.results[0]?.actualOutput).toBe(4);
  });

  it("fails on wrong output", () => {
    const result = runChallengeLocally(
      "function solve(input) { return input; }",
      [{ input: 2, expectedOutput: 4 }],
    );

    expect(result.passed).toBe(false);
    expect(result.results[0]?.passed).toBe(false);
  });

  it("captures runtime errors", () => {
    const result = runChallengeLocally(
      "function solve() { throw new Error('boom'); }",
      [{ input: null, expectedOutput: true }],
    );

    expect(result.passed).toBe(false);
    expect(result.results[0]?.error).toMatch(/boom/);
  });
});

describe("executeChallengeCode", () => {
  it("returns solve output for a single input", () => {
    const result = executeChallengeCode(
      "function solve(input) { return input.nums.length; }",
      { nums: [1, 2, 3], k: 2 },
    );

    expect(result.error).toBeUndefined();
    expect(result.invokedSolve).toBe(true);
    expect(result.output).toBe(3);
  });

  it("reports runtime errors", () => {
    const result = executeChallengeCode(
      "function solve() { throw new Error('nope'); }",
      null,
    );

    expect(result.error).toMatch(/nope/);
  });
});
