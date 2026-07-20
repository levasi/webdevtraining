"use client";

import { useEffect, useRef } from "react";

import { Button } from "@/components/ui/button";
import type { ConsoleEntry } from "@/lib/challenges/console-capture";
import { cn } from "@/lib/utils";

type ChallengeConsoleProps = {
  entries: ConsoleEntry[];
  onClear: () => void;
  className?: string;
};

function formatTime(ts: number) {
  return new Date(ts).toLocaleTimeString([], {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

const levelClass: Record<ConsoleEntry["level"], string> = {
  log: "text-teal-300",
  info: "text-teal-300",
  warn: "text-amber-400",
  error: "text-red-400",
  debug: "text-sky-300",
  system: "text-violet-300",
};

export function ChallengeConsole({
  entries,
  onClear,
  className,
}: ChallengeConsoleProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const empty = entries.length === 0;

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [entries.length]);

  return (
    <section
      aria-label="Console output"
      className={cn(
        "flex min-h-[140px] max-h-[220px] flex-col border-t border-border bg-[#1c1915] text-[#e8e2d6]",
        className,
      )}
    >
      <header className="flex items-center justify-between gap-3 border-b border-white/10 bg-white/[0.03] px-3 py-1.5">
        <div className="inline-flex items-center gap-2 text-[0.78rem] font-semibold tracking-wide text-[#cfc6b6] uppercase">
          <span
            aria-hidden
            className="size-1.5 rounded-full bg-teal-400 shadow-[0_0_8px_rgb(45_212_191_/_0.5)]"
          />
          Console
          {!empty && (
            <span className="font-mono text-[0.7rem] font-medium tracking-normal text-[#8a8276] normal-case">
              {entries.length}
            </span>
          )}
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          disabled={empty}
          onClick={onClear}
          className="h-7 px-2 text-xs text-[#cfc6b6] hover:bg-white/10 hover:text-[#faf7f0] disabled:opacity-35"
        >
          Clear
        </Button>
      </header>

      <div
        ref={scrollerRef}
        className="flex-1 overflow-auto px-2.5 py-2 font-mono text-[0.78rem] leading-snug [scrollbar-color:rgb(255_255_255_/_0.2)_transparent] [scrollbar-width:thin]"
      >
        {empty ? (
          <p className="m-1 text-[#8a8276]">
            Logs from <code className="text-teal-100">console.log</code> and
            test runs appear here.
          </p>
        ) : (
          <ul className="flex flex-col gap-0.5">
            {entries.map((entry) => (
              <li
                key={entry.id}
                className="grid grid-cols-[4.6rem_3.4rem_minmax(0,1fr)] items-start gap-2 rounded px-1 py-0.5 hover:bg-white/[0.04]"
              >
                <span className="text-[#8a8276]">{formatTime(entry.time)}</span>
                <span
                  className={cn(
                    "pt-0.5 text-[0.68rem] tracking-wide uppercase",
                    levelClass[entry.level],
                  )}
                >
                  {entry.level}
                </span>
                <pre
                  className={cn(
                    "m-0 font-inherit whitespace-pre-wrap break-words text-[#e8e2d6]",
                    (entry.level === "warn" || entry.level === "error") &&
                      levelClass[entry.level],
                    entry.level === "system" && "text-[#d4d0c8]",
                  )}
                >
                  {entry.message}
                </pre>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
