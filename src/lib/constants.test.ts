import { describe, it, expect } from "vitest";

import { DIFFICULTY_LABELS } from "@/lib/constants";

describe("constants", () => {
  it("defines all difficulty labels", () => {
    expect(DIFFICULTY_LABELS.BEGINNER).toBe("Beginner");
    expect(DIFFICULTY_LABELS.INTERMEDIATE).toBe("Intermediate");
    expect(DIFFICULTY_LABELS.ADVANCED).toBe("Advanced");
  });
});
