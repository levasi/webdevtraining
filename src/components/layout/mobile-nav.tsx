"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BookOpen, Bookmark, ChevronLeft, ChevronRight, LayoutDashboard, Library } from "lucide-react";

import { QuestionCompletionCheckbox } from "@/components/questions/question-completion-checkbox";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "@/lib/auth-client";
import { DIFFICULTY_LABELS } from "@/lib/constants";
import type { CategoryNavData } from "@/lib/queries/content";
import {
  categoryQuestionHref,
  getQuestionIdFromHash,
} from "@/lib/question-hash";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/read-later", label: "Read later", icon: Bookmark },
  { href: "/completed", label: "Completed", icon: LayoutDashboard },
  { href: "/resources", label: "Resources", icon: Library },
] as const;

type MobileNavCategory = CategoryNavData["category"];

type MobileNavView = "root" | "categories" | "questions";

type MobileNavProps = {
  open: boolean;
  onClose: () => void;
};

const navLinkClassName =
  "rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground";

function getCategorySlugFromPathname(pathname: string): string | null {
  const match = pathname.match(/^\/categories\/([^/]+)$/);
  return match?.[1] ?? null;
}

function getActiveQuestionId(hash: string): string | null {
  return getQuestionIdFromHash(hash);
}

async function fetchCategoryNav(slug: string): Promise<CategoryNavData | null> {
  const response = await fetch(`/api/categories/${slug}/questions`);
  if (!response.ok) {
    return null;
  }

  return response.json();
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  const pathname = usePathname();
  const [locationHash, setLocationHash] = useState("");
  const { data: session } = useSession();

  const [view, setView] = useState<MobileNavView>("root");
  const [categories, setCategories] = useState<MobileNavCategory[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<MobileNavCategory | null>(
    null,
  );
  const [questions, setQuestions] = useState<CategoryNavData["questions"]>([]);
  const [questionsLoading, setQuestionsLoading] = useState(false);
  const [activeQuestionId, setActiveQuestionId] = useState<string | null>(null);
  const [completedIds, setCompletedIds] = useState<Set<string>>(() => new Set());

  useEffect(() => {
    function updateHash() {
      setLocationHash(window.location.hash);
    }

    updateHash();
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, [pathname]);

  useEffect(() => {
    if (!open || !session?.user) {
      setCompletedIds(new Set());
      return;
    }

    let cancelled = false;

    fetch("/api/user/completed-questions")
      .then((response) => response.json())
      .then((data: { questionIds: string[] }) => {
        if (!cancelled) {
          setCompletedIds(new Set(data.questionIds));
        }
      })
      .catch(() => {
        if (!cancelled) {
          setCompletedIds(new Set());
        }
      });

    return () => {
      cancelled = true;
    };
  }, [open, session?.user]);

  function handleCompletionChange(questionId: string, completed: boolean) {
    setCompletedIds((current) => {
      const next = new Set(current);
      if (completed) {
        next.add(questionId);
      } else {
        next.delete(questionId);
      }
      return next;
    });
  }

  useEffect(() => {
    if (!open) {
      setView("root");
      setSelectedCategory(null);
      setQuestions([]);
      setCategories([]);
      setActiveQuestionId(null);
      return;
    }

    let cancelled = false;

    async function syncMenuToRoute() {
      const categorySlug = getCategorySlugFromPathname(pathname);
      const questionId = getActiveQuestionId(locationHash);

      if (categorySlug) {
        setView("questions");
        setQuestionsLoading(true);
        const data = await fetchCategoryNav(categorySlug);
        if (cancelled) {
          return;
        }

        if (data) {
          setSelectedCategory(data.category);
          setQuestions(data.questions);
        } else {
          setView("root");
          setSelectedCategory(null);
          setQuestions([]);
        }

        setActiveQuestionId(questionId);
        setQuestionsLoading(false);
        return;
      }

      setActiveQuestionId(null);

      if (pathname === "/categories") {
        setView("categories");
        return;
      }

      setView("root");
    }

    void syncMenuToRoute();

    return () => {
      cancelled = true;
    };
  }, [open, pathname, locationHash]);

  useEffect(() => {
    if (!open || view !== "categories") {
      return;
    }

    let cancelled = false;
    setCategoriesLoading(true);

    fetch("/api/categories")
      .then((response) => response.json())
      .then((data: MobileNavCategory[]) => {
        if (!cancelled) {
          setCategories(data);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setCategoriesLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [open, view]);

  async function loadCategoryQuestions(category: MobileNavCategory) {
    setSelectedCategory(category);
    setView("questions");
    setQuestionsLoading(true);
    setActiveQuestionId(null);

    const data = await fetchCategoryNav(category.slug);
    if (data) {
      setSelectedCategory(data.category);
      setQuestions(data.questions);
    } else {
      setQuestions([]);
    }

    setQuestionsLoading(false);
  }

  function handleBack() {
    if (view === "questions") {
      setView("categories");
      setSelectedCategory(null);
      setQuestions([]);
      setActiveQuestionId(null);
      return;
    }

    if (view === "categories") {
      setView("root");
      setCategories([]);
    }
  }

  const headerTitle =
    view === "questions"
      ? selectedCategory?.name ?? "Questions"
      : view === "categories"
        ? "Categories"
        : "Menu";

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 md:hidden",
        open ? "pointer-events-auto" : "pointer-events-none",
      )}
    >
      <div
        className={cn(
          "absolute inset-0 bg-black/40 transition-opacity",
          open ? "opacity-100" : "opacity-0",
        )}
        onClick={onClose}
      />
      <nav
        className={cn(
          "absolute left-0 top-0 flex h-full w-72 flex-col border-r bg-background transition-transform",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center gap-2 border-b px-3 py-3">
          {view !== "root" ? (
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={handleBack}
              aria-label="Back"
            >
              <ChevronLeft className="size-4" />
            </Button>
          ) : null}
          <p className="min-w-0 flex-1 truncate text-sm font-medium">{headerTitle}</p>
        </div>

        <div className="flex-1 overflow-y-auto p-2">
          {view === "root" ? (
            <div className="flex flex-col gap-1">
              <button
                type="button"
                onClick={() => setView("categories")}
                className="flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
              >
                Categories
                <ChevronRight className="size-4 text-muted-foreground" />
              </button>

              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  prefetch={false}
                  onClick={onClose}
                  className="rounded-md px-3 py-2 text-sm hover:bg-muted"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          ) : null}

          {view === "categories" ? (
            <div className="flex flex-col gap-1">
              <Link
                href="/categories"
                prefetch={false}
                onClick={onClose}
                className={cn(navLinkClassName, "font-medium text-foreground")}
              >
                All categories
              </Link>

              {categoriesLoading ? (
                <div className="mt-2 space-y-2">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <Skeleton key={index} className="h-9 w-full" />
                  ))}
                </div>
              ) : (
                categories.map((category) => (
                  <button
                    key={category.slug}
                    type="button"
                    onClick={() => void loadCategoryQuestions(category)}
                    className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                  >
                    <span className="truncate">{category.name}</span>
                    <span className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
                      {category.questionCount}
                      <ChevronRight className="size-3.5" />
                    </span>
                  </button>
                ))
              )}
            </div>
          ) : null}

          {view === "questions" && selectedCategory ? (
            <div className="flex flex-col gap-1">
              <Link
                href={`/categories/${selectedCategory.slug}`}
                prefetch={false}
                onClick={onClose}
                className={cn(navLinkClassName, "mb-2 font-medium text-foreground")}
              >
                View category page
              </Link>

              {questionsLoading ? (
                <div className="space-y-2">
                  {Array.from({ length: 8 }).map((_, index) => (
                    <Skeleton key={index} className="h-12 w-full" />
                  ))}
                </div>
              ) : questions.length === 0 ? (
                <p className="px-3 py-2 text-sm text-muted-foreground">
                  No questions in this category yet.
                </p>
              ) : (
                questions.map((question) => {
                  const isActive = question.id === activeQuestionId;

                  return (
                    <div
                      key={question.id}
                      className={cn(
                        "flex items-start gap-2 rounded-md px-3 py-2",
                        isActive &&
                          "bg-primary/10 text-foreground ring-1 ring-primary/20",
                      )}
                    >
                      <Link
                        href={categoryQuestionHref(selectedCategory.slug, question.id)}
                        prefetch={false}
                        onClick={onClose}
                        aria-current={isActive ? "true" : undefined}
                        className="min-w-0 flex-1 flex flex-col gap-1 text-sm hover:opacity-90"
                      >
                        <span className="line-clamp-2 font-medium leading-snug">
                          {question.title}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {DIFFICULTY_LABELS[question.difficulty]}
                        </span>
                      </Link>
                      <QuestionCompletionCheckbox
                        questionId={question.id}
                        isCompleted={completedIds.has(question.id)}
                        onCompletionChange={handleCompletionChange}
                      />
                    </div>
                  );
                })
              )}
            </div>
          ) : null}
        </div>
      </nav>
    </div>
  );
}
