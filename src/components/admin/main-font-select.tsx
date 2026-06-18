"use client";

import { useState, useTransition } from "react";

import { updateMainFont } from "@/actions/admin/settings";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MAIN_FONT_OPTIONS,
  type MainFontKey,
} from "@/lib/fonts";

type MainFontSelectProps = {
  value: MainFontKey;
};

export function MainFontSelect({ value }: MainFontSelectProps) {
  const [selectedFont, setSelectedFont] = useState(value);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleChange(nextFont: MainFontKey | null) {
    if (!nextFont || nextFont === selectedFont) {
      return;
    }

    setError(null);
    startTransition(async () => {
      const result = await updateMainFont({ mainFont: nextFont });

      if (!result.success) {
        setError(result.error);
        return;
      }

      setSelectedFont(nextFont);
    });
  }

  return (
    <div className="space-y-2">
      <Label htmlFor="main-font">Main font</Label>
      <Select
        value={selectedFont}
        onValueChange={(nextValue) => handleChange(nextValue as MainFontKey)}
        disabled={isPending}
      >
        <SelectTrigger
          id="main-font"
          className="w-full max-w-sm"
          aria-label="Main font"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {MAIN_FONT_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error ? (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}
      {isPending ? (
        <p className="text-sm text-muted-foreground">Saving font…</p>
      ) : null}
    </div>
  );
}
