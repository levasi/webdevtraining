import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import {
  DM_Sans,
  Geist,
  Geist_Mono,
  Inter,
  Open_Sans,
  Source_Sans_3,
} from "next/font/google";

import { AppShell } from "@/components/layout/app-shell";
import { QueryProvider } from "@/components/providers/query-provider";
import { getMainFont } from "@/lib/site-settings";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const sourceSans3 = Source_Sans_3({
  variable: "--font-source-sans-3",
  subsets: ["latin"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

const fontVariables = [
  geistSans.variable,
  geistMono.variable,
  inter.variable,
  dmSans.variable,
  sourceSans3.variable,
  openSans.variable,
].join(" ");

export const metadata: Metadata = {
  title: {
    default: "Web Dev Training — Web Developer Training Platform",
    template: "%s | Web Dev Training",
  },
  description:
    "Practice frontend, backend, and full-stack interview questions with flashcards, quizzes, and coding challenges.",
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
      <body className="min-h-full flex flex-col">
        <QueryProvider>
          <AppShell>{children}</AppShell>
        </QueryProvider>
        {process.env.NODE_ENV === "production" ? <Analytics /> : null}
      </body>
    </html>
  );
}
