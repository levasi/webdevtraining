import type { Difficulty } from "@/generated/prisma/client";

export const DIFFICULTY_ORDER: Record<Difficulty, number> = {
  BEGINNER: 0,
  INTERMEDIATE: 1,
  ADVANCED: 2,
};

export type CategorySortOption =
  | "difficulty-asc"
  | "difficulty-desc"
  | "title-asc"
  | "title-desc"
  | "newest"
  | "oldest";

export const CATEGORY_SORT_LABELS: Record<CategorySortOption, string> = {
  "difficulty-asc": "Difficulty: Beginner → Advanced",
  "difficulty-desc": "Difficulty: Advanced → Beginner",
  "title-asc": "Title: A → Z",
  "title-desc": "Title: Z → A",
  newest: "Newest first",
  oldest: "Oldest first",
};

type SortableItem = {
  difficulty: Difficulty;
  title: string;
  createdAt: Date | string;
};

function getTimestamp(value: Date | string) {
  return new Date(value).getTime();
}

function compareDifficulty(
  a: Difficulty,
  b: Difficulty,
  direction: "asc" | "desc",
) {
  const diff = DIFFICULTY_ORDER[a] - DIFFICULTY_ORDER[b];
  return direction === "asc" ? diff : -diff;
}

export function sortCategoryItems<T extends SortableItem>(
  items: T[],
  sort: CategorySortOption,
): T[] {
  const sorted = [...items];

  sorted.sort((a, b) => {
    switch (sort) {
      case "difficulty-asc":
        return (
          compareDifficulty(a.difficulty, b.difficulty, "asc") ||
          a.title.localeCompare(b.title)
        );
      case "difficulty-desc":
        return (
          compareDifficulty(a.difficulty, b.difficulty, "desc") ||
          a.title.localeCompare(b.title)
        );
      case "title-asc":
        return a.title.localeCompare(b.title);
      case "title-desc":
        return b.title.localeCompare(a.title);
      case "newest":
        return getTimestamp(b.createdAt) - getTimestamp(a.createdAt);
      case "oldest":
        return getTimestamp(a.createdAt) - getTimestamp(b.createdAt);
      default:
        return compareDifficulty(a.difficulty, b.difficulty, "asc");
    }
  });

  return sorted;
}
