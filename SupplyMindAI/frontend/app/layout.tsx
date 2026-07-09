import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "@/styles/globals.css";

// ─── Fonts ───────────────────────────────────────────────────────────────────

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ─── Metadata ────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: {
    template: "%s | SupplyMind AI",
    default: "SupplyMind AI – Enterprise Procurement Intelligence",
  },
  description:
    "AI-powered Procurement, Inventory, Logistics & Enterprise Intelligence Platform.",
  keywords: [
    "procurement",
    "inventory",
    "logistics",
    "supply chain",
    "AI",
    "enterprise",
    "SaaS",
  ],
  authors: [{ name: "SupplyMind AI" }],
  robots: { index: false, follow: false }, // set to true in production
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

// ─── Root Layout ─────────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background font-sans antialiased`}
      >
        {/*
         * Providers go here (QueryClientProvider, ThemeProvider, etc.)
         * Do NOT implement features yet – this is the architecture scaffold.
         */}
        {children}
      </body>
    </html>
  );
}
