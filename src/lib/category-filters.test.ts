import { describe, expect, it } from "vitest";

import {
  buildCategoryFilterSearchParams,
  parseCategoryTab,
  parseDifficultyFilter,
  parseQuizSubTab,
  parseShowCompleted,
  parseSortOption,
} from "@/lib/category-filters";

describe("category-filters", () => {
  it("parses difficulty, sort, completed, and quiz view", () => {
    expect(parseDifficultyFilter("ADVANCED")).toBe("ADVANCED");
    expect(parseDifficultyFilter("nope")).toBe("ALL");
    expect(parseSortOption("title-asc")).toBe("title-asc");
    expect(parseSortOption("nope")).toBe("difficulty-asc");
    expect(parseShowCompleted("0")).toBe(false);
    expect(parseShowCompleted(null)).toBe(true);
    expect(parseQuizSubTab("packs")).toBe("packs");
    expect(parseQuizSubTab(null)).toBe("practice");
  });

  it("parses tab against available tabs", () => {
    expect(
      parseCategoryTab("quizzes", ["questions", "quizzes"], "questions"),
    ).toBe("quizzes");
    expect(
      parseCategoryTab("articles", ["questions", "quizzes"], "questions"),
    ).toBe("questions");
  });

  it("omits default filter values from the URL", () => {
    const next = buildCategoryFilterSearchParams(new URLSearchParams(), {
      tab: "quizzes",
      difficulty: "BEGINNER",
      sort: "difficulty-asc",
      showCompleted: false,
      quizSubTab: "packs",
    });

    expect(next.get("tab")).toBe("quizzes");
    expect(next.get("difficulty")).toBe("BEGINNER");
    expect(next.get("sort")).toBeNull();
    expect(next.get("completed")).toBe("0");
    expect(next.get("quizView")).toBe("packs");
  });
});
