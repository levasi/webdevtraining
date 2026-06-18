import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export const metadata = {
  title: "Manage Questions",
};

export default async function AdminQuestionsPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    redirect("/login");
  }

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: { role: true },
  });

  if (user?.role !== "ADMIN") {
    redirect("/categories");
  }

  const questions = await db.question.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return (
    <div className="w-full px-4 py-8 sm:px-6">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Questions</h1>
          <p className="mt-2 text-muted-foreground">
            Review existing questions or add new ones to the bank.
          </p>
        </div>
        <ButtonLink href="/admin/questions/new">Create question</ButtonLink>
      </div>

      <div className="space-y-3">
        {questions.length === 0 ? (
          <Card>
            <CardContent className="py-10 text-center text-muted-foreground">
              No questions yet. Create the first one to get started.
            </CardContent>
          </Card>
        ) : (
          questions.map((question) => (
            <Card key={question.id}>
              <CardHeader className="flex-row items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-base">{question.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {question.category.name}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Badge variant="outline">{question.difficulty}</Badge>
                  <Badge variant={question.isPublished ? "default" : "secondary"}>
                    {question.isPublished ? "Published" : "Draft"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="line-clamp-2 text-sm text-muted-foreground">
                {question.content}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
