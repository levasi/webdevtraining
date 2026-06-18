import { QuizBrowser } from "@/components/quiz/quiz-browser";
import { getPublishedQuestions } from "@/lib/queries/content";
import { filterQuizEligibleQuestions } from "@/lib/questions/quiz-eligible";

export const metadata = {
  title: "Quiz Mode",
};

export default async function QuizPage() {
  const questions = await getPublishedQuestions();
  const quizQuestions = filterQuizEligibleQuestions(questions);

  return (
    <div className="w-full px-4 py-8 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">Quiz Mode</h1>
      <p className="mt-2 text-muted-foreground">
        Test yourself one question at a time. Select an answer and check your
        result with explanations.
      </p>

      <div className="mt-8">
        <QuizBrowser questions={quizQuestions} />
      </div>
    </div>
  );
}
