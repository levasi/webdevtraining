"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { AlignLeft, Check, Copy, Play, RotateCcw, Terminal } from "lucide-react";

import { ChallengeConsole } from "@/components/challenges/challenge-console";
import { CodeEditor } from "@/components/challenges/code-editor";
import { Button } from "@/components/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import type { ConsoleEntry } from "@/lib/challenges/console-capture";
import { withConsoleCapture } from "@/lib/challenges/console-capture";
import {
  clearPlaygroundDraft,
  loadPlaygroundDraft,
  PLAYGROUND_STARTER,
  savePlaygroundDraft,
} from "@/lib/playground/draft-storage";
import { formatJavaScript } from "@/lib/playground/format-js";
import { executeJavaScript } from "@/lib/playground/run-js";
import { cn } from "@/lib/utils";

function subscribeMd(onStoreChange: () => void) {
  const mediaQuery = window.matchMedia("(min-width: 768px)");
  mediaQuery.addEventListener("change", onStoreChange);
  return () => mediaQuery.removeEventListener("change", onStoreChange);
}

function getMdSnapshot() {
  return window.matchMedia("(min-width: 768px)").matches;
}

function getMdServerSnapshot() {
  return false;
}

function useIsMd() {
  return useSyncExternalStore(subscribeMd, getMdSnapshot, getMdServerSnapshot);
}

export function JsPlayground() {
  const isMd = useIsMd();
  const [code, setCode] = useState(PLAYGROUND_STARTER);
  const [hydrated, setHydrated] = useState(false);
  const [logs, setLogs] = useState<ConsoleEntry[]>([]);
  const [copied, setCopied] = useState(false);
  const [running, setRunning] = useState(false);
  const [formatting, setFormatting] = useState(false);
  const [editorHeight, setEditorHeight] = useState(420);
  const [runShortcutLabel, setRunShortcutLabel] = useState("Win+↵");
  const editorPaneRef = useRef<HTMLDivElement>(null);
  const logIdRef = useRef(0);
  const runCodeRef = useRef<() => void>(() => {});

  const dirty = code !== PLAYGROUND_STARTER;

  useEffect(() => {
    setCode(loadPlaygroundDraft(PLAYGROUND_STARTER));
    setRunShortcutLabel(
      /Mac|iPhone|iPad/.test(window.navigator.userAgent) ? "⌘↵" : "Win+↵",
    );
    setHydrated(true);
  }, []);

  useEffect(() => {
    const el = editorPaneRef.current;
    if (!el) return;

    const sync = () => {
      const next = Math.max(160, Math.floor(el.clientHeight));
      setEditorHeight((prev) => (Math.abs(prev - next) < 1 ? prev : next));
    };

    sync();
    const observer = new ResizeObserver(sync);
    observer.observe(el);
    return () => observer.disconnect();
  }, [hydrated, isMd]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      // Win+Enter (metaKey) — also Cmd+Enter on macOS
      if (
        event.key !== "Enter" ||
        !event.metaKey ||
        event.altKey ||
        event.shiftKey ||
        event.ctrlKey
      ) {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      runCodeRef.current();
    }

    window.addEventListener("keydown", onKeyDown, true);
    return () => window.removeEventListener("keydown", onKeyDown, true);
  }, []);

  function pushLog(entry: Omit<ConsoleEntry, "id">) {
    setLogs((prev) => [...prev, { ...entry, id: ++logIdRef.current }]);
  }

  function handleCodeChange(next: string) {
    setCode(next);
    savePlaygroundDraft(next, PLAYGROUND_STARTER);
  }

  function resetCode() {
    if (
      dirty &&
      !window.confirm("Reset starter code? Your draft will be lost.")
    ) {
      return;
    }
    clearPlaygroundDraft();
    setCode(PLAYGROUND_STARTER);
    setLogs([]);
  }

  async function copyCode() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  async function formatCode() {
    if (formatting || !hydrated) return;
    setFormatting(true);
    try {
      const formatted = await formatJavaScript(code);
      if (formatted !== code) {
        handleCodeChange(formatted);
      }
    } catch (error) {
      pushLog({
        level: "error",
        message:
          error instanceof Error
            ? `Format failed: ${error.message}`
            : "Format failed",
        time: Date.now(),
      });
    } finally {
      setFormatting(false);
    }
  }

  async function runCode() {
    if (running || !hydrated) return;
    setRunning(true);
    setLogs([]);
    logIdRef.current = 0;

    try {
      await withConsoleCapture(pushLog, async () => {
        pushLog({
          level: "system",
          message: "Running…",
          time: Date.now(),
        });

        const result = await executeJavaScript(code);

        if (result.error) {
          pushLog({
            level: "error",
            message: result.error,
            time: Date.now(),
          });
          return;
        }

        pushLog({
          level: "system",
          message: "Done",
          time: Date.now(),
        });
      });
    } finally {
      setRunning(false);
    }
  }

  runCodeRef.current = () => {
    void runCode();
  };

  const editorPane = (
    <div ref={editorPaneRef} className="h-full min-h-0 min-w-0">
      {hydrated ? (
        <CodeEditor
          value={code}
          onChange={handleCodeChange}
          language="javascript"
          height={editorHeight}
          path="playground.js"
        />
      ) : (
        <p className="grid h-full place-items-center text-sm text-muted-foreground">
          Loading editor…
        </p>
      )}
    </div>
  );

  const consolePane = (
    <ChallengeConsole
      entries={logs}
      onClear={() => setLogs([])}
      className={cn(
        "h-full min-h-0",
        isMd ? "border-t-0 border-l border-border" : "border-t border-border",
      )}
    />
  );

  return (
    <section className="flex h-[min(75vh,820px)] min-h-[480px] flex-col overflow-hidden rounded-[10px] border border-border bg-card shadow-[0_18px_40px_-28px_rgb(28_25_21_/_0.45)]">
      <header className="flex shrink-0 flex-col gap-2.5 border-b border-border bg-[#ebe4d6]/70 px-2.5 py-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-3 sm:px-3.5 sm:py-2.5">
        <p className="text-sm text-muted-foreground">
          Freeform JavaScript
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
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => void formatCode()}
            disabled={formatting || !hydrated}
            title="Format with Prettier (Ctrl/Cmd+S)"
            className="gap-1.5"
          >
            <AlignLeft className="size-3.5" />
            {formatting ? "Formatting…" : "Format"}
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={() => void runCode()}
            disabled={running || !hydrated}
            title={`${runShortcutLabel.replace("↵", "Enter")} to run`}
            className="gap-1.5"
          >
            {running ? (
              <Terminal className="size-3.5" />
            ) : (
              <Play className="size-3.5" />
            )}
            {running ? "Running…" : "Run"}
            <kbd className="ml-0.5 hidden rounded border border-primary-foreground/25 bg-primary-foreground/10 px-1 py-px font-mono text-[0.65rem] font-normal opacity-90 sm:inline">
              {runShortcutLabel}
            </kbd>
          </Button>
        </div>
      </header>

      <ResizablePanelGroup
        orientation={isMd ? "horizontal" : "vertical"}
        className="min-h-0 flex-1"
      >
        <ResizablePanel
          id="playground-editor"
          defaultSize={isMd ? "58%" : "62%"}
          minSize="28%"
        >
          {editorPane}
        </ResizablePanel>
        <ResizableHandle
          withHandle
          className={
            isMd
              ? "mx-0.5 w-3.5 rounded-full bg-border/40 after:bg-transparent hover:bg-border/55"
              : "my-0.5 h-3.5 rounded-full bg-border/40 after:bg-transparent hover:bg-border/55"
          }
        />
        <ResizablePanel
          id="playground-console"
          defaultSize={isMd ? "42%" : "38%"}
          minSize="22%"
        >
          {consolePane}
        </ResizablePanel>
      </ResizablePanelGroup>
    </section>
  );
}
