"use client";

import dynamic from "next/dynamic";

import { ChallengeResolvedCheckbox } from "@/components/challenges/challenge-resolved-checkbox";
import type { ChallengeWithCategory, TestCase } from "@/types";

const CodePlayground = dynamic(
  () =>
    import("@/components/challenges/code-playground").then(
      (mod) => mod.CodePlayground,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="grid min-h-[420px] place-items-center rounded-[10px] border border-border bg-card text-sm text-muted-foreground">
        Loading playground…
      </div>
    ),
  },
);

type ChallengeDetailPanelProps = {
  challenge: ChallengeWithCategory;
  isResolved?: boolean;
  onResolvedChange?: (challengeId: string, resolved: boolean) => void;
};

export function ChallengeDetailPanel({
  challenge,
  isResolved = false,
  onResolvedChange,
}: ChallengeDetailPanelProps) {
  return (
    <CodePlayground
      challengeId={challenge.id}
      starterCode={challenge.starterCode}
      solutionCode={challenge.solutionCode}
      hints={challenge.hints}
      testCases={challenge.testCases as TestCase[]}
      toolbarEnd={
        <ChallengeResolvedCheckbox
          challengeId={challenge.id}
          isResolved={isResolved}
          onResolvedChange={onResolvedChange}
        />
      }
    />
  );
}
