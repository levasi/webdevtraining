import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { CreateQuestionForm } from "@/components/admin/create-question-form";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export const metadata = {
  title: "Create Question",
};

export default async function AdminCreateQuestionPage() {
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

  const categories = await db.category.findMany({
    orderBy: { sortOrder: "asc" },
    select: { id: true, name: true },
  });

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Create question</h1>
        <p className="mt-2 text-muted-foreground">
          Add a new question to the interview preparation bank.
        </p>
      </div>

      {categories.length === 0 ? (
        <p className="text-muted-foreground">
          No categories found. Run the database seed before creating questions.
        </p>
      ) : (
        <CreateQuestionForm categories={categories} />
      )}
    </div>
  );
}
