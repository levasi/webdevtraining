"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import { getQuestionFormCategories } from "@/actions/admin/questions";
import { CreateQuestionForm } from "@/components/admin/create-question-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type CategoryOption = {
  id: string;
  name: string;
};

export function AddQuestionDialog() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    let cancelled = false;

    async function loadCategories() {
      setLoadingCategories(true);
      setLoadError(null);

      const result = await getQuestionFormCategories();

      if (cancelled) {
        return;
      }

      setLoadingCategories(false);

      if (!result.success) {
        setLoadError(result.error);
        return;
      }

      setCategories(result.data);
    }

    void loadCategories();

    return () => {
      cancelled = true;
    };
  }, [open]);

  function handleSuccess() {
    setOpen(false);
    router.refresh();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button size="sm" variant="outline">
            <Plus className="size-4" />
            Add question
          </Button>
        }
      />
      <DialogContent
        className="flex max-h-[min(92vh,52rem)] w-full max-w-3xl flex-col gap-0 overflow-hidden p-0 ring-0 sm:max-w-3xl"
        showCloseButton
      >
        <DialogHeader className="shrink-0 border-b px-6 py-5 pr-14">
          <DialogTitle className="text-lg">Add question</DialogTitle>
          <DialogDescription>
            Add a new item to the question bank. Explanation questions support rich
            text answers.
          </DialogDescription>
        </DialogHeader>

        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">
          {loadingCategories ? (
            <p className="py-12 text-center text-sm text-muted-foreground">
              Loading categories...
            </p>
          ) : loadError ? (
            <p className="py-12 text-center text-sm text-destructive">{loadError}</p>
          ) : categories.length === 0 ? (
            <p className="py-12 text-center text-sm text-muted-foreground">
              No categories found. Run the database seed before creating questions.
            </p>
          ) : (
            <CreateQuestionForm
              categories={categories}
              onSuccess={handleSuccess}
              onCancel={() => setOpen(false)}
              plain
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
