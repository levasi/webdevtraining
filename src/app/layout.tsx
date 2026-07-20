import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";

import { fontVariables } from "@/lib/app-fonts";
import { AppShell } from "@/components/layout/app-shell";
import { QueryProvider } from "@/components/providers/query-provider";
import { getMainFont } from "@/lib/site-settings";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Web Dev Training — Web Developer Training Platform",
    template: "%s | Web Dev Training",
  },
  description:
    "Practice frontend, backend, and full-stack interview questions with flashcards, quizzes, and coding challenges.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#f5f1e8",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const mainFont = await getMainFont();

  return (
    <html
      lang="en"
      data-main-font={mainFont}
      className={`${fontVariables} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-clip">
        <QueryProvider>
          <AppShell>{children}</AppShell>
        </QueryProvider>
        {process.env.NODE_ENV === "production" ? <Analytics /> : null}
      </body>
    </html>
  );
}
