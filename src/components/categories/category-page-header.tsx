"use client";

import { AddQuestionDialog } from "@/components/layout/add-question-dialog";

type CategoryPageHeaderProps = {
  title: string;
  categoryId: string;
  isAdmin?: boolean;
};

export function CategoryPageHeader({
  title,
  categoryId,
  isAdmin = false,
}: CategoryPageHeaderProps) {
  return (
    <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
      <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      {isAdmin ? <AddQuestionDialog defaultCategoryId={categoryId} /> : null}
    </div>
  );
}
