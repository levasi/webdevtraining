export const DEFAULT_MAIN_FONT = "geist" as const;

export type MainFontKey =
  | "geist"
  | "inter"
  | "dm-sans"
  | "source-sans-3"
  | "open-sans"
  | "georgia"
  | "verdana"
  | "bookerly";

type MainFontOption = {
  value: MainFontKey;
  label: string;
  cssVariable?: string;
  fontFamily?: string;
};

export const MAIN_FONT_OPTIONS: MainFontOption[] = [
  { value: "geist", label: "Geist Sans", cssVariable: "--font-geist-sans" },
  { value: "inter", label: "Inter", cssVariable: "--font-inter" },
  { value: "dm-sans", label: "DM Sans", cssVariable: "--font-dm-sans" },
  {
    value: "source-sans-3",
    label: "Source Sans 3",
    cssVariable: "--font-source-sans-3",
  },
  { value: "open-sans", label: "Open Sans", cssVariable: "--font-open-sans" },
  {
    value: "georgia",
    label: "Georgia",
    fontFamily: 'Georgia, "Times New Roman", Times, serif',
  },
  {
    value: "verdana",
    label: "Verdana",
    fontFamily: "Verdana, Geneva, sans-serif",
  },
  {
    value: "bookerly",
    label: "Bookerly",
    fontFamily: '"Bookerly", Georgia, "Times New Roman", serif',
  },
];

export function isMainFontKey(value: string): value is MainFontKey {
  return MAIN_FONT_OPTIONS.some((option) => option.value === value);
}

export function getMainFontCssVariable(key: MainFontKey): string {
  return (
    MAIN_FONT_OPTIONS.find((option) => option.value === key)?.cssVariable ??
    "--font-geist-sans"
  );
}

export function getMainFontLabel(key: MainFontKey): string {
  return (
    MAIN_FONT_OPTIONS.find((option) => option.value === key)?.label ??
    "Geist Sans"
  );
}
