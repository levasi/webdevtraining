import { headers } from "next/headers";
import { notFound } from "next/navigation";

import { CategoryContent } from "@/components/categories/category-content";
import { auth } from "@/lib/auth";
import { getCategoryBySlug } from "@/lib/queries/content";
import { getReadLaterQuestionIds } from "@/lib/queries/bookmarks";
import { getCompletedQuestionIds } from "@/lib/queries/progress";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  return { title: category?.name ?? "Category" };
}

export default async function CategoryDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const requestHeaders = await headers();

  const [category, session] = await Promise.all([
    getCategoryBySlug(slug),
    auth.api.getSession({ headers: requestHeaders }),
  ]);

  if (!category) {
    notFound();
  }

  const [completedQuestionIds, readLaterQuestionIds] = session?.user
    ? await Promise.all([
        getCompletedQuestionIds(session.user.id),
        getReadLaterQuestionIds(session.user.id),
      ])
    : [[], []];

  const isAdmin = session?.user?.role === "ADMIN";

  return (
    <div className="w-full px-2 py-8 sm:px-6">
      <CategoryContent
        category={{
          id: category.id,
          name: category.name,
          slug: category.slug,
          questions: category.questions,
          challenges: category.challenges,
          articles: category.articles,
        }}
        completedQuestionIds={completedQuestionIds}
        readLaterQuestionIds={readLaterQuestionIds}
        isAdmin={isAdmin}
      />
    </div>
  );
}
