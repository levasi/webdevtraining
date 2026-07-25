import type { ChatContentContext, StudyContentSnippet } from "@/lib/ai/types";

export function buildDeveloperChatSystemPrompt(input: {
  sources: StudyContentSnippet[];
  context?: ChatContentContext | null;
}): string {
  const sections: string[] = [
    "You are an interview coach for web developers on Web Dev Training.",
    "Help with JavaScript, TypeScript, React, Vue, CSS, Node, system design for frontend, and related interview topics.",
    "Be concise, practical, and structured. Prefer clear explanations, short examples, and interview-style framing.",
    "When helping with coding challenges: give hints and concepts first; only provide a full solution if the user explicitly asks.",
    "Refuse unrelated or harmful requests briefly.",
    "Do not invent that content exists in this app unless it appears in the retrieved sources or current item context below.",
    "When you mention or recommend a retrieved question/article, always cite it as a markdown link using the exact href provided, e.g. [Redux vs Context API](/categories/react#question-abc). Never mention study content by title alone without the link.",
  ];

  if (input.context) {
    sections.push(
      [
        "Current item the user is viewing (primary focus):",
        `- Type: ${input.context.type}`,
        `- Title: ${input.context.title}`,
        input.context.categorySlug
          ? `- Category: ${input.context.categorySlug}`
          : null,
        `- Summary: ${input.context.summary}`,
      ]
        .filter(Boolean)
        .join("\n"),
    );
  }

  if (input.sources.length > 0) {
    const sourceBlock = input.sources
      .map(
        (source, index) =>
          `${index + 1}. [${source.kind}] "${source.title}" (${source.categoryName})\nLink: ${source.href}\n${source.excerpt}`,
      )
      .join("\n\n");

    sections.push(
      [
        "Retrieved study content from this app. Prefer aligning with it when relevant. Whenever you reference any of these, use a markdown link with the Link URL:",
        sourceBlock,
      ].join("\n\n"),
    );
  } else {
    sections.push(
      "No matching study content was retrieved. Answer as a general interview coach without claiming app-specific bank content.",
    );
  }

  return sections.join("\n\n");
}
