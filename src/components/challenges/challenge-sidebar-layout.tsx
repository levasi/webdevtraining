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
        <ContentSidebar
          ariaLabel="Coding challenges"
          selectedId={challenge.id}
          hrefForItem={(id) => `/challenges/${id}`}
          items={items.map((item) => ({
            id: item.id,
            title: item.title,
            difficulty: item.difficulty,
            subtitle: item.category.name,
          }))}
        />
      }
    >
      <div className="p-4 sm:p-6">
        <ChallengeDetailPanel challenge={challenge} isResolved={isResolved} />
      </div>
    </SidebarDetailLayout>
  );
}
