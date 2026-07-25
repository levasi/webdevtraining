export type ChatContentContext = {
  type: "question" | "challenge";
  id: string;
  title: string;
  summary: string;
  categorySlug?: string;
};

export type StudyContentSnippet = {
  kind: "question" | "article";
  id: string;
  title: string;
  categoryName: string;
  excerpt: string;
  /** In-app path the model should cite as a markdown link. */
  href: string;
};
