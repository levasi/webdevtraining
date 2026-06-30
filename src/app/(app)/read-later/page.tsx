import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { DIFFICULTY_LABELS } from "@/lib/constants";
import { categoryQuestionHref } from "@/lib/question-hash";

export const metadata = {
  title: "Read later",
};

export default async function ReadLaterPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    redirect("/login");
  }

  const bookmarks = await db.bookmark.findMany({
    where: { userId: session.user.id },
    include: {
      question: {
        select: {
          id: true,
          title: true,
          difficulty: true,
          category: { select: { name: true, slug: true } },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const questions = bookmarks
    .map((bookmark) => bookmark.question)
    .filter((question) => question != null);

  return (
    <div className="w-full px-2 py-8 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">Read later</h1>
      <p className="mt-2 text-muted-foreground">
        Questions you saved to revisit.
      </p>

      {questions.length === 0 ? (
        <p className="mt-8 text-muted-foreground">
          No saved questions yet. Use &ldquo;Read later&rdquo; on any question to
          add it here.
        </p>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {questions.map((question) => (
            <Link
              key={question.id}
              href={categoryQuestionHref(question.category.slug, question.id)}
              className="block h-full"
            >
              <Card className="h-full transition-colors hover:bg-muted/30">
                <CardHeader className="gap-2">
                  <CardTitle className="text-base leading-snug">
                    {question.title}
                  </CardTitle>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="outline">{question.category.name}</Badge>
                    <Badge variant="secondary">
                      {DIFFICULTY_LABELS[question.difficulty]}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Open in category
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
