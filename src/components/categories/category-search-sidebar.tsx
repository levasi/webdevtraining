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
      <div className="shrink-0 border-b border-border/80 p-3">
        <Input
          type="search"
          value={searchValue}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder={searchPlaceholder}
          aria-label={searchAriaLabel}
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
