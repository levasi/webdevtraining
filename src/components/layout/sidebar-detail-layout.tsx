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
        "flex flex-col rounded-xl border bg-card lg:flex-row lg:items-start",
        className,
      )}
    >
      <aside className="hidden shrink-0 flex-col overflow-hidden lg:sticky lg:top-16 lg:z-10 lg:flex lg:h-[calc(100vh-4rem)] lg:max-h-[calc(100vh-4rem)] lg:w-80 lg:border-r xl:w-96">
        {sidebar}
      </aside>
      <main className="min-w-0 flex-1">{children}</main>
    </div>
  );
}
