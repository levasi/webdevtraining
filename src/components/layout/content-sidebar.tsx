"use client";

import Link from "next/link";

import { DifficultyBadge } from "@/components/categories/category-grid";
import { cn } from "@/lib/utils";
import type { Difficulty } from "@/generated/prisma/client";

export type ContentSidebarItem = {
  id: string;
  title: string;
  subtitle?: string;
  difficulty?: Difficulty;
  trailing?: React.ReactNode;
};

type ContentSidebarProps = {
  items: ContentSidebarItem[];
  selectedId: string | null;
  onSelect?: (id: string) => void;
  hrefForItem?: (id: string) => string;
  emptyMessage?: string;
  ariaLabel: string;
};

export function ContentSidebar({
  items,
  selectedId,
  onSelect,
  hrefForItem,
  emptyMessage = "No items match the current filter.",
  ariaLabel,
}: ContentSidebarProps) {
  if (items.length === 0) {
    return (
      <p className="p-4 text-sm text-muted-foreground">{emptyMessage}</p>
    );
  }

  return (
    <nav
      aria-label={ariaLabel}
      className="min-h-0 flex-1 overflow-y-auto p-2"
    >
      <ul className="space-y-1">
        {items.map((item) => {
          const isSelected = item.id === selectedId;
          const className = cn(
            "flex w-full flex-col gap-1 rounded-lg px-3 py-2.5 text-left transition-colors",
            isSelected
              ? "bg-primary/10 text-foreground ring-1 ring-primary/20"
              : "text-muted-foreground hover:bg-muted hover:text-foreground",
          );
          const content = (
            <>
              <span className="flex items-start justify-between gap-2">
                <span
                  className={cn(
                    "line-clamp-2 text-sm font-medium leading-snug",
                    isSelected && "text-foreground",
                  )}
                >
                  {item.title}
                </span>
                {item.trailing}
              </span>
              {(item.difficulty || item.subtitle) && (
                <span className="flex flex-wrap items-center gap-2">
                  {item.difficulty ? (
                    <DifficultyBadge difficulty={item.difficulty} />
                  ) : null}
                  {item.subtitle ? (
                    <span className="text-xs text-muted-foreground">
                      {item.subtitle}
                    </span>
                  ) : null}
                </span>
              )}
            </>
          );

          return (
            <li key={item.id}>
              {hrefForItem ? (
                <Link
                  href={hrefForItem(item.id)}
                  aria-current={isSelected ? "page" : undefined}
                  className={className}
                >
                  {content}
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => onSelect?.(item.id)}
                  aria-current={isSelected ? "true" : undefined}
                  className={className}
                >
                  {content}
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
