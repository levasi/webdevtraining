import { headers } from "next/headers";
import { notFound } from "next/navigation";

import { CategoryContent } from "@/components/categories/category-content";
import { auth } from "@/lib/auth";
import { getCategoryBySlug } from "@/lib/queries/content";
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
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const session = await auth.api.getSession({ headers: await headers() });
  const completedQuestionIds = session?.user
    ? await getCompletedQuestionIds(session.user.id)
    : [];

  return (
    <div className="w-full px-4 py-8 sm:px-6">
      <div className="mb-8">
        <p className="text-sm text-muted-foreground">Category</p>
        <h1 className="text-3xl font-bold tracking-tight">{category.name}</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          {category.description}
        </p>
      </div>

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
      />
    </div>
  );
}
