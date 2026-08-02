"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  buildCategoryFilterSearchParams,
  parseCategoryTab,
  parseDifficultyFilter,
  parseQuizSubTab,
  parseShowCompleted,
  parseSortOption,
  type CategoryFilterState,
  type CategoryTab,
  type QuizSubTab,
} from "@/lib/category-filters";
import type { CategorySortOption } from "@/lib/questions/sort";
import type { DifficultyFilter } from "@/types";

export function useCategoryFilters(availableTabs: CategoryTab[]) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const fallbackTab = availableTabs[0] ?? "questions";

  const filters = useMemo(() => {
    return {
      tab: parseCategoryTab(
        searchParams.get("tab"),
        availableTabs,
        fallbackTab,
      ),
      difficulty: parseDifficultyFilter(searchParams.get("difficulty")),
      sort: parseSortOption(searchParams.get("sort")),
      showCompleted: parseShowCompleted(searchParams.get("completed")),
      questionSearch: searchParams.get("q") ?? "",
      challengeSearch: searchParams.get("cq") ?? "",
      quizSearch: searchParams.get("zq") ?? "",
      quizSubTab: parseQuizSubTab(searchParams.get("quizView")),
    } satisfies CategoryFilterState;
  }, [searchParams, availableTabs, fallbackTab]);

  const replaceFilters = useCallback(
    (updates: Partial<CategoryFilterState>) => {
      const next = buildCategoryFilterSearchParams(searchParams, updates);
      // Always keep an explicit tab when available so refresh restores it.
      if (updates.tab) {
        next.set("tab", updates.tab);
      } else if (!next.get("tab") && filters.tab) {
        next.set("tab", filters.tab);
      }
      const query = next.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });
    },
    [filters.tab, pathname, router, searchParams],
  );

  return {
    tab: filters.tab,
    setTab: (tab: CategoryTab) => replaceFilters({ tab }),
    difficulty: filters.difficulty,
    setDifficulty: (difficulty: DifficultyFilter) =>
      replaceFilters({ difficulty }),
    sort: filters.sort,
    setSort: (sort: CategorySortOption) => replaceFilters({ sort }),
    showCompleted: filters.showCompleted,
    setShowCompleted: (showCompleted: boolean) =>
      replaceFilters({ showCompleted }),
    questionSearch: filters.questionSearch,
    setQuestionSearch: (questionSearch: string) =>
      replaceFilters({ questionSearch }),
    challengeSearch: filters.challengeSearch,
    setChallengeSearch: (challengeSearch: string) =>
      replaceFilters({ challengeSearch }),
    quizSearch: filters.quizSearch,
    setQuizSearch: (quizSearch: string) => replaceFilters({ quizSearch }),
    quizSubTab: filters.quizSubTab,
    setQuizSubTab: (quizSubTab: QuizSubTab) => replaceFilters({ quizSubTab }),
    clearSearches: () =>
      replaceFilters({
        questionSearch: "",
        challengeSearch: "",
        quizSearch: "",
      }),
  };
}
