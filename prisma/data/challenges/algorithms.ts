import type { SeedChallenge } from "../challenge-types";

export const algorithmChallenges: SeedChallenge[] = [
  {
    id: "seed-challenge-binary-search",
    categorySlug: "javascript",
    title: "Binary Search",
    description: "Return index of target in sorted array, or -1. Input is { arr, target }.",
    difficulty: "INTERMEDIATE",
    starterCode: `function solve(input) {
  const { arr, target } = input;
  // return index
}`,
    solutionCode: `function solve(input) {
  const { arr, target } = input;
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`,
    testCases: [
      { input: { arr: [1, 2, 3, 4, 5], target: 3 }, expectedOutput: 2 },
      { input: { arr: [1, 2, 3], target: 5 }, expectedOutput: -1 },
      { input: { arr: [10], target: 10 }, expectedOutput: 0 },
    ],
    hints: ["Maintain left and right pointers.", "Compare middle element to target."],
  },
  {
    id: "seed-challenge-linear-search",
    categorySlug: "javascript",
    title: "Linear Search",
    description: "Return index of target in array, or -1. Input is { arr, target }.",
    difficulty: "BEGINNER",
    starterCode: `function solve(input) {
  const { arr, target } = input;
  // return index
}`,
    solutionCode: `function solve(input) {
  const { arr, target } = input;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}`,
    testCases: [
      { input: { arr: [4, 2, 7, 1], target: 7 }, expectedOutput: 2 },
      { input: { arr: [1, 2, 3], target: 9 }, expectedOutput: -1 },
      { input: { arr: ["a", "b"], target: "a" }, expectedOutput: 0 },
    ],
    hints: ["Loop from index 0.", "Return -1 if not found."],
  },
  {
    id: "seed-challenge-bubble-sort",
    categorySlug: "javascript",
    title: "Bubble Sort",
    description: "Sort array ascending using bubble sort.",
    difficulty: "BEGINNER",
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
      { input: [3, 1, 2], expectedOutput: [1, 2, 3] },
      { input: [1], expectedOutput: [1] },
      { input: [5, 4, 3, 2, 1], expectedOutput: [1, 2, 3, 4, 5] },
    ],
    hints: ["Compare adjacent pairs.", "Swap when out of order."],
  },
  {
    id: "seed-challenge-selection-sort",
    categorySlug: "javascript",
    title: "Selection Sort",
    description: "Sort array ascending using selection sort.",
    difficulty: "INTERMEDIATE",
    starterCode: `function solve(input) {
  // return sorted array
}`,
    solutionCode: `function solve(input) {
  const arr = [...input];
  for (let i = 0; i < arr.length; i++) {
    let minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) minIndex = j;
    }
    if (minIndex !== i) {
      const tmp = arr[i];
      arr[i] = arr[minIndex];
      arr[minIndex] = tmp;
    }
  }
  return arr;
}`,
    testCases: [
      { input: [3, 1, 2], expectedOutput: [1, 2, 3] },
      { input: [], expectedOutput: [] },
      { input: [2, 2, 1], expectedOutput: [1, 2, 2] },
    ],
    hints: ["Find minimum of unsorted portion.", "Swap it to the current index."],
  },
  {
    id: "seed-challenge-insertion-sort",
    categorySlug: "javascript",
    title: "Insertion Sort",
    description: "Sort array ascending using insertion sort.",
    difficulty: "INTERMEDIATE",
    starterCode: `function solve(input) {
  // return sorted array
}`,
    solutionCode: `function solve(input) {
  const arr = [...input];
  for (let i = 1; i < arr.length; i++) {
    const current = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > current) {
      arr[j + 1] = arr[j];
      j -= 1;
    }
    arr[j + 1] = current;
  }
  return arr;
}`,
    testCases: [
      { input: [3, 1, 2], expectedOutput: [1, 2, 3] },
      { input: [1], expectedOutput: [1] },
      { input: [5, 2, 4, 1], expectedOutput: [1, 2, 4, 5] },
    ],
    hints: ["Build sorted portion from the left.", "Shift larger elements right to insert current."],
  },
  {
    id: "seed-challenge-merge-sort",
    categorySlug: "javascript",
    title: "Merge Sort",
    description: "Sort array ascending using merge sort.",
    difficulty: "ADVANCED",
    starterCode: `function solve(input) {
  // return sorted array
}`,
    solutionCode: `function solve(input) {
  function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    const result = [];
    let i = 0;
    let j = 0;
    while (i < left.length && j < right.length) {
      if (left[i] <= right[j]) result.push(left[i++]);
      else result.push(right[j++]);
    }
    return result.concat(left.slice(i)).concat(right.slice(j));
  }
  return mergeSort(input);
}`,
    testCases: [
      { input: [3, 1, 4, 2], expectedOutput: [1, 2, 3, 4] },
      { input: [], expectedOutput: [] },
      { input: [2, 1], expectedOutput: [1, 2] },
    ],
    hints: ["Divide array in half recursively.", "Merge two sorted halves."],
  },
  {
    id: "seed-challenge-quick-sort",
    categorySlug: "javascript",
    title: "Quick Sort",
    description: "Sort array ascending using quick sort.",
    difficulty: "ADVANCED",
    starterCode: `function solve(input) {
  // return sorted array
}`,
    solutionCode: `function solve(input) {
  function quickSort(arr) {
    if (arr.length <= 1) return arr;
    const pivot = arr[0];
    const left = arr.slice(1).filter((n) => n < pivot);
    const right = arr.slice(1).filter((n) => n >= pivot);
    return [...quickSort(left), pivot, ...quickSort(right)];
  }
  return quickSort(input);
}`,
    testCases: [
      { input: [3, 1, 4, 2], expectedOutput: [1, 2, 3, 4] },
      { input: [1], expectedOutput: [1] },
      { input: [5, 2, 8, 1], expectedOutput: [1, 2, 5, 8] },
    ],
    hints: ["Choose a pivot.", "Partition into less than and greater than pivot."],
  },
  {
    id: "seed-challenge-validate-brackets",
    categorySlug: "javascript",
    title: "Valid Parentheses",
    description: [
      "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
      "",
      "An input string is valid if:",
      "1. Open brackets must be closed by the same type of brackets.",
      "2. Open brackets must be closed in the correct order.",
      "3. Every close bracket has a corresponding open bracket of the same type.",
      "",
      "Input is the string s. Return a boolean.",
    ].join("\n"),
    difficulty: "BEGINNER",
    starterCode: `/**
 * @param {string} s
 * @return {boolean}
 */
function isValid(s) {
  // return true if brackets are valid
}

function solve(input) {
  return isValid(input);
}`,
    solutionCode: `/**
 * @param {string} s
 * @return {boolean}
 */
function isValid(s) {
  const pairs = { ")": "(", "]": "[", "}": "{" };
  const stack = [];
  for (const ch of s) {
    if (ch === "(" || ch === "[" || ch === "{") {
      stack.push(ch);
      continue;
    }
    if (stack.pop() !== pairs[ch]) return false;
  }
  return stack.length === 0;
}

function solve(input) {
  return isValid(input);
}`,
    testCases: [
      {
        input: "()",
        expectedOutput: true,
        description: "Simple matching pair",
      },
      {
        input: "()[]{}",
        expectedOutput: true,
        description: "Multiple sequential pairs",
      },
      {
        input: "(]",
        expectedOutput: false,
        description: "Mismatched types",
      },
      {
        input: "([])",
        expectedOutput: true,
        description: "Correctly nested",
      },
      {
        input: "([)]",
        expectedOutput: false,
        description: "Wrong closing order",
      },
      {
        input: "{[]}",
        expectedOutput: true,
      },
      {
        input: "(",
        expectedOutput: false,
        description: "Unclosed opening bracket",
      },
    ],
    hints: [
      "Use a stack: push opening brackets, pop when you see a closer.",
      "A closer is valid only if it matches the most recent unclosed opener.",
      "At the end the stack must be empty.",
    ],
  },
  {
    id: "seed-challenge-longest-substring",
    categorySlug: "javascript",
    title: "Longest Substring Without Repeating Characters",
    description: [
      "Given a string s, find the length of the longest substring without duplicate characters.",
      "",
      'Example: s = "abcabcbb" → 3 (substring "abc").',
      's = "bbbbb" → 1. s = "pwwkew" → 3 (substring "wke"; "pwke" is a subsequence, not a substring).',
      "",
      "Input is the string s. Return an integer length.",
    ].join("\n"),
    difficulty: "INTERMEDIATE",
    starterCode: `/**
 * @param {string} s
 * @return {number}
 */
function lengthOfLongestSubstring(s) {
  // return length of longest substring without duplicate characters
}

function solve(input) {
  return lengthOfLongestSubstring(input);
}`,
    solutionCode: `/**
 * @param {string} s
 * @return {number}
 */
function lengthOfLongestSubstring(s) {
  const seen = new Map();
  let start = 0;
  let max = 0;
  for (let end = 0; end < s.length; end++) {
    const ch = s[end];
    if (seen.has(ch) && seen.get(ch) >= start) {
      start = seen.get(ch) + 1;
    }
    seen.set(ch, end);
    max = Math.max(max, end - start + 1);
  }
  return max;
}

function solve(input) {
  return lengthOfLongestSubstring(input);
}`,
    testCases: [
      {
        input: "abcabcbb",
        expectedOutput: 3,
        description: 'Longest is "abc"',
      },
      {
        input: "bbbbb",
        expectedOutput: 1,
        description: 'Longest is "b"',
      },
      {
        input: "pwwkew",
        expectedOutput: 3,
        description: 'Longest is "wke" (substring, not subsequence)',
      },
      {
        input: "",
        expectedOutput: 0,
        description: "Empty string",
      },
      {
        input: " ",
        expectedOutput: 1,
        description: "Single space",
      },
      {
        input: "au",
        expectedOutput: 2,
      },
      {
        input: "dvdf",
        expectedOutput: 3,
        description: 'Longest is "vdf"',
      },
    ],
    hints: [
      "Use a sliding window with left and right pointers.",
      "Track the last index of each character in the current window.",
      "When you see a duplicate inside the window, move the left pointer past it.",
    ],
  },
  {
    id: "seed-challenge-virtual-dom-diff",
    categorySlug: "javascript",
    title: "Simple Virtual DOM Diff",
    description:
      "Diff two vdom trees and return patches. Nodes are { tag, text?, children? }. Input is { oldTree, newTree }.",
    difficulty: "ADVANCED",
    starterCode: `function diff(oldNode, newNode) {
  // return array of patch objects
}

function solve(input) {
  return diff(input.oldTree, input.newTree);
}`,
    solutionCode: `function diff(oldNode, newNode) {
  const patches = [];
  if (!oldNode && newNode) {
    patches.push({ type: "CREATE", node: newNode });
    return patches;
  }
  if (oldNode && !newNode) {
    patches.push({ type: "REMOVE" });
    return patches;
  }
  if (oldNode.tag !== newNode.tag) {
    patches.push({ type: "REPLACE", node: newNode });
    return patches;
  }
  if (oldNode.text !== newNode.text) {
    patches.push({ type: "TEXT", text: newNode.text });
  }
  const oldChildren = oldNode.children || [];
  const newChildren = newNode.children || [];
  const max = Math.max(oldChildren.length, newChildren.length);
  for (let i = 0; i < max; i++) {
    patches.push(...diff(oldChildren[i], newChildren[i]).map((p) => ({ ...p, index: i })));
  }
  return patches;
}

function solve(input) {
  return diff(input.oldTree, input.newTree);
}`,
    testCases: [
      {
        input: {
          oldTree: { tag: "div", text: "hi" },
          newTree: { tag: "div", text: "bye" },
        },
        expectedOutput: [{ type: "TEXT", text: "bye" }],
      },
      {
        input: {
          oldTree: { tag: "div", children: [{ tag: "span", text: "a" }] },
          newTree: { tag: "div", children: [{ tag: "p", text: "a" }] },
        },
        expectedOutput: [{ type: "REPLACE", node: { tag: "p", text: "a" }, index: 0 }],
      },
      {
        input: {
          oldTree: { tag: "div" },
          newTree: { tag: "span" },
        },
        expectedOutput: [{ type: "REPLACE", node: { tag: "span" } }],
      },
    ],
    hints: ["Compare tags and text first.", "Recursively diff children."],
  },
  {
    id: "seed-challenge-smallest-divisible-digit-product",
    categorySlug: "javascript",
    title: "Smallest Divisible Digit Product",
    description: [
      "You are given two integers n and t.",
      "Return the smallest number greater than or equal to n such that the product of its digits is divisible by t.",
      "Input is { n, t }.",
      "Constraints: 1 <= n <= 100, 1 <= t <= 10.",
    ].join(" "),
    difficulty: "BEGINNER",
    starterCode: `function solve(input) {
  const { n, t } = input;
  // return smallest x >= n whose digit product is divisible by t
}`,
    solutionCode: `function digitProduct(num) {
  let product = 1;
  for (const digit of String(num)) {
    product *= Number(digit);
  }
  return product;
}

function solve(input) {
  const { n, t } = input;
  for (let x = n; ; x += 1) {
    if (digitProduct(x) % t === 0) {
      return x;
    }
  }
}`,
    testCases: [
      {
        input: { n: 10, t: 2 },
        expectedOutput: 10,
        description: "Digit product of 10 is 0, divisible by 2",
      },
      {
        input: { n: 15, t: 3 },
        expectedOutput: 16,
        description: "Digit product of 16 is 6, divisible by 3",
      },
      {
        input: { n: 1, t: 7 },
        expectedOutput: 7,
      },
      {
        input: { n: 100, t: 10 },
        expectedOutput: 100,
      },
    ],
    hints: [
      "Start at n and try each larger integer until the condition holds.",
      "Multiply digits left-to-right; any 0 digit makes the product 0.",
      "0 is divisible by every positive t.",
    ],
  },
  {
    id: "seed-challenge-add-two-numbers",
    categorySlug: "javascript",
    title: "Add Two Numbers",
    description: [
      "You are given two non-empty linked lists representing two non-negative integers.",
      "The digits are stored in reverse order, and each of their nodes contains a single digit.",
      "Add the two numbers and return the sum as a linked list.",
      "You may assume the two numbers do not contain any leading zero, except the number 0 itself.",
      "",
      "Example: l1 = (2) → (4) → (3), l2 = (5) → (6) → (4) → result (7) → (0) → (8)",
      "because 342 + 465 = 807.",
      "",
      "Tests pass { l1, l2 } as digit arrays (head first) and expect a digit array back.",
      "Implement only addTwoNumbers(l1, l2); leave the harness helpers below it unchanged.",
    ].join("\n"),
    difficulty: "INTERMEDIATE",
    starterCode: `/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *   this.val = val === undefined ? 0 : val;
 *   this.next = next === undefined ? null : next;
 * }
 */

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
function addTwoNumbers(l1, l2) {
  // Walk both lists with a carry and build the result list.
}

// --- harness (used by tests; keep as-is) ---
class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

function arrayToList(arr) {
  const dummy = new ListNode(0);
  let current = dummy;
  for (const val of arr) {
    current.next = new ListNode(val);
    current = current.next;
  }
  return dummy.next;
}

function listToArray(head) {
  const result = [];
  for (let current = head; current; current = current.next) {
    result.push(current.val);
  }
  return result;
}

function solve(input) {
  const { l1, l2 } = input;
  return listToArray(addTwoNumbers(arrayToList(l1), arrayToList(l2)));
}`,
    solutionCode: `/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *   this.val = val === undefined ? 0 : val;
 *   this.next = next === undefined ? null : next;
 * }
 */

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
function addTwoNumbers(l1, l2) {
  const dummy = new ListNode(0);
  let current = dummy;
  let carry = 0;

  while (l1 || l2 || carry) {
    const sum = (l1?.val ?? 0) + (l2?.val ?? 0) + carry;
    carry = Math.floor(sum / 10);
    current.next = new ListNode(sum % 10);
    current = current.next;
    l1 = l1?.next ?? null;
    l2 = l2?.next ?? null;
  }

  return dummy.next;
}

// --- harness (used by tests; keep as-is) ---
class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

function arrayToList(arr) {
  const dummy = new ListNode(0);
  let current = dummy;
  for (const val of arr) {
    current.next = new ListNode(val);
    current = current.next;
  }
  return dummy.next;
}

function listToArray(head) {
  const result = [];
  for (let current = head; current; current = current.next) {
    result.push(current.val);
  }
  return result;
}

function solve(input) {
  const { l1, l2 } = input;
  return listToArray(addTwoNumbers(arrayToList(l1), arrayToList(l2)));
}`,
    testCases: [
      {
        input: { l1: [2, 4, 3], l2: [5, 6, 4] },
        expectedOutput: [7, 0, 8],
        description: "342 + 465 = 807",
      },
      {
        input: { l1: [0], l2: [0] },
        expectedOutput: [0],
      },
      {
        input: { l1: [9, 9, 9, 9, 9, 9, 9], l2: [9, 9, 9, 9] },
        expectedOutput: [8, 9, 9, 9, 0, 0, 0, 1],
      },
      {
        input: { l1: [1, 8], l2: [0] },
        expectedOutput: [1, 8],
      },
    ],
    hints: [
      "Walk both lists together and track a carry.",
      "Each new digit is (sum of digits + carry) % 10.",
      "Continue while either list or the carry remains.",
    ],
  },
  {
    id: "seed-challenge-merge-two-sorted-lists",
    categorySlug: "javascript",
    title: "Merge Two Sorted Lists",
    description: [
      "You are given the heads of two sorted linked lists list1 and list2.",
      "Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.",
      "Return the head of the merged linked list.",
      "",
      "Example: list1 = [1,2,4], list2 = [1,3,4] → [1,1,2,3,4,4].",
      "",
      "Tests pass { list1, list2 } as value arrays (head first) and expect a value array back.",
      "Implement only mergeTwoLists(list1, list2); leave the harness helpers below it unchanged.",
    ].join("\n"),
    difficulty: "BEGINNER",
    starterCode: `/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *   this.val = val === undefined ? 0 : val;
 *   this.next = next === undefined ? null : next;
 * }
 */

/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
function mergeTwoLists(list1, list2) {
  // splice the two sorted lists into one sorted list
}

// --- harness (used by tests; keep as-is) ---
class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

function arrayToList(arr) {
  const dummy = new ListNode(0);
  let current = dummy;
  for (const val of arr) {
    current.next = new ListNode(val);
    current = current.next;
  }
  return dummy.next;
}

function listToArray(head) {
  const result = [];
  for (let current = head; current; current = current.next) {
    result.push(current.val);
  }
  return result;
}

function solve(input) {
  const { list1, list2 } = input;
  return listToArray(
    mergeTwoLists(arrayToList(list1), arrayToList(list2)),
  );
}`,
    solutionCode: `/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *   this.val = val === undefined ? 0 : val;
 *   this.next = next === undefined ? null : next;
 * }
 */

/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
function mergeTwoLists(list1, list2) {
  const dummy = new ListNode(0);
  let current = dummy;

  while (list1 && list2) {
    if (list1.val <= list2.val) {
      current.next = list1;
      list1 = list1.next;
    } else {
      current.next = list2;
      list2 = list2.next;
    }
    current = current.next;
  }

  current.next = list1 ?? list2;
  return dummy.next;
}

// --- harness (used by tests; keep as-is) ---
class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

function arrayToList(arr) {
  const dummy = new ListNode(0);
  let current = dummy;
  for (const val of arr) {
    current.next = new ListNode(val);
    current = current.next;
  }
  return dummy.next;
}

function listToArray(head) {
  const result = [];
  for (let current = head; current; current = current.next) {
    result.push(current.val);
  }
  return result;
}

function solve(input) {
  const { list1, list2 } = input;
  return listToArray(
    mergeTwoLists(arrayToList(list1), arrayToList(list2)),
  );
}`,
    testCases: [
      {
        input: { list1: [1, 2, 4], list2: [1, 3, 4] },
        expectedOutput: [1, 1, 2, 3, 4, 4],
        description: "Interleaved merge",
      },
      {
        input: { list1: [], list2: [] },
        expectedOutput: [],
        description: "Both empty",
      },
      {
        input: { list1: [], list2: [0] },
        expectedOutput: [0],
        description: "One empty list",
      },
      {
        input: { list1: [5], list2: [1, 2, 4] },
        expectedOutput: [1, 2, 4, 5],
      },
      {
        input: { list1: [-10, -5, 0], list2: [-8, -3, 2] },
        expectedOutput: [-10, -8, -5, -3, 0, 2],
      },
    ],
    hints: [
      "Use a dummy head so you can always attach the next smaller node.",
      "Compare list1.val and list2.val; advance the list you take from.",
      "When one list is exhausted, attach the remainder of the other.",
    ],
  },
];
