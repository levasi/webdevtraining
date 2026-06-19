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
        className="flex max-h-[calc(100vh-2rem)] w-full max-w-4xl flex-col overflow-hidden sm:max-w-4xl"
        showCloseButton
      >
        <DialogHeader>
          <DialogTitle>Add question</DialogTitle>
          <DialogDescription>
            Create a new interview question and save it to the database.
          </DialogDescription>
        </DialogHeader>

        <div className="min-h-0 flex-1 overflow-y-auto pr-1">
          {loadingCategories ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              Loading categories...
            </p>
          ) : loadError ? (
            <p className="py-8 text-center text-sm text-destructive">{loadError}</p>
          ) : categories.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No categories found. Run the database seed before creating questions.
            </p>
          ) : (
            <CreateQuestionForm
              categories={categories}
              onSuccess={handleSuccess}
              onCancel={() => setOpen(false)}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
