import {
  DM_Sans,
  Geist,
  Geist_Mono,
  Inter,
  Open_Sans,
  Source_Sans_3,
} from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  preload: true,
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  preload: false,
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  preload: false,
});

const sourceSans3 = Source_Sans_3({
  variable: "--font-source-sans-3",
  subsets: ["latin"],
  preload: false,
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  preload: false,
});

export const fontVariables = [
  geistSans.variable,
  geistMono.variable,
  inter.variable,
  dmSans.variable,
  sourceSans3.variable,
  openSans.variable,
].join(" ");
