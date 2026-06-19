import { ALL_SEED_QUESTIONS } from "../prisma/data";
import { buildQuestionDedupeKey, normalizeQuestionText } from "../src/lib/questions/dedup";

type AuditResult = {
  total: number;
  byCategory: Record<string, number>;
  duplicateKeys: Array<{ key: string; ids: string[] }>;
  duplicateTitles: Array<{ categorySlug: string; title: string; ids: string[] }>;
  duplicateIds: string[];
};

function auditQuestions(): AuditResult {
  const byCategory: Record<string, number> = {};
  const keyToIds = new Map<string, string[]>();
  const titleToIds = new Map<string, string[]>();
  const idCounts = new Map<string, number>();

  for (const question of ALL_SEED_QUESTIONS) {
    byCategory[question.categorySlug] = (byCategory[question.categorySlug] ?? 0) + 1;

    const key = buildQuestionDedupeKey(question.title, question.content);
    const existing = keyToIds.get(key) ?? [];
    existing.push(question.id);
    keyToIds.set(key, existing);

    const titleKey = `${question.categorySlug}::${normalizeQuestionText(question.title)}`;
    const titleIds = titleToIds.get(titleKey) ?? [];
    titleIds.push(question.id);
    titleToIds.set(titleKey, titleIds);

    idCounts.set(question.id, (idCounts.get(question.id) ?? 0) + 1);
  }

  const duplicateKeys = [...keyToIds.entries()]
    .filter(([, ids]) => ids.length > 1)
    .map(([key, ids]) => ({ key, ids }));

  const duplicateTitles = [...titleToIds.entries()]
    .filter(([, ids]) => ids.length > 1)
    .map(([titleKey, ids]) => {
      const [categorySlug, title] = titleKey.split("::");
      return { categorySlug, title, ids };
    });

  const duplicateIds = [...idCounts.entries()]
    .filter(([, count]) => count > 1)
    .map(([id]) => id);

  return {
    total: ALL_SEED_QUESTIONS.length,
    byCategory,
    duplicateKeys,
    duplicateTitles,
    duplicateIds,
  };
}

function searchQuestions(query: string) {
  const normalized = normalizeQuestionText(query);

  return ALL_SEED_QUESTIONS.filter((question) => {
    const haystack = normalizeQuestionText(
      [question.id, question.title, question.content, question.explanation, ...question.tags]
        .join(" ")
        .concat(
          " ",
          question.answers.map((answer) => answer.content).join(" "),
        ),
    );

    return haystack.includes(normalized);
  }).map((question) => ({
    id: question.id,
    categorySlug: question.categorySlug,
    title: question.title,
  }));
}

const args = process.argv.slice(2);
const searchFlagIndex = args.indexOf("--search");
const searchQuery =
  searchFlagIndex >= 0 ? args.slice(searchFlagIndex + 1).join(" ").trim() : "";

if (searchQuery) {
  const matches = searchQuestions(searchQuery);
  console.log(`Search results for "${searchQuery}" (${matches.length}):`);
  for (const match of matches) {
    console.log(`- [${match.categorySlug}] ${match.id}: ${match.title}`);
  }
  process.exit(0);
}

const result = auditQuestions();

console.log(`Total questions: ${result.total}`);
console.log("\nBy category:");
for (const [slug, count] of Object.entries(result.byCategory).sort((a, b) =>
  a[0].localeCompare(b[0]),
)) {
  console.log(`  ${slug}: ${count}`);
}

if (result.duplicateIds.length > 0) {
  console.log("\nDuplicate IDs:");
  for (const id of result.duplicateIds) {
    console.log(`  - ${id}`);
  }
}

if (result.duplicateKeys.length > 0) {
  console.log("\nDuplicate title+content pairs:");
  for (const duplicate of result.duplicateKeys) {
    console.log(`  - ${duplicate.ids.join(", ")}`);
  }
}

if (result.duplicateTitles.length > 0) {
  console.log("\nDuplicate titles within category:");
  for (const duplicate of result.duplicateTitles) {
    console.log(`  - [${duplicate.categorySlug}] ${duplicate.title}: ${duplicate.ids.join(", ")}`);
  }
}

if (
  result.duplicateIds.length === 0 &&
  result.duplicateKeys.length === 0 &&
  result.duplicateTitles.length === 0
) {
  console.log("\nNo exact duplicates detected.");
}
