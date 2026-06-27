import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Prevents long tokens (e.g. big integers) from causing horizontal page overflow. */
export const wrapLongTextClass =
  "min-w-0 break-words [overflow-wrap:anywhere]";
