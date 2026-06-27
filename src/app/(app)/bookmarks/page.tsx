import { headers } from "next/headers";
import { redirect } from "next/navigation";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export const metadata = {
  title: "Bookmarks",
};

export default async function BookmarksPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    redirect("/login");
  }

  const bookmarks = await db.bookmark.findMany({
    where: { userId: session.user.id },
    include: {
      question: {
        include: {
          category: { select: { name: true, slug: true } },
          answers: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="w-full px-2 py-8 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">Bookmarks</h1>
      <p className="mt-2 text-muted-foreground">
        Questions you saved for later review.
      </p>

      <div className="mt-8 space-y-3">
        {bookmarks.length === 0 ? (
          <p className="text-muted-foreground">No bookmarks yet.</p>
        ) : (
          bookmarks.map((bookmark) => (
            <Card key={bookmark.id}>
              <CardHeader>
                <CardTitle className="text-base">
                  {bookmark.question.title}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {bookmark.question.category.name}
                </p>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {bookmark.question.content}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
