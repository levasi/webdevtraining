import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export const metadata = {
  title: "Completed",
};

function isCompletedStatus(status: string) {
  return status === "COMPLETED" || status === "MASTERED";
}

export default async function CompletedPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    redirect("/login");
  }

  const progress = await db.progress.findMany({
    where: { userId: session.user.id },
    include: {
      category: { select: { name: true } },
      question: { select: { title: true } },
      challenge: { select: { title: true } },
    },
    orderBy: { lastStudiedAt: "desc" },
  });

  const completed = progress.filter((item) => isCompletedStatus(item.status));

  return (
    <div className="w-full px-4 py-8 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">Completed</h1>
      <p className="mt-2 text-muted-foreground">
        Everything you have completed across quizzes, questions, and challenges.
      </p>

      {completed.length === 0 ? (
        <div className="mt-8">
          <p className="text-muted-foreground">
            Nothing completed yet. Try a quiz or a coding challenge.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {completed.map((item) => (
            <Card key={item.id} className="h-full">
              <CardHeader className="gap-2">
                <div className="flex items-start justify-between gap-3">
                  <CardTitle className="text-base leading-snug">
                    {item.question?.title ??
                      item.challenge?.title ??
                      item.category?.name ??
                      "Study item"}
                  </CardTitle>
                  <Badge variant="outline" className="shrink-0">
                    {item.status}
                  </Badge>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary">{item.mode}</Badge>
                  {item.category?.name ? (
                    <Badge variant="outline">{item.category.name}</Badge>
                  ) : null}
                  {item.score != null ? (
                    <Badge variant="secondary">{item.score}%</Badge>
                  ) : null}
                </div>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Attempts: {item.attempts}
                <br />
                Last studied: {item.lastStudiedAt.toLocaleDateString()}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

