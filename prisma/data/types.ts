export type SeedDifficulty = "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
export type SeedQuestionType =
  | "EXPLANATION"
  | "MULTIPLE_CHOICE"
  | "TRUE_FALSE"
  | "FLASHCARD"
  | "SHORT_ANSWER";

export type SeedAnswer = {
  content: string;
  isCorrect: boolean;
};

export type SeedQuestion = {
  id: string;
  categorySlug: string;
  title: string;
  content: string;
  explanation: string;
  difficulty: SeedDifficulty;
  type: SeedQuestionType;
  tags: string[];
  answers: SeedAnswer[];
};

export type SeedArticle = {
  id: string;
  categorySlug: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  difficulty?: SeedDifficulty;
  tags: string[];
  sortOrder?: number;
};
