import { PlaygroundPanel } from "@/components/playground/playground-panel";

export const metadata = {
  title: "Playground",
};

export default function PlaygroundPage() {
  return (
    <div className="w-full px-2 py-4 sm:px-6 sm:py-8">
      <div className="mb-5 sm:mb-8">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Playground
        </h1>
        <p className="mt-2 text-sm text-muted-foreground sm:text-base">
          Write JavaScript, click Run, and inspect{" "}
          <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
            console.log
          </code>{" "}
          output below. Drafts are saved in this browser.
        </p>
      </div>

      <PlaygroundPanel />
    </div>
  );
}
