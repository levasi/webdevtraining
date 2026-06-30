import type {
  Category,
  Challenge,
  Article,
  Difficulty,
  Question,
  Answer,
} from "@/generated/prisma/client";

export type QuestionWithAnswers = Question & {
  answers: Answer[];
  category: Pick<Category, "id" | "name" | "slug">;
};

export type CategoryAnswerMeta = Pick<Answer, "id" | "sortOrder" | "isCorrect">;

export type CategoryQuestionSummary = Question & {
  answers: CategoryAnswerMeta[];
  category: Pick<Category, "id" | "name" | "slug">;
};

export type ArticleWithCategory = Article & {
  category: Pick<Category, "id" | "name" | "slug">;
};

export type ChallengeWithCategory = Challenge & {
  category: Pick<Category, "id" | "name" | "slug">;
};

export type TestCase = {
  input: unknown;
  expectedOutput: unknown;
  description?: string;
};

export type TestResult = TestCase & {
  passed: boolean;
  actualOutput?: unknown;
  error?: string;
};

export type CategorySummary = Pick<
  Category,
  "id" | "name" | "slug" | "description" | "icon"
> & {
  _count: {
    questions: number;
    challenges: number;
    articles: number;
  };
};

export type DifficultyFilter = Difficulty | "ALL";

export type QuizPlayerQuestion = {
  id: string;
  title: string;
  content: string;
  type: Question["type"];
  answers: Array<Pick<Answer, "id" | "content">>;
};

export type QuizPlayerData = {
  id: string;
  title: string;
  description: string | null;
  timeLimit: number | null;
  questions: QuizPlayerQuestion[];
};

export type ActionResult<T = void> =
  | { success: true; data: T }
  | { success: false; error: string };
