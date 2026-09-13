"use client";

import dynamic from "next/dynamic";

const JsPlayground = dynamic(
  () =>
    import("@/components/playground/js-playground").then(
      (mod) => mod.JsPlayground,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="grid min-h-[420px] place-items-center rounded-[10px] border border-border bg-card text-sm text-muted-foreground">
        Loading playground…
      </div>
    ),
  },
);

export function PlaygroundPanel() {
  return <JsPlayground />;
}
