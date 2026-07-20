import { ChallengesBrowser } from "@/components/challenges/challenges-browser";
import { getPublishedChallenges } from "@/lib/queries/content";

export const metadata = {
  title: "Challenges",
};

export default async function ChallengesPage() {
  const challenges = await getPublishedChallenges();

  return (
    <div className="w-full px-2 py-4 sm:px-6 sm:py-8">
      <div className="mb-5 sm:mb-8">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Coding Challenges
        </h1>
        <p className="mt-2 text-sm text-muted-foreground sm:text-base">
          Solve JavaScript problems with an in-browser playground and automated
          tests.
        </p>
      </div>

      <ChallengesBrowser challenges={challenges} />
    </div>
  );
}
