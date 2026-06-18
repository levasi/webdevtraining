import type { SeedChallenge } from "../challenge-types";
import { ARRAY_OPS } from "./harnesses";

const opsHarness = `${ARRAY_OPS}

function getOp(name) {
  return ARRAY_OPS[name];
}`;

function arrayMethodChallenge(
  id: string,
  title: string,
  description: string,
  difficulty: "BEGINNER" | "INTERMEDIATE" | "ADVANCED",
  implName: string,
  starterBody: string,
  solutionBody: string,
  testCases: SeedChallenge["testCases"],
  hints: string[],
): SeedChallenge {
  return {
    id,
    categorySlug: "javascript",
    title,
    description,
    difficulty,
    starterCode: `${opsHarness}

${starterBody}

function solve(input) {
  const { arr, op, initial, start, deleteCount, items, depth } = input;
  const fn = op ? getOp(op) : undefined;
  return ${implName}(arr, fn, initial, start, deleteCount, items, depth);
}`,
    solutionCode: `${opsHarness}

${solutionBody}

function solve(input) {
  const { arr, op, initial, start, deleteCount, items, depth } = input;
  const fn = op ? getOp(op) : undefined;
  return ${implName}(arr, fn, initial, start, deleteCount, items, depth);
}`,
    testCases,
    hints,
  };
}

export const arrayMethodChallenges: SeedChallenge[] = [
  arrayMethodChallenge(
    "seed-challenge-implement-map",
    "Implement Array.prototype.map",
    "Implement myMap(arr, callback) without using Array.prototype.map. Input is { arr, op }.",
    "INTERMEDIATE",
    "myMap",
    `function myMap(arr, callback) {
  // return mapped array
}`,
    `function myMap(arr, callback) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(callback(arr[i], i, arr));
  }
  return result;
}`,
    [
      { input: { arr: [1, 2, 3], op: "double" }, expectedOutput: [2, 4, 6] },
      { input: { arr: [0, 1, 2], op: "increment" }, expectedOutput: [1, 2, 3] },
      { input: { arr: [1, 2, 3, 4], op: "double" }, expectedOutput: [2, 4, 6, 8] },
    ],
    ["Create a new array.", "Call callback for each element with (value, index, array)."],
  ),
  arrayMethodChallenge(
    "seed-challenge-implement-filter",
    "Implement filter",
    "Implement myFilter(arr, callback) without using Array.prototype.filter. Input is { arr, op }.",
    "INTERMEDIATE",
    "myFilter",
    `function myFilter(arr, callback) {
  // return filtered array
}`,
    `function myFilter(arr, callback) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (callback(arr[i], i, arr)) result.push(arr[i]);
  }
  return result;
}`,
    [
      { input: { arr: [1, 2, 3, 4], op: "even" }, expectedOutput: [2, 4] },
      { input: { arr: [1, 2, 3], op: "gt3" }, expectedOutput: [] },
      { input: { arr: [-1, 0, 1, 2], op: "isPositive" }, expectedOutput: [1, 2] },
    ],
    ["Push elements where callback returns true.", "Do not use the built-in filter."],
  ),
  arrayMethodChallenge(
    "seed-challenge-implement-reduce",
    "Implement reduce",
    "Implement myReduce(arr, callback, initial). Input is { arr, op, initial }.",
    "INTERMEDIATE",
    "myReduce",
    `function myReduce(arr, callback, initial) {
  // return accumulated value
}`,
    `function myReduce(arr, callback, initial) {
  let acc = initial;
  for (let i = 0; i < arr.length; i++) {
    acc = callback(acc, arr[i], i, arr);
  }
  return acc;
}`,
    [
      { input: { arr: [1, 2, 3], op: "sum", initial: 0 }, expectedOutput: 6 },
      { input: { arr: [1, 2, 3], op: "sum", initial: 10 }, expectedOutput: 16 },
      { input: { arr: [], op: "sum", initial: 5 }, expectedOutput: 5 },
    ],
    ["Start with the initial accumulator.", "Update acc on each iteration."],
  ),
  arrayMethodChallenge(
    "seed-challenge-implement-for-each",
    "Implement forEach",
    "Implement myForEach(arr, callback). Return collected callback results. Input is { arr, op }.",
    "BEGINNER",
    "myForEach",
    `function myForEach(arr, callback) {
  // invoke callback for each element
}`,
    `function myForEach(arr, callback) {
  const collected = [];
  for (let i = 0; i < arr.length; i++) {
    collected.push(callback(arr[i], i, arr));
  }
  return collected;
}`,
    [
      { input: { arr: [1, 2, 3], op: "double" }, expectedOutput: [2, 4, 6] },
      { input: { arr: [0, 1], op: "increment" }, expectedOutput: [1, 2] },
      { input: { arr: [5], op: "double" }, expectedOutput: [10] },
    ],
    ["Loop over every index.", "Call the callback for each element."],
  ),
  arrayMethodChallenge(
    "seed-challenge-implement-find",
    "Implement find",
    "Implement myFind(arr, callback). Input is { arr, op }.",
    "BEGINNER",
    "myFind",
    `function myFind(arr, callback) {
  // return first match or undefined
}`,
    `function myFind(arr, callback) {
  for (let i = 0; i < arr.length; i++) {
    if (callback(arr[i], i, arr)) return arr[i];
  }
  return null;
}`,
    [
      { input: { arr: [1, 2, 3, 4], op: "gt3" }, expectedOutput: 4 },
      { input: { arr: [1, 2, 3], op: "eq2" }, expectedOutput: 2 },
      { input: { arr: [1, 3, 5], op: "even" }, expectedOutput: null },
    ],
    ["Return the first element where callback is true.", "Return null if none match."],
  ),
  arrayMethodChallenge(
    "seed-challenge-implement-some",
    "Implement some",
    "Implement mySome(arr, callback). Input is { arr, op }.",
    "BEGINNER",
    "mySome",
    `function mySome(arr, callback) {
  // return boolean
}`,
    `function mySome(arr, callback) {
  for (let i = 0; i < arr.length; i++) {
    if (callback(arr[i], i, arr)) return true;
  }
  return false;
}`,
    [
      { input: { arr: [1, 2, 3], op: "gt3" }, expectedOutput: false },
      { input: { arr: [1, 2, 3, 4], op: "even" }, expectedOutput: true },
      { input: { arr: [1, 3, 5], op: "even" }, expectedOutput: false },
    ],
    ["Return true if any element passes.", "Short-circuit on first match."],
  ),
  arrayMethodChallenge(
    "seed-challenge-implement-every",
    "Implement every",
    "Implement myEvery(arr, callback). Input is { arr, op }.",
    "BEGINNER",
    "myEvery",
    `function myEvery(arr, callback) {
  // return boolean
}`,
    `function myEvery(arr, callback) {
  for (let i = 0; i < arr.length; i++) {
    if (!callback(arr[i], i, arr)) return false;
  }
  return true;
}`,
    [
      { input: { arr: [2, 4, 6], op: "even" }, expectedOutput: true },
      { input: { arr: [2, 3, 4], op: "even" }, expectedOutput: false },
      { input: { arr: [], op: "even" }, expectedOutput: true },
    ],
    ["Return false if any element fails.", "Empty arrays return true."],
  ),
  arrayMethodChallenge(
    "seed-challenge-implement-includes",
    "Implement includes",
    "Implement myIncludes(arr, value). Input is { arr, value }.",
    "BEGINNER",
    "myIncludes",
    `function myIncludes(arr, callback, initial, start, deleteCount, items, depth) {
  const value = initial;
  // return boolean
}`,
    `function myIncludes(arr, callback, initial) {
  const value = initial;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === value) return true;
  }
  return false;
}`,
    [
      { input: { arr: [1, 2, 3], value: 2, initial: 2 }, expectedOutput: true },
      { input: { arr: [1, 2, 3], value: 5, initial: 5 }, expectedOutput: false },
      { input: { arr: ["a", "b"], value: "a", initial: "a" }, expectedOutput: true },
    ],
    ["Compare with strict equality.", "Loop until a match is found."],
  ),
  arrayMethodChallenge(
    "seed-challenge-implement-slice",
    "Implement slice",
    "Implement mySlice(arr, start, end). Input is { arr, start, end }.",
    "BEGINNER",
    "mySlice",
    `function mySlice(arr, callback, initial, start, deleteCount, items, depth) {
  const end = deleteCount;
  // return sliced array
}`,
    `function mySlice(arr, callback, initial, start, deleteCount) {
  const end = deleteCount;
  const len = arr.length;
  let s = start < 0 ? Math.max(len + start, 0) : Math.min(start, len);
  let e = end === undefined ? len : end < 0 ? Math.max(len + end, 0) : Math.min(end, len);
  if (s > e) return [];
  const result = [];
  for (let i = s; i < e; i++) result.push(arr[i]);
  return result;
}`,
    [
      { input: { arr: [1, 2, 3, 4], start: 1, end: 3, deleteCount: 3 }, expectedOutput: [2, 3] },
      { input: { arr: [1, 2, 3], start: 0, end: 2, deleteCount: 2 }, expectedOutput: [1, 2] },
      { input: { arr: [1, 2, 3], start: -2, end: undefined, deleteCount: undefined }, expectedOutput: [2, 3] },
    ],
    ["Handle negative start indices.", "end is exclusive."],
  ),
  arrayMethodChallenge(
    "seed-challenge-implement-splice",
    "Implement splice basic version",
    "Implement mySplice(arr, start, deleteCount, ...items). Input is { arr, start, deleteCount, items }.",
    "INTERMEDIATE",
    "mySplice",
    `function mySplice(arr, callback, initial, start, deleteCount, items) {
  // return removed elements
}`,
    `function mySplice(arr, callback, initial, start, deleteCount, items) {
  const copy = [...arr];
  const removed = copy.splice(start, deleteCount, ...(items || []));
  return { result: copy, removed };
}`,
    [
      { input: { arr: [1, 2, 3, 4], start: 1, deleteCount: 2, items: [9] }, expectedOutput: { result: [1, 9, 4], removed: [2, 3] } },
      { input: { arr: [1, 2, 3], start: 0, deleteCount: 1, items: [] }, expectedOutput: { result: [2, 3], removed: [1] } },
      { input: { arr: [1], start: 0, deleteCount: 0, items: [2, 3] }, expectedOutput: { result: [2, 3, 1], removed: [] } },
    ],
    ["Remove deleteCount items from start.", "Insert new items at start."],
  ),
  arrayMethodChallenge(
    "seed-challenge-implement-flat",
    "Implement flat",
    "Implement myFlat(arr, depth). Input is { arr, depth }.",
    "INTERMEDIATE",
    "myFlat",
    `function myFlat(arr, callback, initial, start, deleteCount, items, depth) {
  // return flattened array
}`,
    `function myFlat(arr, callback, initial, start, deleteCount, items, depth) {
  const d = depth ?? 1;
  const flatten = (a, current) => {
    const result = [];
    for (const item of a) {
      if (Array.isArray(item) && current > 0) {
        result.push(...flatten(item, current - 1));
      } else {
        result.push(item);
      }
    }
    return result;
  };
  return flatten(arr, d);
}`,
    [
      { input: { arr: [1, [2, 3]], depth: 1 }, expectedOutput: [1, 2, 3] },
      { input: { arr: [1, [2, [3]]], depth: 2 }, expectedOutput: [1, 2, 3] },
      { input: { arr: [1, 2, 3], depth: 1 }, expectedOutput: [1, 2, 3] },
    ],
    ["Default depth is 1.", "Recursively flatten while depth > 0."],
  ),
];
