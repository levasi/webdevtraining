"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { CATEGORIES } from "@/lib/constants";
import { cn } from "@/lib/utils";

const navLinkClassName =
  "rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground";

export function CategoriesNavFlyout() {
  return (
    <HoverCard>
      <HoverCardTrigger
        delay={150}
        closeDelay={150}
        render={
          <Link
            href="/categories"
            prefetch={false}
            className={cn(navLinkClassName, "inline-flex items-center gap-1")}
          />
        }
      >
        Categories
        <ChevronDown className="size-3.5 opacity-70" aria-hidden />
      </HoverCardTrigger>
      <HoverCardContent
        side="bottom"
        align="start"
        sideOffset={6}
        className="w-[min(28rem,calc(100vw-2rem))] p-2"
      >
        <div className="mb-2 border-b px-2 pb-2">
          <Link
            href="/categories"
            prefetch={false}
            className="text-sm font-medium hover:underline"
          >
            All categories
          </Link>
        </div>
        <ul className="grid grid-cols-2 gap-0.5 sm:grid-cols-3">
          {CATEGORIES.map((category) => (
            <li key={category.slug}>
              <Link
                href={`/categories/${category.slug}`}
                prefetch={false}
                className="block rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </HoverCardContent>
    </HoverCard>
  );
}
