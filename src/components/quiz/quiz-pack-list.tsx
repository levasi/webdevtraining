import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DIFFICULTY_LABELS } from "@/lib/constants";
import { isGeneratedQuizId } from "@/lib/quiz/generate";
import type { QuizPackSummary } from "@/lib/queries/quizzes";

const difficultyVariant = {
  BEGINNER: "secondary",
  INTERMEDIATE: "default",
  ADVANCED: "destructive",
} as const;

type QuizPackListProps = {
  quizzes: QuizPackSummary[];
  emptyMessage?: string;
};

export function QuizPackList({
  quizzes,
  emptyMessage = "No quiz packs are available yet.",
}: QuizPackListProps) {
  if (quizzes.length === 0) {
    return <p className="text-sm text-muted-foreground">{emptyMessage}</p>;
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {quizzes.map((quiz) => (
        <Link
          key={quiz.id}
          href={`/quiz/${quiz.id}`}
          className="group rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Card className="h-full transition-colors group-hover:bg-muted/40">
            <CardHeader>
              <div className="flex flex-wrap items-center gap-2">
                {isGeneratedQuizId(quiz.id) ? (
                  <Badge variant="outline">Generated</Badge>
                ) : null}
                {quiz.difficulty ? (
                  <Badge variant={difficultyVariant[quiz.difficulty]}>
                    {DIFFICULTY_LABELS[quiz.difficulty]}
                  </Badge>
                ) : null}
                {quiz.category ? (
                  <Badge variant="outline">{quiz.category.name}</Badge>
                ) : null}
                <Badge variant="secondary">
                  {quiz.questionCount} question
                  {quiz.questionCount === 1 ? "" : "s"}
                </Badge>
              </div>
              <CardTitle className="text-base group-hover:text-primary">
                {quiz.title}
              </CardTitle>
              {quiz.description ? (
                <CardDescription className="line-clamp-2">
                  {quiz.description}
                </CardDescription>
              ) : null}
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  );
}
