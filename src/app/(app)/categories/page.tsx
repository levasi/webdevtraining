import { CategoryGrid } from "@/components/categories/category-grid";
import { getCategories } from "@/lib/queries/content";

export const metadata = {
  title: "Categories",
};

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="w-full px-4 py-8 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
        <p className="mt-2 text-muted-foreground">
          Browse interview topics across frontend, backend, and full-stack development.
        </p>
      </div>
      <CategoryGrid categories={categories} />
    </div>
  );
}
