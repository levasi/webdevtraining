import { headers } from "next/headers";
import { notFound } from "next/navigation";

import { CodePlayground } from "@/components/challenges/code-playground";
import { ChallengeResolvedCheckbox } from "@/components/challenges/challenge-resolved-checkbox";
import { DifficultyBadge } from "@/components/categories/category-grid";
import { auth } from "@/lib/auth";
import { getChallengeById } from "@/lib/queries/content";
import { isChallengeResolved } from "@/lib/queries/progress";
import type { TestCase } from "@/types";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function ChallengeDetailPage({ params }: PageProps) {
  const { id } = await params;
  const challenge = await getChallengeById(id);

  if (!challenge) {
    notFound();
  }

  const session = await auth.api.getSession({ headers: await headers() });
  const isResolved = session?.user
    ? await isChallengeResolved(session.user.id, challenge.id)
    : false;

  return (
    <div className="w-full px-4 py-8 sm:px-6">
      <div className="mb-8">
        <div className="mb-3 flex items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <DifficultyBadge difficulty={challenge.difficulty} />
            <span className="text-sm text-muted-foreground">
              {challenge.category.name}
            </span>
          </div>
          <ChallengeResolvedCheckbox
            challengeId={challenge.id}
            isResolved={isResolved}
          />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">{challenge.title}</h1>
        <p className="mt-2 max-w-3xl text-muted-foreground">
          {challenge.description}
        </p>
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
