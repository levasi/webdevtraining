import { headers } from "next/headers";
import { ArrowRight } from "lucide-react";

import { CategoryGrid } from "@/components/categories/category-grid";
import { ButtonLink } from "@/components/ui/button-link";
import { auth } from "@/lib/auth";
import { getCategories } from "@/lib/queries/content";

export default async function HomePage() {
  let startHref = "/register";

  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (session?.user) {
      startHref = "#categories";
    }
  } catch {
    // Database or auth unavailable during build/local setup.
  }

  const categories = await getCategories();

  return (
    <div className="w-full px-4 py-12 sm:px-6">
      <section className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Prepare for technical interviews with confidence
        </h1>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <ButtonLink href={startHref} size="lg">
            Start practicing
            <ArrowRight className="size-4" />
          </ButtonLink>
        </div>
      </section>

      <section id="categories" className="mx-auto mt-16 max-w-7xl scroll-mt-20">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold tracking-tight">Categories</h2>
          <p className="mt-2 text-muted-foreground">
            Browse interview topics across frontend, backend, and full-stack
            development.
          </p>
        </div>
        <CategoryGrid categories={categories} />
      </section>
    </div>
  );
}
