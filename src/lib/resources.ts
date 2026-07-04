export type LearningResource = {
  id: string;
  name: string;
  url: string;
  description: string;
  highlights: string[];
};

export type ResourceTier = {
  id: string;
  tier: number;
  title: string;
  subtitle?: string;
  resources: LearningResource[];
};

export const RESOURCE_TIERS: ResourceTier[] = [
  {
    id: "tier-1",
    tier: 1,
    title: "Best for Senior Frontend Interviews",
    resources: [
      {
        id: "javascript-info",
        name: "JavaScript.info",
        url: "https://javascript.info/",
        description: "Best JavaScript theory resource.",
        highlights: [
          "Covers Event Loop, Closures, Prototypes, Promises, Async/Await, Browser APIs",
          "Read it cover-to-cover — one of the best investments you can make",
        ],
      },
      {
        id: "bigfrontend",
        name: "BigFrontend.dev",
        url: "https://bigfrontend.dev/",
        description: "LeetCode for Frontend.",
        highlights: [
          "600+ frontend questions",
          "JavaScript implementations: debounce, throttle, Promise.all, EventEmitter, deep clone, and more",
          "Excellent for interview preparation",
        ],
      },
      {
        id: "greatfrontend",
        name: "GreatFrontEnd",
        url: "https://www.greatfrontend.com/",
        description:
          "Probably the closest thing to actual senior frontend interviews.",
        highlights: [
          "JavaScript, React, Frontend System Design, UI coding, behavioral questions",
          "Built by former Meta engineers",
        ],
      },
    ],
  },
  {
    id: "tier-2",
    tier: 2,
    title: "Coding Challenges",
    resources: [
      {
        id: "codewars",
        name: "Codewars",
        url: "https://www.codewars.com/",
        description: "Great for JavaScript problem solving.",
        highlights: [
          "Focus on 6 kyu, 5 kyu, and 4 kyu",
          "Skip the overly mathematical challenges",
        ],
      },
      {
        id: "leetcode",
        name: "LeetCode",
        url: "https://leetcode.com/",
        description:
          "Useful for algorithms and data structures. Frontend companies still ask some of these.",
        highlights: [
          "Focus on Arrays, Strings, Hash Maps",
          "Trees (basic) and Recursion",
        ],
      },
      {
        id: "exercism",
        name: "Exercism JavaScript Track",
        url: "https://exercism.org/tracks/javascript",
        description: "Fantastic for writing clean JavaScript.",
        highlights: [
          "Less interview-focused, more engineering-focused",
        ],
      },
    ],
  },
  {
    id: "tier-3",
    tier: 3,
    title: "Real Frontend Projects",
    resources: [
      {
        id: "frontend-mentor",
        name: "Frontend Mentor",
        url: "https://www.frontendmentor.io/",
        description: "Build real projects from designs.",
        highlights: [
          "Great for component architecture and responsive UI",
        ],
      },
      {
        id: "frontend-practice",
        name: "Frontend Practice",
        url: "https://www.frontendpractice.com/",
        description: "Recreate real websites.",
        highlights: ["Excellent for polishing frontend skills"],
      },
      {
        id: "javascript30",
        name: "JavaScript30",
        url: "https://javascript30.com/",
        description: "30 vanilla JavaScript projects.",
        highlights: ["Great for DOM and browser APIs"],
      },
    ],
  },
  {
    id: "tier-4",
    tier: 4,
    title: "Free Full Courses",
    resources: [
      {
        id: "freecodecamp",
        name: "freeCodeCamp",
        url: "https://www.freecodecamp.org/",
        description: "Huge amount of JavaScript practice and projects.",
        highlights: ["Good structured learning path"],
      },
      {
        id: "frontend-interview-handbook",
        name: "Frontend Interview Handbook",
        url: "https://www.frontendinterviewhandbook.com/",
        description: "Specifically focused on interview preparation.",
        highlights: [
          "Covers JavaScript, frontend system design, behavioral questions",
        ],
      },
      {
        id: "ydkjs",
        name: "You Don't Know JS Yet",
        url: "https://github.com/getify/You-Dont-Know-JS",
        description: "Deep JavaScript internals.",
        highlights: ["Senior-level understanding"],
      },
    ],
  },
  {
    id: "tier-5",
    tier: 5,
    title: "Graphics & Creative Coding",
    resources: [
      {
        id: "book-of-shaders",
        name: "The Book of Shaders",
        url: "https://thebookofshaders.com/",
        description: "Gentle step-by-step guide to fragment shaders and GLSL.",
        highlights: [
          "Great for learning shaders, GLSL, and creative/generative graphics",
        ],
      },
    ],
  },
];

export const THIRTY_DAY_STUDY_PLAN = [
  { resource: "JavaScript.info", percentage: 40 },
  { resource: "BigFrontend.dev", percentage: 30 },
  { resource: "GreatFrontEnd", percentage: 20 },
  { resource: "LeetCode / Codewars", percentage: 10 },
] as const;
