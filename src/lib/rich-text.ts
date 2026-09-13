import { marked } from "marked";
import sanitizeHtml from "sanitize-html";

const ALLOWED_TAGS = [
  "p",
  "br",
  "strong",
  "em",
  "u",
  "s",
  "code",
  "pre",
  "ul",
  "ol",
  "li",
  "blockquote",
  "a",
  "h2",
  "h3",
  "table",
  "thead",
  "tbody",
  "tr",
  "th",
  "td",
  "colgroup",
  "col",
  "div",
];

const WIDTH_STYLE = [/^\d+(?:\.\d+)?(?:px|%)?$/];

const SANITIZE_OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: ALLOWED_TAGS,
  allowedAttributes: {
    a: ["href", "target", "rel"],
    code: ["class"],
    div: ["class"],
    table: ["style"],
    colgroup: ["style"],
    col: ["style", "span", "width"],
    th: ["colspan", "rowspan", "colwidth", "style"],
    td: ["colspan", "rowspan", "colwidth", "style"],
  },
  allowedClasses: {
    div: ["tableWrapper"],
  },
  allowedStyles: {
    table: {
      width: WIDTH_STYLE,
      "min-width": WIDTH_STYLE,
    },
    col: {
      width: WIDTH_STYLE,
      "min-width": WIDTH_STYLE,
    },
    th: {
      width: WIDTH_STYLE,
      "min-width": WIDTH_STYLE,
    },
    td: {
      width: WIDTH_STYLE,
      "min-width": WIDTH_STYLE,
    },
  },
};

marked.setOptions({
  gfm: true,
  breaks: true,
});

export function sanitizeRichText(html: string): string {
  return sanitizeHtml(html, SANITIZE_OPTIONS);
}

/** True when clipboard HTML includes a table we should keep as HTML. */
export function htmlContainsTable(html: string): boolean {
  return /<table[\s>]/i.test(html);
}

function cellContentToParagraphs(cell: Element): string {
  const clone = cell.cloneNode(true) as Element;
  clone.querySelectorAll("table").forEach((nested) => nested.remove());

  const blocks = [
    ...clone.querySelectorAll(":scope > p, :scope > ul, :scope > ol, :scope > pre, :scope > blockquote, :scope > h2, :scope > h3"),
  ];

  if (blocks.length > 0) {
    return sanitizeRichText(blocks.map((block) => block.outerHTML).join(""));
  }

  const inline = sanitizeRichText(`<p>${clone.innerHTML}</p>`);
  return inline.trim() ? inline : "<p></p>";
}

/**
 * Rebuild pasted tables into a rectangular TipTap-safe shape.
 * Uneven rows / colspan / nested junk from Docs/Word break ProseMirror table maps.
 */
export function normalizePastedTables(html: string): string {
  if (!htmlContainsTable(html) || typeof DOMParser === "undefined") {
    return html;
  }

  const doc = new DOMParser().parseFromString(html, "text/html");
  const tables = [...doc.body.querySelectorAll("table")].filter(
    (table) => !table.parentElement?.closest("table"),
  );

  for (const table of tables) {
    const rows = [
      ...table.querySelectorAll(
        ":scope > thead > tr, :scope > tbody > tr, :scope > tr",
      ),
    ] as HTMLTableRowElement[];

    const normalizedRows = rows.map((row) => {
      const cellElements = [
        ...row.querySelectorAll(":scope > th, :scope > td"),
      ];
      const isHeaderRow =
        row.parentElement?.tagName === "THEAD" ||
        (cellElements.length > 0 &&
          cellElements.every((cell) => cell.tagName === "TH"));

      const cells: string[] = [];
      for (const cell of cellElements) {
        const colspan = Math.min(
          20,
          Math.max(
            1,
            Number.parseInt(cell.getAttribute("colspan") ?? "1", 10) || 1,
          ),
        );
        const content = cellContentToParagraphs(cell);
        cells.push(content);
        for (let i = 1; i < colspan; i += 1) {
          cells.push("<p></p>");
        }
      }

      return { isHeaderRow, cells };
    });

    const columnCount = normalizedRows.reduce(
      (max, row) => Math.max(max, row.cells.length),
      0,
    );

    if (columnCount === 0) {
      table.remove();
      continue;
    }

    const nextTable = doc.createElement("table");
    const tbody = doc.createElement("tbody");

    normalizedRows.forEach((row, rowIndex) => {
      while (row.cells.length < columnCount) {
        row.cells.push("<p></p>");
      }

      const tr = doc.createElement("tr");
      for (const content of row.cells) {
        const cell = doc.createElement(
          row.isHeaderRow || rowIndex === 0 ? "th" : "td",
        );
        cell.innerHTML = content;
        tr.appendChild(cell);
      }

      tbody.appendChild(tr);
    });

    nextTable.appendChild(tbody);
    table.replaceWith(nextTable);
  }

  return doc.body.innerHTML;
}

/** Sanitize + normalize tables for editor paste/storage round-trips. */
export function prepareRichTextHtml(html: string): string {
  return normalizePastedTables(sanitizeRichText(html));
}

export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function isProbablyHtml(text: string): boolean {
  return /<\/?(?:p|div|br|ul|ol|li|pre|code|h[1-6]|table|strong|em)\b/i.test(
    text.trim(),
  );
}

/** Detect markdown syntax commonly pasted from docs / ChatGPT. */
export function looksLikeMarkdown(text: string): boolean {
  const normalized = text.replace(/\r\n/g, "\n");
  return (
    /(^|\n)\s*```/.test(normalized) ||
    /(^|\n)\s{0,3}#{1,6}\s+\S/.test(normalized) ||
    /\*\*[^*]+\*\*/.test(normalized) ||
    /__[^_]+__/.test(normalized) ||
    /`[^`\n]+`/.test(normalized) ||
    /(^|\n)\s*[-*+]\s+\S/.test(normalized) ||
    /(^|\n)\s*\d+\.\s+\S/.test(normalized)
  );
}

/** Heuristic: multi-line pasted snippets that look like source code (not markdown). */
export function looksLikeCodeSnippet(text: string): boolean {
  if (looksLikeMarkdown(text)) {
    return false;
  }

  const normalized = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  const lines = normalized.split("\n");
  if (lines.length < 2) {
    return false;
  }

  const indented = lines.filter((line) => /^\s{2,}|\t/.test(line)).length;
  const codeSignals =
    /[{};=<>]|function\b|const\b|let\b|var\b|class\b|import\b|return\b|=>|console\.|<\/?[a-z]/i.test(
      normalized,
    );

  return indented >= 1 || (codeSignals && lines.length >= 2);
}

export function markdownToRichHtml(text: string): string {
  const html = marked.parse(text, { async: false }) as string;
  return sanitizeRichText(html);
}

/**
 * Convert clipboard plain text into tidy rich-text HTML.
 * Markdown → rendered HTML; code-like pastes → <pre><code>; else paragraphs.
 */
export function plainTextToRichHtml(text: string): string {
  const normalized = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  if (!normalized.trim()) {
    return "<p></p>";
  }

  if (looksLikeMarkdown(normalized)) {
    return markdownToRichHtml(normalized);
  }

  if (looksLikeCodeSnippet(normalized)) {
    const code = escapeHtml(normalized.replace(/\n$/, ""));
    return `<pre><code>${code}</code></pre>`;
  }

  return normalized
    .split(/\n{2,}/)
    .map((paragraph) => {
      const body = escapeHtml(paragraph).replace(/\n/g, "<br />");
      return `<p>${body || "<br />"}</p>`;
    })
    .join("");
}

/** Normalize stored answer content (HTML, markdown, or plain) into rich HTML. */
export function coerceAnswerToRichHtml(content: string): string {
  if (!content.trim()) {
    return "";
  }
  if (isProbablyHtml(content)) {
    return sanitizeRichText(content);
  }
  return plainTextToRichHtml(content);
}

/** Prefer plain-text paste when clipboard HTML is from Word/Docs/IDEs. */
export function shouldPreferPlainTextPaste(html: string): boolean {
  if (!html.trim()) {
    return true;
  }

  // Keep real tables as HTML — plain-text conversion destroys structure and
  // produces broken TipTap table maps ("No cell with offset …").
  if (htmlContainsTable(html)) {
    return false;
  }

  if (
    /MsoNormal|xmlns:o=|docs-internal-guid|Apple-converted-space|Slack-copy/i.test(
      html,
    )
  ) {
    return true;
  }

  return (html.match(/<span[\s>]/gi) ?? []).length >= 3;
}

export function getRichTextPlainText(html: string): string {
  return sanitizeRichText(html)
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/\u00a0/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function isRichTextEmpty(html: string): boolean {
  return getRichTextPlainText(html).length === 0;
}
