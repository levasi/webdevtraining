"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";

import { DifficultyBadge } from "@/components/categories/category-grid";
import { highlightSearchMatches } from "@/lib/search-highlight";
import { cn } from "@/lib/utils";
import type { Difficulty } from "@/generated/prisma/client";

export type ContentSidebarItem = {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
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
  searchQuery?: string;
};

export function ContentSidebar({
  items,
  selectedId,
  onSelect,
  hrefForItem,
  emptyMessage = "No items match the current filter.",
  ariaLabel,
  searchQuery = "",
}: ContentSidebarProps) {
  if (items.length === 0) {
    return (
      <p className="p-4 text-sm text-muted-foreground">{emptyMessage}</p>
    );
  }

  return (
    <nav
      aria-label={ariaLabel}
      className="content-sidebar-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain py-2 pr-1.5 pl-2"
    >
      <ul className="flex flex-col gap-1">
        {items.map((item) => {
          const isSelected = item.id === selectedId;
          const hasAccordion = Boolean(item.description);
          const isExpanded = hasAccordion && isSelected;

          const triggerClassName = cn(
            "group relative flex w-full cursor-pointer flex-col gap-1.5 rounded-lg px-3 py-2.5 text-left transition-[background-color,box-shadow,color] duration-150",
            isSelected
              ? "bg-card text-foreground"
              : "text-foreground/85 hover:bg-card/70 hover:text-foreground",
            isExpanded && "rounded-b-none",
          );

          const header = (
            <>
              <span
                aria-hidden
                className={cn(
                  "absolute top-2 bottom-2 left-0 w-[3px] rounded-full transition-opacity",
                  isSelected
                    ? "bg-primary opacity-100"
                    : "bg-transparent opacity-0 group-hover:bg-border group-hover:opacity-100",
                )}
              />
              <span className="flex items-start justify-between gap-2 pl-1">
                <span
                  className={cn(
                    "line-clamp-2 min-w-0 flex-1 text-[0.925rem] leading-snug",
                    isSelected
                      ? "font-semibold text-foreground"
                      : "font-medium",
                  )}
                >
                  {highlightSearchMatches(item.title, searchQuery)}
                </span>
                <span className="flex shrink-0 items-center gap-1.5">
                  {item.trailing}
                  {hasAccordion ? (
                    <ChevronDown
                      aria-hidden
                      className={cn(
                        "size-3.5 text-muted-foreground transition-transform duration-200",
                        isExpanded && "rotate-180 text-foreground",
                      )}
                    />
                  ) : null}
                </span>
              </span>
              {(item.difficulty || item.subtitle) && (
                <span className="flex flex-wrap items-center gap-1.5 pl-1">
                  {item.difficulty ? (
                    <DifficultyBadge difficulty={item.difficulty} />
                  ) : null}
                  {item.subtitle ? (
                    <span className="text-[0.7rem] font-medium tracking-wide text-muted-foreground/90 uppercase">
                      {item.subtitle}
                    </span>
                  ) : null}
                </span>
              )}
            </>
          );

          return (
            <li key={item.id}>
              <div
                className={cn(
                  "overflow-hidden rounded-lg transition-[box-shadow,background-color] duration-150",
                  isSelected &&
                    "bg-card shadow-sm ring-1 ring-primary/20",
                )}
              >
                {hrefForItem ? (
                  <Link
                    href={hrefForItem(item.id)}
                    aria-current={isSelected ? "page" : undefined}
                    aria-expanded={hasAccordion ? isExpanded : undefined}
                    className={triggerClassName}
                  >
                    {header}
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() => onSelect?.(item.id)}
                    aria-current={isSelected ? "true" : undefined}
                    aria-expanded={hasAccordion ? isExpanded : undefined}
                    className={triggerClassName}
                  >
                    {header}
                  </button>
                )}

                {hasAccordion ? (
                  <div
                    className={cn(
                      "grid transition-[grid-template-rows] duration-200 ease-out",
                      isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                    )}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <p className="border-t border-border/60 px-3.5 pt-2 pb-3 pl-4 text-[0.8125rem] leading-relaxed text-foreground/75">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ) : null}
              </div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
