import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { AdminQuestionList } from "@/components/admin/admin-question-list";
import { ButtonLink } from "@/components/ui/button-link";
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
    <div className="w-full px-2 py-8 sm:px-6">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Questions</h1>
          <p className="mt-2 text-muted-foreground">
            Review existing questions or add new ones to the bank.
          </p>
        </div>
        <ButtonLink href="/admin/questions/new">Create question</ButtonLink>
      </div>

      <AdminQuestionList questions={questions} />
    </div>
  );
}
