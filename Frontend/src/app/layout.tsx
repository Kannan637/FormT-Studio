import type { Metadata } from "next";
import { Inter, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FormT Studio — Architecture & Interior Design",
  description:
    "FormT Studio is an architecture and interior design studio based in Coimbatore, creating thoughtful homes, residences, and commercial environments.",
  keywords: [
    "architecture",
    "interior design",
    "Coimbatore",
    "residential architecture",
    "commercial design",
    "FormT Studio",
  ],
  authors: [{ name: "FormT Studio" }],
  openGraph: {
    title: "FormT Studio — Architecture & Interior Design",
    description:
      "Creating homes and spaces that feel like they belong. Architecture, interior design, and bespoke transformations based in Coimbatore.",
    url: "https://formtstudio.com",
    siteName: "FormT Studio",
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/brand-logo.png" },
      { url: "/brand-logo.png", sizes: "32x32", type: "image/png" },
      { url: "/brand-logo.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/brand-logo.png",
    apple: [
      { url: "/brand-logo.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-zinc-950 font-sans">{children}</body>
    </html>
  );
}
