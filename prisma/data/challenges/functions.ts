import type { SeedChallenge } from "../challenge-types";
import {
  DEBOUNCE_HARNESS,
  THROTTLE_HARNESS,
} from "./harnesses";

export const functionChallenges: SeedChallenge[] = [
  {
    id: "seed-challenge-debounce",
    categorySlug: "javascript",
    title: "Implement Debounce",
    description:
      "Implement debounce(fn, delay). Input is [delay, waits] where waits is ms between successive calls. Return execution log.",
    difficulty: "INTERMEDIATE",
    starterCode: `function debounce(fn, delay) {
  // Return a debounced version of fn.
}

${DEBOUNCE_HARNESS}

function solve(input) {
  const [delay, waits] = input;
  return runDebounceTest(delay, waits);
}`,
    solutionCode: `function debounce(fn, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}

${DEBOUNCE_HARNESS}

function solve(input) {
  const [delay, waits] = input;
  return runDebounceTest(delay, waits);
}`,
    testCases: [
      { input: [100, [0, 50, 50]], expectedOutput: [{ at: 150, value: 1 }] },
      { input: [100, [200]], expectedOutput: [{ at: 100, value: 1 }] },
      { input: [50, [20, 20, 100]], expectedOutput: [{ at: 90, value: 1 }] },
    ],
    hints: ["Store a timeout id and clear it on every new call.", "Schedule fn after delay ms of inactivity."],
  },
  {
    id: "seed-challenge-throttle",
    categorySlug: "javascript",
    title: "Implement Throttle",
    description:
      "Implement throttle(fn, delay). Input is [delay, waits]. Return execution log.",
    difficulty: "INTERMEDIATE",
    starterCode: `function throttle(fn, delay) {
  // Return a throttled version of fn.
}

${THROTTLE_HARNESS}

function solve(input) {
  const [delay, waits] = input;
  return runThrottleTest(delay, waits);
}`,
    solutionCode: `function throttle(fn, delay) {
  let throttled = false;
  return function (...args) {
    if (!throttled) {
      fn.apply(this, args);
      throttled = true;
      setTimeout(() => { throttled = false; }, delay);
    }
  };
}

${THROTTLE_HARNESS}

function solve(input) {
  const [delay, waits] = input;
  return runThrottleTest(delay, waits);
}`,
    testCases: [
      { input: [100, [0, 50, 50]], expectedOutput: [{ at: 0, value: 1 }] },
      { input: [100, [0, 100, 0]], expectedOutput: [{ at: 0, value: 1 }, { at: 100, value: 1 }] },
      { input: [50, [0, 25, 25, 0]], expectedOutput: [{ at: 0, value: 1 }, { at: 50, value: 1 }] },
    ],
    hints: ["Track whether fn is in a throttle window.", "Ignore calls until the window expires."],
  },
  {
    id: "seed-challenge-memoize",
    categorySlug: "javascript",
    title: "Implement Memoize",
    description: "Implement memoize(fn). Input is { values } — arguments to call the memoized fn.",
    difficulty: "INTERMEDIATE",
    starterCode: `function memoize(fn) {
  // Return memoized version of fn.
}

function runMemoizeTest(input) {
  let calls = 0;
  const fn = memoize((x) => { calls++; return x * 2; });
  const results = input.values.map((v) => fn(v));
  return { results, calls };
}

function solve(input) {
  return runMemoizeTest(input);
}`,
    solutionCode: `function memoize(fn) {
  const cache = new Map();
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

function runMemoizeTest(input) {
  let calls = 0;
  const fn = memoize((x) => { calls++; return x * 2; });
  const results = input.values.map((v) => fn(v));
  return { results, calls };
}

function solve(input) {
  return runMemoizeTest(input);
}`,
    testCases: [
      { input: { values: [1, 1, 2, 2, 3] }, expectedOutput: { results: [2, 2, 4, 4, 6], calls: 3 } },
      { input: { values: [5, 5, 5] }, expectedOutput: { results: [10, 10, 10], calls: 1 } },
      { input: { values: [0, 1] }, expectedOutput: { results: [0, 2], calls: 2 } },
    ],
    hints: ["Cache results by serialized arguments.", "Return cached value on repeated calls."],
  },
  {
    id: "seed-challenge-once",
    categorySlug: "javascript",
    title: "Implement Once",
    description: "Implement once(fn) that only invokes fn on the first call. Input is { values }.",
    difficulty: "BEGINNER",
    starterCode: `function once(fn) {
  // Return function that only calls fn once.
}

function runOnceTest(input) {
  let calls = 0;
  const fn = once((x) => { calls++; return x * 2; });
  const results = input.values.map((v) => fn(v));
  return { results, calls };
}

function solve(input) {
  return runOnceTest(input);
}`,
    solutionCode: `function once(fn) {
  let called = false;
  let result;
  return function (...args) {
    if (!called) {
      called = true;
      result = fn.apply(this, args);
    }
    return result;
  };
}

function runOnceTest(input) {
  let calls = 0;
  const fn = once((x) => { calls++; return x * 2; });
  const results = input.values.map((v) => fn(v));
  return { results, calls };
}

function solve(input) {
  return runOnceTest(input);
}`,
    testCases: [
      { input: { values: [1, 2, 3] }, expectedOutput: { results: [2, 2, 2], calls: 1 } },
      { input: { values: [5, 5] }, expectedOutput: { results: [10, 10], calls: 1 } },
      { input: { values: [0] }, expectedOutput: { results: [0], calls: 1 } },
    ],
    hints: ["Track whether fn has been called.", "Return cached result on subsequent calls."],
  },
  {
    id: "seed-challenge-curry",
    categorySlug: "javascript",
    title: "Implement Curry",
    description: "Implement curry(fn) for a function of arity 3. Input is { a, b, c }.",
    difficulty: "ADVANCED",
    starterCode: `function curry(fn) {
  // Return curried function.
}

function solve(input) {
  const add = curry((a, b, c) => a + b + c);
  return add(input.a)(input.b)(input.c);
}`,
    solutionCode: `function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) return fn(...args);
    return (...next) => curried(...args, ...next);
  };
}

function solve(input) {
  const add = curry((a, b, c) => a + b + c);
  return add(input.a)(input.b)(input.c);
}`,
    testCases: [
      { input: { a: 1, b: 2, c: 3 }, expectedOutput: 6 },
      { input: { a: 0, b: 0, c: 0 }, expectedOutput: 0 },
      { input: { a: 10, b: 20, c: 30 }, expectedOutput: 60 },
    ],
    hints: ["Collect arguments until arity is met.", "Return a new function for partial application."],
  },
  {
    id: "seed-challenge-partial",
    categorySlug: "javascript",
    title: "Implement Partial Application",
    description: "Implement partial(fn, ...fixed). Input is { fixed, rest }.",
    difficulty: "INTERMEDIATE",
    starterCode: `function partial(fn, ...fixed) {
  // Return partially applied function.
}

function solve(input) {
  const add = (a, b, c) => a + b + c;
  return partial(add, ...input.fixed)(...input.rest);
}`,
    solutionCode: `function partial(fn, ...fixed) {
  return function (...rest) {
    return fn(...fixed, ...rest);
  };
}

function solve(input) {
  const add = (a, b, c) => a + b + c;
  return partial(add, ...input.fixed)(...input.rest);
}`,
    testCases: [
      { input: { fixed: [1], rest: [2, 3] }, expectedOutput: 6 },
      { input: { fixed: [1, 2], rest: [3] }, expectedOutput: 6 },
      { input: { fixed: [0], rest: [0, 0] }, expectedOutput: 0 },
    ],
    hints: ["Pre-fill some arguments.", "Return a function accepting the rest."],
  },
  {
    id: "seed-challenge-compose",
    categorySlug: "javascript",
    title: "Compose Functions",
    description: "Implement compose(...fns) where compose(f,g)(x) = f(g(x)). Input is { value }.",
    difficulty: "INTERMEDIATE",
    starterCode: `function compose(...fns) {
  // Return composed function.
}

function solve(input) {
  const double = (x) => x * 2;
  const increment = (x) => x + 1;
  return compose(increment, double)(input.value);
}`,
    solutionCode: `function compose(...fns) {
  return function (value) {
    return fns.reduceRight((acc, fn) => fn(acc), value);
  };
}

function solve(input) {
  const double = (x) => x * 2;
  const increment = (x) => x + 1;
  return compose(increment, double)(input.value);
}`,
    testCases: [
      { input: { value: 3 }, expectedOutput: 7 },
      { input: { value: 0 }, expectedOutput: 1 },
      { input: { value: 10 }, expectedOutput: 21 },
    ],
    hints: ["Reduce right over the functions.", "Apply each fn to the previous result."],
  },
  {
    id: "seed-challenge-pipe",
    categorySlug: "javascript",
    title: "Pipe Functions",
    description: "Implement pipe(...fns) where pipe(f,g)(x) = g(f(x)). Input is { value }.",
    difficulty: "INTERMEDIATE",
    starterCode: `function pipe(...fns) {
  // Return piped function.
}

function solve(input) {
  const double = (x) => x * 2;
  const increment = (x) => x + 1;
  return pipe(double, increment)(input.value);
}`,
    solutionCode: `function pipe(...fns) {
  return function (value) {
    return fns.reduce((acc, fn) => fn(acc), value);
  };
}

function solve(input) {
  const double = (x) => x * 2;
  const increment = (x) => x + 1;
  return pipe(double, increment)(input.value);
}`,
    testCases: [
      { input: { value: 3 }, expectedOutput: 7 },
      { input: { value: 0 }, expectedOutput: 1 },
      { input: { value: 10 }, expectedOutput: 21 },
    ],
    hints: ["Reduce left over the functions.", "pipe applies left to right unlike compose."],
  },
];
