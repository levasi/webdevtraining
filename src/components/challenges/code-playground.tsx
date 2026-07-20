"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { Check, Copy, Lightbulb, Play, RotateCcw } from "lucide-react";

import { ChallengeConsole } from "@/components/challenges/challenge-console";
import { CodeEditor } from "@/components/challenges/code-editor";
import { Button } from "@/components/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useIsXl } from "@/hooks/use-is-xl";
import {
  getChallengeRunnerMeta,
  visibleTestCases,
} from "@/lib/challenges/challenge-meta";
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

const VueLivePreview = dynamic(
  () =>
    import("@/components/challenges/vue-live-preview").then(
      (mod) => mod.VueLivePreview,
    ),
  { ssr: false },
);

function formatValue(value: unknown): string {
  return JSON.stringify(value, null, 2);
}

type CodePlaygroundProps = {
  challengeId: string;
  starterCode: string;
  solutionCode: string;
  hints: string[];
  testCases: TestCase[];
  toolbarEnd?: React.ReactNode;
};

export function CodePlayground({
  challengeId,
  starterCode,
  solutionCode,
  hints,
  testCases,
  toolbarEnd,
}: CodePlaygroundProps) {
  const meta = useMemo(() => getChallengeRunnerMeta(testCases), [testCases]);
  const displayCases = useMemo(() => visibleTestCases(testCases), [testCases]);
  const isVue = meta.runner === "vue";
  const editorLanguage = isVue
    ? meta.filename?.endsWith(".ts")
      ? "typescript"
      : "html"
    : "javascript";

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
  const isXl = useIsXl();

  const dirty = code !== starterCode;
  const hintsRemaining = hints.length - hintIndex;
  const showVuePreview =
    isVue && Boolean(meta.filename?.endsWith(".vue") || code.includes("<template"));

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
    if (
      dirty &&
      !window.confirm("Reset starter code? Your draft will be lost.")
    ) {
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
        if (isVue) {
          const suiteId = meta.suiteId;
          const [{ loadChallengeModule }, vueRunner] = await Promise.all([
            import("@/lib/challenges/load-challenge-module"),
            import("@/lib/challenges/vue-runner"),
          ]);

          if (!suiteId || !vueRunner.hasVueBrowserTests(suiteId)) {
            throw new Error(`No Vue browser suite for ${suiteId ?? "unknown"}`);
          }

          pushLog({
            level: "system",
            message: `Compiling and running Vue suite ${suiteId}…`,
            time: Date.now(),
          });

          const mod = await loadChallengeModule(
            code,
            meta.filename ?? "Challenge.vue",
          );
          const suite = await vueRunner.runVueBrowserTests(suiteId, mod);
          const mapped: TestResult[] = suite.cases.map((c) => ({
            input: null,
            expectedOutput: true,
            description: c.name,
            passed: c.passed,
            error: c.error,
          }));

          for (const c of suite.cases) {
            pushLog({
              level: c.passed ? "info" : "error",
              message: c.passed
                ? `✓ ${c.name}`
                : `✗ ${c.name}${c.error ? ` — ${c.error}` : ""}`,
              time: Date.now(),
            });
          }

          pushLog({
            level: suite.failed === 0 ? "system" : "warn",
            message:
              suite.failed === 0
                ? `Done — ${suite.passed} passed`
                : `Done — ${suite.passed} passed, ${suite.failed} failed`,
            time: Date.now(),
          });

          return {
            passed: suite.failed === 0 && suite.passed > 0,
            results: mapped,
          };
        }

        pushLog({
          level: "system",
          message: `Running ${displayCases.length} test cases…`,
          time: Date.now(),
        });

        const suite = runChallengeLocally(code, displayCases);

        for (const [index, result] of suite.results.entries()) {
          const label =
            displayCases[index]?.description ?? `Test case ${index + 1}`;
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
        body: JSON.stringify(
          isVue
            ? {
                code,
                clientPassed: local.passed,
                clientResults: local.results,
              }
            : { code },
        ),
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

      const remote = (await response.json()) as {
        passed: boolean;
        results: TestResult[];
      };

      return isVue ? local : remote;
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

  const editorColumn = (
    <section className="flex h-full min-h-[420px] flex-col overflow-hidden rounded-[10px] border border-border bg-card shadow-[0_18px_40px_-28px_rgb(28_25_21_/_0.45)]">
      <header className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-border bg-[#ebe4d6]/70 px-3.5 py-2.5">
        <p className="text-sm text-muted-foreground">
          {isVue ? (
            <>
              Edit the{" "}
              <code className="rounded bg-background/80 px-1 py-0.5 font-mono text-xs text-foreground">
                {meta.filename ?? "Vue"} component
              </code>
            </>
          ) : (
            <>
              Implement{" "}
              <code className="rounded bg-background/80 px-1 py-0.5 font-mono text-xs text-foreground">
                solve(input)
              </code>
            </>
          )}
          {dirty && (
            <span className="ml-2 text-xs text-primary">· draft saved</span>
          )}
        </p>
        <div className="flex flex-wrap items-center gap-2">
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
          {toolbarEnd}
        </div>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto">
        {hydrated ? (
          <CodeEditor
            value={code}
            onChange={handleCodeChange}
            language={editorLanguage}
            path={`challenges/${challengeId}.${isVue ? (meta.filename?.endsWith(".ts") ? "ts" : "vue") : "js"}`}
          />
        ) : (
          <p className="grid min-h-[220px] place-items-center text-sm text-muted-foreground">
            Loading editor…
          </p>
        )}
      </div>

      <div className="shrink-0">
        <ChallengeConsole
          entries={logs}
          onClear={() => setLogs([])}
          className="h-[min(28vh,220px)] min-h-[120px]"
        />
      </div>

      <footer className="shrink-0 space-y-3 border-t border-border bg-[#f3efe6] px-3.5 py-3">
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
            Edit the code, then click Run tests.
            {isVue
              ? " Vue components compile in the browser."
              : " console.log output shows in the console."}
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
  );

  const testsColumn = (
    <section className="flex h-full min-h-0 flex-col overflow-auto rounded-[10px] border border-border bg-card p-4 shadow-[0_18px_40px_-28px_rgb(28_25_21_/_0.45)]">
      <div className="mb-3 shrink-0">
        <h2 className="text-base font-semibold text-foreground">
          {isVue ? "Browser tests" : "Test cases"}
        </h2>
        <p className="text-sm text-muted-foreground">
          {results
            ? `${results.filter((r) => r.passed).length}/${results.length} passed`
            : isVue
              ? "Click Run tests to execute the in-browser suite"
              : `${displayCases.length} cases to pass`}
        </p>
      </div>
      <div className="min-h-0 flex-1 space-y-3 overflow-auto">
        {isVue && !results ? (
          <p className="rounded-lg border border-border/80 bg-[#faf7f0] p-3 text-sm text-muted-foreground">
            This challenge uses Challenge Lab&apos;s Vue test suite (
            <code className="text-xs">{meta.suiteId}</code>
            ). Results appear here after you run tests.
          </p>
        ) : null}

        {(isVue ? results ?? [] : displayCases).map((testCase, index) => {
          const result = isVue
            ? (testCase as TestResult)
            : results?.[index];
          const status = result
            ? result.passed
              ? "passed"
              : "failed"
            : "pending";
          const label =
            ("description" in testCase && testCase.description) ||
            `Test case ${index + 1}`;

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
                {label}
              </p>
              {!isVue && (
                <dl className="mt-2 space-y-2 font-mono text-xs">
                  <div>
                    <dt className="mb-1 font-sans text-foreground/70">
                      Input
                    </dt>
                    <dd>
                      <pre className="overflow-x-auto rounded-md border border-border/60 bg-background p-2 text-foreground">
                        {formatValue((testCase as TestCase).input)}
                      </pre>
                    </dd>
                  </div>
                  <div>
                    <dt className="mb-1 font-sans text-foreground/70">
                      Expected output
                    </dt>
                    <dd>
                      <pre className="overflow-x-auto rounded-md border border-border/60 bg-background p-2 text-foreground">
                        {formatValue((testCase as TestCase).expectedOutput)}
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
              )}
              {isVue && result && !result.passed && result.error ? (
                <pre className="mt-2 overflow-x-auto rounded-md border border-destructive/30 bg-destructive/10 p-2 font-mono text-xs text-destructive">
                  {result.error}
                </pre>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );

  const previewColumn =
    showVuePreview && hydrated ? (
      <VueLivePreview
        source={code}
        filename={meta.filename ?? "Challenge.vue"}
        className="h-full min-h-[200px]"
      />
    ) : null;

  if (!isXl) {
    return (
      <div className="flex flex-col gap-4">
        <div className="h-[min(70vh,720px)] min-h-[480px]">{editorColumn}</div>
        {previewColumn}
        <div className="min-h-[240px]">{testsColumn}</div>
      </div>
    );
  }

  return (
    <ResizablePanelGroup
      orientation="horizontal"
      className="h-[min(85vh,920px)] min-h-[560px] w-full"
    >
      <ResizablePanel
        id="editor"
        defaultSize={showVuePreview ? "44%" : "56%"}
        minSize="28%"
      >
        {editorColumn}
      </ResizablePanel>
      <ResizableHandle
        withHandle
        className="mx-0.5 w-3.5 rounded-full bg-border/40 after:bg-transparent hover:bg-border/55"
      />
      {showVuePreview ? (
        <>
          <ResizablePanel id="preview" defaultSize="26%" minSize="16%">
            {previewColumn}
          </ResizablePanel>
          <ResizableHandle
            withHandle
            className="mx-0.5 w-3.5 rounded-full bg-border/40 after:bg-transparent hover:bg-border/55"
          />
        </>
      ) : null}
      <ResizablePanel
        id="tests"
        defaultSize={showVuePreview ? "30%" : "44%"}
        minSize="18%"
      >
        {testsColumn}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
