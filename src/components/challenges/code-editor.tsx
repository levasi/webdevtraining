"use client";

import { useState } from "react";
import type { BeforeMount, OnMount } from "@monaco-editor/react";
import Editor, { loader } from "@monaco-editor/react";

import { cn } from "@/lib/utils";

// Load Monaco from CDN so Turbopack does not need to bundle workers.
loader.config({
  paths: {
    vs: "https://cdn.jsdelivr.net/npm/monaco-editor@0.56.0/min/vs",
  },
});

const CHALLENGE_THEME = "challenge-lab";

type CodeEditorProps = {
  value: string;
  onChange: (value: string) => void;
  language?: string;
  path?: string;
  className?: string;
};

export function CodeEditor({
  value,
  onChange,
  language = "javascript",
  path = "challenge.js",
  className,
}: CodeEditorProps) {
  const [ready, setReady] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

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

  const handleMount: OnMount = () => {
    setReady(true);
  };

  return (
    <div
      className={cn(
        "relative min-h-[320px] w-full overflow-visible",
        className,
      )}
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
        height="100%"
        path={path}
        language={language}
        theme={CHALLENGE_THEME}
        value={value}
        loading={null}
        beforeMount={handleBeforeMount}
        onMount={handleMount}
        onChange={(next) => onChange(next ?? "")}
        options={{
          automaticLayout: true,
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
          fixedOverflowWidgets: true,
          scrollbar: {
            verticalScrollbarSize: 10,
            horizontalScrollbarSize: 10,
          },
        }}
        className="h-full min-h-[320px]"
      />
    </div>
  );
}
