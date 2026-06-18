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
    title: "Validate Brackets",
    description: "Return true if brackets/parentheses are balanced.",
    difficulty: "INTERMEDIATE",
    starterCode: `function solve(input) {
  // return boolean
}`,
    solutionCode: `function solve(input) {
  const pairs = { ")": "(", "]": "[", "}": "{" };
  const stack = [];
  for (const ch of input) {
    if ("([{".includes(ch)) stack.push(ch);
    else if (")]}".includes(ch)) {
      if (stack.pop() !== pairs[ch]) return false;
    }
  }
  return stack.length === 0;
}`,
    testCases: [
      { input: "()", expectedOutput: true },
      { input: "([)]", expectedOutput: false },
      { input: "{[]}", expectedOutput: true },
    ],
    hints: ["Use a stack for opening brackets.", "Pop and match on closing brackets."],
  },
  {
    id: "seed-challenge-longest-substring",
    categorySlug: "javascript",
    title: "Longest Substring Without Repeating",
    description: "Return length of longest substring without repeating characters.",
    difficulty: "ADVANCED",
    starterCode: `function solve(input) {
  // return length
}`,
    solutionCode: `function solve(input) {
  const seen = new Map();
  let start = 0;
  let max = 0;
  for (let end = 0; end < input.length; end++) {
    const ch = input[end];
    if (seen.has(ch) && seen.get(ch) >= start) {
      start = seen.get(ch) + 1;
    }
    seen.set(ch, end);
    max = Math.max(max, end - start + 1);
  }
  return max;
}`,
    testCases: [
      { input: "abcabcbb", expectedOutput: 3 },
      { input: "bbbbb", expectedOutput: 1 },
      { input: "pwwkew", expectedOutput: 3 },
    ],
    hints: ["Use sliding window with two pointers.", "Track last index of each character."],
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
];
