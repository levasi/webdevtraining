import type { SeedChallenge } from "../challenge-types";

export const arrayChallenges: SeedChallenge[] = [
  {
    id: "seed-challenge-reverse-array",
    categorySlug: "javascript",
    title: "Reverse an Array",
    description: "Return a new array with elements in reverse order.",
    difficulty: "BEGINNER",
    starterCode: `function solve(input) {
  // return reversed array
}`,
    solutionCode: `function solve(input) {
  return [...input].reverse();
}`,
    testCases: [
      { input: [1, 2, 3], expectedOutput: [3, 2, 1] },
      { input: ["a", "b"], expectedOutput: ["b", "a"] },
      { input: [], expectedOutput: [] },
    ],
    hints: ["Copy the array before reversing to avoid mutation.", "Use reverse() or build a new array from the end."],
  },
  {
    id: "seed-challenge-remove-duplicates",
    categorySlug: "javascript",
    title: "Remove Duplicates",
    description: "Return a new array with duplicate values removed, preserving first occurrence order.",
    difficulty: "BEGINNER",
    starterCode: `function solve(input) {
  // return unique array
}`,
    solutionCode: `function solve(input) {
  return [...new Set(input)];
}`,
    testCases: [
      { input: [1, 2, 2, 3, 1], expectedOutput: [1, 2, 3] },
      { input: ["a", "b", "a"], expectedOutput: ["a", "b"] },
      { input: [7], expectedOutput: [7] },
    ],
    hints: ["Set only stores unique values.", "Spread the Set back into an array."],
  },
  {
    id: "seed-challenge-largest-number",
    categorySlug: "javascript",
    title: "Largest Number",
    description: "Return the largest number in an array.",
    difficulty: "BEGINNER",
    starterCode: `function solve(input) {
  // return largest number
}`,
    solutionCode: `function solve(input) {
  return Math.max(...input);
}`,
    testCases: [
      { input: [1, 5, 3], expectedOutput: 5 },
      { input: [-1, -5, -2], expectedOutput: -1 },
      { input: [42], expectedOutput: 42 },
    ],
    hints: ["Use Math.max with spread.", "Or loop and track the maximum."],
  },
  {
    id: "seed-challenge-smallest-number",
    categorySlug: "javascript",
    title: "Smallest Number",
    description: "Return the smallest number in an array.",
    difficulty: "BEGINNER",
    starterCode: `function solve(input) {
  // return smallest number
}`,
    solutionCode: `function solve(input) {
  return Math.min(...input);
}`,
    testCases: [
      { input: [1, 5, 3], expectedOutput: 1 },
      { input: [-1, -5, -2], expectedOutput: -5 },
      { input: [42], expectedOutput: 42 },
    ],
    hints: ["Use Math.min with spread.", "Or loop and track the minimum."],
  },
  {
    id: "seed-challenge-second-largest",
    categorySlug: "javascript",
    title: "Second Largest Number",
    description: "Return the second largest number in an array of distinct integers.",
    difficulty: "INTERMEDIATE",
    starterCode: `function solve(input) {
  // return number
}`,
    solutionCode: `function solve(input) {
  const sorted = [...input].sort((a, b) => b - a);
  return sorted[1];
}`,
    testCases: [
      { input: [10, 3, 7, 1], expectedOutput: 7 },
      { input: [5, 2], expectedOutput: 2 },
      { input: [100, 50, 75], expectedOutput: 75 },
    ],
    hints: ["Sort descending and pick index 1.", "You can also track two largest values in one pass."],
  },
  {
    id: "seed-challenge-missing-number",
    categorySlug: "javascript",
    title: "Missing Number",
    description: "Given an array containing n distinct numbers from 0 to n, return the missing number.",
    difficulty: "INTERMEDIATE",
    starterCode: `function solve(input) {
  // return missing number
}`,
    solutionCode: `function solve(input) {
  const n = input.length;
  const expected = (n * (n + 1)) / 2;
  const actual = input.reduce((sum, v) => sum + v, 0);
  return expected - actual;
}`,
    testCases: [
      { input: [3, 0, 1], expectedOutput: 2 },
      { input: [0, 1], expectedOutput: 2 },
      { input: [9, 6, 4, 2, 3, 5, 7, 0, 1], expectedOutput: 8 },
    ],
    hints: ["Sum of 0..n is n*(n+1)/2.", "Subtract the array sum from the expected sum."],
  },
  {
    id: "seed-challenge-find-duplicates",
    categorySlug: "javascript",
    title: "Find Duplicate Numbers",
    description: "Return an array of numbers that appear more than once.",
    difficulty: "INTERMEDIATE",
    starterCode: `function solve(input) {
  // return duplicate numbers
}`,
    solutionCode: `function solve(input) {
  const seen = new Set();
  const dupes = new Set();
  for (const n of input) {
    if (seen.has(n)) dupes.add(n);
    else seen.add(n);
  }
  return [...dupes];
}`,
    testCases: [
      { input: [1, 2, 3, 2, 4, 1], expectedOutput: [2, 1] },
      { input: [1, 2, 3], expectedOutput: [] },
      { input: [5, 5, 5], expectedOutput: [5] },
    ],
    hints: ["Track seen values in a Set.", "Add to duplicates when seen again."],
  },
  {
    id: "seed-challenge-merge-arrays",
    categorySlug: "javascript",
    title: "Merge Two Arrays",
    description: "Merge two arrays into one. Input is [arr1, arr2].",
    difficulty: "BEGINNER",
    starterCode: `function solve(input) {
  const [a, b] = input;
  // return merged array
}`,
    solutionCode: `function solve(input) {
  return [...input[0], ...input[1]];
}`,
    testCases: [
      { input: [[1, 2], [3, 4]], expectedOutput: [1, 2, 3, 4] },
      { input: [[], [1]], expectedOutput: [1] },
      { input: [["a"], ["b", "c"]], expectedOutput: ["a", "b", "c"] },
    ],
    hints: ["Spread both arrays into a new array.", "concat also works."],
  },
  {
    id: "seed-challenge-sort-without-sort",
    categorySlug: "javascript",
    title: "Sort Without sort()",
    description: "Sort an array of numbers ascending without using Array.prototype.sort.",
    difficulty: "INTERMEDIATE",
    starterCode: `function solve(input) {
  // return sorted array
}`,
    solutionCode: `function solve(input) {
  const arr = [...input];
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        const tmp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = tmp;
      }
    }
  }
  return arr;
}`,
    testCases: [
      { input: [3, 1, 4, 2], expectedOutput: [1, 2, 3, 4] },
      { input: [5], expectedOutput: [5] },
      { input: [-1, 0, -3], expectedOutput: [-3, -1, 0] },
    ],
    hints: ["Bubble sort is a simple approach.", "Compare adjacent elements and swap."],
  },
  {
    id: "seed-challenge-move-zeros",
    categorySlug: "javascript",
    title: "Move Zeros to End",
    description: "Move all zeros to the end while maintaining relative order of non-zero elements.",
    difficulty: "INTERMEDIATE",
    starterCode: `function solve(input) {
  // return reordered array
}`,
    solutionCode: `function solve(input) {
  const nonZero = input.filter((n) => n !== 0);
  const zeros = input.filter((n) => n === 0);
  return [...nonZero, ...zeros];
}`,
    testCases: [
      { input: [0, 1, 0, 3, 12], expectedOutput: [1, 3, 12, 0, 0] },
      { input: [0, 0, 1], expectedOutput: [1, 0, 0] },
      { input: [1, 2, 3], expectedOutput: [1, 2, 3] },
    ],
    hints: ["Filter non-zeros and zeros separately.", "Concatenate non-zeros first."],
  },
  {
    id: "seed-challenge-flatten-array",
    categorySlug: "javascript",
    title: "Flatten Array",
    description: "Flatten a nested array one level deep.",
    difficulty: "BEGINNER",
    starterCode: `function solve(input) {
  // return flattened array
}`,
    solutionCode: `function solve(input) {
  return input.flat();
}`,
    testCases: [
      { input: [[1, 2], [3, 4]], expectedOutput: [1, 2, 3, 4] },
      { input: [[], [1]], expectedOutput: [1] },
      { input: [["a"], ["b", "c"]], expectedOutput: ["a", "b", "c"] },
    ],
    hints: ["Array.prototype.flat() flattens one level.", "concat with spread also works."],
  },
  {
    id: "seed-challenge-deep-flatten",
    categorySlug: "javascript",
    title: "Deep Flatten Array",
    description: "Flatten a nested array to any depth.",
    difficulty: "INTERMEDIATE",
    starterCode: `function solve(input) {
  // return deeply flattened array
}`,
    solutionCode: `function solve(input) {
  const result = [];
  const stack = [...input];
  while (stack.length) {
    const item = stack.pop();
    if (Array.isArray(item)) stack.push(...item);
    else result.unshift(item);
  }
  return result;
}`,
    testCases: [
      { input: [1, [2, [3, 4]]], expectedOutput: [1, 2, 3, 4] },
      { input: [[1], [[2], 3]], expectedOutput: [1, 2, 3] },
      { input: [1, 2, 3], expectedOutput: [1, 2, 3] },
    ],
    hints: ["Recursively flatten nested arrays.", "Or use a stack to iterate."],
  },
  {
    id: "seed-challenge-chunk-array",
    categorySlug: "javascript",
    title: "Chunk Array",
    description: "Split an array into sub-arrays of length n. Input is [array, n].",
    difficulty: "INTERMEDIATE",
    starterCode: `function solve(input) {
  const [items, size] = input;
  // return chunked array
}`,
    solutionCode: `function solve(input) {
  const [items, size] = input;
  const chunks = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
}`,
    testCases: [
      { input: [[1, 2, 3, 4, 5], 2], expectedOutput: [[1, 2], [3, 4], [5]] },
      { input: [["a", "b", "c"], 3], expectedOutput: [["a", "b", "c"]] },
      { input: [[10], 2], expectedOutput: [[10]] },
    ],
    hints: ["Loop stepping by n and slice each segment.", "Input is [array, chunkSize]."],
  },
  {
    id: "seed-challenge-rotate-array",
    categorySlug: "javascript",
    title: "Rotate Array",
    description: "Rotate array right by k positions. Input is [array, k].",
    difficulty: "INTERMEDIATE",
    starterCode: `function solve(input) {
  const [arr, k] = input;
  // return rotated array
}`,
    solutionCode: `function solve(input) {
  const [arr, k] = input;
  if (arr.length === 0) return [];
  const steps = k % arr.length;
  return [...arr.slice(-steps), ...arr.slice(0, -steps)];
}`,
    testCases: [
      { input: [[1, 2, 3, 4, 5], 2], expectedOutput: [4, 5, 1, 2, 3] },
      { input: [[1, 2], 3], expectedOutput: [2, 1] },
      { input: [[1], 5], expectedOutput: [1] },
    ],
    hints: ["Use modulo to handle k > length.", "Slice from the end and prepend."],
  },
  {
    id: "seed-challenge-array-intersection",
    categorySlug: "javascript",
    title: "Array Intersection",
    description: "Return elements present in both arrays. Input is [a, b].",
    difficulty: "BEGINNER",
    starterCode: `function solve(input) {
  const [a, b] = input;
  // return intersection
}`,
    solutionCode: `function solve(input) {
  const [a, b] = input;
  const setB = new Set(b);
  return a.filter((v) => setB.has(v));
}`,
    testCases: [
      { input: [[1, 2, 3], [2, 3, 4]], expectedOutput: [2, 3] },
      { input: [[1, 2], [3, 4]], expectedOutput: [] },
      { input: [["a", "b"], ["b", "c"]], expectedOutput: ["b"] },
    ],
    hints: ["Put the second array in a Set.", "Filter the first array by Set membership."],
  },
  {
    id: "seed-challenge-array-union",
    categorySlug: "javascript",
    title: "Array Union",
    description: "Return unique elements from both arrays. Input is [a, b].",
    difficulty: "BEGINNER",
    starterCode: `function solve(input) {
  const [a, b] = input;
  // return union
}`,
    solutionCode: `function solve(input) {
  return [...new Set([...input[0], ...input[1]])];
}`,
    testCases: [
      { input: [[1, 2], [2, 3]], expectedOutput: [1, 2, 3] },
      { input: [[1], [1]], expectedOutput: [1] },
      { input: [[], [1, 2]], expectedOutput: [1, 2] },
    ],
    hints: ["Merge both arrays.", "Use Set to deduplicate."],
  },
  {
    id: "seed-challenge-array-difference",
    categorySlug: "javascript",
    title: "Array Difference",
    description: "Return elements in a not in b. Input is [a, b].",
    difficulty: "BEGINNER",
    starterCode: `function solve(input) {
  const [a, b] = input;
  // return difference
}`,
    solutionCode: `function solve(input) {
  const [a, b] = input;
  const setB = new Set(b);
  return a.filter((v) => !setB.has(v));
}`,
    testCases: [
      { input: [[1, 2, 3], [2, 3]], expectedOutput: [1] },
      { input: [[1, 2], [1, 2]], expectedOutput: [] },
      { input: [[1, 2, 3], []], expectedOutput: [1, 2, 3] },
    ],
    hints: ["Put b in a Set.", "Filter a keeping only values not in b."],
  },
  {
    id: "seed-challenge-group-by-property",
    categorySlug: "javascript",
    title: "Group by Property",
    description: "Group array of objects by a property key. Input is { items, key }.",
    difficulty: "INTERMEDIATE",
    starterCode: `function solve(input) {
  const { items, key } = input;
  // return grouped object
}`,
    solutionCode: `function solve(input) {
  const { items, key } = input;
  return items.reduce((acc, item) => {
    const group = item[key];
    if (!acc[group]) acc[group] = [];
    acc[group].push(item);
    return acc;
  }, {});
}`,
    testCases: [
      {
        input: { items: [{ type: "a", v: 1 }, { type: "b", v: 2 }, { type: "a", v: 3 }], key: "type" },
        expectedOutput: { a: [{ type: "a", v: 1 }, { type: "a", v: 3 }], b: [{ type: "b", v: 2 }] },
      },
      { input: { items: [{ x: 1 }], key: "x" }, expectedOutput: { 1: [{ x: 1 }] } },
      { input: { items: [], key: "id" }, expectedOutput: {} },
    ],
    hints: ["Use reduce to build an object.", "Key by item[key] and push into arrays."],
  },
  {
    id: "seed-challenge-count-occurrences",
    categorySlug: "javascript",
    title: "Count Occurrences",
    description: "Return an object counting occurrences of each value in an array.",
    difficulty: "BEGINNER",
    starterCode: `function solve(input) {
  // return counts object
}`,
    solutionCode: `function solve(input) {
  return input.reduce((acc, v) => {
    acc[v] = (acc[v] || 0) + 1;
    return acc;
  }, {});
}`,
    testCases: [
      { input: ["a", "b", "a"], expectedOutput: { a: 2, b: 1 } },
      { input: [1, 1, 1], expectedOutput: { 1: 3 } },
      { input: [], expectedOutput: {} },
    ],
    hints: ["Loop or reduce over the array.", "Increment counts in an object."],
  },
  {
    id: "seed-challenge-two-sum",
    categorySlug: "javascript",
    title: "Two Sum",
    description: [
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
      "Each input has exactly one solution. You may not use the same element twice.",
      "You can return the indices in any order.",
      "Input is { nums, target }.",
      "Follow-up: aim for better than O(n²) time.",
    ].join(" "),
    difficulty: "BEGINNER",
    starterCode: `function solve(input) {
  const { nums, target } = input;
  // return [i, j] such that nums[i] + nums[j] === target
}`,
    solutionCode: `function solve(input) {
  const { nums, target } = input;
  const seen = new Map();
  for (let i = 0; i < nums.length; i += 1) {
    const complement = target - nums[i];
    if (seen.has(complement)) {
      return [seen.get(complement), i];
    }
    seen.set(nums[i], i);
  }
  return [];
}`,
    testCases: [
      {
        input: { nums: [2, 7, 11, 15], target: 9 },
        expectedOutput: [0, 1],
        description: "nums[0] + nums[1] === 9",
      },
      {
        input: { nums: [3, 2, 4], target: 6 },
        expectedOutput: [1, 2],
      },
      {
        input: { nums: [3, 3], target: 6 },
        expectedOutput: [0, 1],
      },
      {
        input: { nums: [-1, -2, -3, -4, -5], target: -8 },
        expectedOutput: [2, 4],
      },
    ],
    hints: [
      "A nested loop works but is O(n²).",
      "Use a Map from value → index while scanning once.",
      "For each number, check whether target - number was already seen.",
    ],
  },
  {
    id: "seed-challenge-product-except-self",
    categorySlug: "javascript",
    title: "Product of Array Except Self",
    description: [
      "Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].",
      "",
      "The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.",
      "You must write an algorithm that runs in O(n) time and without using the division operation.",
      "",
      "Example: [1,2,3,4] → [24,12,8,6]. [-1,1,0,-3,3] → [0,0,9,0,0].",
      "",
      "Input is the array nums. Return the answer array.",
      "Follow-up: can you do it in O(1) extra space (not counting the output array)?",
    ].join("\n"),
    difficulty: "INTERMEDIATE",
    starterCode: `/**
 * @param {number[]} nums
 * @return {number[]}
 */
function productExceptSelf(nums) {
  // return product of all elements except self at each index (no division)
}

function solve(input) {
  return productExceptSelf(input);
}`,
    solutionCode: `/**
 * @param {number[]} nums
 * @return {number[]}
 */
function productExceptSelf(nums) {
  const n = nums.length;
  const answer = new Array(n).fill(1);

  let prefix = 1;
  for (let i = 0; i < n; i += 1) {
    answer[i] = prefix;
    prefix *= nums[i];
  }

  let suffix = 1;
  for (let i = n - 1; i >= 0; i -= 1) {
    answer[i] *= suffix;
    suffix *= nums[i];
  }

  return answer;
}

function solve(input) {
  return productExceptSelf(input);
}`,
    testCases: [
      {
        input: [1, 2, 3, 4],
        expectedOutput: [24, 12, 8, 6],
        description: "Classic prefix/suffix products",
      },
      {
        input: [-1, 1, 0, -3, 3],
        expectedOutput: [0, 0, 9, 0, 0],
        description: "Zero in the array",
      },
      {
        input: [2, 3],
        expectedOutput: [3, 2],
        description: "Minimum length",
      },
      {
        input: [0, 0],
        expectedOutput: [0, 0],
        description: "Two zeros",
      },
      {
        input: [5, 1, 1, 1],
        expectedOutput: [1, 5, 5, 5],
      },
      {
        input: [-1, -1, -1, -1],
        expectedOutput: [-1, -1, -1, -1],
      },
    ],
    hints: [
      "answer[i] = (product of everything left of i) × (product of everything right of i).",
      "First pass: fill answer with prefix products.",
      "Second pass from the right: multiply in suffix products — no division needed.",
    ],
  },
  {
    id: "seed-challenge-contains-duplicate",
    categorySlug: "javascript",
    title: "Contains Duplicate",
    description: [
      "Given an integer array nums, return true if any value appears at least twice in the array,",
      "and return false if every element is distinct.",
      "",
      "Example: [1,2,3,1] → true. [1,2,3,4] → false. [1,1,1,3,3,4,3,2,4,2] → true.",
      "",
      "Input is the array nums. Return a boolean.",
    ].join("\n"),
    difficulty: "BEGINNER",
    starterCode: `/**
 * @param {number[]} nums
 * @return {boolean}
 */
function containsDuplicate(nums) {
  // return true if any value appears at least twice
}

function solve(input) {
  return containsDuplicate(input);
}`,
    solutionCode: `/**
 * @param {number[]} nums
 * @return {boolean}
 */
function containsDuplicate(nums) {
  const seen = new Set();
  for (const num of nums) {
    if (seen.has(num)) return true;
    seen.add(num);
  }
  return false;
}

function solve(input) {
  return containsDuplicate(input);
}`,
    testCases: [
      {
        input: [1, 2, 3, 1],
        expectedOutput: true,
        description: "1 appears at indices 0 and 3",
      },
      {
        input: [1, 2, 3, 4],
        expectedOutput: false,
        description: "All distinct",
      },
      {
        input: [1, 1, 1, 3, 3, 4, 3, 2, 4, 2],
        expectedOutput: true,
      },
      {
        input: [1],
        expectedOutput: false,
        description: "Single element",
      },
      {
        input: [0, 0],
        expectedOutput: true,
      },
      {
        input: [-1, -2, -3, -1],
        expectedOutput: true,
      },
    ],
    hints: [
      "Track values you have already seen.",
      "A Set gives O(1) average lookups.",
      "If you try to add a value that is already in the Set, you found a duplicate.",
    ],
  },
  {
    id: "seed-challenge-top-k-frequent",
    categorySlug: "javascript",
    title: "Top K Frequent Elements",
    description: [
      "Given an integer array nums and an integer k, return the k most frequent elements.",
      "You may return the answer in any order.",
      "",
      "Example: nums = [1,1,1,2,2,3], k = 2 → [1,2].",
      "",
      "Input is { nums, k }. Return an array of k integers.",
      "Tests sort the result for comparison, so any order passes.",
      "Follow-up: aim for better than O(n log n) time.",
    ].join("\n"),
    difficulty: "INTERMEDIATE",
    starterCode: `/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
function topKFrequent(nums, k) {
  // return the k most frequent elements
}

function solve(input) {
  const { nums, k } = input;
  return topKFrequent(nums, k).slice().sort((a, b) => a - b);
}`,
    solutionCode: `/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
function topKFrequent(nums, k) {
  const freq = new Map();
  for (const num of nums) {
    freq.set(num, (freq.get(num) || 0) + 1);
  }

  const buckets = Array.from({ length: nums.length + 1 }, () => []);
  for (const [num, count] of freq) {
    buckets[count].push(num);
  }

  const result = [];
  for (let i = buckets.length - 1; i >= 0 && result.length < k; i -= 1) {
    for (const num of buckets[i]) {
      result.push(num);
      if (result.length === k) return result;
    }
  }
  return result;
}

function solve(input) {
  const { nums, k } = input;
  return topKFrequent(nums, k).slice().sort((a, b) => a - b);
}`,
    testCases: [
      {
        input: { nums: [1, 1, 1, 2, 2, 3], k: 2 },
        expectedOutput: [1, 2],
        description: "1 appears 3 times, 2 appears 2 times",
      },
      {
        input: { nums: [1], k: 1 },
        expectedOutput: [1],
      },
      {
        input: { nums: [1, 2, 1, 2, 1, 2, 3, 1, 3, 2], k: 2 },
        expectedOutput: [1, 2],
      },
      {
        input: { nums: [4, 1, -1, 2, -1, 2, 3], k: 2 },
        expectedOutput: [-1, 2],
      },
      {
        input: { nums: [5, 5, 5, 5], k: 1 },
        expectedOutput: [5],
      },
    ],
    hints: [
      "Count frequencies with a Map.",
      "Bucket sort by frequency (index = count) to avoid a full n log n sort.",
      "Collect from the highest-frequency buckets until you have k values.",
    ],
  },
];
