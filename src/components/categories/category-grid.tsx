import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DIFFICULTY_LABELS } from "@/lib/constants";
import type { CategorySummary } from "@/types";

type CategoryGridProps = {
  categories: CategorySummary[];
};

export function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {categories.map((category) => (
        <Link key={category.id} href={`/categories/${category.slug}`}>
          <Card className="h-full transition-shadow hover:shadow-md">
            <CardHeader>
              <div className="flex items-center justify-between gap-2">
                <CardTitle className="text-lg">{category.name}</CardTitle>
                <Badge variant="outline">{category.icon ?? "topic"}</Badge>
              </div>
              <CardDescription>
                {category.description ?? "Practice questions and challenges."}
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              {category._count.questions} questions · {category._count.challenges}{" "}
              challenges
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}

export function DifficultyBadge({
  difficulty,
}: {
  difficulty: keyof typeof DIFFICULTY_LABELS;
}) {
  return <Badge variant="outline">{DIFFICULTY_LABELS[difficulty]}</Badge>;
}
