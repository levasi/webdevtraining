import type { DifficultyFilter } from "@/types";
import {
  CATEGORY_SORT_LABELS,
  type CategorySortOption,
} from "@/lib/questions/sort";

export type CategoryTab = "questions" | "challenges" | "quizzes" | "articles";
export type QuizSubTab = "practice" | "packs";

const DIFFICULTY_VALUES = new Set<DifficultyFilter>([
  "ALL",
  "BEGINNER",
  "INTERMEDIATE",
  "ADVANCED",
]);

const TAB_VALUES = new Set<CategoryTab>([
  "questions",
  "challenges",
  "quizzes",
  "articles",
]);

const QUIZ_SUB_TAB_VALUES = new Set<QuizSubTab>(["practice", "packs"]);

const SORT_VALUES = new Set<string>(Object.keys(CATEGORY_SORT_LABELS));

export const CATEGORY_FILTER_DEFAULTS = {
  difficulty: "ALL" as DifficultyFilter,
  sort: "difficulty-asc" as CategorySortOption,
  showCompleted: true,
  quizSubTab: "practice" as QuizSubTab,
};

export function parseDifficultyFilter(
  value: string | null,
): DifficultyFilter {
  if (value && DIFFICULTY_VALUES.has(value as DifficultyFilter)) {
    return value as DifficultyFilter;
  }
  return CATEGORY_FILTER_DEFAULTS.difficulty;
}

export function parseSortOption(value: string | null): CategorySortOption {
  if (value && SORT_VALUES.has(value)) {
    return value as CategorySortOption;
  }
  return CATEGORY_FILTER_DEFAULTS.sort;
}

export function parseShowCompleted(value: string | null): boolean {
  if (value === "0" || value === "false") {
    return false;
  }
  return true;
}

export function parseCategoryTab(
  value: string | null,
  available: CategoryTab[],
  fallback: CategoryTab,
): CategoryTab {
  if (value && TAB_VALUES.has(value as CategoryTab)) {
    const tab = value as CategoryTab;
    if (available.length === 0 || available.includes(tab)) {
      return tab;
    }
  }
  return available[0] ?? fallback;
}

export function parseQuizSubTab(value: string | null): QuizSubTab {
  if (value && QUIZ_SUB_TAB_VALUES.has(value as QuizSubTab)) {
    return value as QuizSubTab;
  }
  return CATEGORY_FILTER_DEFAULTS.quizSubTab;
}

export type CategoryFilterState = {
  tab: CategoryTab;
  difficulty: DifficultyFilter;
  sort: CategorySortOption;
  showCompleted: boolean;
  questionSearch: string;
  challengeSearch: string;
  quizSearch: string;
  quizSubTab: QuizSubTab;
};

export function readCategoryFiltersFromParams(
  params: URLSearchParams,
  availableTabs: CategoryTab[],
  fallbackTab: CategoryTab,
): CategoryFilterState {
  return {
    tab: parseCategoryTab(params.get("tab"), availableTabs, fallbackTab),
    difficulty: parseDifficultyFilter(params.get("difficulty")),
    sort: parseSortOption(params.get("sort")),
    showCompleted: parseShowCompleted(params.get("completed")),
    questionSearch: params.get("q") ?? "",
    challengeSearch: params.get("cq") ?? "",
    quizSearch: params.get("zq") ?? "",
    quizSubTab: parseQuizSubTab(params.get("quizView")),
  };
}

/** Build search params, omitting defaults to keep URLs clean. */
export function buildCategoryFilterSearchParams(
  current: URLSearchParams,
  updates: Partial<CategoryFilterState>,
): URLSearchParams {
  const next = new URLSearchParams(current.toString());
  const merged: CategoryFilterState = {
    tab: updates.tab ?? parseCategoryTab(current.get("tab"), [], "questions"),
    difficulty:
      updates.difficulty ?? parseDifficultyFilter(current.get("difficulty")),
    sort: updates.sort ?? parseSortOption(current.get("sort")),
    showCompleted:
      updates.showCompleted ?? parseShowCompleted(current.get("completed")),
    questionSearch:
      updates.questionSearch ?? current.get("q") ?? "",
    challengeSearch:
      updates.challengeSearch ?? current.get("cq") ?? "",
    quizSearch: updates.quizSearch ?? current.get("zq") ?? "",
    quizSubTab: updates.quizSubTab ?? parseQuizSubTab(current.get("quizView")),
  };

  if (updates.tab !== undefined) {
    next.set("tab", merged.tab);
  }
  if (updates.difficulty !== undefined) {
    if (merged.difficulty === CATEGORY_FILTER_DEFAULTS.difficulty) {
      next.delete("difficulty");
    } else {
      next.set("difficulty", merged.difficulty);
    }
  }
  if (updates.sort !== undefined) {
    if (merged.sort === CATEGORY_FILTER_DEFAULTS.sort) {
      next.delete("sort");
    } else {
      next.set("sort", merged.sort);
    }
  }
  if (updates.showCompleted !== undefined) {
    if (merged.showCompleted) {
      next.delete("completed");
    } else {
      next.set("completed", "0");
    }
  }
  if (updates.questionSearch !== undefined) {
    if (!merged.questionSearch) {
      next.delete("q");
    } else {
      next.set("q", merged.questionSearch);
    }
  }
  if (updates.challengeSearch !== undefined) {
    if (!merged.challengeSearch) {
      next.delete("cq");
    } else {
      next.set("cq", merged.challengeSearch);
    }
  }
  if (updates.quizSearch !== undefined) {
    if (!merged.quizSearch) {
      next.delete("zq");
    } else {
      next.set("zq", merged.quizSearch);
    }
  }
  if (updates.quizSubTab !== undefined) {
    if (merged.quizSubTab === CATEGORY_FILTER_DEFAULTS.quizSubTab) {
      next.delete("quizView");
    } else {
      next.set("quizView", merged.quizSubTab);
    }
  }

  return next;
}
