"use client";

import { AppFooter } from "@/components/layout/app-footer";
import { AppHeader, MobileNav } from "@/components/layout/app-header";
import { useUiStore } from "@/stores/ui-store";

export function AppShell({ children }: { children: React.ReactNode }) {
  const { sidebarOpen, setSidebarOpen } = useUiStore();

  return (
    <>
      <AppHeader onMenuClick={() => setSidebarOpen(true)} />
      <MobileNav open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="flex-1">{children}</main>
      <AppFooter />
    </>
  );
}
