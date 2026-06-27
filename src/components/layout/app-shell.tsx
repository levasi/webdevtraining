"use client";

import { Suspense } from "react";

import { AppFooter } from "@/components/layout/app-footer";
import { AppHeader } from "@/components/layout/app-header";
import { MobileNav } from "@/components/layout/mobile-nav";
import { NavigationLoadingOverlay } from "@/components/layout/navigation-loading-overlay";
import { useUiStore } from "@/stores/ui-store";

export function AppShell({ children }: { children: React.ReactNode }) {
  const { sidebarOpen, setSidebarOpen } = useUiStore();

  return (
    <>
      <Suspense fallback={null}>
        <NavigationLoadingOverlay />
      </Suspense>
      <AppHeader onMenuClick={() => setSidebarOpen(true)} />
      <MobileNav open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="min-w-0 flex-1 overflow-x-hidden">{children}</main>
      <AppFooter />
    </>
  );
}
