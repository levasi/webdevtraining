import { cn } from "@/lib/utils";

type SidebarDetailLayoutProps = {
  sidebar: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

export function SidebarDetailLayout({
  sidebar,
  children,
  className,
}: SidebarDetailLayoutProps) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-xl border border-border/80 bg-card shadow-sm lg:flex-row lg:items-start",
        className,
      )}
    >
      <aside className="hidden w-full shrink-0 flex-col overflow-hidden border-border/80 bg-muted/40 lg:sticky lg:top-16 lg:z-10 lg:flex lg:h-[calc(100vh-4rem)] lg:max-h-[calc(100vh-4rem)] lg:w-80 lg:border-r xl:w-96">
        <div className="flex h-full min-h-0 flex-col justify-start">
          {sidebar}
        </div>
      </aside>
      <main className="min-w-0 flex-1 bg-card">{children}</main>
    </div>
  );
}
