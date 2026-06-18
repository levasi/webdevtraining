"use client";

import { CodePlayground } from "@/components/challenges/code-playground";
import { ChallengeResolvedCheckbox } from "@/components/challenges/challenge-resolved-checkbox";
import { DifficultyBadge } from "@/components/categories/category-grid";
import type { ChallengeWithCategory, TestCase } from "@/types";

type ChallengeDetailPanelProps = {
  challenge: ChallengeWithCategory;
  isResolved?: boolean;
};

export function ChallengeDetailPanel({
  challenge,
  isResolved = false,
}: ChallengeDetailPanelProps) {
  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <DifficultyBadge difficulty={challenge.difficulty} />
            <span className="text-sm text-muted-foreground">
              {challenge.category.name}
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">{challenge.title}</h1>
          <p className="max-w-3xl leading-relaxed text-muted-foreground">
            {challenge.description}
          </p>
        </div>
        <ChallengeResolvedCheckbox
          challengeId={challenge.id}
          isResolved={isResolved}
        />
      </div>

      <CodePlayground
        challengeId={challenge.id}
        starterCode={challenge.starterCode}
        solutionCode={challenge.solutionCode}
        hints={challenge.hints}
        testCases={challenge.testCases as TestCase[]}
      />
    </div>
  );
}
