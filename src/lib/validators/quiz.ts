import { z } from "zod";

export const submitQuizSchema = z.object({
  quizId: z.string().min(1),
  answers: z.array(
    z.object({
      questionId: z.string().min(1),
      answerId: z.string().min(1),
    }),
  ),
  startedAt: z.string().datetime().optional(),
});

export type SubmitQuizInput = z.infer<typeof submitQuizSchema>;

export type QuizAnswerResult = {
  questionId: string;
  answerId: string;
  isCorrect: boolean;
  correctAnswerId: string;
  explanation: string | null;
};

export type QuizSubmitResult = {
  attemptId: string | null;
  saved: boolean;
  score: number;
  totalQuestions: number;
  correctCount: number;
  results: QuizAnswerResult[];
};
