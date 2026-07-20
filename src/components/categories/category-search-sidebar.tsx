"use client";

import {
  ContentSidebar,
  type ContentSidebarItem,
} from "@/components/layout/content-sidebar";
import { Input } from "@/components/ui/input";

type CategorySearchSidebarProps = {
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder: string;
  searchAriaLabel: string;
  ariaLabel: string;
  items: ContentSidebarItem[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  emptyMessage: string;
};

export function CategorySearchSidebar({
  searchValue,
  onSearchChange,
  searchPlaceholder,
  searchAriaLabel,
  ariaLabel,
  items,
  selectedId,
  onSelect,
  emptyMessage,
}: CategorySearchSidebarProps) {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="shrink-0 space-y-2 border-b border-border/70 bg-[#e7e0d2]/40 px-3 py-3">
        <div className="flex items-baseline justify-between gap-2 px-0.5">
          <p className="text-[0.7rem] font-semibold tracking-[0.08em] text-muted-foreground uppercase">
            {ariaLabel}
          </p>
          <p className="font-mono text-[0.7rem] text-muted-foreground/80">
            {items.length}
          </p>
        </div>
        <Input
          type="search"
          value={searchValue}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder={searchPlaceholder}
          aria-label={searchAriaLabel}
          className="h-9 border-border/80 bg-card/80 shadow-none"
        />
      </div>
      <ContentSidebar
        ariaLabel={ariaLabel}
        searchQuery={searchValue}
        items={items}
        selectedId={selectedId}
        onSelect={onSelect}
        emptyMessage={emptyMessage}
      />
    </div>
  );
}
