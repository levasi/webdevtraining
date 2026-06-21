import { Badge } from "@/components/ui/badge";
import { ArticleBody } from "@/components/articles/article-body";
import { DIFFICULTY_LABELS } from "@/lib/constants";
import type { Difficulty } from "@/generated/prisma/client";
import type { ArticleWithCategory } from "@/types";

const difficultyVariant = {
  BEGINNER: "secondary",
  INTERMEDIATE: "default",
  ADVANCED: "destructive",
} as const;

type ArticleDetailPanelProps = {
  article: ArticleWithCategory;
  showCategory?: boolean;
  titleAs?: "h1" | "h2";
};

export function ArticleDetailPanel({
  article,
  showCategory = true,
  titleAs = "h2",
}: ArticleDetailPanelProps) {
  const TitleTag = titleAs;

  return (
    <article className="space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        {article.difficulty ? (
          <Badge variant={difficultyVariant[article.difficulty as Difficulty]}>
            {DIFFICULTY_LABELS[article.difficulty as Difficulty]}
          </Badge>
        ) : null}
        {showCategory ? (
          <Badge variant="outline">{article.category.name}</Badge>
        ) : null}
        <Badge variant="secondary">Article</Badge>
      </div>

      <header className="space-y-3">
        <TitleTag className="text-2xl font-bold leading-snug tracking-tight">
          {article.title}
        </TitleTag>
        {article.excerpt ? (
          <p className="text-base leading-relaxed text-muted-foreground">
            {article.excerpt}
          </p>
        ) : null}
      </header>

      <ArticleBody content={article.content} />
    </article>
  );
}
