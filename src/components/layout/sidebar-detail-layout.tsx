"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type SidebarDetailLayoutProps = {
  sidebar: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

const SIDEBAR_MIN = 240;
const SIDEBAR_MAX = 480;
const SIDEBAR_DEFAULT = 304;
const STORAGE_KEY = "wdt.sidebar-detail-width";

/** Header is h-14; keep sticky sidebar flush under it. */
const STICKY_TOP = "lg:top-14";
const STICKY_HEIGHT = "lg:h-[calc(100dvh-3.5rem)]";

function readStoredWidth(): number {
  if (typeof window === "undefined") return SIDEBAR_DEFAULT;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  const parsed = raw ? Number.parseInt(raw, 10) : NaN;
  if (!Number.isFinite(parsed)) return SIDEBAR_DEFAULT;
  return Math.min(SIDEBAR_MAX, Math.max(SIDEBAR_MIN, parsed));
}

export function SidebarDetailLayout({
  sidebar,
  children,
  className,
}: SidebarDetailLayoutProps) {
  const [width, setWidth] = useState(SIDEBAR_DEFAULT);
  const [dragging, setDragging] = useState(false);
  const dragStartX = useRef(0);
  const dragStartWidth = useRef(SIDEBAR_DEFAULT);

  useEffect(() => {
    setWidth(readStoredWidth());
  }, []);

  const onPointerMove = useCallback((event: PointerEvent) => {
    const delta = event.clientX - dragStartX.current;
    const next = Math.min(
      SIDEBAR_MAX,
      Math.max(SIDEBAR_MIN, dragStartWidth.current + delta),
    );
    setWidth(next);
  }, []);

  const stopDragging = useCallback(() => {
    setDragging(false);
    setWidth((current) => {
      window.localStorage.setItem(STORAGE_KEY, String(current));
      return current;
    });
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
  }, []);

  useEffect(() => {
    if (!dragging) return;

    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", stopDragging);
    window.addEventListener("pointercancel", stopDragging);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", stopDragging);
      window.removeEventListener("pointercancel", stopDragging);
    };
  }, [dragging, onPointerMove, stopDragging]);

  return (
    <div
      className={cn(
        // No overflow-hidden here — it breaks position:sticky.
        "flex flex-col rounded-xl border border-border/80 bg-card shadow-sm lg:flex-row",
        className,
      )}
      style={{ ["--sidebar-w" as string]: `${width}px` }}
    >
      <aside
        className={cn(
          // Mobile: stacked list above content.
          "flex w-full max-h-[min(42dvh,22rem)] shrink-0 flex-col overflow-hidden rounded-t-xl border-b border-border/70 bg-[#ebe4d6]/55",
          // Desktop: sticky full-viewport column.
          "lg:sticky lg:max-h-none lg:w-[var(--sidebar-w)] lg:self-start lg:rounded-t-none lg:rounded-l-xl lg:border-b-0 lg:overflow-hidden",
          STICKY_TOP,
          STICKY_HEIGHT,
        )}
      >
        <div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden">
          {sidebar}
        </div>
      </aside>

      <div
        role="separator"
        aria-orientation="vertical"
        aria-label="Resize sidebar"
        aria-valuemin={SIDEBAR_MIN}
        aria-valuemax={SIDEBAR_MAX}
        aria-valuenow={width}
        tabIndex={0}
        onPointerDown={(event) => {
          event.preventDefault();
          dragStartX.current = event.clientX;
          dragStartWidth.current = width;
          setDragging(true);
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            setWidth((w) => {
              const next = Math.max(SIDEBAR_MIN, w - 16);
              window.localStorage.setItem(STORAGE_KEY, String(next));
              return next;
            });
          }
          if (event.key === "ArrowRight") {
            event.preventDefault();
            setWidth((w) => {
              const next = Math.min(SIDEBAR_MAX, w + 16);
              window.localStorage.setItem(STORAGE_KEY, String(next));
              return next;
            });
          }
        }}
        className={cn(
          "group relative hidden shrink-0 touch-none outline-none",
          "lg:sticky lg:flex lg:w-3.5 lg:cursor-col-resize lg:items-center lg:justify-center lg:self-start",
          STICKY_TOP,
          STICKY_HEIGHT,
          "bg-border/40 hover:bg-border/55 focus-visible:bg-border/60",
          dragging && "bg-primary/20",
        )}
      >
        <span
          aria-hidden
          className={cn(
            "pointer-events-none h-12 w-1.5 rounded-full bg-[#8a8276] transition-colors",
            "group-hover:bg-primary group-focus-visible:bg-primary",
            dragging && "bg-primary",
          )}
        />
      </div>

      <main className="min-h-0 min-w-0 flex-1 overflow-hidden rounded-b-xl bg-card lg:rounded-b-none lg:rounded-r-xl">
        {children}
      </main>
    </div>
  );
}
