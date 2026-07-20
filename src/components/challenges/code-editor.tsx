"use client";

import { useEffect, useRef, useState } from "react";
import type { BeforeMount, OnMount } from "@monaco-editor/react";
import Editor, { loader } from "@monaco-editor/react";
import type { editor as MonacoEditor } from "monaco-editor";

import { cn } from "@/lib/utils";

// Load Monaco from CDN so Turbopack does not need to bundle workers.
loader.config({
  paths: {
    vs: "https://cdn.jsdelivr.net/npm/monaco-editor@0.56.0/min/vs",
  },
});

const CHALLENGE_THEME = "challenge-lab";
const MIN_HEIGHT = 220;

type CodeEditorProps = {
  value: string;
  onChange: (value: string) => void;
  language?: string;
  path?: string;
  className?: string;
  minHeight?: number;
};

export function CodeEditor({
  value,
  onChange,
  language = "javascript",
  path = "challenge.js",
  className,
  minHeight = MIN_HEIGHT,
}: CodeEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<MonacoEditor.IStandaloneCodeEditor | null>(null);
  const ignoreLayoutRef = useRef(false);
  const minHeightRef = useRef(minHeight);
  const [ready, setReady] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [height, setHeight] = useState(minHeight);

  minHeightRef.current = minHeight;

  const syncHeight = (editor: MonacoEditor.IStandaloneCodeEditor) => {
    if (ignoreLayoutRef.current) return;

    const contentHeight = editor.getContentHeight();
    const next = Math.max(minHeightRef.current, contentHeight);
    const width =
      containerRef.current?.clientWidth || editor.getLayoutInfo().width;

    setHeight(next);

    ignoreLayoutRef.current = true;
    try {
      editor.layout({ width, height: next });
    } finally {
      ignoreLayoutRef.current = false;
    }
  };

  const handleBeforeMount: BeforeMount = (monaco) => {
    monaco.editor.defineTheme(CHALLENGE_THEME, {
      base: "vs",
      inherit: true,
      rules: [
        { token: "comment", foreground: "6b6358", fontStyle: "italic" },
        { token: "keyword", foreground: "0f766e" },
        { token: "string", foreground: "9a3412" },
        { token: "number", foreground: "1d4ed8" },
        { token: "type", foreground: "047857" },
      ],
      colors: {
        "editor.background": "#faf7f0",
        "editor.foreground": "#1c1915",
        "editor.lineHighlightBackground": "#ebe4d680",
        "editorLineNumber.foreground": "#a89f90",
        "editorCursor.foreground": "#0f766e",
        "editor.selectionBackground": "#ccfbf188",
        "editorIndentGuide.background": "#e7e0d2",
        "editorIndentGuide.activeBackground": "#d4cbb8",
      },
    });
    setLoadError(null);
  };

  const handleMount: OnMount = (editor) => {
    editorRef.current = editor;
    setReady(true);
    syncHeight(editor);
    editor.onDidContentSizeChange(() => syncHeight(editor));
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver(() => {
      const editor = editorRef.current;
      if (editor) syncHeight(editor);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const editor = editorRef.current;
    if (editor) syncHeight(editor);
  }, [value, minHeight]);

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full overflow-hidden", className)}
      style={{ height }}
    >
      {loadError ? (
        <p className="absolute inset-0 z-10 grid place-items-center p-4 text-center text-sm text-destructive">
          Editor failed to load: {loadError}
        </p>
      ) : !ready ? (
        <p className="pointer-events-none absolute inset-0 z-10 grid place-items-center text-sm text-muted-foreground">
          Loading editor…
        </p>
      ) : null}

      <Editor
        height={height}
        path={path}
        language={language}
        theme={CHALLENGE_THEME}
        value={value}
        loading={null}
        beforeMount={handleBeforeMount}
        onMount={handleMount}
        onChange={(next) => onChange(next ?? "")}
        options={{
          automaticLayout: false,
          fontSize: 14,
          fontFamily:
            "var(--font-mono), IBM Plex Mono, ui-monospace, SFMono-Regular, Menlo, monospace",
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          tabSize: 2,
          padding: { top: 12, bottom: 12 },
          renderLineHighlight: "line",
          smoothScrolling: true,
          wordWrap: "on",
          wrappingStrategy: "advanced",
          fixedOverflowWidgets: true,
          overviewRulerLanes: 0,
          hideCursorInOverviewRuler: true,
          overviewRulerBorder: false,
          scrollbar: {
            vertical: "hidden",
            horizontal: "auto",
            alwaysConsumeMouseWheel: false,
            verticalScrollbarSize: 0,
            horizontalScrollbarSize: 10,
          },
        }}
      />
    </div>
  );
}
