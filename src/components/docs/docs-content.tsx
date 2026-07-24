"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { DOCS_SECTIONS } from "@/lib/docs/site-docs";
import { cn } from "@/lib/utils";

export function DocsContent() {
  return (
    <div className="grid gap-10 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-12">
      <nav
        aria-label="Docs sections"
        className="lg:sticky lg:top-24 lg:self-start"
      >
        <p className="mb-3 text-xs font-medium tracking-wide text-muted-foreground uppercase">
          On this page
        </p>
        <ul className="space-y-1.5 text-sm">
          {DOCS_SECTIONS.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className="text-foreground/75 transition-colors hover:text-foreground"
              >
                {section.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="min-w-0 space-y-12">
        {DOCS_SECTIONS.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="scroll-mt-24 space-y-4"
          >
            <h2 className="border-b border-border/70 pb-2 text-xl font-semibold tracking-tight">
              {section.title}
            </h2>
            <DocsMarkdown markdown={section.markdown} />
          </section>
        ))}
      </div>
    </div>
  );
}

function DocsMarkdown({ markdown }: { markdown: string }) {
  return (
    <div className={cn("space-y-4 text-[15px] leading-7 text-foreground")}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children }) => (
            <p className="text-muted-foreground">{children}</p>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-foreground">{children}</strong>
          ),
          ul: ({ children }) => (
            <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal space-y-2 pl-6 text-muted-foreground">
              {children}
            </ol>
          ),
          li: ({ children }) => <li className="leading-7">{children}</li>,
          a: ({ href, children }) => (
            <a
              href={href}
              className="font-medium text-primary underline-offset-4 hover:underline"
              {...(href?.startsWith("http")
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              {children}
            </a>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto rounded-lg border border-border/70">
              <table className="w-full min-w-[28rem] border-collapse text-sm">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-muted/50 text-left">{children}</thead>
          ),
          th: ({ children }) => (
            <th className="border-b border-border/70 px-3 py-2 font-medium text-foreground">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border-b border-border/40 px-3 py-2 align-top text-muted-foreground">
              {children}
            </td>
          ),
          code: ({ className, children }) => {
            const isBlock = Boolean(className);
            if (isBlock) {
              return (
                <code className="block overflow-x-auto rounded-lg border bg-muted/50 p-4 font-mono text-sm text-foreground">
                  {children}
                </code>
              );
            }
            return (
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-foreground">
                {children}
              </code>
            );
          },
          pre: ({ children }) => (
            <pre className="overflow-x-auto rounded-lg border bg-muted/50 p-4">
              {children}
            </pre>
          ),
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
