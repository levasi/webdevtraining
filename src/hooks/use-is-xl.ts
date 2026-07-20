"use client";

import { useSyncExternalStore } from "react";

function subscribeXl(onStoreChange: () => void) {
  const mediaQuery = window.matchMedia("(min-width: 1280px)");
  mediaQuery.addEventListener("change", onStoreChange);
  return () => mediaQuery.removeEventListener("change", onStoreChange);
}

function getXlSnapshot() {
  return window.matchMedia("(min-width: 1280px)").matches;
}

function getXlServerSnapshot() {
  return false;
}

/** True at the Tailwind `xl` breakpoint (1280px+). */
export function useIsXl() {
  return useSyncExternalStore(subscribeXl, getXlSnapshot, getXlServerSnapshot);
}
