"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import type { TestCase, TestResult } from "@/types";

function formatValue(value: unknown): string {
  return JSON.stringify(value, null, 2);
}

type CodePlaygroundProps = {
  challengeId: string;
  starterCode: string;
  solutionCode: string;
  hints: string[];
  testCases: TestCase[];
};

export function CodePlayground({
  challengeId,
  starterCode,
  solutionCode,
  hints,
  testCases,
}: CodePlaygroundProps) {
  const [code, setCode] = useState(starterCode);
  const [hintIndex, setHintIndex] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const hintsRemaining = hints.length - hintIndex;
  const [results, setResults] = useState<TestResult[] | null>(null);
  const router = useRouter();

  const runMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`/api/challenges/${challengeId}/run`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error ?? "Failed to run code");
      }

      return response.json() as Promise<{ passed: boolean; results: TestResult[] }>;
    },
    onSuccess: (data) => {
      setResults(data.results);
      if (data.passed) {
        router.refresh();
      }
    },
  });

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Your solution</CardTitle>
          <CardDescription>
            Implement a <code className="text-xs">solve(input)</code> function.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Textarea
            value={code}
            onChange={(event) => setCode(event.target.value)}
            className="min-h-72 font-mono text-sm"
            spellCheck={false}
          />
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() => runMutation.mutate()}
              disabled={runMutation.isPending}
            >
              {runMutation.isPending ? "Running..." : "Run tests"}
            </Button>
            <Button
              variant="outline"
              onClick={() => setCode(starterCode)}
            >
              Reset
            </Button>
            {hintsRemaining > 0 && (
              <Button
                variant="secondary"
                onClick={() =>
                  setHintIndex((value) => Math.min(hints.length, value + 1))
                }
              >
                {hintIndex === 0 ? "Show hint" : "Show next hint"}
              </Button>
            )}
            <Button
              variant="outline"
              onClick={() => setShowSolution((value) => !value)}
            >
              {showSolution ? "Hide solution" : "Show solution"}
            </Button>
          </div>
          {showSolution && (
            <div className="space-y-2">
              <p className="text-sm font-medium">Solution</p>
              <pre className="max-h-72 overflow-auto rounded-md bg-muted p-3 font-mono text-sm whitespace-pre-wrap">
                {solutionCode}
              </pre>
            </div>
          )}
          {hintIndex > 0 && (
            <div className="space-y-2">
              {hints.slice(0, hintIndex).map((hint, index) => (
                <p key={index} className="rounded-md bg-muted p-3 text-sm">
                  <span className="font-medium">Hint {index + 1}:</span> {hint}
                </p>
              ))}
            </div>
          )}
          {runMutation.error && (
            <p className="text-sm text-destructive">
              {runMutation.error.message}
            </p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Test cases</CardTitle>
          <CardDescription>
            {results
              ? `${results.filter((r) => r.passed).length}/${results.length} passed`
              : `${testCases.length} cases to pass`}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {testCases.map((testCase, index) => {
            const result = results?.[index];
            const status = result
              ? result.passed
                ? "passed"
                : "failed"
              : "pending";

            return (
              <div
                key={index}
                className="rounded-md border p-3 text-sm"
              >
                <p className="font-medium">
                  {status === "passed" && "✓ "}
                  {status === "failed" && "✗ "}
                  Test case {index + 1}
                  {testCase.description ? ` — ${testCase.description}` : ""}
                </p>
                <dl className="mt-2 space-y-2 font-mono text-xs">
                  <div>
                    <dt className="mb-1 text-muted-foreground">Input</dt>
                    <dd>
                      <pre className="overflow-x-auto rounded bg-muted p-2">
                        {formatValue(testCase.input)}
                      </pre>
                    </dd>
                  </div>
                  <div>
                    <dt className="mb-1 text-muted-foreground">Expected output</dt>
                    <dd>
                      <pre className="overflow-x-auto rounded bg-muted p-2">
                        {formatValue(testCase.expectedOutput)}
                      </pre>
                    </dd>
                  </div>
                  {result && !result.passed && (
                    <div>
                      <dt className="mb-1 text-muted-foreground">
                        {result.error ? "Error" : "Actual output"}
                      </dt>
                      <dd>
                        <pre className="overflow-x-auto rounded bg-destructive/10 p-2 text-destructive">
                          {result.error
                            ? result.error
                            : formatValue(result.actualOutput)}
                        </pre>
                      </dd>
                    </div>
                  )}
                </dl>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
