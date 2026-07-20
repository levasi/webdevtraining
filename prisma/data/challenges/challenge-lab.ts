import type { SeedChallenge } from "../challenge-types";

/**
 * Challenges imported from Challenge Lab
 * (`../learning` — JS/TS tracks adapted to solve(input) format).
 * Skips titles already covered by existing seed challenges.
 * Vue SFC challenges are omitted (playground runner is JS-only).
 */
export const challengeLabChallenges: SeedChallenge[] = [
  // ── JavaScript (new vs existing seed) ─────────────────────
  {
    id: "seed-challenge-lab-sum",
    categorySlug: "javascript",
    title: "Sum of Numbers",
    description:
      "Implement sum(numbers) so it returns the total of every number in the array. Empty arrays should return 0.",
    difficulty: "BEGINNER",
    starterCode: `function sum(numbers) {
  // return the total of every number; empty → 0
}

function solve(input) {
  return sum(input);
}`,
    solutionCode: `function sum(numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}

function solve(input) {
  return sum(input);
}`,
    testCases: [
      { input: [1, 2, 3], expectedOutput: 6, description: "adds positive numbers" },
      { input: [-1, 5, -2], expectedOutput: 2, description: "handles negatives" },
      { input: [], expectedOutput: 0, description: "empty array" },
      { input: [42], expectedOutput: 42, description: "single element" },
    ],
    hints: [
      "You can use a for…of loop and accumulate a total.",
      "Array.prototype.reduce is a clean one-liner for this.",
    ],
  },
  {
    id: "seed-challenge-lab-fizzbuzz",
    categorySlug: "javascript",
    title: "FizzBuzz",
    description: `Implement fizzBuzz(n) that returns an array of length n.

For each index i from 1 to n:
- "FizzBuzz" if divisible by both 3 and 5
- "Fizz" if divisible by 3
- "Buzz" if divisible by 5
- otherwise the number itself as a string`,
    difficulty: "BEGINNER",
    starterCode: `function fizzBuzz(n) {
  // return string[] of length n
}

function solve(input) {
  return fizzBuzz(input);
}`,
    solutionCode: `function fizzBuzz(n) {
  const out = [];
  for (let i = 1; i <= n; i++) {
    if (i % 15 === 0) out.push("FizzBuzz");
    else if (i % 3 === 0) out.push("Fizz");
    else if (i % 5 === 0) out.push("Buzz");
    else out.push(String(i));
  }
  return out;
}

function solve(input) {
  return fizzBuzz(input);
}`,
    testCases: [
      {
        input: 15,
        expectedOutput: [
          "1",
          "2",
          "Fizz",
          "4",
          "Buzz",
          "Fizz",
          "7",
          "8",
          "Fizz",
          "Buzz",
          "11",
          "Fizz",
          "13",
          "14",
          "FizzBuzz",
        ],
        description: "classic first 15",
      },
      { input: 0, expectedOutput: [], description: "empty for 0" },
    ],
    hints: [
      "Check divisible by 15 first (both 3 and 5), then 3, then 5.",
      "n % 3 === 0 means n is divisible by 3.",
    ],
  },
  {
    id: "seed-challenge-lab-word-frequency",
    categorySlug: "javascript",
    title: "Word Frequency",
    description:
      "Implement wordFrequency(text). Return a Record of lowercase word → count. Words are letter/digit sequences; treat punctuation as separators.",
    difficulty: "BEGINNER",
    starterCode: `function wordFrequency(text) {
  // return { word: count }
}

function solve(input) {
  return wordFrequency(input);
}`,
    solutionCode: `function wordFrequency(text) {
  const counts = {};
  const words = text.toLowerCase().match(/[a-z0-9]+/g) ?? [];
  for (const word of words) {
    counts[word] = (counts[word] ?? 0) + 1;
  }
  return counts;
}

function solve(input) {
  return wordFrequency(input);
}`,
    testCases: [
      {
        input: "Hello hello world",
        expectedOutput: { hello: 2, world: 1 },
        description: "case-insensitive",
      },
      {
        input: "one, two; two!",
        expectedOutput: { one: 1, two: 2 },
        description: "punctuation separators",
      },
      { input: "", expectedOutput: {}, description: "empty string" },
      { input: "   !!!", expectedOutput: {}, description: "no words" },
    ],
    hints: [
      "Extract words with a regex like /[a-z0-9]+/gi, then lowercase each match.",
      "Accumulate counts in a plain object: map[word] = (map[word] ?? 0) + 1.",
    ],
  },
  {
    id: "seed-challenge-lab-range",
    categorySlug: "javascript",
    title: "Range with Step",
    description:
      "Implement range(start, end, step = 1). Return integers from start up to (but not including) end. Support negative steps when end < start. Input is [start, end] or [start, end, step].",
    difficulty: "INTERMEDIATE",
    starterCode: `function range(start, end, step = 1) {
  // return number[]
}

function solve(input) {
  return range(...input);
}`,
    solutionCode: `function range(start, end, step = 1) {
  if (step === 0) throw new Error("step cannot be 0");
  const result = [];
  if (step > 0) {
    for (let i = start; i < end; i += step) result.push(i);
  } else {
    for (let i = start; i > end; i += step) result.push(i);
  }
  return result;
}

function solve(input) {
  return range(...input);
}`,
    testCases: [
      { input: [0, 5], expectedOutput: [0, 1, 2, 3, 4], description: "ascending" },
      { input: [0, 10, 2], expectedOutput: [0, 2, 4, 6, 8], description: "custom step" },
      {
        input: [5, 0, -1],
        expectedOutput: [5, 4, 3, 2, 1],
        description: "descending",
      },
      { input: [3, 3], expectedOutput: [], description: "start === end" },
    ],
    hints: [
      "Loop while i < end for positive step, or i > end for negative step.",
      "Reject step === 0.",
    ],
  },

  // ── TypeScript track (runtime-checked; types stripped in runner) ──
  {
    id: "seed-challenge-lab-ts-annotate",
    categorySlug: "typescript",
    title: "Type Annotations Helpers",
    description:
      "Implement greet(name, title?), double(value), and isEven(n). Input is { fn, args } selecting which helper to call.",
    difficulty: "BEGINNER",
    starterCode: `function greet(name, title) {
  // "Hello, name" or "Hello, title name"
}

function double(value) {
  // number * 2, or string repeated twice
}

function isEven(n) {
  // true if n is even
}

function solve(input) {
  const { fn, args } = input;
  if (fn === "greet") return greet(...args);
  if (fn === "double") return double(...args);
  if (fn === "isEven") return isEven(...args);
}`,
    solutionCode: `function greet(name, title) {
  if (title) return \`Hello, \${title} \${name}\`;
  return \`Hello, \${name}\`;
}

function double(value) {
  if (typeof value === "number") return value * 2;
  return value + value;
}

function isEven(n) {
  return n % 2 === 0;
}

function solve(input) {
  const { fn, args } = input;
  if (fn === "greet") return greet(...args);
  if (fn === "double") return double(...args);
  if (fn === "isEven") return isEven(...args);
}`,
    testCases: [
      { input: { fn: "greet", args: ["Ada"] }, expectedOutput: "Hello, Ada" },
      {
        input: { fn: "greet", args: ["Ada", "Dr."] },
        expectedOutput: "Hello, Dr. Ada",
      },
      { input: { fn: "double", args: [21] }, expectedOutput: 42 },
      { input: { fn: "double", args: ["ha"] }, expectedOutput: "haha" },
      { input: { fn: "isEven", args: [4] }, expectedOutput: true },
      { input: { fn: "isEven", args: [5] }, expectedOutput: false },
    ],
    hints: [
      "Optional title: only include it when provided.",
      "Use typeof to branch number vs string in double.",
    ],
  },
  {
    id: "seed-challenge-lab-ts-interfaces",
    categorySlug: "typescript",
    title: "User Interface Helpers",
    description:
      "Implement displayName(user), isAdmin(user), and adultsOnly(users). Users have id, name, email, optional age, and role 'admin' | 'user'. Input is { fn, args }.",
    difficulty: "BEGINNER",
    starterCode: `function displayName(user) {
  // "Name (role)"
}

function isAdmin(user) {
  // true when role is admin
}

function adultsOnly(users) {
  // age defined and >= 18
}

function solve(input) {
  const { fn, args } = input;
  if (fn === "displayName") return displayName(...args);
  if (fn === "isAdmin") return isAdmin(...args);
  if (fn === "adultsOnly") return adultsOnly(...args);
}`,
    solutionCode: `function displayName(user) {
  return \`\${user.name} (\${user.role})\`;
}

function isAdmin(user) {
  return user.role === "admin";
}

function adultsOnly(users) {
  return users.filter((u) => u.age !== undefined && u.age >= 18);
}

function solve(input) {
  const { fn, args } = input;
  if (fn === "displayName") return displayName(...args);
  if (fn === "isAdmin") return isAdmin(...args);
  if (fn === "adultsOnly") return adultsOnly(...args);
}`,
    testCases: [
      {
        input: {
          fn: "displayName",
          args: [
            {
              id: "1",
              name: "Ada",
              email: "ada@example.com",
              age: 36,
              role: "admin",
            },
          ],
        },
        expectedOutput: "Ada (admin)",
      },
      {
        input: {
          fn: "isAdmin",
          args: [
            {
              id: "1",
              name: "Ada",
              email: "ada@example.com",
              age: 36,
              role: "admin",
            },
          ],
        },
        expectedOutput: true,
      },
      {
        input: {
          fn: "isAdmin",
          args: [
            {
              id: "2",
              name: "Bob",
              email: "bob@example.com",
              age: 16,
              role: "user",
            },
          ],
        },
        expectedOutput: false,
      },
      {
        input: {
          fn: "adultsOnly",
          args: [
            [
              {
                id: "1",
                name: "Ada",
                email: "ada@example.com",
                age: 36,
                role: "admin",
              },
              {
                id: "2",
                name: "Bob",
                email: "bob@example.com",
                age: 16,
                role: "user",
              },
              {
                id: "3",
                name: "Cara",
                email: "cara@example.com",
                role: "user",
              },
            ],
          ],
        },
        expectedOutput: [
          {
            id: "1",
            name: "Ada",
            email: "ada@example.com",
            age: 36,
            role: "admin",
          },
        ],
      },
    ],
    hints: [
      "displayName formats as `${name} (${role})`.",
      "adultsOnly requires age to be defined and >= 18.",
    ],
  },
  {
    id: "seed-challenge-lab-ts-generics",
    categorySlug: "typescript",
    title: "Generic Helpers",
    description:
      "Implement identity(value), first(items), and pluck(items, key). Input is { fn, args }.",
    difficulty: "INTERMEDIATE",
    starterCode: `function identity(value) {
  // return value unchanged
}

function first(items) {
  // first element or undefined
}

function pluck(items, key) {
  // map each item to item[key]
}

function solve(input) {
  const { fn, args } = input;
  if (fn === "identity") return identity(...args);
  if (fn === "first") return first(...args);
  if (fn === "pluck") return pluck(...args);
}`,
    solutionCode: `function identity(value) {
  return value;
}

function first(items) {
  return items[0];
}

function pluck(items, key) {
  return items.map((item) => item[key]);
}

function solve(input) {
  const { fn, args } = input;
  if (fn === "identity") return identity(...args);
  if (fn === "first") return first(...args);
  if (fn === "pluck") return pluck(...args);
}`,
    testCases: [
      { input: { fn: "identity", args: [42] }, expectedOutput: 42 },
      { input: { fn: "identity", args: ["hi"] }, expectedOutput: "hi" },
      { input: { fn: "first", args: [[10, 20]] }, expectedOutput: 10 },
      { input: { fn: "first", args: [["only"]] }, expectedOutput: "only" },
      {
        input: {
          fn: "pluck",
          args: [
            [
              { id: 1, name: "A" },
              { id: 2, name: "B" },
            ],
            "name",
          ],
        },
        expectedOutput: ["A", "B"],
      },
      {
        input: {
          fn: "pluck",
          args: [
            [
              { id: 1, name: "A" },
              { id: 2, name: "B" },
            ],
            "id",
          ],
        },
        expectedOutput: [1, 2],
      },
    ],
    hints: [
      "identity just returns its argument.",
      "pluck is items.map((item) => item[key]).",
    ],
  },
  {
    id: "seed-challenge-lab-ts-narrowing",
    categorySlug: "typescript",
    title: "Shape Narrowing",
    description:
      "Shapes are { kind: 'circle', radius } or { kind: 'rectangle', width, height }. Implement area, isCircle, and describeShape. Input is { fn, args }.",
    difficulty: "INTERMEDIATE",
    starterCode: `function area(shape) {
  // circle: π r²; rectangle: width * height
}

function isCircle(shape) {
  // true when kind === "circle"
}

function describeShape(shape) {
  // "circle r=2" or "rectangle 3x4"
}

function solve(input) {
  const { fn, args } = input;
  if (fn === "area") return area(...args);
  if (fn === "isCircle") return isCircle(...args);
  if (fn === "describeShape") return describeShape(...args);
}`,
    solutionCode: `function area(shape) {
  if (shape.kind === "circle") return Math.PI * shape.radius ** 2;
  return shape.width * shape.height;
}

function isCircle(shape) {
  return shape.kind === "circle";
}

function describeShape(shape) {
  if (isCircle(shape)) return \`circle r=\${shape.radius}\`;
  return \`rectangle \${shape.width}x\${shape.height}\`;
}

function solve(input) {
  const { fn, args } = input;
  if (fn === "area") return area(...args);
  if (fn === "isCircle") return isCircle(...args);
  if (fn === "describeShape") return describeShape(...args);
}`,
    testCases: [
      {
        input: { fn: "area", args: [{ kind: "circle", radius: 2 }] },
        expectedOutput: Math.PI * 4,
      },
      {
        input: {
          fn: "area",
          args: [{ kind: "rectangle", width: 3, height: 4 }],
        },
        expectedOutput: 12,
      },
      {
        input: { fn: "isCircle", args: [{ kind: "circle", radius: 2 }] },
        expectedOutput: true,
      },
      {
        input: {
          fn: "isCircle",
          args: [{ kind: "rectangle", width: 3, height: 4 }],
        },
        expectedOutput: false,
      },
      {
        input: {
          fn: "describeShape",
          args: [{ kind: "circle", radius: 2 }],
        },
        expectedOutput: "circle r=2",
      },
      {
        input: {
          fn: "describeShape",
          args: [{ kind: "rectangle", width: 3, height: 4 }],
        },
        expectedOutput: "rectangle 3x4",
      },
    ],
    hints: [
      "Narrow on shape.kind (discriminated union).",
      "isCircle is a simple kind === 'circle' check.",
    ],
  },
  {
    id: "seed-challenge-lab-ts-utility-pick",
    categorySlug: "typescript",
    title: "Runtime Pick",
    description:
      "Implement pick(obj, keys) that returns a new object with only the listed keys. Input is { obj, keys }.",
    difficulty: "INTERMEDIATE",
    starterCode: `function pick(obj, keys) {
  // return subset of obj
}

function solve(input) {
  return pick(input.obj, input.keys);
}`,
    solutionCode: `function pick(obj, keys) {
  const result = {};
  for (const key of keys) {
    result[key] = obj[key];
  }
  return result;
}

function solve(input) {
  return pick(input.obj, input.keys);
}`,
    testCases: [
      {
        input: {
          obj: { id: "1", name: "Ada", age: 36 },
          keys: ["id", "name"],
        },
        expectedOutput: { id: "1", name: "Ada" },
      },
      {
        input: { obj: { a: 1, b: 2, c: 3 }, keys: ["b"] },
        expectedOutput: { b: 2 },
      },
      {
        input: { obj: { a: 1 }, keys: [] },
        expectedOutput: {},
      },
    ],
    hints: [
      "Start with an empty object and copy each key from keys.",
      "This is the runtime cousin of TypeScript's Pick<T, K>.",
    ],
  },
];
