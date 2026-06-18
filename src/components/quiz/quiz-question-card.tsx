import Link from "next/link";

import { DifficultyBadge } from "@/components/categories/category-grid";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { QuestionWithAnswers } from "@/types";

type QuizQuestionCardProps = {
  question: QuestionWithAnswers;
  showCategory?: boolean;
};

export function QuizQuestionCard({
  question,
  showCategory = true,
}: QuizQuestionCardProps) {
  return (
    <Link href={`/quiz/${question.id}`}>
      <Card className="h-full transition-shadow hover:shadow-md">
        <CardHeader>
          <div className="flex flex-wrap items-center gap-2">
            <DifficultyBadge difficulty={question.difficulty} />
            <Badge variant="secondary">Quiz</Badge>
            {showCategory ? (
              <Badge variant="outline">{question.category.name}</Badge>
            ) : null}
          </div>
          <CardTitle className="text-lg">{question.title}</CardTitle>
          <CardDescription className="line-clamp-2">
            {question.content}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-xs text-muted-foreground">
          {question.answers.length} options ·{" "}
          {question.type.replace("_", " ")} · Start quiz →
        </CardContent>
      </Card>
    </Link>
  );
}
