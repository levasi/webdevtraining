"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { Check, Copy, Lightbulb, Play, RotateCcw } from "lucide-react";

import { ChallengeConsole } from "@/components/challenges/challenge-console";
import { CodeEditor } from "@/components/challenges/code-editor";
import { Button } from "@/components/ui/button";
import type { ConsoleEntry } from "@/lib/challenges/console-capture";
import { withConsoleCapture } from "@/lib/challenges/console-capture";
import {
  clearChallengeDraft,
  loadChallengeDraft,
  saveChallengeDraft,
} from "@/lib/challenges/draft-storage";
import { runChallengeLocally } from "@/lib/challenges/run-locally";
import { cn } from "@/lib/utils";
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
  const [hydrated, setHydrated] = useState(false);
  const [hintIndex, setHintIndex] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [results, setResults] = useState<TestResult[] | null>(null);
  const [logs, setLogs] = useState<ConsoleEntry[]>([]);
  const [copied, setCopied] = useState(false);
  const [runError, setRunError] = useState<string | null>(null);
  const logIdRef = useRef(0);
  const router = useRouter();

  const dirty = code !== starterCode;
  const hintsRemaining = hints.length - hintIndex;

  useEffect(() => {
    setCode(loadChallengeDraft(challengeId, starterCode));
    setResults(null);
    setRunError(null);
    setLogs([]);
    setHintIndex(0);
    setShowSolution(false);
    setHydrated(true);
  }, [challengeId, starterCode]);

  function pushLog(entry: Omit<ConsoleEntry, "id">) {
    setLogs((prev) => [...prev, { ...entry, id: ++logIdRef.current }]);
  }

  function handleCodeChange(next: string) {
    setCode(next);
    saveChallengeDraft(challengeId, next, starterCode);
    setResults(null);
    setRunError(null);
  }

  function resetCode() {
    if (dirty && !window.confirm("Reset starter code? Your draft will be lost.")) {
      return;
    }
    clearChallengeDraft(challengeId);
    setCode(starterCode);
    setResults(null);
    setRunError(null);
    setLogs([]);
  }

  async function copyCode() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  const runMutation = useMutation({
    mutationFn: async () => {
      setRunError(null);
      setResults(null);
      setLogs([]);
      logIdRef.current = 0;

      const local = await withConsoleCapture(pushLog, async () => {
        pushLog({
          level: "system",
          message: `Running ${testCases.length} test cases…`,
          time: Date.now(),
        });

        const suite = runChallengeLocally(code, testCases);

        for (const [index, result] of suite.results.entries()) {
          const label =
            testCases[index]?.description ?? `Test case ${index + 1}`;
          pushLog({
            level: result.passed ? "info" : "error",
            message: result.passed
              ? `✓ ${label}`
              : `✗ ${label}${result.error ? ` — ${result.error}` : ""}`,
            time: Date.now(),
          });
        }

        pushLog({
          level: suite.passed ? "system" : "warn",
          message: suite.passed
            ? `Done — ${suite.results.length} passed`
            : `Done — ${suite.results.filter((r) => r.passed).length} passed, ${suite.results.filter((r) => !r.passed).length} failed`,
          time: Date.now(),
        });

        return suite;
      });

      setResults(local.results);

      // Persist attempt / progress when signed in.
      const response = await fetch(`/api/challenges/${challengeId}/run`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) {
        const error = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;
        if (response.status === 401) {
          pushLog({
            level: "warn",
            message: "Sign in to save progress. Local results still shown.",
            time: Date.now(),
          });
          return local;
        }
        throw new Error(error?.error ?? "Failed to save run results");
      }

      return response.json() as Promise<{
        passed: boolean;
        results: TestResult[];
      }>;
    },
    onSuccess: (data) => {
      setResults(data.results);
      if (data.passed) {
        router.refresh();
      }
    },
    onError: (error) => {
      const message =
        error instanceof Error ? error.message : "Failed to run tests";
      setRunError(message);
      pushLog({
        level: "error",
        message,
        time: Date.now(),
      });
    },
  });

  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
      <section className="flex min-h-[420px] flex-col overflow-hidden rounded-[10px] border border-border bg-card shadow-[0_18px_40px_-28px_rgb(28_25_21_/_0.45)]">
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-[#ebe4d6]/70 px-3.5 py-2.5">
          <p className="text-sm text-muted-foreground">
            Implement{" "}
            <code className="rounded bg-background/80 px-1 py-0.5 font-mono text-xs text-foreground">
              solve(input)
            </code>
            {dirty && (
              <span className="ml-2 text-xs text-primary">· draft saved</span>
            )}
          </p>
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => void copyCode()}
              className="gap-1.5"
            >
              {copied ? (
                <Check className="size-3.5" />
              ) : (
                <Copy className="size-3.5" />
              )}
              {copied ? "Copied" : "Copy"}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={!dirty}
              onClick={resetCode}
              className="gap-1.5"
            >
              <RotateCcw className="size-3.5" />
              Reset
            </Button>
            {hintsRemaining > 0 && (
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() =>
                  setHintIndex((value) => Math.min(hints.length, value + 1))
                }
                className="gap-1.5"
              >
                <Lightbulb className="size-3.5" />
                {hintIndex === 0 ? "Hint" : "Next hint"}
              </Button>
            )}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setShowSolution((value) => !value)}
            >
              {showSolution ? "Hide solution" : "Solution"}
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={() => runMutation.mutate()}
              disabled={runMutation.isPending || !hydrated}
              className="gap-1.5"
            >
              <Play className="size-3.5" />
              {runMutation.isPending ? "Running…" : "Run tests"}
            </Button>
          </div>
        </header>

        <div className="min-h-[320px] flex-1" style={{ height: "min(55vh, 560px)" }}>
          {hydrated ? (
            <CodeEditor
              value={code}
              onChange={handleCodeChange}
              language="javascript"
              path={`challenges/${challengeId}.js`}
              className="h-full"
            />
          ) : (
            <p className="grid h-full place-items-center text-sm text-muted-foreground">
              Loading editor…
            </p>
          )}
        </div>

        <ChallengeConsole entries={logs} onClear={() => setLogs([])} />

        <footer className="space-y-3 border-t border-border bg-[#f3efe6] px-3.5 py-3">
          {runError && (
            <p className="font-mono text-sm whitespace-pre-wrap text-destructive">
              {runError}
            </p>
          )}
          {results ? (
            <div className="space-y-2">
              <p
                className={cn(
                  "font-mono text-sm font-medium",
                  results.every((r) => r.passed)
                    ? "text-emerald-700"
                    : "text-destructive",
                )}
              >
                {results.filter((r) => r.passed).length} passed
                {results.some((r) => !r.passed)
                  ? ` · ${results.filter((r) => !r.passed).length} failed`
                  : null}
              </p>
              <ul className="flex flex-col gap-1.5">
                {results.map((result, index) => (
                  <li
                    key={index}
                    className={cn(
                      "grid grid-cols-[1.1rem_1fr] gap-x-2 text-sm",
                      result.passed ? "text-foreground" : "text-destructive",
                    )}
                  >
                    <span className="font-bold">
                      {result.passed ? "✓" : "✗"}
                    </span>
                    <span>
                      {result.description ?? `Test case ${index + 1}`}
                    </span>
                    {result.error && (
                      <span className="col-start-2 font-mono text-xs text-muted-foreground">
                        {result.error}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Edit the code, then click Run tests.{" "}
              <code className="text-xs">console.log</code> output shows in the
              console.
            </p>
          )}

          {showSolution && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">Solution</p>
              <pre className="max-h-56 overflow-auto rounded-md border border-border/80 bg-card p-3 font-mono text-sm whitespace-pre-wrap text-foreground">
                {solutionCode}
              </pre>
            </div>
          )}

          {hintIndex > 0 && (
            <div className="space-y-2">
              {hints.slice(0, hintIndex).map((hint, index) => (
                <p
                  key={index}
                  className="rounded-md border border-border/80 bg-card p-3 text-sm text-foreground"
                >
                  <span className="font-medium">Hint {index + 1}:</span> {hint}
                </p>
              ))}
            </div>
          )}
        </footer>
      </section>

      <section className="rounded-[10px] border border-border bg-card p-4 shadow-[0_18px_40px_-28px_rgb(28_25_21_/_0.45)]">
        <div className="mb-3">
          <h2 className="text-base font-semibold text-foreground">Test cases</h2>
          <p className="text-sm text-muted-foreground">
            {results
              ? `${results.filter((r) => r.passed).length}/${results.length} passed`
              : `${testCases.length} cases to pass`}
          </p>
        </div>
        <div className="space-y-3">
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
                className={cn(
                  "rounded-lg border border-border/80 bg-[#faf7f0] p-3 text-sm",
                  status === "passed" && "border-primary/40 bg-primary/5",
                  status === "failed" &&
                    "border-destructive/40 bg-destructive/5",
                )}
              >
                <p className="font-medium text-foreground">
                  {status === "passed" && "✓ "}
                  {status === "failed" && "✗ "}
                  Test case {index + 1}
                  {testCase.description ? ` — ${testCase.description}` : ""}
                </p>
                <dl className="mt-2 space-y-2 font-mono text-xs">
                  <div>
                    <dt className="mb-1 font-sans text-foreground/70">Input</dt>
                    <dd>
                      <pre className="overflow-x-auto rounded-md border border-border/60 bg-background p-2 text-foreground">
                        {formatValue(testCase.input)}
                      </pre>
                    </dd>
                  </div>
                  <div>
                    <dt className="mb-1 font-sans text-foreground/70">
                      Expected output
                    </dt>
                    <dd>
                      <pre className="overflow-x-auto rounded-md border border-border/60 bg-background p-2 text-foreground">
                        {formatValue(testCase.expectedOutput)}
                      </pre>
                    </dd>
                  </div>
                  {result && !result.passed && (
                    <div>
                      <dt className="mb-1 font-sans text-foreground/70">
                        {result.error ? "Error" : "Actual output"}
                      </dt>
                      <dd>
                        <pre className="overflow-x-auto rounded-md border border-destructive/30 bg-destructive/10 p-2 text-destructive">
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
        </div>
      </section>
    </div>
  );
}
