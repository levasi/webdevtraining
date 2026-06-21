"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { ArticleDetailPanel } from "@/components/articles/article-detail-panel";
import { ChallengeDetailPanel } from "@/components/challenges/challenge-detail-panel";
import { ContentSidebar } from "@/components/layout/content-sidebar";
import { SidebarDetailLayout } from "@/components/layout/sidebar-detail-layout";
import { QuestionCompletionCheckbox } from "@/components/questions/question-completion-checkbox";
import { QuestionDetailPanel } from "@/components/questions/question-detail-panel";
import { QuizQuestionPlayer } from "@/components/quiz/quiz-question-player";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DIFFICULTY_LABELS } from "@/lib/constants";
import { filterQuizEligibleQuestions } from "@/lib/questions/quiz-eligible";
import {
  CATEGORY_SORT_LABELS,
  type CategorySortOption,
  sortCategoryItems,
} from "@/lib/questions/sort";
import type { Article, Challenge, Question, Answer, Category } from "@/generated/prisma/client";
import type { DifficultyFilter } from "@/types";

type CategoryQuestion = Question & {
  answers: Answer[];
  category: Pick<Category, "id" | "name" | "slug">;
};

type CategoryTab = "questions" | "challenges" | "quizzes" | "articles";

type CategoryContentProps = {
  category: {
    id: string;
    name: string;
    slug: string;
    questions: CategoryQuestion[];
    challenges: Challenge[];
    articles: Article[];
  };
  completedQuestionIds?: string[];
};

const difficultyFilters: Array<{ value: DifficultyFilter; label: string }> = [
  { value: "ALL", label: "All difficulties" },
  ...Object.entries(DIFFICULTY_LABELS).map(([value, label]) => ({
    value: value as DifficultyFilter,
    label,
  })),
];

const sortOptions = Object.entries(CATEGORY_SORT_LABELS).map(([value, label]) => ({
  value: value as CategorySortOption,
  label,
}));

function filterByDifficulty<T extends { difficulty: CategoryQuestion["difficulty"] }>(
  items: T[],
  difficultyFilter: DifficultyFilter,
) {
  if (difficultyFilter === "ALL") {
    return items;
  }

  return items.filter((item) => item.difficulty === difficultyFilter);
}

function filterArticlesByDifficulty(
  items: Article[],
  difficultyFilter: DifficultyFilter,
) {
  if (difficultyFilter === "ALL") {
    return items;
  }

  return items.filter((item) => item.difficulty === difficultyFilter);
}

function getFirstAvailableTab(category: CategoryContentProps["category"]): CategoryTab {
  if (category.questions.length > 0) {
    return "questions";
  }

  if (category.articles.length > 0) {
    return "articles";
  }

  if (category.challenges.length > 0) {
    return "challenges";
  }

  if (filterQuizEligibleQuestions(category.questions).length > 0) {
    return "quizzes";
  }

  return "questions";
}

function useSyncedSelection<T extends { id: string }>(items: T[]) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    if (items.length === 0) {
      setSelectedId(null);
      return;
    }

    if (!selectedId || !items.some((item) => item.id === selectedId)) {
      setSelectedId(items[0].id);
    }
  }, [items, selectedId]);

  return [selectedId, setSelectedId] as const;
}

function EmptyDetail({ message }: { message: string }) {
  return (
    <div className="flex h-full min-h-48 items-center justify-center p-6 text-sm text-muted-foreground">
      {message}
    </div>
  );
}

export function CategoryContent({
  category,
  completedQuestionIds = [],
}: CategoryContentProps) {
  const [categoryState, setCategoryState] = useState(category);

  useEffect(() => {
    setCategoryState(category);
  }, [category]);
  const [activeTab, setActiveTab] = useState<CategoryTab>(() =>
    getFirstAvailableTab(categoryState),
  );
  const [difficultyFilter, setDifficultyFilter] =
    useState<DifficultyFilter>("ALL");
  const [sort, setSort] = useState<CategorySortOption>("difficulty-asc");
  const [showCompleted, setShowCompleted] = useState(true);
  const [completedIds, setCompletedIds] = useState(
    () => new Set(completedQuestionIds),
  );

  const quizQuestions = useMemo(
    () => filterQuizEligibleQuestions(categoryState.questions),
    [categoryState.questions],
  );

  const hasQuestions = categoryState.questions.length > 0;
  const hasChallenges = categoryState.challenges.length > 0;
  const hasQuizzes = quizQuestions.length > 0;
  const hasArticles = categoryState.articles.length > 0;

  const availableTabs = useMemo(() => {
    const tabs: CategoryTab[] = [];

    if (hasQuestions) {
      tabs.push("questions");
    }

    if (hasArticles) {
      tabs.push("articles");
    }

    if (hasChallenges) {
      tabs.push("challenges");
    }

    if (hasQuizzes) {
      tabs.push("quizzes");
    }

    return tabs;
  }, [hasQuestions, hasArticles, hasChallenges, hasQuizzes]);

  useEffect(() => {
    if (!availableTabs.includes(activeTab) && availableTabs.length > 0) {
      setActiveTab(availableTabs[0]);
    }
  }, [activeTab, availableTabs]);

  const filteredQuestions = useMemo(() => {
    const items = filterByDifficulty(categoryState.questions, difficultyFilter);
    return sortCategoryItems(items, sort);
  }, [categoryState.questions, difficultyFilter, sort]);

  const visibleQuestions = useMemo(() => {
    if (showCompleted) {
      return filteredQuestions;
    }

    return filteredQuestions.filter((question) => !completedIds.has(question.id));
  }, [filteredQuestions, showCompleted, completedIds]);

  const filteredChallenges = useMemo(() => {
    const items = filterByDifficulty(categoryState.challenges, difficultyFilter);
    return sortCategoryItems(items, sort);
  }, [categoryState.challenges, difficultyFilter, sort]);

  const filteredQuizQuestions = useMemo(() => {
    const items = filterByDifficulty(quizQuestions, difficultyFilter);
    return sortCategoryItems(items, sort);
  }, [quizQuestions, difficultyFilter, sort]);

  const filteredArticles = useMemo(() => {
    const items = filterArticlesByDifficulty(categoryState.articles, difficultyFilter);
    return sortCategoryItems(
      items.map((article) => ({
        ...article,
        difficulty: article.difficulty ?? "INTERMEDIATE",
      })),
      sort,
    );
  }, [categoryState.articles, difficultyFilter, sort]);

  const [selectedQuestionId, setSelectedQuestionId] =
    useSyncedSelection(visibleQuestions);
  const [selectedChallengeId, setSelectedChallengeId] =
    useSyncedSelection(filteredChallenges);
  const [selectedQuizId, setSelectedQuizId] =
    useSyncedSelection(filteredQuizQuestions);
  const [selectedArticleId, setSelectedArticleId] =
    useSyncedSelection(filteredArticles);

  const selectedQuestion = visibleQuestions.find(
    (question) => question.id === selectedQuestionId,
  );
  const selectedChallenge = filteredChallenges.find(
    (challenge) => challenge.id === selectedChallengeId,
  );
  const selectedChallengeWithCategory = selectedChallenge
    ? {
      ...selectedChallenge,
      category: {
        id: categoryState.id,
        name: categoryState.name,
        slug: categoryState.slug,
      },
    }
    : null;
  const selectedQuizQuestion = filteredQuizQuestions.find(
    (question) => question.id === selectedQuizId,
  );
  const selectedArticle = filteredArticles.find(
    (article) => article.id === selectedArticleId,
  );
  const selectedArticleWithCategory = selectedArticle
    ? {
      ...selectedArticle,
      category: {
        id: categoryState.id,
        name: categoryState.name,
        slug: categoryState.slug,
      },
    }
    : null;

  function handleQuestionChange(updatedQuestion: CategoryQuestion) {
    setCategoryState((current) => ({
      ...current,
      questions: current.questions.map((question) =>
        question.id === updatedQuestion.id ? updatedQuestion : question,
      ),
    }));
  }

  function handleCompletionChange(questionId: string, completed: boolean) {
    setCompletedIds((current) => {
      const next = new Set(current);
      if (completed) {
        next.add(questionId);
      } else {
        next.delete(questionId);
      }
      return next;
    });
  }

  const filters = (
    <div className="flex flex-col gap-3 p-3 sm:flex-row sm:flex-wrap sm:items-center">
      <Select
        value={difficultyFilter}
        onValueChange={(value) => setDifficultyFilter(value as DifficultyFilter)}
      >
        <SelectTrigger className="w-full sm:w-48" aria-label="Filter by difficulty">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {difficultyFilters.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={sort}
        onValueChange={(value) => setSort(value as CategorySortOption)}
      >
        <SelectTrigger className="w-full sm:w-64" aria-label="Sort items">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {activeTab === "questions" ? (
        <div className="flex items-center">
          <Checkbox
            variant="completed"
            checked={showCompleted}
            onCheckedChange={(checked) => setShowCompleted(checked === true)}
            aria-label="Show completed"
            title="Show completed"
          />
        </div>
      ) : null}
    </div>
  );

  if (availableTabs.length === 0) {
    return (
      <p className="text-muted-foreground">
        This category has no content yet.
      </p>
    );
  }

  return (
    <Tabs
      value={activeTab}
      onValueChange={(value) => setActiveTab(value as CategoryTab)}
      className="gap-6"
    >
      {availableTabs.length > 1 ? (
        <div className="flex justify-center">
          <TabsList>
            {hasQuestions ? (
              <TabsTrigger value="questions">Questions</TabsTrigger>
            ) : null}
            {hasChallenges ? (
              <TabsTrigger value="challenges">Challenges</TabsTrigger>
            ) : null}
            {hasArticles ? (
              <TabsTrigger value="articles">Articles</TabsTrigger>
            ) : null}
            {hasQuizzes ? (
              <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
            ) : null}
          </TabsList>
        </div>
      ) : null}

      {filters}

      {hasQuestions ? (
        <TabsContent value="questions" className="mt-0">
          <SidebarDetailLayout
            sidebar={
              <ContentSidebar
                ariaLabel="Questions in category"
                items={visibleQuestions.map((question) => ({
                  id: question.id,
                  title: question.title,
                  difficulty: question.difficulty,
                  subtitle: `${question.answers.length} answers`,
                  trailing: (
                    <QuestionCompletionCheckbox
                      questionId={question.id}
                      isCompleted={completedIds.has(question.id)}
                      onCompletionChange={handleCompletionChange}
                    />
                  ),
                }))}
                selectedId={selectedQuestionId}
                onSelect={setSelectedQuestionId}
                emptyMessage={
                  filteredQuestions.length === 0
                    ? "No questions match the current filter."
                    : "No incomplete questions match the current filter. Check Show completed to review finished items."
                }
              />
            }
          >
            {selectedQuestion ? (
              <div className="space-y-4 p-4 sm:p-6">
                <div className="flex justify-end">
                  <QuestionCompletionCheckbox
                    questionId={selectedQuestion.id}
                    isCompleted={completedIds.has(selectedQuestion.id)}
                    onCompletionChange={handleCompletionChange}
                  />
                </div>
                <QuestionDetailPanel
                  question={selectedQuestion}
                  showCategory={false}
                  titleAs="h1"
                  onQuestionChange={handleQuestionChange}
                />
                <Link
                  href={`/questions/${selectedQuestion.id}`}
                  className="inline-block text-sm text-primary hover:underline"
                >
                  Open full page →
                </Link>
              </div>
            ) : (
              <EmptyDetail message="Select a question from the list." />
            )}
          </SidebarDetailLayout>
        </TabsContent>
      ) : null}

      {hasChallenges ? (
        <TabsContent value="challenges" className="mt-0">
          <SidebarDetailLayout
            sidebar={
              <ContentSidebar
                ariaLabel="Challenges in category"
                items={filteredChallenges.map((challenge) => ({
                  id: challenge.id,
                  title: challenge.title,
                  difficulty: challenge.difficulty,
                  subtitle: "Coding challenge",
                }))}
                selectedId={selectedChallengeId}
                onSelect={setSelectedChallengeId}
                emptyMessage="No challenges match the current filter."
              />
            }
          >
            {selectedChallengeWithCategory ? (
              <>
                <ChallengeDetailPanel challenge={selectedChallengeWithCategory} />
                <div className="border-t px-4 pb-4 sm:px-6">
                  <Link
                    href={`/challenges/${selectedChallengeWithCategory.id}`}
                    className="inline-block text-sm text-primary hover:underline"
                  >
                    Open full page →
                  </Link>
                </div>
              </>
            ) : (
              <EmptyDetail message="Select a challenge from the list." />
            )}
          </SidebarDetailLayout>
        </TabsContent>
      ) : null}

      {hasQuizzes ? (
        <TabsContent value="quizzes" className="mt-0">
          <SidebarDetailLayout
            sidebar={
              <ContentSidebar
                ariaLabel="Quiz questions in category"
                items={filteredQuizQuestions.map((question) => ({
                  id: question.id,
                  title: question.title,
                  difficulty: question.difficulty,
                  subtitle: `${question.answers.length} options`,
                }))}
                selectedId={selectedQuizId}
                onSelect={setSelectedQuizId}
                emptyMessage={
                  quizQuestions.length === 0
                    ? "No quiz questions are available in this category yet."
                    : "No quiz questions match the current filter."
                }
              />
            }
          >
            {selectedQuizQuestion ? (
              <div className="p-4 sm:p-6">
                <QuizQuestionPlayer
                  question={selectedQuizQuestion}
                  showBackLink={false}
                />
                <Link
                  href={`/quiz/${selectedQuizQuestion.id}`}
                  className="mt-4 inline-block text-sm text-primary hover:underline"
                >
                  Open full page →
                </Link>
              </div>
            ) : (
              <EmptyDetail message="Select a quiz question from the list." />
            )}
          </SidebarDetailLayout>
        </TabsContent>
      ) : null}

      {hasArticles ? (
        <TabsContent value="articles" className="mt-0">
          <SidebarDetailLayout
            sidebar={
              <ContentSidebar
                ariaLabel="Articles in category"
                items={filteredArticles.map((article) => ({
                  id: article.id,
                  title: article.title,
                  difficulty: article.difficulty ?? "INTERMEDIATE",
                  subtitle: "Article",
                }))}
                selectedId={selectedArticleId}
                onSelect={setSelectedArticleId}
                emptyMessage="No articles match the current filter."
              />
            }
          >
            {selectedArticleWithCategory ? (
              <div className="space-y-4 p-4 sm:p-6">
                <ArticleDetailPanel
                  article={selectedArticleWithCategory}
                  showCategory={false}
                  titleAs="h1"
                />
                <Link
                  href={`/articles/${selectedArticleWithCategory.id}`}
                  className="inline-block text-sm text-primary hover:underline"
                >
                  Open full page →
                </Link>
              </div>
            ) : (
              <EmptyDetail message="Select an article from the list." />
            )}
          </SidebarDetailLayout>
        </TabsContent>
      ) : null}
    </Tabs>
  );
}
