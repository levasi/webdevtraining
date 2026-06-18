import { ResourcesContent } from "@/components/resources/resources-content";

export const metadata = {
  title: "Resources",
};

export default function ResourcesPage() {
  return (
    <div className="w-full px-4 py-8 sm:px-6">
      <div className="mb-8 max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight">Resources</h1>
        <p className="mt-2 text-muted-foreground">
          Curated learning resources for senior frontend interview preparation,
          organized by tier from theory and interview practice to projects and
          full courses.
        </p>
      </div>

      <ResourcesContent />
    </div>
  );
}
