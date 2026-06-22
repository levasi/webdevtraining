/**
 * Parses InterviewBit JavaScript interview questions (markdown export)
 * and generates prisma/data/javascript-interviewbit.ts seed data.
 *
 * Usage: npx tsx scripts/import-interviewbit-javascript.ts [path-to-markdown]
 */

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { javascriptQuestions } from "../prisma/data/javascript";
import {
  buildQuestionDedupeKey,
  normalizeQuestionText,
} from "../src/lib/questions/dedup";
import type { SeedDifficulty, SeedQuestion } from "../prisma/data/types";

const __dirname = dirname(fileURLToPath(import.meta.url));
const defaultInput = join(
  __dirname,
  "data/interviewbit-javascript.md",
);

const SECTION_DIFFICULTY: Record<string, SeedDifficulty> = {
  "javascript interview questions for freshers": "BEGINNER",
  "javascript interview questions for experienced": "INTERMEDIATE",
  "javascript advanced interview questions": "ADVANCED",
  "javascript essentials often missed in interviews": "INTERMEDIATE",
  "javascript event loop & dom events": "INTERMEDIATE",
  "javascript modern syntax & patterns": "INTERMEDIATE",
};

const SKIP_SECTIONS = new Set([
  "coding problems",
  "javascript mcq",
]);

const SKIP_QUESTION_PATTERNS = [/download pdf/i, /download interview guide/i];

type ParsedQuestion = {
  section: string;
  title: string;
  answer: string;
};

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

function stripQuestionNumber(raw: string): string {
  return raw.replace(/^\d+\.\s*/, "").trim();
}

function cleanAnswer(text: string): string {
  const promoPatterns = [
    /^Create My Plan$/i,
    /^View Tracks$/i,
    /^Try It Out$/i,
    /^Register Now/i,
    /^Powered By/i,
    /^Certificate included/i,
    /^Explore InterviewBit/i,
    /^Download PDF/i,
    /^You can download a PDF/i,
    /^- JavaScript MCQ$/i,
    /^Real-Life Problems$/i,
    /^Prep for Target Roles$/i,
    /^Flexible Plans$/i,
    /^Topic Buckets$/i,
    /^Mock Assessments$/i,
    /^Earn a Certificate$/i,
    /^Interview Process$/i,
    /^CTC & Designation$/i,
  ];

  const lines = text.split("\n");
  const cleaned: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      if (cleaned.length > 0 && cleaned[cleaned.length - 1] !== "") {
        cleaned.push("");
      }
      continue;
    }

    if (promoPatterns.some((pattern) => pattern.test(trimmed))) {
      continue;
    }

    cleaned.push(line);
  }

  return cleaned.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

function firstParagraph(text: string): string {
  const cleaned = cleanAnswer(text);
  const paragraph = cleaned
    .split(/\n{2,}/)
    .map((part) => part.trim())
    .find((part) => part.length > 0 && !part.startsWith("```"));

  if (!paragraph) {
    return cleaned.trim().slice(0, 240);
  }

  return paragraph.replace(/\s+/g, " ").slice(0, 280);
}

function inferTags(title: string, section: string): string[] {
  const tags = new Set<string>();
  const haystack = `${title} ${section}`.toLowerCase();

  const keywordTags: Array<[RegExp, string]> = [
    [/\bclosure/i, "closures"],
    [/\bhoist/i, "hoisting"],
    [/\bpromise/i, "promises"],
    [/\basync|await/i, "async"],
    [/\bevent loop|microtask|macrotask/i, "event-loop"],
    [/\bdom\b/i, "dom"],
    [/\bprototype/i, "prototypes"],
    [/\bthis\b/i, "this"],
    [/\bclass/i, "classes"],
    [/\bvar\b|\blet\b|\bconst\b/i, "variables"],
    [/\b==|\b===/i, "operators"],
    [/\bmap\(|filter\(|reduce\(/i, "array-methods"],
    [/\bdeboounc|throttl/i, "performance"],
    [/\bmodule|import|export/i, "modules"],
    [/\bstorage|cookie|localstorage/i, "storage"],
    [/\berror|try\/catch/i, "errors"],
    [/\btype/i, "types"],
    [/\bscope/i, "scope"],
    [/\bcallback/i, "callbacks"],
    [/\bgenerator/i, "generators"],
    [/\bweakmap|weakset/i, "collections"],
    [/\bgarbage|memory|deopt|v8/i, "engine-internals"],
  ];

  for (const [pattern, tag] of keywordTags) {
    if (pattern.test(haystack)) {
      tags.add(tag);
    }
  }

  if (section.includes("freshers")) tags.add("fundamentals");
  if (section.includes("experienced")) tags.add("intermediate");
  if (section.includes("advanced")) tags.add("advanced");
  if (section.includes("event loop")) tags.add("event-loop");
  if (section.includes("modern syntax")) tags.add("es6");

  if (tags.size === 0) {
    tags.add("javascript");
  }

  return [...tags].slice(0, 5);
}

function parseMarkdown(source: string): ParsedQuestion[] {
  const lines = source.split("\n");
  const questions: ParsedQuestion[] = [];
  let currentSection = "";
  let currentQuestion: ParsedQuestion | null = null;
  let answerLines: string[] = [];

  function flushQuestion() {
    if (!currentQuestion) return;
    currentQuestion.answer = cleanAnswer(answerLines.join("\n"));
    if (currentQuestion.answer.length > 0) {
      questions.push(currentQuestion);
    }
    currentQuestion = null;
    answerLines = [];
  }

  for (const line of lines) {
    const sectionMatch = line.match(/^##\s+(.+)$/);
    if (sectionMatch) {
      flushQuestion();
      currentSection = sectionMatch[1].trim();
      continue;
    }

    const questionMatch = line.match(/^###\s+(.+)$/);
    if (questionMatch) {
      flushQuestion();
      const rawTitle = stripQuestionNumber(questionMatch[1].trim());
      if (SKIP_QUESTION_PATTERNS.some((pattern) => pattern.test(rawTitle))) {
        continue;
      }
      if (SKIP_SECTIONS.has(currentSection.toLowerCase())) {
        continue;
      }
      currentQuestion = {
        section: currentSection,
        title: rawTitle,
        answer: "",
      };
      continue;
    }

    if (currentQuestion) {
      answerLines.push(line);
    }
  }

  flushQuestion();
  return questions;
}

function isDuplicateOfExisting(
  title: string,
  content: string,
  existingKeys: Set<string>,
): boolean {
  const key = buildQuestionDedupeKey(title, content);
  if (existingKeys.has(key)) return true;

  const normalizedTitle = normalizeQuestionText(title);
  for (const existingKey of existingKeys) {
    const [existingTitle] = existingKey.split("::");
    if (
      existingTitle === normalizedTitle ||
      existingTitle.includes(normalizedTitle) ||
      normalizedTitle.includes(existingTitle)
    ) {
      return true;
    }
  }

  return false;
}

function toSeedQuestion(
  parsed: ParsedQuestion,
  usedIds: Set<string>,
): SeedQuestion {
  const sectionKey = parsed.section.toLowerCase();
  const difficulty =
    SECTION_DIFFICULTY[sectionKey] ?? "INTERMEDIATE";

  const title = parsed.title.endsWith("?")
    ? parsed.title
    : `${parsed.title}?`;

  const content = title;
  const explanation = firstParagraph(parsed.answer);
  const baseSlug = slugify(stripQuestionNumber(parsed.title));
  let id = `seed-js-ib-${baseSlug}`;
  let suffix = 2;
  while (usedIds.has(id)) {
    id = `seed-js-ib-${baseSlug}-${suffix}`;
    suffix += 1;
  }
  usedIds.add(id);

  return {
    id,
    categorySlug: "javascript",
    title: stripQuestionNumber(parsed.title),
    content,
    explanation,
    difficulty,
    type: "FLASHCARD",
    tags: inferTags(parsed.title, parsed.section),
    answers: [
      {
        content: parsed.answer.trim(),
        isCorrect: true,
      },
    ],
  };
}

function escapeTemplateLiteral(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
}

function formatQuestion(question: SeedQuestion): string {
  const tags = question.tags.map((tag) => `"${tag}"`).join(", ");
  const answerContent = escapeTemplateLiteral(question.answers[0]?.content ?? "");

  return `  {
    id: "${question.id}",
    categorySlug: "javascript",
    title: ${JSON.stringify(question.title)},
    content: ${JSON.stringify(question.content)},
    explanation: ${JSON.stringify(question.explanation)},
    difficulty: "${question.difficulty}",
    type: "FLASHCARD",
    tags: [${tags}],
    answers: [
      {
        content: \`${answerContent}\`,
        isCorrect: true,
      },
    ],
  }`;
}

function main() {
  const inputPath = process.argv[2] ?? defaultInput;
  const source = readFileSync(inputPath, "utf8");
  const parsed = parseMarkdown(source);

  const existingKeys = new Set(
    javascriptQuestions.flatMap((question) => [
      buildQuestionDedupeKey(question.title, question.content),
      buildQuestionDedupeKey(question.title, question.title),
    ]),
  );

  const usedIds = new Set(javascriptQuestions.map((question) => question.id));
  const skipped: string[] = [];
  const seedQuestions: SeedQuestion[] = [];

  for (const item of parsed) {
    const title = stripQuestionNumber(item.title);
    const content = title.endsWith("?") ? title : `${title}?`;

    if (isDuplicateOfExisting(title, content, existingKeys)) {
      skipped.push(title);
      continue;
    }

    const seed = toSeedQuestion(item, usedIds);
    seedQuestions.push(seed);
    existingKeys.add(buildQuestionDedupeKey(seed.title, seed.content));
  }

  const outputPath = join(__dirname, "../prisma/data/javascript-interviewbit.ts");
  const fileContents = `import type { SeedQuestion } from "./types";

/** Imported from InterviewBit JavaScript interview guide (${seedQuestions.length} questions). */
export const javascriptInterviewbitQuestions: SeedQuestion[] = [
${seedQuestions.map(formatQuestion).join(",\n")}
];
`;

  writeFileSync(outputPath, fileContents, "utf8");

  console.log(`Parsed ${parsed.length} questions from ${inputPath}`);
  console.log(`Added ${seedQuestions.length} new seed questions`);
  console.log(`Skipped ${skipped.length} duplicates`);
  if (skipped.length > 0) {
    console.log("Skipped titles:");
    for (const title of skipped.slice(0, 20)) {
      console.log(`  - ${title}`);
    }
    if (skipped.length > 20) {
      console.log(`  ... and ${skipped.length - 20} more`);
    }
  }
  console.log(`Wrote ${outputPath}`);
}

main();
