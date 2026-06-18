import Link from "next/link";

import { DifficultyBadge } from "@/components/categories/category-grid";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/lib/db";

export const metadata = {
  title: "Challenges",
};

export default async function ChallengesPage() {
  const challenges = await db.challenge.findMany({
    where: { isPublished: true },
    include: {
      category: { select: { name: true, slug: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="w-full px-4 py-8 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Coding Challenges</h1>
        <p className="mt-2 text-muted-foreground">
          Solve JavaScript problems with an in-browser playground and automated tests.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {challenges.map((challenge) => (
          <Link key={challenge.id} href={`/challenges/${challenge.id}`}>
            <Card className="h-full transition-shadow hover:shadow-md">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <DifficultyBadge difficulty={challenge.difficulty} />
                </div>
                <CardTitle>{challenge.title}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {challenge.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {challenge.category.name}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
