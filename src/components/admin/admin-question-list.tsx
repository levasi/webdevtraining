"use client";

import { DeleteQuestionButton } from "@/components/questions/delete-question-button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type AdminQuestionListItem = {
  id: string;
  title: string;
  content: string;
  difficulty: string;
  isPublished: boolean;
  category: { name: string };
};

type AdminQuestionListProps = {
  questions: AdminQuestionListItem[];
};

export function AdminQuestionList({ questions }: AdminQuestionListProps) {
  if (questions.length === 0) {
    return (
      <Card>
        <CardContent className="py-10 text-center text-muted-foreground">
          No questions yet. Create the first one to get started.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {questions.map((question) => (
        <Card key={question.id}>
          <CardHeader className="flex-row items-center justify-between gap-4">
            <div className="min-w-0 flex-1">
              <CardTitle className="text-base">{question.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {question.category.name}
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-end gap-2">
              <Badge variant="outline">{question.difficulty}</Badge>
              <Badge variant={question.isPublished ? "default" : "secondary"}>
                {question.isPublished ? "Published" : "Draft"}
              </Badge>
              <DeleteQuestionButton
                questionId={question.id}
                questionTitle={question.title}
              />
            </div>
          </CardHeader>
          <CardContent className="line-clamp-2 text-sm text-muted-foreground">
            {question.content}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
