"use client";

import { ContentSidebar } from "@/components/layout/content-sidebar";
import { SidebarDetailLayout } from "@/components/layout/sidebar-detail-layout";
import { ArticleDetailPanel } from "@/components/articles/article-detail-panel";
import type { ArticleWithCategory } from "@/types";

type ArticleSidebarLayoutProps = {
  article: ArticleWithCategory;
  items: ArticleWithCategory[];
};

export function ArticleSidebarLayout({
  article,
  items,
}: ArticleSidebarLayoutProps) {
  return (
    <SidebarDetailLayout
      sidebar={
        <ContentSidebar
          ariaLabel="Articles"
          selectedId={article.id}
          hrefForItem={(id) => `/articles/${id}`}
          items={items.map((item) => ({
            id: item.id,
            title: item.title,
            difficulty: item.difficulty ?? "INTERMEDIATE",
            subtitle: item.excerpt ?? "Article",
          }))}
        />
      }
    >
      <div className="p-4 sm:p-6">
        <ArticleDetailPanel article={article} titleAs="h1" />
      </div>
    </SidebarDetailLayout>
  );
}
