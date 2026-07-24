import { DocsContent } from "@/components/docs/docs-content";
import { DOCS_PAGE } from "@/lib/docs/site-docs";

export const metadata = {
  title: DOCS_PAGE.title,
  description: DOCS_PAGE.description,
};

export default function DocsPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-2 py-8 sm:px-6">
      <div className="mb-10 max-w-3xl space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{DOCS_PAGE.title}</h1>
        <p className="text-muted-foreground">{DOCS_PAGE.description}</p>
      </div>
      <DocsContent />
    </div>
  );
}
