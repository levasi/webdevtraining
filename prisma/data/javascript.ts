import type { SeedQuestion } from "./types";

export const javascriptQuestions: SeedQuestion[] = [
  {
    id: "seed-js-closure",
    categorySlug: "javascript",
    title: "What is a closure in JavaScript?",
    content: "Explain what a closure is and when it is useful.",
    explanation:
      "A closure is a function that retains access to variables from its lexical scope even after the outer function returns.",
    difficulty: "INTERMEDIATE",
    type: "FLASHCARD",
    tags: ["closures", "scope"],
    answers: [
      {
        content:
          "A function bundled with its lexical environment, allowing access to outer scope variables.",
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-js-event-loop",
    categorySlug: "javascript",
    title: "Which queue handles Promise callbacks?",
    content: "In the browser event loop, where are Promise callbacks scheduled?",
    explanation:
      "Promise callbacks run in the microtask queue before the next macrotask.",
    difficulty: "INTERMEDIATE",
    type: "MULTIPLE_CHOICE",
    tags: ["event-loop", "async"],
    answers: [
      { content: "Microtask queue", isCorrect: true },
      { content: "Macrotask queue", isCorrect: false },
      { content: "Render queue", isCorrect: false },
      { content: "Animation frame queue", isCorrect: false },
    ],
  },
  {
    id: "seed-js-equality",
    categorySlug: "javascript",
    title: "Difference between == and ===",
    content: "What is the key difference between == and === in JavaScript?",
    explanation:
      "== performs type coercion before comparison; === compares value and type without coercion.",
    difficulty: "BEGINNER",
    type: "MULTIPLE_CHOICE",
    tags: ["operators", "types"],
    answers: [
      { content: "== coerces types; === does not", isCorrect: true },
      { content: "=== is slower but identical otherwise", isCorrect: false },
      { content: "== works only with numbers", isCorrect: false },
      { content: "=== allows null and undefined to match", isCorrect: false },
    ],
  },
  {
    id: "seed-js-hoisting",
    categorySlug: "javascript",
    title: "What is hoisting?",
    content: "What does hoisting mean in JavaScript?",
    explanation:
      "Declarations are moved to the top of their scope during compilation. let/const are hoisted but stay in the temporal dead zone until initialized.",
    difficulty: "BEGINNER",
    type: "FLASHCARD",
    tags: ["hoisting", "scope"],
    answers: [
      {
        content:
          "Moving declarations to the top of their scope; var is initialized as undefined, let/const remain in TDZ until declared.",
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-js-typeof-null",
    categorySlug: "javascript",
    title: "typeof null",
    content: "What does typeof null return in JavaScript?",
    explanation: "This is a long-standing JavaScript bug; null is not an object.",
    difficulty: "BEGINNER",
    type: "MULTIPLE_CHOICE",
    tags: ["types", "quirks"],
    answers: [
      { content: '"object"', isCorrect: true },
      { content: '"null"', isCorrect: false },
      { content: '"undefined"', isCorrect: false },
      { content: '"number"', isCorrect: false },
    ],
  },
  {
    id: "seed-js-const-array",
    categorySlug: "javascript",
    title: "Can you mutate a const array?",
    content: "Given const arr = [1, 2], can you push a new value?",
    explanation:
      "const prevents rebinding the variable, not mutating the referenced object.",
    difficulty: "BEGINNER",
    type: "TRUE_FALSE",
    tags: ["const", "references"],
    answers: [
      { content: "True", isCorrect: true },
      { content: "False", isCorrect: false },
    ],
  },
  {
    id: "seed-js-promises",
    categorySlug: "javascript",
    title: "Promise states",
    content: "Which are valid Promise states?",
    explanation:
      "A Promise is pending, then settles once as fulfilled or rejected.",
    difficulty: "INTERMEDIATE",
    type: "MULTIPLE_CHOICE",
    tags: ["promises", "async"],
    answers: [
      { content: "pending, fulfilled, rejected", isCorrect: true },
      { content: "pending, resolved, completed", isCorrect: false },
      { content: "waiting, done, failed", isCorrect: false },
      { content: "open, closed, cancelled", isCorrect: false },
    ],
  },
  {
    id: "seed-js-this-arrow",
    categorySlug: "javascript",
    title: "this in arrow functions",
    content: "How does an arrow function bind this?",
    explanation:
      "Arrow functions capture this lexically from the enclosing scope and cannot be changed with call/apply/bind.",
    difficulty: "INTERMEDIATE",
    type: "FLASHCARD",
    tags: ["this", "arrow-functions"],
    answers: [
      {
        content: "Lexically from the surrounding scope; not its own this binding.",
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-js-event-delegation",
    categorySlug: "javascript",
    title: "Event delegation",
    content: "What is event delegation in the DOM?",
    explanation:
      "Attach one listener on a parent and use event.target to handle events from children efficiently.",
    difficulty: "INTERMEDIATE",
    type: "FLASHCARD",
    tags: ["dom", "events"],
    answers: [
      {
        content:
          "Listening on a parent element for events that bubble up from child elements.",
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-js-json-parse",
    categorySlug: "javascript",
    title: "JSON.parse safety",
    content: "What happens if JSON.parse receives invalid JSON?",
    explanation: "JSON.parse throws a SyntaxError for invalid input.",
    difficulty: "BEGINNER",
    type: "MULTIPLE_CHOICE",
    tags: ["json", "errors"],
    answers: [
      { content: "Throws SyntaxError", isCorrect: true },
      { content: "Returns null", isCorrect: false },
      { content: "Returns undefined", isCorrect: false },
      { content: "Silently returns empty object", isCorrect: false },
    ],
  },
  {
    id: "seed-js-optional-chaining",
    categorySlug: "javascript",
    title: "Optional chaining result",
    content: "What does `user?.address?.city` evaluate to when `user.address` is undefined?",
    explanation:
      "Optional chaining short-circuits and returns undefined when any link in the chain is nullish.",
    difficulty: "BEGINNER",
    type: "MULTIPLE_CHOICE",
    tags: ["optional-chaining", "operators"],
    answers: [
      { content: "undefined", isCorrect: true },
      { content: "null", isCorrect: false },
      { content: '""', isCorrect: false },
      { content: "Throws TypeError", isCorrect: false },
    ],
  },
  {
    id: "seed-js-nullish-coalescing",
    categorySlug: "javascript",
    title: "?? vs ||",
    content: "What is the key difference between `??` and `||`?",
    explanation:
      "?? returns the right-hand side only for null or undefined. || treats any falsy value (0, '', false) as missing.",
    difficulty: "INTERMEDIATE",
    type: "MULTIPLE_CHOICE",
    tags: ["nullish-coalescing", "operators"],
    answers: [
      {
        content: "?? only triggers for null/undefined; || triggers for any falsy value",
        isCorrect: true,
      },
      { content: "?? performs type coercion; || does not", isCorrect: false },
      { content: "They are identical in modern JavaScript", isCorrect: false },
      { content: "?? works only with numbers", isCorrect: false },
    ],
  },
  {
    id: "seed-js-spread-shallow",
    categorySlug: "javascript",
    title: "Spread and nested objects",
    content: "Given `const copy = { ...original }` where original has a nested `settings` object, is `copy.settings` a deep clone?",
    explanation:
      "Object spread creates a shallow copy. Nested objects still share references with the original.",
    difficulty: "INTERMEDIATE",
    type: "TRUE_FALSE",
    tags: ["spread", "references"],
    answers: [
      { content: "False", isCorrect: true },
      { content: "True", isCorrect: false },
    ],
  },
  {
    id: "seed-js-map-vs-object",
    categorySlug: "javascript",
    title: "Map vs plain object",
    content: "When is a Map preferable to a plain object for key-value storage?",
    explanation:
      "Map preserves insertion order, accepts any value type as keys, and exposes a reliable size property via .size.",
    difficulty: "INTERMEDIATE",
    type: "FLASHCARD",
    tags: ["map", "data-structures"],
    answers: [
      {
        content:
          "When keys are not strings/symbols, you need insertion order guarantees, or frequent add/delete with a known size.",
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-js-debounce",
    categorySlug: "javascript",
    title: "What is debouncing?",
    content: "Explain debouncing in the context of event handlers.",
    explanation:
      "Debounce delays execution until the event stops firing for a set period, reducing redundant calls (e.g. search-as-you-type).",
    difficulty: "INTERMEDIATE",
    type: "FLASHCARD",
    tags: ["debounce", "events", "performance"],
    answers: [
      {
        content:
          "A technique that waits until input/events pause before running a function, collapsing rapid repeated calls into one.",
        isCorrect: true,
      },
    ],
  },
];
