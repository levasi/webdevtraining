export type QuestionFormCategory = {
  id: string;
  name: string;
};

let cachedCategories: QuestionFormCategory[] | null = null;
let loadPromise: Promise<QuestionFormCategory[]> | null = null;

export function clearQuestionFormCategoriesCache() {
  cachedCategories = null;
  loadPromise = null;
}

export function getCachedQuestionFormCategories(): QuestionFormCategory[] | null {
  return cachedCategories;
}

export async function loadQuestionFormCategories(
  fetcher: () => Promise<
    | { success: true; data: QuestionFormCategory[] }
    | { success: false; error: string }
  >,
): Promise<{ categories: QuestionFormCategory[] | null; error: string | null }> {
  if (cachedCategories) {
    return { categories: cachedCategories, error: null };
  }

  if (!loadPromise) {
    loadPromise = fetcher().then((result) => {
      if (!result.success) {
        throw new Error(result.error);
      }

      cachedCategories = result.data;
      return result.data;
    });
  }

  try {
    const categories = await loadPromise;
    return { categories, error: null };
  } catch (error) {
    loadPromise = null;
    return {
      categories: null,
      error:
        error instanceof Error ? error.message : "Failed to load categories",
    };
  } finally {
    if (cachedCategories) {
      loadPromise = null;
    }
  }
}
