"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { DifficultyBadge } from "@/components/categories/category-grid";
import { QuestionCard } from "@/components/questions/question-card";
import { QuizQuestionCard } from "@/components/quiz/quiz-question-card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DIFFICULTY_LABELS } from "@/lib/constants";
import {
  filterQuizEligibleQuestions,
} from "@/lib/questions/quiz-eligible";
import {
  CATEGORY_SORT_LABELS,
  type CategorySortOption,
  sortCategoryItems,
} from "@/lib/questions/sort";
import type { Challenge, Question, Answer, Category } from "@/generated/prisma/client";
import type { DifficultyFilter } from "@/types";

type CategoryQuestion = Question & {
  answers: Answer[];
  category: Pick<Category, "id" | "name" | "slug">;
};

type CategoryTab = "questions" | "challenges" | "quizzes";

type CategoryContentProps = {
  category: {
    questions: CategoryQuestion[];
    challenges: Challenge[];
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

function getFirstAvailableTab(category: CategoryContentProps["category"]): CategoryTab {
  if (category.questions.length > 0) {
    return "questions";
  }

  if (category.challenges.length > 0) {
    return "challenges";
  }

  if (filterQuizEligibleQuestions(category.questions).length > 0) {
    return "quizzes";
  }

  return "questions";
}

export function CategoryContent({
  category,
  completedQuestionIds = [],
}: CategoryContentProps) {
  const [activeTab, setActiveTab] = useState<CategoryTab>(() =>
    getFirstAvailableTab(category),
  );
  const [difficultyFilter, setDifficultyFilter] =
    useState<DifficultyFilter>("ALL");
  const [sort, setSort] = useState<CategorySortOption>("difficulty-asc");
  const [showCompleted, setShowCompleted] = useState(true);
  const [completedIds, setCompletedIds] = useState(
    () => new Set(completedQuestionIds),
  );

  const quizQuestions = useMemo(
    () => filterQuizEligibleQuestions(category.questions),
    [category.questions],
  );

  const hasQuestions = category.questions.length > 0;
  const hasChallenges = category.challenges.length > 0;
  const hasQuizzes = quizQuestions.length > 0;

  const availableTabs = useMemo(() => {
    const tabs: CategoryTab[] = [];

    if (hasQuestions) {
      tabs.push("questions");
    }

    if (hasChallenges) {
      tabs.push("challenges");
    }

    if (hasQuizzes) {
      tabs.push("quizzes");
    }

    return tabs;
  }, [hasQuestions, hasChallenges, hasQuizzes]);

  useEffect(() => {
    if (!availableTabs.includes(activeTab) && availableTabs.length > 0) {
      setActiveTab(availableTabs[0]);
    }
  }, [activeTab, availableTabs]);

  const filteredQuestions = useMemo(() => {
    const items = filterByDifficulty(category.questions, difficultyFilter);
    return sortCategoryItems(items, sort);
  }, [category.questions, difficultyFilter, sort]);

  const visibleQuestions = useMemo(() => {
    if (showCompleted) {
      return filteredQuestions;
    }

    return filteredQuestions.filter((question) => !completedIds.has(question.id));
  }, [filteredQuestions, showCompleted, completedIds]);

  const filteredChallenges = useMemo(() => {
    const items = filterByDifficulty(category.challenges, difficultyFilter);
    return sortCategoryItems(items, sort);
  }, [category.challenges, difficultyFilter, sort]);

  const filteredQuizQuestions = useMemo(() => {
    const items = filterByDifficulty(quizQuestions, difficultyFilter);
    return sortCategoryItems(items, sort);
  }, [quizQuestions, difficultyFilter, sort]);

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
            {hasQuizzes ? (
              <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
            ) : null}
          </TabsList>
        </div>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
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
          <div className="flex items-center sm:ml-auto">
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

      {hasQuestions ? (
        <TabsContent value="questions" className="mt-0">
        {visibleQuestions.length === 0 ? (
          <p className="text-muted-foreground">
            {filteredQuestions.length === 0
              ? "No questions match the current filter."
              : "No incomplete questions match the current filter. Check Show completed to review finished items."}
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visibleQuestions.map((question) => (
              <QuestionCard
                key={question.id}
                question={question}
                showCategory={false}
                isCompleted={completedIds.has(question.id)}
                onCompletionChange={handleCompletionChange}
              />
            ))}
          </div>
        )}
        </TabsContent>
      ) : null}

      {hasChallenges ? (
        <TabsContent value="challenges" className="mt-0">
        {filteredChallenges.length === 0 ? (
          <p className="text-muted-foreground">
            No challenges match the current filter.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredChallenges.map((challenge) => (
              <Link key={challenge.id} href={`/challenges/${challenge.id}`}>
                <Card className="h-full transition-shadow hover:shadow-md">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <DifficultyBadge difficulty={challenge.difficulty} />
                      <Badge variant="outline">Coding</Badge>
                    </div>
                    <CardTitle className="text-lg">{challenge.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {challenge.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground">
                    Open challenge →
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
        </TabsContent>
      ) : null}

      {hasQuizzes ? (
        <TabsContent value="quizzes" className="mt-0">
        {filteredQuizQuestions.length === 0 ? (
          <p className="text-muted-foreground">
            {quizQuestions.length === 0
              ? "No quiz questions are available in this category yet."
              : "No quiz questions match the current filter."}
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredQuizQuestions.map((question) => (
              <QuizQuestionCard
                key={question.id}
                question={question}
                showCategory={false}
              />
            ))}
          </div>
        )}
        </TabsContent>
      ) : null}
    </Tabs>
  );
}
