import { db } from "@/lib/db";
import {
  DEFAULT_MAIN_FONT,
  isMainFontKey,
  type MainFontKey,
} from "@/lib/fonts";

export async function getMainFont(): Promise<MainFontKey> {
  try {
    const settings = await db.siteSettings.findUnique({
      where: { id: "singleton" },
      select: { mainFont: true },
    });

    if (settings?.mainFont && isMainFontKey(settings.mainFont)) {
      return settings.mainFont;
    }
  } catch {
    // Database unavailable during local setup.
  }

  return DEFAULT_MAIN_FONT;
}
