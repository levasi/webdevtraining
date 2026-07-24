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
          `${index + 1}. [${source.kind}] "${source.title}" (${source.categoryName})\n${source.excerpt}`,
      )
      .join("\n\n");

    sections.push(
      [
        "Retrieved study content from this app. Prefer aligning with it when relevant, and cite titles when you use it:",
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
