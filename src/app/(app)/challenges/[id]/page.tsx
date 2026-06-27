import { headers } from "next/headers";
import { notFound } from "next/navigation";

import { ChallengeSidebarLayout } from "@/components/challenges/challenge-sidebar-layout";
import { auth } from "@/lib/auth";
import { getChallengeById, getPublishedChallenges } from "@/lib/queries/content";
import { isChallengeResolved } from "@/lib/queries/progress";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function ChallengeDetailPage({ params }: PageProps) {
  const { id } = await params;
  const challenge = await getChallengeById(id);

  if (!challenge) {
    notFound();
  }

  const siblings = await getPublishedChallenges(challenge.category.slug);
  const session = await auth.api.getSession({ headers: await headers() });
  const isResolved = session?.user
    ? await isChallengeResolved(session.user.id, challenge.id)
    : false;

  return (
    <div className="w-full px-2 py-8 sm:px-6">
      <ChallengeSidebarLayout
        challenge={challenge}
        items={siblings}
        isResolved={isResolved}
      />
    </div>
  );
}
