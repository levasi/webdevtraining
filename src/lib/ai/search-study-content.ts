import { db } from "@/lib/db";
import type { StudyContentSnippet } from "@/lib/ai/types";

const STOP_WORDS = new Set([
  "a",
  "an",
  "the",
  "and",
  "or",
  "but",
  "if",
  "in",
  "on",
  "at",
  "to",
  "for",
  "of",
  "is",
  "are",
  "was",
  "were",
  "be",
  "been",
  "being",
  "have",
  "has",
  "had",
  "do",
  "does",
  "did",
  "will",
  "would",
  "could",
  "should",
  "can",
  "may",
  "might",
  "must",
  "i",
  "you",
  "we",
  "they",
  "it",
  "this",
  "that",
  "these",
  "those",
  "what",
  "how",
  "why",
  "when",
  "where",
  "who",
  "which",
  "with",
  "from",
  "about",
  "into",
  "over",
  "after",
  "before",
  "between",
  "please",
  "help",
  "explain",
  "tell",
  "me",
  "my",
  "your",
]);

const MAX_TOKENS = 6;
const MAX_RESULTS = 5;
const EXCERPT_LENGTH = 280;

function tokenizeQuery(query: string): string[] {
  const tokens = query
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s+-]/gu, " ")
    .split(/\s+/)
    .map((token) => token.trim())
    .filter((token) => token.length >= 2 && !STOP_WORDS.has(token));

  return [...new Set(tokens)].slice(0, MAX_TOKENS);
}

function excerpt(text: string): string {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (normalized.length <= EXCERPT_LENGTH) {
    return normalized;
  }
  return `${normalized.slice(0, EXCERPT_LENGTH).trimEnd()}…`;
}

export async function searchStudyContent(
  query: string,
): Promise<StudyContentSnippet[]> {
  const tokens = tokenizeQuery(query);
  if (tokens.length === 0) {
    return [];
  }

  const tokenFilters = tokens.flatMap((token) => [
    { title: { contains: token, mode: "insensitive" as const } },
    { content: { contains: token, mode: "insensitive" as const } },
    { tags: { has: token } },
  ]);

  const [questions, articles] = await Promise.all([
    db.question.findMany({
      where: {
        isPublished: true,
        OR: tokenFilters,
      },
      select: {
        id: true,
        title: true,
        content: true,
        category: { select: { name: true } },
      },
      take: MAX_RESULTS,
      orderBy: { updatedAt: "desc" },
    }),
    db.article.findMany({
      where: {
        isPublished: true,
        OR: [
          ...tokens.flatMap((token) => [
            { title: { contains: token, mode: "insensitive" as const } },
            { content: { contains: token, mode: "insensitive" as const } },
            { excerpt: { contains: token, mode: "insensitive" as const } },
            { tags: { has: token } },
          ]),
        ],
      },
      select: {
        id: true,
        title: true,
        content: true,
        excerpt: true,
        category: { select: { name: true } },
      },
      take: MAX_RESULTS,
      orderBy: { updatedAt: "desc" },
    }),
  ]);

  const questionSnippets: StudyContentSnippet[] = questions.map((question) => ({
    kind: "question",
    id: question.id,
    title: question.title,
    categoryName: question.category.name,
    excerpt: excerpt(question.content),
  }));

  const articleSnippets: StudyContentSnippet[] = articles.map((article) => ({
    kind: "article",
    id: article.id,
    title: article.title,
    categoryName: article.category.name,
    excerpt: excerpt(article.excerpt ?? article.content),
  }));

  return [...questionSnippets, ...articleSnippets].slice(0, MAX_RESULTS);
}
