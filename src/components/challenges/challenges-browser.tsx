"use client";

import { useMemo, useState } from "react";

import { ChallengeDetailPanel } from "@/components/challenges/challenge-detail-panel";
import { ContentSidebar } from "@/components/layout/content-sidebar";
import { SidebarDetailLayout } from "@/components/layout/sidebar-detail-layout";
import type { ChallengeWithCategory } from "@/types";

type ChallengesBrowserProps = {
  challenges: ChallengeWithCategory[];
};

export function ChallengesBrowser({ challenges }: ChallengesBrowserProps) {
  const [selectedId, setSelectedId] = useState(challenges[0]?.id ?? null);
  const selectedChallenge = useMemo(
    () => challenges.find((challenge) => challenge.id === selectedId),
    [challenges, selectedId],
  );

  if (challenges.length === 0) {
    return (
      <p className="text-muted-foreground">
        No coding challenges are available yet.
      </p>
    );
  }

  return (
    <SidebarDetailLayout
      sidebar={
        <div className="flex h-full min-h-0 flex-col">
          <div className="flex shrink-0 items-baseline justify-between gap-2 border-b border-border/70 bg-[#e7e0d2]/40 px-3.5 py-3">
            <p className="text-[0.7rem] font-semibold tracking-[0.08em] text-muted-foreground uppercase">
              Challenges
            </p>
            <p className="font-mono text-[0.7rem] text-muted-foreground/80">
              {challenges.length}
            </p>
          </div>
          <ContentSidebar
            ariaLabel="Coding challenges"
            selectedId={selectedId}
            onSelect={setSelectedId}
            items={challenges.map((challenge) => ({
              id: challenge.id,
              title: challenge.title,
              difficulty: challenge.difficulty,
              subtitle: challenge.category.name,
              description: challenge.description,
            }))}
          />
        </div>
      }
    >
      {selectedChallenge ? (
        <div className="p-4 sm:p-6">
          <ChallengeDetailPanel challenge={selectedChallenge} />
        </div>
      ) : (
        <div className="flex h-full min-h-48 items-center justify-center p-6 text-sm text-muted-foreground">
          Select a challenge from the list.
        </div>
      )}
    </SidebarDetailLayout>
  );
}
