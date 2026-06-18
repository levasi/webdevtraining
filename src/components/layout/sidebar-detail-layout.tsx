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
        "flex min-h-[min(70vh,720px)] flex-col overflow-hidden rounded-xl border bg-card lg:flex-row",
        className,
      )}
    >
      <aside className="flex max-h-64 shrink-0 flex-col border-b lg:max-h-none lg:w-80 lg:border-r lg:border-b-0 xl:w-96">
        {sidebar}
      </aside>
      <main className="min-h-0 min-w-0 flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
