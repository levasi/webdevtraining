import { QuizSurfaceTabs } from "@/components/quiz/quiz-surface-tabs";
import { getPublishedQuestions } from "@/lib/queries/content";
import { getPublishedQuizzes } from "@/lib/queries/quizzes";
import { filterQuizEligibleQuestions } from "@/lib/questions/quiz-eligible";

export const metadata = {
  title: "Quiz Mode",
};

export default async function QuizPage() {
  const [questions, quizzes] = await Promise.all([
    getPublishedQuestions(),
    getPublishedQuizzes(),
  ]);
  const quizQuestions = filterQuizEligibleQuestions(questions);

  return (
    <div className="w-full space-y-6 px-2 py-8 sm:px-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Quiz Mode</h1>
        <p className="mt-2 text-muted-foreground">
          Practice multiple-choice questions or take curated packs. Explanations
          appear after you check an answer.
        </p>
      </div>

      <QuizSurfaceTabs questions={quizQuestions} packs={quizzes} />
    </div>
  );
}
