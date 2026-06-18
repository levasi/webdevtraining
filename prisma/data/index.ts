import { javascriptQuestions } from "./javascript";
import { typescriptQuestions, reactQuestions } from "./typescript-react";
import {
  nextjsQuestions,
  vueQuestions,
  nuxtQuestions,
} from "./frontend-frameworks";
import { htmlQuestions, cssQuestions } from "./html-css";
import {
  nodejsQuestions,
  expressQuestions,
  restApiQuestions,
} from "./backend";
import {
  sqlQuestions,
  postgresqlQuestions,
  gitQuestions,
} from "./data-ops";
import {
  testingQuestions,
  securityQuestions,
  performanceQuestions,
  systemDesignQuestions,
} from "./quality-architecture";
import type { SeedQuestion } from "./types";

export const ALL_SEED_QUESTIONS: SeedQuestion[] = [
  ...javascriptQuestions,
  ...typescriptQuestions,
  ...reactQuestions,
  ...nextjsQuestions,
  ...vueQuestions,
  ...nuxtQuestions,
  ...htmlQuestions,
  ...cssQuestions,
  ...nodejsQuestions,
  ...expressQuestions,
  ...restApiQuestions,
  ...sqlQuestions,
  ...postgresqlQuestions,
  ...gitQuestions,
  ...testingQuestions,
  ...securityQuestions,
  ...performanceQuestions,
  ...systemDesignQuestions,
];

export function questionsByCategory(slug: string): SeedQuestion[] {
  return ALL_SEED_QUESTIONS.filter((q) => q.categorySlug === slug);
}
