import type { SeedQuestion } from "./types";

export const typescriptQuestions: SeedQuestion[] = [
  {
    id: "seed-ts-vs-js",
    categorySlug: "typescript",
    title: "TypeScript vs JavaScript",
    content: "What does TypeScript add on top of JavaScript?",
    explanation:
      "TypeScript is a superset that adds static typing, interfaces, enums, and compile-time checks.",
    difficulty: "BEGINNER",
    type: "FLASHCARD",
    tags: ["basics"],
    answers: [
      {
        content: "Static typing and compile-time type checking on top of JavaScript.",
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-ts-interface-type",
    categorySlug: "typescript",
    title: "interface vs type",
    content: "When might you prefer interface over type alias?",
    explanation:
      "Interfaces support declaration merging and are often preferred for object shapes; types are more flexible for unions and primitives.",
    difficulty: "INTERMEDIATE",
    type: "MULTIPLE_CHOICE",
    tags: ["types", "interfaces"],
    answers: [
      {
        content: "Extending/merging object shapes across modules",
        isCorrect: true,
      },
      { content: "Union of string literals only types can do", isCorrect: false },
      { content: "Mapping over tuple elements", isCorrect: false },
      { content: "Runtime type reflection", isCorrect: false },
    ],
  },
  {
    id: "seed-ts-unknown",
    categorySlug: "typescript",
    title: "unknown vs any",
    content: "Why prefer unknown over any?",
    explanation:
      "unknown forces type narrowing before use, preserving type safety.",
    difficulty: "INTERMEDIATE",
    type: "FLASHCARD",
    tags: ["types", "safety"],
    answers: [
      {
        content: "unknown requires narrowing before operations; any disables checking.",
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-ts-generics",
    categorySlug: "typescript",
    title: "What are generics?",
    content: "What problem do generics solve in TypeScript?",
    explanation:
      "Generics let you write reusable components/functions while preserving type relationships.",
    difficulty: "INTERMEDIATE",
    type: "FLASHCARD",
    tags: ["generics"],
    answers: [
      {
        content: "Type parameters that keep input/output types related while staying reusable.",
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-ts-enum",
    categorySlug: "typescript",
    title: "TypeScript enums",
    content: "What do numeric enums compile to in JavaScript?",
    explanation: "Numeric enums generate a reverse mapping object at runtime.",
    difficulty: "INTERMEDIATE",
    type: "MULTIPLE_CHOICE",
    tags: ["enums"],
    answers: [
      { content: "A runtime object with forward and reverse mappings", isCorrect: true },
      { content: "They are erased completely", isCorrect: false },
      { content: "Only string constants", isCorrect: false },
      { content: "Private class fields", isCorrect: false },
    ],
  },
  {
    id: "seed-ts-never",
    categorySlug: "typescript",
    title: "never type",
    content: "When is never used as a return type?",
    explanation:
      "never represents values that never occur, such as functions that always throw or infinite loops.",
    difficulty: "ADVANCED",
    type: "MULTIPLE_CHOICE",
    tags: ["types"],
    answers: [
      { content: "Functions that never return normally", isCorrect: true },
      { content: "Optional properties", isCorrect: false },
      { content: "Empty arrays", isCorrect: false },
      { content: "Async functions that resolve void", isCorrect: false },
    ],
  },
  {
    id: "seed-ts-strict",
    categorySlug: "typescript",
    title: "strict mode in tsconfig",
    content: "What does enabling strict in tsconfig.json do?",
    explanation:
      "strict enables a family of stricter type-checking options like noImplicitAny and strictNullChecks.",
    difficulty: "BEGINNER",
    type: "FLASHCARD",
    tags: ["compiler"],
    answers: [
      {
        content: "Turns on stricter checks including strictNullChecks and noImplicitAny.",
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-ts-utility-partial",
    categorySlug: "typescript",
    title: "Partial<T>",
    content: "What does the Partial utility type do?",
    explanation: "Makes all properties of T optional.",
    difficulty: "INTERMEDIATE",
    type: "MULTIPLE_CHOICE",
    tags: ["utility-types"],
    answers: [
      { content: "Makes all properties optional", isCorrect: true },
      { content: "Makes all properties readonly", isCorrect: false },
      { content: "Picks a subset of keys", isCorrect: false },
      { content: "Removes null and undefined", isCorrect: false },
    ],
  },
];

export const reactQuestions: SeedQuestion[] = [
  {
    id: "seed-react-keys",
    categorySlug: "react",
    title: "Why do lists need stable keys?",
    content: "Why should React list items have stable, unique keys?",
    explanation:
      "Keys help React reconcile list updates and preserve component state correctly.",
    difficulty: "BEGINNER",
    type: "FLASHCARD",
    tags: ["lists", "reconciliation"],
    answers: [
      {
        content:
          "Keys identify items across renders so React can update efficiently and preserve state.",
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-react-virtual-dom",
    categorySlug: "react",
    title: "What is the virtual DOM?",
    content: "What role does the virtual DOM play in React?",
    explanation:
      "React keeps a lightweight tree in memory and diffs it against the previous tree to minimize real DOM updates.",
    difficulty: "BEGINNER",
    type: "FLASHCARD",
    tags: ["reconciliation"],
    answers: [
      {
        content:
          "An in-memory representation used to compute minimal DOM updates via reconciliation.",
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-react-usestate",
    categorySlug: "react",
    title: "useState behavior",
    content: "When you call setState with the same value, what happens?",
    explanation:
      "React bails out of re-rendering if Object.is comparison shows no change (except in Strict Mode dev double-invoke nuances).",
    difficulty: "INTERMEDIATE",
    type: "MULTIPLE_CHOICE",
    tags: ["hooks", "state"],
    answers: [
      { content: "React may skip re-render if value unchanged", isCorrect: true },
      { content: "Always forces a re-render", isCorrect: false },
      { content: "Resets all hooks", isCorrect: false },
      { content: "Throws in production", isCorrect: false },
    ],
  },
  {
    id: "seed-react-useeffect-deps",
    categorySlug: "react",
    title: "useEffect dependency array",
    content: "What happens if you omit the dependency array in useEffect?",
    explanation: "The effect runs after every render.",
    difficulty: "BEGINNER",
    type: "MULTIPLE_CHOICE",
    tags: ["hooks", "effects"],
    answers: [
      { content: "Runs after every render", isCorrect: true },
      { content: "Runs only once on mount", isCorrect: false },
      { content: "Never runs", isCorrect: false },
      { content: "Runs only on unmount", isCorrect: false },
    ],
  },
  {
    id: "seed-react-controlled",
    categorySlug: "react",
    title: "Controlled components",
    content: "What defines a controlled input in React?",
    explanation:
      "The input value is driven by React state and updated via onChange.",
    difficulty: "BEGINNER",
    type: "FLASHCARD",
    tags: ["forms"],
    answers: [
      {
        content: "Form element value is controlled by React state via props.",
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-react-memo",
    categorySlug: "react",
    title: "React.memo purpose",
    content: "What does React.memo do?",
    explanation:
      "Memo wraps a component to skip re-render when props are shallowly equal.",
    difficulty: "INTERMEDIATE",
    type: "MULTIPLE_CHOICE",
    tags: ["performance"],
    answers: [
      { content: "Memoizes component to skip render on same props", isCorrect: true },
      { content: "Caches fetch results", isCorrect: false },
      { content: "Replaces useMemo for values", isCorrect: false },
      { content: "Prevents state updates", isCorrect: false },
    ],
  },
  {
    id: "seed-react-error-boundary",
    categorySlug: "react",
    title: "Error boundaries",
    content: "Can a function component be an error boundary?",
    explanation:
      "As of React 19 there is no hook equivalent; class components or framework boundaries are still common.",
    difficulty: "ADVANCED",
    type: "TRUE_FALSE",
    tags: ["errors"],
    answers: [
      { content: "False (without a library wrapper)", isCorrect: true },
      { content: "True", isCorrect: false },
    ],
  },
  {
    id: "seed-react-fragment",
    categorySlug: "react",
    title: "React Fragments",
    content: "Why use a Fragment instead of a div wrapper?",
    explanation: "Fragments group children without adding extra DOM nodes.",
    difficulty: "BEGINNER",
    type: "FLASHCARD",
    tags: ["jsx"],
    answers: [
      {
        content: "Avoid extra DOM nodes while grouping multiple children.",
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-react-lifting-state",
    categorySlug: "react",
    title: "Lifting state up",
    content: "When should you lift state up in React?",
    explanation:
      "When sibling components need to share and stay in sync on the same data.",
    difficulty: "BEGINNER",
    type: "FLASHCARD",
    tags: ["state", "architecture"],
    answers: [
      {
        content: "When multiple components need to share and synchronize the same state.",
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-react-useref",
    categorySlug: "react",
    title: "useRef vs useState",
    content: "When is useRef preferable to useState?",
    explanation:
      "useRef stores mutable values that do not trigger re-renders, like DOM refs or timers.",
    difficulty: "INTERMEDIATE",
    type: "MULTIPLE_CHOICE",
    tags: ["hooks"],
    answers: [
      { content: "Storing mutable values without causing re-render", isCorrect: true },
      { content: "Any value displayed in UI", isCorrect: false },
      { content: "Replacing context", isCorrect: false },
      { content: "Server-side data fetching", isCorrect: false },
    ],
  },
];
