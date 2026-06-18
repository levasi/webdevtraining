import { ChallengesBrowser } from "@/components/challenges/challenges-browser";
import { getPublishedChallenges } from "@/lib/queries/content";

export const metadata = {
  title: "Challenges",
};

export default async function ChallengesPage() {
  const challenges = await getPublishedChallenges();

  return (
    <div className="w-full px-4 py-8 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Coding Challenges</h1>
        <p className="mt-2 text-muted-foreground">
          Solve JavaScript problems with an in-browser playground and automated tests.
        </p>
      </div>

      <ChallengesBrowser challenges={challenges} />
    </div>
  );
}
