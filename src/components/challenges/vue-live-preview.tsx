"use client";

import { useEffect, useRef, useState } from "react";
import { createApp, type App, type Component } from "vue";

import { loadChallengeModule } from "@/lib/challenges/load-challenge-module";
import { cn } from "@/lib/utils";

type VueLivePreviewProps = {
  source: string;
  filename: string;
  className?: string;
};

export function VueLivePreview({
  source,
  filename,
  className,
}: VueLivePreviewProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<App | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [compiling, setCompiling] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | null = null;

    async function compile(nextSource: string) {
      setCompiling(true);
      try {
        const mod = await loadChallengeModule(nextSource, filename);
        if (cancelled) return;

        if (mod.default == null) {
          throw new Error("Expected a default-exported Vue component");
        }

        if (appRef.current) {
          appRef.current.unmount();
          appRef.current = null;
        }

        const host = hostRef.current;
        if (!host) return;
        host.replaceChildren();
        const mountEl = document.createElement("div");
        host.appendChild(mountEl);

        const app = createApp(mod.default as Component);
        app.mount(mountEl);
        appRef.current = app;
        setError(null);
      } catch (err) {
        if (cancelled) return;
        if (appRef.current) {
          appRef.current.unmount();
          appRef.current = null;
        }
        hostRef.current?.replaceChildren();
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        if (!cancelled) setCompiling(false);
      }
    }

    timer = setTimeout(() => {
      void compile(source);
    }, 280);

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
      if (appRef.current) {
        appRef.current.unmount();
        appRef.current = null;
      }
    };
  }, [source, filename]);

  return (
    <section
      className={cn(
        "flex min-h-[200px] flex-col overflow-hidden rounded-[10px] border border-border bg-card",
        className,
      )}
    >
      <header className="flex items-center justify-between border-b border-border px-3 py-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
        Live preview
        {compiling && <span className="font-normal normal-case">Compiling…</span>}
      </header>
      {error ? (
        <pre className="m-0 flex-1 overflow-auto bg-destructive/5 p-3 font-mono text-xs whitespace-pre-wrap text-destructive">
          {error}
        </pre>
      ) : (
        <div
          ref={hostRef}
          className="flex-1 overflow-auto bg-[#faf7f0] p-4 text-foreground [&_button]:mr-2 [&_button]:mb-2 [&_button]:rounded [&_button]:border [&_button]:border-border [&_button]:bg-background [&_button]:px-2.5 [&_button]:py-1 [&_button]:text-sm [&_input]:rounded [&_input]:border [&_input]:border-border [&_input]:bg-background [&_input]:px-2 [&_input]:py-1"
        />
      )}
    </section>
  );
}
