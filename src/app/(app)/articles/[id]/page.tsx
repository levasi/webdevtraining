import { notFound } from "next/navigation";

import { ArticleSidebarLayout } from "@/components/articles/article-sidebar-layout";
import { getArticleById, getPublishedArticles } from "@/lib/queries/content";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const article = await getArticleById(id);
  return { title: article?.title ?? "Article" };
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { id } = await params;
  const article = await getArticleById(id);

  if (!article) {
    notFound();
  }

  const siblings = await getPublishedArticles(article.category.slug);

  return (
    <div className="w-full px-4 py-8 sm:px-6">
      <ArticleSidebarLayout article={article} items={siblings} />
    </div>
  );
}
