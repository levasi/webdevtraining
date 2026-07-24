import { describe, expect, it } from "vitest";

import { DOCS_PAGE, DOCS_SECTIONS } from "@/lib/docs/site-docs";

describe("site docs content", () => {
  it("has page chrome copy", () => {
    expect(DOCS_PAGE.title).toBe("Docs");
    expect(DOCS_PAGE.description.length).toBeGreaterThan(10);
  });

  it("includes required sections with unique ids", () => {
    const ids = DOCS_SECTIONS.map((section) => section.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const required of [
      "overview",
      "stack",
      "features",
      "architecture",
      "ask-ai",
      "local-production",
      "testing",
      "agents",
    ]) {
      expect(ids).toContain(required);
    }
  });

  it("keeps section markdown non-empty", () => {
    for (const section of DOCS_SECTIONS) {
      expect(section.title.trim().length).toBeGreaterThan(0);
      expect(section.markdown.trim().length).toBeGreaterThan(20);
    }
  });
});
