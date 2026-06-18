import type { SeedChallenge } from "../challenge-types";
import { stringChallenges } from "./strings";
import { arrayChallenges } from "./arrays";
import { arrayMethodChallenges } from "./array-methods";
import { objectChallenges } from "./objects";
import { functionChallenges } from "./functions";
import { asyncChallenges } from "./async";
import { patternChallenges } from "./patterns";
import { algorithmChallenges } from "./algorithms";

export const ALL_CHALLENGES: SeedChallenge[] = [
  ...stringChallenges,
  ...arrayChallenges,
  ...arrayMethodChallenges,
  ...objectChallenges,
  ...functionChallenges,
  ...asyncChallenges,
  ...patternChallenges,
  ...algorithmChallenges,
];
