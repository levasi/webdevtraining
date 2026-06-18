import { z } from "zod";

import { CATEGORIES } from "@/lib/constants";

const categorySlugs = CATEGORIES.map((category) => category.slug);

export const contentProposalSchema = z.object({
  contentType: z.enum(["QUESTION", "CHALLENGE", "QUIZ"]),
  categorySlug: z.enum(categorySlugs as [string, ...string[]]),
  title: z.string().min(3).max(200),
  description: z.string().min(20).max(5000),
  details: z.string().max(10000).optional(),
  submitterName: z.string().max(120).optional(),
  submitterEmail: z
    .string()
    .email("Enter a valid email address.")
    .max(320)
    .optional()
    .or(z.literal("")),
});

export type ContentProposalInput = z.infer<typeof contentProposalSchema>;

export const CONTENT_PROPOSAL_TYPE_LABELS = {
  QUESTION: "Question",
  CHALLENGE: "Challenge",
  QUIZ: "Quiz",
} as const;
