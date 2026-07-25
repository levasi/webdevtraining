import { describe, expect, it } from "vitest";

import { buildDeveloperChatSystemPrompt } from "@/lib/ai/system-prompt";

describe("buildDeveloperChatSystemPrompt", () => {
  it("includes retrieved sources with links when present", () => {
    const prompt = buildDeveloperChatSystemPrompt({
      sources: [
        {
          kind: "question",
          id: "1",
          title: "What is a closure?",
          categoryName: "JavaScript",
          excerpt: "A closure is a function that remembers its lexical scope.",
          href: "/categories/javascript#question-1",
        },
      ],
    });

    expect(prompt).toContain("What is a closure?");
    expect(prompt).toContain("Retrieved study content");
    expect(prompt).toContain("Link: /categories/javascript#question-1");
    expect(prompt).toContain("always cite it as a markdown link");
  });

  it("falls back to general coaching without sources", () => {
    const prompt = buildDeveloperChatSystemPrompt({ sources: [] });
    expect(prompt).toContain("No matching study content was retrieved");
  });

  it("includes contextual item details", () => {
    const prompt = buildDeveloperChatSystemPrompt({
      sources: [],
      context: {
        type: "challenge",
        id: "c1",
        title: "Implement debounce",
        summary: "Write a debounce helper",
        categorySlug: "javascript",
      },
    });

    expect(prompt).toContain("Implement debounce");
    expect(prompt).toContain("challenge");
  });
});
