import { sanitizeRichText } from "@/lib/rich-text";
import { cn } from "@/lib/utils";

type RichTextContentProps = {
  html: string;
  className?: string;
};

export function RichTextContent({ html, className }: RichTextContentProps) {
  const sanitized = sanitizeRichText(html);

  if (!sanitized) {
    return null;
  }

  return (
    <div
      className={cn("rich-text-content", className)}
      dangerouslySetInnerHTML={{ __html: sanitized }}
    />
  );
}
