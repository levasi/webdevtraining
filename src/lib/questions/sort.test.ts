import { describe, expect, it } from "vitest";

import {
  CATEGORY_SORT_LABELS,
  sortCategoryItems,
  type CategorySortOption,
} from "@/lib/questions/sort";

const items = [
  {
    id: "1",
    title: "Zebra",
    difficulty: "ADVANCED" as const,
    createdAt: "2024-01-03T00:00:00.000Z",
  },
  {
    id: "2",
    title: "Apple",
    difficulty: "BEGINNER" as const,
    createdAt: "2024-01-01T00:00:00.000Z",
  },
  {
    id: "3",
    title: "Mango",
    difficulty: "INTERMEDIATE" as const,
    createdAt: "2024-01-02T00:00:00.000Z",
  },
];

describe("sortCategoryItems", () => {
  it("sorts by difficulty ascending with title tie-break", () => {
    const sorted = sortCategoryItems(items, "difficulty-asc");
    expect(sorted.map((item) => item.id)).toEqual(["2", "3", "1"]);
  });

  it("sorts by difficulty descending", () => {
    const sorted = sortCategoryItems(items, "difficulty-desc");
    expect(sorted.map((item) => item.difficulty)).toEqual([
      "ADVANCED",
      "INTERMEDIATE",
      "BEGINNER",
    ]);
  });

  it("sorts titles A→Z and Z→A", () => {
    expect(sortCategoryItems(items, "title-asc").map((item) => item.title)).toEqual([
      "Apple",
      "Mango",
      "Zebra",
    ]);
    expect(sortCategoryItems(items, "title-desc").map((item) => item.title)).toEqual([
      "Zebra",
      "Mango",
      "Apple",
    ]);
  });

  it("sorts by createdAt newest and oldest", () => {
    expect(sortCategoryItems(items, "newest").map((item) => item.id)).toEqual([
      "1",
      "3",
      "2",
    ]);
    expect(sortCategoryItems(items, "oldest").map((item) => item.id)).toEqual([
      "2",
      "3",
      "1",
    ]);
  });

  it("does not mutate the input array", () => {
    const original = [...items];
    sortCategoryItems(items, "title-asc");
    expect(items).toEqual(original);
  });

  it("exposes labels for every sort option", () => {
    const options = Object.keys(CATEGORY_SORT_LABELS) as CategorySortOption[];
    expect(options.length).toBeGreaterThanOrEqual(6);
  });
});
