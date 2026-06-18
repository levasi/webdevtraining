export type SeedDifficulty = "BEGINNER" | "INTERMEDIATE" | "ADVANCED";

export type SeedTestCase = {
  input: unknown;
  expectedOutput: unknown;
  description?: string;
};

export type SeedChallenge = {
  id: string;
  categorySlug: string;
  title: string;
  description: string;
  difficulty: SeedDifficulty;
  starterCode: string;
  solutionCode: string;
  testCases: SeedTestCase[];
  hints: string[];
};
