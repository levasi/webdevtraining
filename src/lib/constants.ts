export const CATEGORIES = [
  { name: "JavaScript", slug: "javascript", icon: "js" },
  { name: "TypeScript", slug: "typescript", icon: "ts" },
  { name: "React", slug: "react", icon: "react" },
  { name: "Next.js", slug: "nextjs", icon: "next" },
  { name: "Vue", slug: "vue", icon: "vue" },
  { name: "Nuxt", slug: "nuxt", icon: "nuxt" },
  { name: "HTML", slug: "html", icon: "html" },
  { name: "CSS", slug: "css", icon: "css" },
  { name: "Node.js", slug: "nodejs", icon: "node" },
  { name: "Express", slug: "express", icon: "express" },
  { name: "REST APIs", slug: "rest-apis", icon: "api" },
  { name: "SQL", slug: "sql", icon: "sql" },
  { name: "PostgreSQL", slug: "postgresql", icon: "postgres" },
  { name: "Git", slug: "git", icon: "git" },
  { name: "Testing", slug: "testing", icon: "test" },
  { name: "Security", slug: "security", icon: "shield" },
  { name: "Performance", slug: "performance", icon: "zap" },
  { name: "System Design", slug: "system-design", icon: "layers" },
] as const;

export const DIFFICULTY_LABELS = {
  BEGINNER: "Beginner",
  INTERMEDIATE: "Intermediate",
  ADVANCED: "Advanced",
} as const;

export const LEARNING_MODES = [
  { slug: "quiz", label: "Quiz Mode", mode: "QUIZ" },
  { slug: "challenges", label: "Coding Challenges", mode: "CODING" },
] as const;
