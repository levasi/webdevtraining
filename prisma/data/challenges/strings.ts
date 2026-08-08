import type { SeedChallenge } from "../challenge-types";

export const stringChallenges: SeedChallenge[] = [
  {
    id: "seed-challenge-reverse-string",
    categorySlug: "javascript",
    title: "Reverse a String",
    description: "Return the input string reversed.",
    difficulty: "BEGINNER",
    starterCode: `function solve(input) {
  // return reversed string
}`,
    solutionCode: `function solve(input) {
  return input.split("").reverse().join("");
}`,
    testCases: [
      { input: "hello", expectedOutput: "olleh" },
      { input: "abc", expectedOutput: "cba" },
      { input: "", expectedOutput: "" },
    ],
    hints: ["Split into characters, reverse, and join.", "You can also loop from the end."],
  },
  {
    id: "seed-challenge-palindrome",
    categorySlug: "javascript",
    title: "Is Palindrome",
    description: "Return true if the input string is a palindrome.",
    difficulty: "INTERMEDIATE",
    starterCode: `function solve(input) {
  // return boolean
}`,
    solutionCode: `function solve(input) {
  const normalized = input.toLowerCase();
  return normalized === normalized.split("").reverse().join("");
}`,
    testCases: [
      { input: "level", expectedOutput: true },
      { input: "hello", expectedOutput: false },
      { input: "Racecar", expectedOutput: true },
    ],
    hints: ["Compare the string with its reverse.", "Normalize case if needed."],
  },
  {
    id: "seed-challenge-count-vowels",
    categorySlug: "javascript",
    title: "Count Vowels",
    description: "Return the number of vowels (a, e, i, o, u) in a string. Case-insensitive.",
    difficulty: "BEGINNER",
    starterCode: `function solve(input) {
  // return count
}`,
    solutionCode: `function solve(input) {
  const vowels = "aeiou";
  return [...input.toLowerCase()].filter((ch) => vowels.includes(ch)).length;
}`,
    testCases: [
      { input: "hello", expectedOutput: 2 },
      { input: "AEIOU", expectedOutput: 5 },
      { input: "rhythm", expectedOutput: 0 },
    ],
    hints: ["Convert to lowercase first.", "Filter characters in 'aeiou'."],
  },
  {
    id: "seed-challenge-remove-duplicate-characters",
    categorySlug: "javascript",
    title: "Remove Duplicate Characters",
    description: "Return a string with duplicate characters removed, keeping first occurrence order.",
    difficulty: "BEGINNER",
    starterCode: `function solve(input) {
  // return string
}`,
    solutionCode: `function solve(input) {
  const seen = new Set();
  return [...input]
    .filter((ch) => {
      if (seen.has(ch)) return false;
      seen.add(ch);
      return true;
    })
    .join("");
}`,
    testCases: [
      { input: "hello", expectedOutput: "helo" },
      { input: "aabbcc", expectedOutput: "abc" },
      { input: "abc", expectedOutput: "abc" },
    ],
    hints: ["Track seen characters with a Set.", "Filter or loop and build a new string."],
  },
  {
    id: "seed-challenge-first-non-repeating-character",
    categorySlug: "javascript",
    title: "First Non-Repeating Character",
    description: "Return the first character that appears only once, or null if none.",
    difficulty: "INTERMEDIATE",
    starterCode: `function solve(input) {
  // return character or null
}`,
    solutionCode: `function solve(input) {
  const counts = {};
  for (const ch of input) counts[ch] = (counts[ch] || 0) + 1;
  for (const ch of input) if (counts[ch] === 1) return ch;
  return null;
}`,
    testCases: [
      { input: "swiss", expectedOutput: "w" },
      { input: "aabb", expectedOutput: null },
      { input: "leetcode", expectedOutput: "l" },
    ],
    hints: ["Count frequency first, then scan left to right.", "Return null when every character repeats."],
  },
  {
    id: "seed-challenge-capitalize-words",
    categorySlug: "javascript",
    title: "Capitalize Words",
    description: "Capitalize the first letter of each word in a string.",
    difficulty: "BEGINNER",
    starterCode: `function solve(input) {
  // return capitalized string
}`,
    solutionCode: `function solve(input) {
  return input
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}`,
    testCases: [
      { input: "hello world", expectedOutput: "Hello World" },
      { input: "javaScript rocks", expectedOutput: "Javascript Rocks" },
      { input: "a", expectedOutput: "A" },
    ],
    hints: ["Split on spaces.", "Uppercase first char and lowercase the rest of each word."],
  },
  {
    id: "seed-challenge-to-camel-case",
    categorySlug: "javascript",
    title: "Convert to camelCase",
    description: "Convert a space or hyphen separated string to camelCase.",
    difficulty: "INTERMEDIATE",
    starterCode: `function solve(input) {
  // return camelCase string
}`,
    solutionCode: `function solve(input) {
  const parts = input.split(/[\\s-]+/);
  return parts
    .map((p, i) =>
      i === 0 ? p.toLowerCase() : p.charAt(0).toUpperCase() + p.slice(1).toLowerCase(),
    )
    .join("");
}`,
    testCases: [
      { input: "hello world", expectedOutput: "helloWorld" },
      { input: "foo-bar-baz", expectedOutput: "fooBarBaz" },
      { input: "XML parser", expectedOutput: "xmlParser" },
    ],
    hints: ["Split on spaces and hyphens.", "Lowercase the first word; capitalize subsequent words."],
  },
  {
    id: "seed-challenge-camel-to-kebab",
    categorySlug: "javascript",
    title: "camelCase to kebab-case",
    description: "Convert a camelCase string to kebab-case.",
    difficulty: "INTERMEDIATE",
    starterCode: `function solve(input) {
  // return kebab-case string
}`,
    solutionCode: `function solve(input) {
  return input.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}`,
    testCases: [
      { input: "helloWorld", expectedOutput: "hello-world" },
      { input: "fooBarBaz", expectedOutput: "foo-bar-baz" },
      { input: "xml", expectedOutput: "xml" },
    ],
    hints: ["Insert hyphens before uppercase letters.", "Lowercase the entire result."],
  },
  {
    id: "seed-challenge-is-anagram",
    categorySlug: "javascript",
    title: "Is Anagram",
    description: "Return true if two strings are anagrams. Ignore case. Input is [a, b].",
    difficulty: "INTERMEDIATE",
    starterCode: `function solve(input) {
  const [a, b] = input;
  // return boolean
}`,
    solutionCode: `function solve(input) {
  const normalize = (s) => s.toLowerCase().split("").sort().join("");
  return normalize(input[0]) === normalize(input[1]);
}`,
    testCases: [
      { input: ["listen", "silent"], expectedOutput: true },
      { input: ["Hello", "Olelh"], expectedOutput: true },
      { input: ["abc", "abd"], expectedOutput: false },
    ],
    hints: ["Sort normalized characters and compare.", "Input is a two-element array."],
  },
  {
    id: "seed-challenge-character-frequency",
    categorySlug: "javascript",
    title: "Character Frequency",
    description: "Return an object mapping each character to its count in the string.",
    difficulty: "BEGINNER",
    starterCode: `function solve(input) {
  // return frequency object
}`,
    solutionCode: `function solve(input) {
  const freq = {};
  for (const ch of input) freq[ch] = (freq[ch] || 0) + 1;
  return freq;
}`,
    testCases: [
      { input: "aab", expectedOutput: { a: 2, b: 1 } },
      { input: "hello", expectedOutput: { h: 1, e: 1, l: 2, o: 1 } },
      { input: "", expectedOutput: {} },
    ],
    hints: ["Loop over each character.", "Increment counts in an object."],
  },
  {
    id: "seed-challenge-jewels-and-stones",
    categorySlug: "javascript",
    title: "Jewels and Stones",
    description: [
      "You're given strings jewels (types of stones that are jewels) and stones (the stones you have).",
      "Return how many of the stones you have are also jewels.",
      "Letters are case sensitive, so \"a\" differs from \"A\".",
      "Input is [jewels, stones]. All characters in jewels are unique.",
    ].join(" "),
    difficulty: "BEGINNER",
    starterCode: `function solve(input) {
  const [jewels, stones] = input;
  // return count of stones that are jewels
}`,
    solutionCode: `function solve(input) {
  const [jewels, stones] = input;
  const jewelSet = new Set(jewels);
  let count = 0;
  for (const stone of stones) {
    if (jewelSet.has(stone)) count += 1;
  }
  return count;
}`,
    testCases: [
      {
        input: ["aA", "aAAbbbb"],
        expectedOutput: 3,
        description: "Three jewels: a, A, A",
      },
      {
        input: ["z", "ZZ"],
        expectedOutput: 0,
        description: "Case sensitive — z is not Z",
      },
      {
        input: ["abc", "aabbcc"],
        expectedOutput: 6,
      },
      {
        input: ["A", "aAAa"],
        expectedOutput: 2,
      },
    ],
    hints: [
      "Put jewel characters in a Set for O(1) lookups.",
      "Count how many characters in stones appear in that Set.",
      "Do not ignore case — 'a' and 'A' are different.",
    ],
  },
  {
    id: "seed-challenge-group-anagrams",
    categorySlug: "javascript",
    title: "Group Anagrams",
    description: [
      "Given an array of strings strs, group the anagrams together.",
      "You can return the answer in any order.",
      "",
      'Example: ["eat","tea","tan","ate","nat","bat"] → groups like ["bat"], ["nat","tan"], ["ate","eat","tea"].',
      "",
      "Input is the array strs. Return an array of groups (arrays of strings).",
      "Tests normalize group and item order, so any valid grouping passes.",
    ].join("\n"),
    difficulty: "INTERMEDIATE",
    starterCode: `/**
 * @param {string[]} strs
 * @return {string[][]}
 */
function groupAnagrams(strs) {
  // return groups of anagrams
}

function normalizeGroups(groups) {
  return groups
    .map((group) => [...group].sort())
    .sort((a, b) => a.join("\\0").localeCompare(b.join("\\0")));
}

function solve(input) {
  return normalizeGroups(groupAnagrams(input));
}`,
    solutionCode: `/**
 * @param {string[]} strs
 * @return {string[][]}
 */
function groupAnagrams(strs) {
  const map = new Map();
  for (const str of strs) {
    const key = [...str].sort().join("");
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(str);
  }
  return [...map.values()];
}

function normalizeGroups(groups) {
  return groups
    .map((group) => [...group].sort())
    .sort((a, b) => a.join("\\0").localeCompare(b.join("\\0")));
}

function solve(input) {
  return normalizeGroups(groupAnagrams(input));
}`,
    testCases: [
      {
        input: ["eat", "tea", "tan", "ate", "nat", "bat"],
        expectedOutput: [
          ["ate", "eat", "tea"],
          ["bat"],
          ["nat", "tan"],
        ],
        description: "Classic anagram groups",
      },
      {
        input: [""],
        expectedOutput: [[""]],
        description: "Single empty string",
      },
      {
        input: ["a"],
        expectedOutput: [["a"]],
        description: "Single character",
      },
      {
        input: ["abc", "bca", "cab", "xyz", "zyx", "foo"],
        expectedOutput: [["abc", "bca", "cab"], ["foo"], ["xyz", "zyx"]],
      },
      {
        input: ["", ""],
        expectedOutput: [["", ""]],
        description: "Two empty strings are anagrams",
      },
    ],
    hints: [
      "Anagrams share the same characters when sorted — use that as a map key.",
      "Group strings in a Map from sorted-key → list of originals.",
      "Return the Map values; the harness sorts groups for comparison.",
    ],
  },
];
