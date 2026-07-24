"use client";

import { useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  ChevronDownIcon,
  ExternalLinkIcon,
  MessageSquareIcon,
  XIcon,
} from "lucide-react";

import { DeveloperChat } from "@/components/chat/developer-chat";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import { cn } from "@/lib/utils";

const HIDDEN_PATH_PREFIXES = ["/chat", "/login", "/register"];
const SIZE_STORAGE_KEY = "ask-ai-widget-size";
const DEFAULT_WIDTH = 384;
const DEFAULT_HEIGHT = 576;
const MIN_WIDTH = 320;
const MIN_HEIGHT = 420;

type WidgetSize = {
  width: number;
  height: number;
};

function clampSize(size: WidgetSize): WidgetSize {
  const maxWidth = Math.max(MIN_WIDTH, window.innerWidth - 40);
  const maxHeight = Math.max(MIN_HEIGHT, window.innerHeight - 112);

  return {
    width: Math.min(Math.max(size.width, MIN_WIDTH), maxWidth),
    height: Math.min(Math.max(size.height, MIN_HEIGHT), maxHeight),
  };
}

function readStoredSize(): WidgetSize {
  if (typeof window === "undefined") {
    return { width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT };
  }

  try {
    const raw = window.localStorage.getItem(SIZE_STORAGE_KEY);
    if (!raw) {
      return clampSize({ width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT });
    }
    const parsed = JSON.parse(raw) as Partial<WidgetSize>;
    return clampSize({
      width: Number(parsed.width) || DEFAULT_WIDTH,
      height: Number(parsed.height) || DEFAULT_HEIGHT,
    });
  } catch {
    return clampSize({ width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT });
  }
}

export function AskAiWidget() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState<WidgetSize>({
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
  });
  const [resizing, setResizing] = useState(false);
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const sizeRef = useRef(size);

  sizeRef.current = size;

  const hidden = HIDDEN_PATH_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );

  useEffect(() => {
    setSize(readStoredSize());

    const onResize = () => {
      setSize((current) => clampSize(current));
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    const onPointerDown = (event: MouseEvent | PointerEvent) => {
      if (resizing) {
        return;
      }
      const target = event.target as Node | null;
      if (target && rootRef.current && !rootRef.current.contains(target)) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open, resizing]);

  const startResize =
    (axes: "width" | "height" | "both") =>
    (event: React.PointerEvent<HTMLButtonElement>) => {
      event.preventDefault();
      event.stopPropagation();

      const startX = event.clientX;
      const startY = event.clientY;
      const startSize = sizeRef.current;
      setResizing(true);

      const cursor =
        axes === "width"
          ? "ew-resize"
          : axes === "height"
            ? "ns-resize"
            : "nwse-resize";

      const onPointerMove = (moveEvent: PointerEvent) => {
        const next = clampSize({
          width:
            axes === "height"
              ? startSize.width
              : startSize.width + (startX - moveEvent.clientX),
          height:
            axes === "width"
              ? startSize.height
              : startSize.height + (startY - moveEvent.clientY),
        });
        sizeRef.current = next;
        setSize(next);
      };

      const onPointerUp = () => {
        setResizing(false);
        window.localStorage.setItem(
          SIZE_STORAGE_KEY,
          JSON.stringify(sizeRef.current),
        );
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerup", onPointerUp);
      };

      document.body.style.cursor = cursor;
      document.body.style.userSelect = "none";
      window.addEventListener("pointermove", onPointerMove);
      window.addEventListener("pointerup", onPointerUp);
    };

  if (hidden) {
    return null;
  }

  return (
    <div
      ref={rootRef}
      className="pointer-events-none fixed right-5 bottom-5 z-40 flex flex-col items-end gap-3"
    >
      <div
        id={panelId}
        role="dialog"
        aria-modal="false"
        aria-label="Ask AI chat"
        aria-hidden={!open}
        style={{ width: size.width, height: size.height }}
        className={cn(
          "relative flex max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-2xl border border-border/70 bg-card shadow-2xl shadow-black/20",
          "origin-bottom-right",
          resizing ? null : "transition-[opacity,transform,visibility] duration-200",
          open
            ? "pointer-events-auto visible translate-y-0 scale-100 opacity-100"
            : "pointer-events-none invisible translate-y-2 scale-95 opacity-0",
        )}
      >
        {/* Left edge — drag to change width */}
        <button
          type="button"
          aria-label="Resize chat width"
          title="Drag to resize width"
          onPointerDown={startResize("width")}
          className={cn(
            "absolute top-10 bottom-3 left-0 z-10 w-3 cursor-ew-resize rounded-r-md border-0 bg-transparent p-0",
            "after:absolute after:top-1/2 after:left-1/2 after:h-10 after:w-1 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:bg-muted-foreground/35 after:transition-colors after:content-['']",
            "hover:after:bg-primary",
            resizing && "after:bg-primary",
          )}
        />

        {/* Top-left corner — drag to change width and height */}
        <button
          type="button"
          aria-label="Resize Ask AI widget"
          title="Drag to resize"
          onPointerDown={startResize("both")}
          className={cn(
            "absolute top-1.5 left-1.5 z-20 flex size-7 cursor-nwse-resize items-center justify-center rounded-md",
            "border border-border/80 bg-muted/90 text-muted-foreground shadow-sm",
            "transition-colors hover:border-primary hover:bg-primary/15 hover:text-primary",
            resizing && "border-primary bg-primary/20 text-primary",
          )}
        >
          <svg
            viewBox="0 0 12 12"
            className="size-3.5"
            aria-hidden="true"
            fill="currentColor"
          >
            <circle cx="2.5" cy="9.5" r="1.1" />
            <circle cx="6" cy="9.5" r="1.1" />
            <circle cx="9.5" cy="9.5" r="1.1" />
            <circle cx="6" cy="6" r="1.1" />
            <circle cx="9.5" cy="6" r="1.1" />
            <circle cx="9.5" cy="2.5" r="1.1" />
          </svg>
        </button>

        <div className="flex items-start justify-between gap-3 border-b border-border/60 bg-gradient-to-br from-primary/15 via-card to-card py-3.5 pr-4 pl-11">
          <div className="min-w-0 space-y-0.5">
            <p className="text-base font-semibold tracking-tight">
              Hey there! Ask AI
            </p>
            <p className="text-xs text-muted-foreground">
              Interview coaching for web developers
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-1">
            <ButtonLink
              href="/chat"
              variant="ghost"
              size="xs"
              className="gap-1 rounded-full px-2 text-xs"
            >
              Full chat
              <ExternalLinkIcon className="size-3.5" />
            </ButtonLink>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="rounded-full"
              aria-label="Close Ask AI"
              onClick={() => setOpen(false)}
            >
              <XIcon className="size-4" />
            </Button>
          </div>
        </div>

        <div className="flex min-h-0 flex-1 flex-col p-2.5">
          <DeveloperChat
            compact
            className="h-full min-h-0 flex-1 rounded-xl border-border/50 shadow-none"
          />
        </div>
      </div>

      <Button
        type="button"
        className={cn(
          "pointer-events-auto h-14 cursor-pointer gap-2 rounded-full shadow-lg shadow-primary/25",
          open ? "size-14 px-0" : "px-5",
        )}
        aria-label={open ? "Close Ask AI chat" : "Open Ask AI chat"}
        aria-expanded={open}
        aria-controls={panelId}
        title="Ask AI"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? (
          <ChevronDownIcon className="size-6" />
        ) : (
          <>
            <span className="text-sm font-semibold tracking-tight">Ask AI</span>
            <MessageSquareIcon className="size-5" />
          </>
        )}
      </Button>
    </div>
  );
}
