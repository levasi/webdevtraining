"use client";

import { ChallengeDetailPanel } from "@/components/challenges/challenge-detail-panel";
import { ContentSidebar } from "@/components/layout/content-sidebar";
import { SidebarDetailLayout } from "@/components/layout/sidebar-detail-layout";
import type { ChallengeWithCategory } from "@/types";

type ChallengeSidebarLayoutProps = {
  challenge: ChallengeWithCategory;
  items: ChallengeWithCategory[];
  isResolved?: boolean;
};

export function ChallengeSidebarLayout({
  challenge,
  items,
  isResolved = false,
}: ChallengeSidebarLayoutProps) {
  return (
    <SidebarDetailLayout
      sidebar={
        <div className="flex h-full min-h-0 flex-col">
          <div className="flex shrink-0 items-baseline justify-between gap-2 border-b border-border/70 bg-[#e7e0d2]/40 px-3.5 py-3">
            <p className="text-[0.7rem] font-semibold tracking-[0.08em] text-muted-foreground uppercase">
              Challenges
            </p>
            <p className="font-mono text-[0.7rem] text-muted-foreground/80">
              {items.length}
            </p>
          </div>
          <ContentSidebar
            ariaLabel="Coding challenges"
            selectedId={challenge.id}
            hrefForItem={(id) => `/challenges/${id}`}
            items={items.map((item) => ({
              id: item.id,
              title: item.title,
              difficulty: item.difficulty,
              subtitle: item.category.name,
              description: item.description,
            }))}
          />
        </div>
      }
    >
      <div className="p-4 sm:p-6">
        <ChallengeDetailPanel challenge={challenge} isResolved={isResolved} />
      </div>
    </SidebarDetailLayout>
  );
}
