import { headers } from "next/headers";
import { redirect } from "next/navigation";

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
  title: "Admin",
};

export default async function AdminPage() {
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

  const [questions, challenges, categories] = await Promise.all([
    db.question.count(),
    db.challenge.count(),
    db.category.count(),
  ]);

  return (
    <div className="w-full px-4 py-8 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">Admin</h1>
      <p className="mt-2 text-muted-foreground">
        Manage content and view basic platform analytics.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              Questions
            </CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">{questions}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              Challenges
            </CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">{challenges}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              Categories
            </CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">{categories}</CardContent>
        </Card>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href="/admin/questions">Manage questions</ButtonLink>
        <ButtonLink href="/admin/questions/new" variant="outline">
          Create question
        </ButtonLink>
        <ButtonLink href="/admin/settings" variant="outline">
          Settings
        </ButtonLink>
        <ButtonLink href="/categories" variant="outline">
          View categories
        </ButtonLink>
      </div>
    </div>
  );
}
