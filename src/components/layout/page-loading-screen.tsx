import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type PageLoadingScreenProps = {
  message?: string;
  className?: string;
  showSkeleton?: boolean;
};

export function PageLoadingScreen({
  message = "Loading page…",
  className,
  showSkeleton = true,
}: PageLoadingScreenProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className={cn(
        "flex w-full flex-col items-center justify-center px-4 py-16 sm:px-6",
        className,
      )}
    >
      <div className="flex flex-col items-center gap-4">
        <div
          className="size-10 animate-spin rounded-full border-2 border-muted border-t-primary"
          aria-hidden="true"
        />
        <p className="text-sm text-muted-foreground">{message}</p>
      </div>

      {showSkeleton ? (
        <div className="mx-auto mt-12 w-full max-w-3xl space-y-4">
          <Skeleton className="h-9 w-56" />
          <Skeleton className="h-4 w-full max-w-xl" />
          <Skeleton className="h-4 w-full max-w-lg" />
          <div className="grid gap-4 pt-4 sm:grid-cols-2">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      ) : null}
    </div>
  );
}
