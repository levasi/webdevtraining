"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { Check, Copy, Lightbulb, Play, RotateCcw, Terminal } from "lucide-react";

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
import {
  executeChallengeCode,
  runChallengeLocally,
} from "@/lib/challenges/run-locally";
import { cn } from "@/lib/utils";
import type { TestCase, TestResult } from "@/types";

const VueLivePreview = dynamic(
  () =>
    import("@/components/challenges/vue-live-preview").then(
      (mod) => mod.VueLivePreview,
    ),
  { ssr: false },
);

const EDITOR_HEIGHT_KEY = "wdt:challenge-editor-height";
const CONSOLE_HEIGHT_KEY = "wdt:challenge-console-height";
const EDITOR_MIN_HEIGHT = 120;
const EDITOR_MAX_HEIGHT = 900;
const EDITOR_DEFAULT_HEIGHT = 280;
const CONSOLE_MIN_HEIGHT = 96;
const CONSOLE_MAX_HEIGHT = 560;
const CONSOLE_DEFAULT_HEIGHT = 180;
const RESIZE_HANDLE_HEIGHT = 8;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function loadStoredHeight(key: string, fallback: number, min: number, max: number) {
  if (typeof window === "undefined") return fallback;
  const raw = window.localStorage.getItem(key);
  const parsed = raw ? Number(raw) : NaN;
  return Number.isFinite(parsed) ? clamp(parsed, min, max) : fallback;
}

function formatValue(value: unknown): string {
  return JSON.stringify(value, null, 2);
}

type PanelResizeHandleProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  onDragStart: (event: React.PointerEvent<HTMLDivElement>) => void;
  onDragMove: (event: React.PointerEvent<HTMLDivElement>) => void;
  onDragEnd: (event: React.PointerEvent<HTMLDivElement>) => void;
  onNudge: (delta: number) => void;
};

function PanelResizeHandle({
  label,
  value,
  min,
  max,
  onDragStart,
  onDragMove,
  onDragEnd,
  onNudge,
}: PanelResizeHandleProps) {
  return (
    <div
      role="separator"
      aria-orientation="horizontal"
      aria-label={label}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      tabIndex={0}
      onPointerDown={onDragStart}
      onPointerMove={onDragMove}
      onPointerUp={onDragEnd}
      onPointerCancel={onDragEnd}
      onKeyDown={(event) => {
        if (event.key !== "ArrowUp" && event.key !== "ArrowDown") return;
        event.preventDefault();
        // ArrowDown grows the panel above this handle (drag-down metaphor).
        onNudge(event.key === "ArrowDown" ? 24 : -24);
      }}
      className="group flex shrink-0 cursor-row-resize items-center justify-center border-t border-border bg-[#ebe4d6]/50 transition-colors hover:bg-[#ebe4d6] focus-visible:bg-[#ebe4d6] focus-visible:outline-none"
      style={{ height: RESIZE_HANDLE_HEIGHT }}
    >
      <span
        aria-hidden
        className="h-1 w-10 rounded-full bg-[#8a8276]/55 group-hover:bg-[#8a8276] group-focus-visible:bg-[#8a8276]"
      />
    </div>
  );
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
  const [runningCode, setRunningCode] = useState(false);
  const [editorHeight, setEditorHeight] = useState(EDITOR_DEFAULT_HEIGHT);
  const [consoleHeight, setConsoleHeight] = useState(CONSOLE_DEFAULT_HEIGHT);
  const editorDragRef = useRef<{ startY: number; startHeight: number } | null>(
    null,
  );
  const consoleDragRef = useRef<{ startY: number; startHeight: number } | null>(
    null,
  );
  const editorHeightRef = useRef(editorHeight);
  const consoleHeightRef = useRef(consoleHeight);
  const logIdRef = useRef(0);
  const router = useRouter();
  const isXl = useIsXl();

  const dirty = code !== starterCode;
  const hintsRemaining = hints.length - hintIndex;
  const showVuePreview =
    isVue && Boolean(meta.filename?.endsWith(".vue") || code.includes("<template"));

  useEffect(() => {
    setEditorHeight(
      loadStoredHeight(
        EDITOR_HEIGHT_KEY,
        EDITOR_DEFAULT_HEIGHT,
        EDITOR_MIN_HEIGHT,
        EDITOR_MAX_HEIGHT,
      ),
    );
    setConsoleHeight(
      loadStoredHeight(
        CONSOLE_HEIGHT_KEY,
        CONSOLE_DEFAULT_HEIGHT,
        CONSOLE_MIN_HEIGHT,
        CONSOLE_MAX_HEIGHT,
      ),
    );
  }, []);

  useEffect(() => {
    editorHeightRef.current = editorHeight;
  }, [editorHeight]);

  useEffect(() => {
    consoleHeightRef.current = consoleHeight;
  }, [consoleHeight]);

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

  function beginResize(
    target: "editor" | "console",
    event: React.PointerEvent<HTMLDivElement>,
  ) {
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    const draft = {
      startY: event.clientY,
      startHeight:
        target === "editor"
          ? editorHeightRef.current
          : consoleHeightRef.current,
    };
    if (target === "editor") editorDragRef.current = draft;
    else consoleDragRef.current = draft;
  }

  function moveResize(
    target: "editor" | "console",
    event: React.PointerEvent<HTMLDivElement>,
  ) {
    const drag =
      target === "editor" ? editorDragRef.current : consoleDragRef.current;
    if (!drag) return;
    // Dragging the handle downward grows the panel above it.
    const next = clamp(
      drag.startHeight + (event.clientY - drag.startY),
      target === "editor" ? EDITOR_MIN_HEIGHT : CONSOLE_MIN_HEIGHT,
      target === "editor" ? EDITOR_MAX_HEIGHT : CONSOLE_MAX_HEIGHT,
    );
    if (target === "editor") {
      editorHeightRef.current = next;
      setEditorHeight(next);
    } else {
      consoleHeightRef.current = next;
      setConsoleHeight(next);
    }
  }

  function endResize(
    target: "editor" | "console",
    event: React.PointerEvent<HTMLDivElement>,
  ) {
    const drag =
      target === "editor" ? editorDragRef.current : consoleDragRef.current;
    if (!drag) return;
    if (target === "editor") editorDragRef.current = null;
    else consoleDragRef.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    window.localStorage.setItem(
      target === "editor" ? EDITOR_HEIGHT_KEY : CONSOLE_HEIGHT_KEY,
      String(
        target === "editor"
          ? editorHeightRef.current
          : consoleHeightRef.current,
      ),
    );
  }

  function nudgeHeight(target: "editor" | "console", delta: number) {
    const next = clamp(
      (target === "editor"
        ? editorHeightRef.current
        : consoleHeightRef.current) + delta,
      target === "editor" ? EDITOR_MIN_HEIGHT : CONSOLE_MIN_HEIGHT,
      target === "editor" ? EDITOR_MAX_HEIGHT : CONSOLE_MAX_HEIGHT,
    );
    if (target === "editor") {
      editorHeightRef.current = next;
      setEditorHeight(next);
      window.localStorage.setItem(EDITOR_HEIGHT_KEY, String(next));
    } else {
      consoleHeightRef.current = next;
      setConsoleHeight(next);
      window.localStorage.setItem(CONSOLE_HEIGHT_KEY, String(next));
    }
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

  async function runCodeOnly() {
    if (isVue || runningCode || runMutation.isPending || !hydrated) return;

    setRunningCode(true);
    setRunError(null);
    setLogs([]);
    logIdRef.current = 0;

    const sample = displayCases[0];
    const input = sample?.input;

    try {
      await withConsoleCapture(pushLog, () => {
        pushLog({
          level: "system",
          message: sample
            ? `Running solve() with first test input${sample.description ? ` (${sample.description})` : ""}…`
            : "Running code…",
          time: Date.now(),
        });

        const result = executeChallengeCode(code, input);

        if (result.error) {
          pushLog({
            level: "error",
            message: result.error,
            time: Date.now(),
          });
          setRunError(result.error);
          return;
        }

        if (result.invokedSolve) {
          pushLog({
            level: "info",
            message: `← ${formatValue(result.output)}`,
            time: Date.now(),
          });
        } else {
          pushLog({
            level: "warn",
            message:
              "No solve(input) function found — only top-level code ran.",
            time: Date.now(),
          });
        }

        pushLog({
          level: "system",
          message: "Done",
          time: Date.now(),
        });
      });
    } finally {
      setRunningCode(false);
    }
  }

  const editorColumn = (
    <section
      className={cn(
        "flex min-h-0 flex-col overflow-y-auto rounded-[10px] border border-border bg-card shadow-[0_18px_40px_-28px_rgb(28_25_21_/_0.45)]",
        isXl ? "h-full" : "h-auto",
      )}
    >
      <header className="flex shrink-0 flex-col gap-2.5 border-b border-border bg-[#ebe4d6]/70 px-2.5 py-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-3 sm:px-3.5 sm:py-2.5">
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
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
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
          {!isVue && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => void runCodeOnly()}
              disabled={runningCode || runMutation.isPending || !hydrated}
              className="gap-1.5"
            >
              <Terminal className="size-3.5" />
              {runningCode ? "Running…" : "Run"}
            </Button>
          )}
          <Button
            type="button"
            size="sm"
            onClick={() => runMutation.mutate()}
            disabled={runMutation.isPending || runningCode || !hydrated}
            className="gap-1.5"
          >
            <Play className="size-3.5" />
            {runMutation.isPending ? "Running…" : "Run tests"}
          </Button>
          {toolbarEnd}
        </div>
      </header>

      <div className="shrink-0" style={{ height: editorHeight }}>
        {hydrated ? (
          <CodeEditor
            value={code}
            onChange={handleCodeChange}
            language={editorLanguage}
            height={editorHeight}
            path={`challenges/${challengeId}.${isVue ? (meta.filename?.endsWith(".ts") ? "ts" : "vue") : "js"}`}
          />
        ) : (
          <p className="grid h-full place-items-center text-sm text-muted-foreground">
            Loading editor…
          </p>
        )}
      </div>

      <PanelResizeHandle
        label="Resize editor"
        value={editorHeight}
        min={EDITOR_MIN_HEIGHT}
        max={EDITOR_MAX_HEIGHT}
        onDragStart={(event) => beginResize("editor", event)}
        onDragMove={(event) => moveResize("editor", event)}
        onDragEnd={(event) => endResize("editor", event)}
        onNudge={(delta) => nudgeHeight("editor", delta)}
      />

      <div
        className="flex shrink-0 flex-col"
        style={{ height: consoleHeight }}
      >
        <ChallengeConsole
          entries={logs}
          onClear={() => setLogs([])}
          className="min-h-0 flex-1"
        />
      </div>

      <PanelResizeHandle
        label="Resize console"
        value={consoleHeight}
        min={CONSOLE_MIN_HEIGHT}
        max={CONSOLE_MAX_HEIGHT}
        onDragStart={(event) => beginResize("console", event)}
        onDragMove={(event) => moveResize("console", event)}
        onDragEnd={(event) => endResize("console", event)}
        onNudge={(delta) => nudgeHeight("console", delta)}
      />

      <footer className="shrink-0 space-y-3 border-t border-border bg-[#f3efe6] px-2.5 py-2.5 sm:px-3.5 sm:py-3">
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
      <div className="flex flex-col gap-3 sm:gap-4">
        {editorColumn}
        {previewColumn}
        <div className="min-h-[200px] sm:min-h-[240px]">{testsColumn}</div>
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
