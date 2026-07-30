import type { SeedQuestion } from "./types";

export const javascriptQuestions: SeedQuestion[] = [
  {
    id: "seed-js-closure",
    categorySlug: "javascript",
    title: "What is a closure in JavaScript?",
    content:
      "A function returns another function that still reads a variable from the outer function after the outer function has finished. What concept is this?",
    explanation:
      "A closure is a function that retains access to variables from its lexical scope even after the outer function returns.",
    difficulty: "INTERMEDIATE",
    type: "MULTIPLE_CHOICE",
    tags: ["closures", "scope"],
    answers: [
      {
        content: "A closure — the inner function keeps its lexical environment",
        isCorrect: true,
      },
      { content: "Hoisting of the outer variable to global scope", isCorrect: false },
      { content: "Prototypal inheritance of the returned function", isCorrect: false },
      { content: "Event bubbling from the outer call stack", isCorrect: false },
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
    content:
      "You reference a `var` before its declaration line and get `undefined`, but the same pattern with `let` throws. What explains this?",
    explanation:
      "Declarations are moved to the top of their scope during compilation. let/const are hoisted but stay in the temporal dead zone until initialized.",
    difficulty: "BEGINNER",
    type: "MULTIPLE_CHOICE",
    tags: ["hoisting", "scope"],
    answers: [
      {
        content:
          "Hoisting: var is initialized as undefined; let/const stay in the TDZ until declared",
        isCorrect: true,
      },
      {
        content: "var is never hoisted; let is always initialized to null",
        isCorrect: false,
      },
      {
        content: "Both behave identically; the engine only warns for let",
        isCorrect: false,
      },
      {
        content: "let is compiled away; var creates a global property",
        isCorrect: false,
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
    content: "How does an arrow function get its `this` value?",
    explanation:
      "Arrow functions capture this lexically from the enclosing scope and cannot be changed with call/apply/bind.",
    difficulty: "INTERMEDIATE",
    type: "MULTIPLE_CHOICE",
    tags: ["this", "arrow-functions"],
    answers: [
      {
        content: "Lexically from the surrounding scope (no own this binding)",
        isCorrect: true,
      },
      {
        content: "Dynamically from how the function is called, like a normal function",
        isCorrect: false,
      },
      {
        content: "Always bound to the global object, even in modules",
        isCorrect: false,
      },
      {
        content: "From the first argument passed via Function.prototype.call",
        isCorrect: false,
      },
    ],
  },
  {
    id: "seed-js-event-delegation",
    categorySlug: "javascript",
    title: "Event delegation",
    content:
      "You have a long list of buttons that are added and removed often. What is the usual DOM pattern to handle their clicks efficiently?",
    explanation:
      "Attach one listener on a parent and use event.target to handle events from children efficiently.",
    difficulty: "INTERMEDIATE",
    type: "MULTIPLE_CHOICE",
    tags: ["dom", "events"],
    answers: [
      {
        content:
          "Event delegation: one listener on a parent, filter with event.target",
        isCorrect: true,
      },
      {
        content: "Attach a capturing listener on every button in a loop",
        isCorrect: false,
      },
      {
        content: "Poll document.activeElement on a timer",
        isCorrect: false,
      },
      {
        content: "Disable bubbling so each button must handle its own click",
        isCorrect: false,
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
    content:
      "When is a Map generally preferable to a plain object for key-value storage?",
    explanation:
      "Map preserves insertion order, accepts any value type as keys, and exposes a reliable size property via .size.",
    difficulty: "INTERMEDIATE",
    type: "MULTIPLE_CHOICE",
    tags: ["map", "data-structures"],
    answers: [
      {
        content:
          "When keys may be non-strings, you need .size, or frequent add/delete with order",
        isCorrect: true,
      },
      {
        content: "When you only need JSON serialization of string keys",
        isCorrect: false,
      },
      {
        content: "When you want prototype methods like toString on every key",
        isCorrect: false,
      },
      {
        content: "When keys must be symbols exclusively",
        isCorrect: false,
      },
    ],
  },
  {
    id: "seed-js-debounce",
    categorySlug: "javascript",
    title: "What is debouncing?",
    content:
      "A search input fires an API call on every keystroke and overwhelms the server. Which technique waits until typing pauses before calling?",
    explanation:
      "Debounce delays execution until the event stops firing for a set period, reducing redundant calls (e.g. search-as-you-type).",
    difficulty: "INTERMEDIATE",
    type: "MULTIPLE_CHOICE",
    tags: ["debounce", "events", "performance"],
    answers: [
      {
        content: "Debouncing — run once after a quiet period",
        isCorrect: true,
      },
      {
        content: "Throttling — run at most once per fixed interval while events continue",
        isCorrect: false,
      },
      {
        content: "Memoization — cache the last search result forever",
        isCorrect: false,
      },
      {
        content: "Batching — merge all keystrokes into one event listener",
        isCorrect: false,
      },
    ],
  },
  {
    id: "seed-js-instanceof",
    categorySlug: "javascript",
    title: "instanceof and prototypes",
    content:
      "What does `obj instanceof Constructor` primarily check?",
    explanation:
      "instanceof walks the prototype chain of obj looking for Constructor.prototype.",
    difficulty: "INTERMEDIATE",
    type: "MULTIPLE_CHOICE",
    tags: ["prototypes", "instanceof"],
    answers: [
      {
        content: "Whether Constructor.prototype appears in obj's prototype chain",
        isCorrect: true,
      },
      {
        content: "Whether obj was created with Object.create(null)",
        isCorrect: false,
      },
      {
        content: "Whether obj.constructor.name equals Constructor.name only",
        isCorrect: false,
      },
      {
        content: "Whether typeof obj === 'object' and obj is not null",
        isCorrect: false,
      },
    ],
  },
  {
    id: "seed-js-call-apply-bind",
    categorySlug: "javascript",
    title: "call vs apply vs bind",
    content:
      "Which method returns a new function with a fixed `this` instead of invoking immediately?",
    explanation:
      "bind returns a bound function. call and apply invoke immediately (apply takes an arguments array).",
    difficulty: "INTERMEDIATE",
    type: "MULTIPLE_CHOICE",
    tags: ["this", "call", "apply", "bind"],
    answers: [
      { content: "bind", isCorrect: true },
      { content: "call", isCorrect: false },
      { content: "apply", isCorrect: false },
      { content: "Both call and apply", isCorrect: false },
    ],
  },
  {
    id: "seed-js-async-await-errors",
    categorySlug: "javascript",
    title: "async/await error handling",
    content:
      "Inside an async function, a awaited Promise rejects. What is the idiomatic way to handle it?",
    explanation:
      "Rejected awaited promises throw; use try/catch (or let the rejection propagate to the caller).",
    difficulty: "INTERMEDIATE",
    type: "MULTIPLE_CHOICE",
    tags: ["async-await", "errors"],
    answers: [
      { content: "Wrap the await in try/catch (or let it reject the async function)", isCorrect: true },
      { content: "Pass a second callback to await like .then(onFulfilled, onRejected)", isCorrect: false },
      { content: "Check if (result === null) after every await", isCorrect: false },
      { content: "Use window.onerror only; await never throws", isCorrect: false },
    ],
  },
  {
    id: "seed-js-promise-all-settled",
    categorySlug: "javascript",
    title: "Promise.all vs allSettled",
    content:
      "You need results from several independent fetches even if some fail. Which helper fits best?",
    explanation:
      "Promise.allSettled waits for all to settle and reports each outcome. Promise.all rejects on the first rejection.",
    difficulty: "INTERMEDIATE",
    type: "MULTIPLE_CHOICE",
    tags: ["promises", "async"],
    answers: [
      { content: "Promise.allSettled", isCorrect: true },
      { content: "Promise.all", isCorrect: false },
      { content: "Promise.race", isCorrect: false },
      { content: "Promise.any", isCorrect: false },
    ],
  },
  {
    id: "seed-js-iterators",
    categorySlug: "javascript",
    title: "What makes an object iterable?",
    content:
      "Which protocol must an object implement to work with `for...of` and spread?",
    explanation:
      "Iterables expose Symbol.iterator returning an iterator with a next() method.",
    difficulty: "ADVANCED",
    type: "MULTIPLE_CHOICE",
    tags: ["iterators", "symbols"],
    answers: [
      {
        content: "A [Symbol.iterator] method that returns an iterator",
        isCorrect: true,
      },
      {
        content: "A numeric length property only",
        isCorrect: false,
      },
      {
        content: "A toJSON method that returns an array",
        isCorrect: false,
      },
      {
        content: "Inheritance from Array.prototype",
        isCorrect: false,
      },
    ],
  },
  {
    id: "seed-js-tdz-let",
    categorySlug: "javascript",
    title: "Temporal dead zone",
    content:
      "`console.log(x); let x = 1;` throws before initialization. What is that zone called?",
    explanation:
      "let/const are hoisted but uninitialized until the declaration runs — the temporal dead zone (TDZ).",
    difficulty: "INTERMEDIATE",
    type: "MULTIPLE_CHOICE",
    tags: ["tdz", "let", "scope"],
    answers: [
      { content: "Temporal dead zone (TDZ)", isCorrect: true },
      { content: "Event loop starvation", isCorrect: false },
      { content: "Prototype pollution", isCorrect: false },
      { content: "Closure capture gap", isCorrect: false },
    ],
  },
  {
    id: "seed-js-map-vs-foreach",
    categorySlug: "javascript",
    title: "map vs forEach",
    content:
      "You need a new array of transformed values from an existing array. Which method is the better fit?",
    explanation:
      "map returns a new array of results. forEach is for side effects and returns undefined.",
    difficulty: "BEGINNER",
    type: "MULTIPLE_CHOICE",
    tags: ["arrays", "map", "foreach"],
    answers: [
      { content: "Array.prototype.map", isCorrect: true },
      { content: "Array.prototype.forEach", isCorrect: false },
      { content: "Array.prototype.some", isCorrect: false },
      { content: "Array.prototype.every", isCorrect: false },
    ],
  },
  {
    id: "seed-js-set-uniqueness",
    categorySlug: "javascript",
    title: "Set uniqueness",
    content: "What does `new Set([1, 1, 2, 2, 3]).size` evaluate to?",
    explanation: "Set stores unique values by SameValueZero equality; duplicates are dropped.",
    difficulty: "BEGINNER",
    type: "MULTIPLE_CHOICE",
    tags: ["set", "data-structures"],
    answers: [
      { content: "3", isCorrect: true },
      { content: "5", isCorrect: false },
      { content: "1", isCorrect: false },
      { content: "undefined", isCorrect: false },
    ],
  },
  {
    id: "seed-js-module-scope",
    categorySlug: "javascript",
    title: "Module vs classic script scope",
    content:
      "In an ES module, top-level `var` / `let` / `const` / `function` bindings are scoped how compared to a classic script?",
    explanation:
      "Module top-level bindings are module-scoped, not attached to the global object like classic scripts often do for var/function.",
    difficulty: "INTERMEDIATE",
    type: "MULTIPLE_CHOICE",
    tags: ["modules", "scope"],
    answers: [
      {
        content: "They are module-scoped (not automatic globals)",
        isCorrect: true,
      },
      {
        content: "They always become properties of window/globalThis",
        isCorrect: false,
      },
      {
        content: "They are only visible inside async functions",
        isCorrect: false,
      },
      {
        content: "They are deleted after the module finishes evaluating",
        isCorrect: false,
      },
    ],
  },
  {
    id: "seed-js-strict-mode",
    categorySlug: "javascript",
    title: "Strict mode assignment",
    content:
      "In strict mode, assigning to an undeclared variable (e.g. `x = 1` with no declaration) does what?",
    explanation:
      "Strict mode throws ReferenceError for assignments to undeclared identifiers instead of creating an implicit global.",
    difficulty: "INTERMEDIATE",
    type: "MULTIPLE_CHOICE",
    tags: ["strict-mode"],
    answers: [
      { content: "Throws ReferenceError", isCorrect: true },
      { content: "Creates a global variable silently", isCorrect: false },
      { content: "Creates a local variable in the nearest function", isCorrect: false },
      { content: "Is ignored with no effect", isCorrect: false },
    ],
  },
  {
    id: "seed-js-event-phases",
    categorySlug: "javascript",
    title: "Bubbling vs capturing",
    content:
      "With `addEventListener(type, handler, true)`, in which phase does the handler run?",
    explanation:
      "The third argument `true` (or `{ capture: true }`) registers for the capturing phase, from window down to the target.",
    difficulty: "INTERMEDIATE",
    type: "MULTIPLE_CHOICE",
    tags: ["dom", "events", "capturing"],
    answers: [
      { content: "Capturing phase", isCorrect: true },
      { content: "Bubbling phase only", isCorrect: false },
      { content: "Target phase only, never ancestors", isCorrect: false },
      { content: "After the default action, as a microtask", isCorrect: false },
    ],
  },
  {
    id: "seed-js-structured-clone",
    categorySlug: "javascript",
    title: "structuredClone vs JSON clone",
    content:
      "Which cloning approach can copy `Map`, `Set`, and circular structures that `JSON.parse(JSON.stringify(x))` cannot?",
    explanation:
      "structuredClone supports more types (Map, Set, ArrayBuffer, etc.) and can handle cycles; JSON round-trip drops many types and fails on cycles.",
    difficulty: "ADVANCED",
    type: "MULTIPLE_CHOICE",
    tags: ["structured-clone", "json"],
    answers: [
      { content: "structuredClone", isCorrect: true },
      { content: "Object.assign only", isCorrect: false },
      { content: "Spread operator `{ ...x }`", isCorrect: false },
      { content: "JSON.parse(JSON.stringify(x))", isCorrect: false },
    ],
  },
];
