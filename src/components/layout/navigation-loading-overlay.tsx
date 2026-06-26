"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import { PageLoadingScreen } from "@/components/layout/page-loading-screen";

function isSameLocation(
  href: string,
  pathname: string,
  search: string,
): boolean {
  try {
    const next = new URL(href, window.location.origin);
    return next.pathname === pathname && next.search === search;
  } catch {
    return true;
  }
}

function shouldTrackNavigation(target: EventTarget | null): string | null {
  if (!(target instanceof Element)) {
    return null;
  }

  const anchor = target.closest("a");
  if (!anchor) {
    return null;
  }

  if (
    anchor.target === "_blank" ||
    anchor.hasAttribute("download") ||
    anchor.getAttribute("rel") === "external"
  ) {
    return null;
  }

  const href = anchor.getAttribute("href");
  if (!href || href.startsWith("#") || href.startsWith("mailto:")) {
    return null;
  }

  if (href.startsWith("http") && !href.startsWith(window.location.origin)) {
    return null;
  }

  return href;
}

export function NavigationLoadingOverlay() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.toString();
  const searchSuffix = search ? `?${search}` : "";
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    setIsNavigating(false);
  }, [pathname, search]);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (
        event.defaultPrevented ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const href = shouldTrackNavigation(event.target);
      if (!href || isSameLocation(href, pathname, searchSuffix)) {
        return;
      }

      setIsNavigating(true);
    }

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [pathname, searchSuffix]);

  if (!isNavigating) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <PageLoadingScreen showSkeleton={false} className="py-0" />
    </div>
  );
}
