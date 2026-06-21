import { cache } from "react";

import { db, hasDatabaseUrl } from "@/lib/db";
import { createDevTtlCache } from "@/lib/dev-cache";
import {
  DEFAULT_MAIN_FONT,
  isMainFontKey,
  type MainFontKey,
} from "@/lib/fonts";

const mainFontCache = createDevTtlCache<MainFontKey>(60_000);

async function loadMainFont(): Promise<MainFontKey> {
  const cached = mainFontCache.get();
  if (cached) {
    return cached;
  }

  if (!hasDatabaseUrl()) {
    return DEFAULT_MAIN_FONT;
  }

  try {
    const settings = await db.siteSettings.findUnique({
      where: { id: "singleton" },
      select: { mainFont: true },
    });

    if (settings?.mainFont && isMainFontKey(settings.mainFont)) {
      mainFontCache.set(settings.mainFont);
      return settings.mainFont;
    }
  } catch {
    // Database unavailable during local setup.
  }

  mainFontCache.set(DEFAULT_MAIN_FONT);
  return DEFAULT_MAIN_FONT;
}

export const getMainFont = cache(loadMainFont);

export function clearMainFontCache() {
  mainFontCache.clear();
}
